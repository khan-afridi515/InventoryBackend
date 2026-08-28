import Notification from '../model/notificationModel.js';
import Product from '../../Product/model/modal.js';
import { getValidAccessToken } from './ebayTokenService.js';
import { fetchEbayOrderDetails, buildEbayChallengeResponse } from './ebayOrderService.js';
import { updateInventoryFromOrder } from '../../Product/Service/inventoryService.js';
import { emitProductSold } from '../../../socket/index.js';
import logger from '../../../utils/logger.js';
import User from '../model/model.js';
import EbayToken from '../model/ebayTokenModel.js';
import crypto from 'node:crypto';
import { ebayNotificationConfig } from '../../../config/ebayNotificationConfig.js';

const buildEbayDeletionChallengeResponse = (challengeCode, verificationToken, endpoint) => {
  if (!challengeCode || !verificationToken || !endpoint) {
    throw new Error('challengeCode, verification token, and endpoint are required');
  }

  return crypto
    .createHash('sha256')
    .update(`${challengeCode}${verificationToken}${endpoint}`)
    .digest('hex');
};

export const ebayDeletionChallengeService = async (
    challengeCode
) => {
  const verificationToken = ebayNotificationConfig.verificationToken;
  const endpoint = ebayNotificationConfig.endpoint;

  return {
    challengeResponse: buildEbayDeletionChallengeResponse(
      challengeCode,
      verificationToken,
      endpoint
    ),
  };
};

export const ebayDeletionNotificationService = async (
    notification
) => {
  const data = notification?.notification?.data;
  const { userId, eiasToken } = data || {};

  if (!data) {
    throw new Error('Invalid eBay deletion notification payload');
  }
  if (!userId && !eiasToken) {
    throw new Error('eBay user identifier not found');
    }

  const identifiers = [userId, eiasToken].filter(Boolean);
  const users = await User.find({
    $or: [
      ...(userId ? [{ ebayUserId: userId }] : []),
      ...(eiasToken ? [{ ebayEiasToken: eiasToken }] : []),
    ],
  });
  const userIds = users.map((user) => String(user._id));

  await EbayToken.deleteMany({
    $or: [
      { ebayUserId: { $in: identifiers } },
      { ebayEiasToken: { $in: identifiers } },
      ...(userIds.length ? [{ userId: { $in: userIds } }] : []),
    ],
  });

  if (users.length) {
    await User.updateMany(
      { _id: { $in: users.map((user) => user._id) } },
      { $unset: { ebayUserId: 1, ebayEiasToken: 1 } }
    );
  }

  return {
    success: true,
    message: users.length
      ? 'eBay account deletion notification processed successfully'
      : 'eBay deletion notification received; user not found',
  };
};

// Step 5: Service validates the payload, prevents duplicates, and processes the order
const processEbayOrderNotification = async (req) => {
  try {
    const payload = req.body || {};
    const notification = payload.notification || payload;
    const orderId = notification?.data?.order?.orderId || payload?.orderId;
    const notificationId = notification?.notificationId || payload?.notificationId;

    logger.info('Incoming eBay notification received', { notificationId, orderId });

    if (!notificationId) {
      return { success: false, status: 400, message: 'notificationId is required' };
    }

    const existingNotification = await Notification.findOne({ notificationId });
    if (existingNotification) {
      logger.info('Duplicate notification ignored', { notificationId });
      return { success: true, status: 200, message: 'Notification already processed', data: { notificationId } };
    }

    if (!orderId) {
      return { success: false, status: 400, message: 'orderId is required' };
    }

    // Step 6: Get a valid access token before calling eBay fulfillment API
    const accessToken = await getValidAccessToken();
    logger.info('Fetching complete order from eBay', { orderId });
    const orderDetails = await fetchEbayOrderDetails(orderId, accessToken);

    const orderLineItems = orderDetails?.orderLineItems || [];
    const skuItems = orderLineItems.map((item) => {
      const rawSku = item?.sku || item?.lineItem?.sku || item?.skuId;
      const rawProductId = item?.productId || item?.lineItem?.productId || item?.productId;
      const rawProductName = item?.productName || item?.lineItem?.productName || item?.title || item?.name;

      return {
        productId: rawProductId !== undefined && rawProductId !== null ? String(rawProductId).trim() : '',
        sku: rawSku !== undefined && rawSku !== null ? String(rawSku).trim() : '',
        productName: rawProductName !== undefined && rawProductName !== null ? String(rawProductName).trim() : '',
        quantity: Number(item?.quantity || item?.lineItem?.quantity || 0),
      };
    }).filter((item) => item.productId || item.sku || item.productName);

    // Step 7: Fetch matching products and update inventory quantities
    const products = [];
    for (const lineItem of skuItems) {
      let product = null;

      if (lineItem.productId) {
        product = await Product.findOne({
          $or: [
            { _id: lineItem.productId },
            { productId: lineItem.productId },
          ],
        });
      }

      if (!product && lineItem.sku) {
        product = await Product.findOne({ sku: String(lineItem.sku).trim() });
      }

      if (!product && lineItem.productName) {
        product = await Product.findOne({ productName: { $regex: new RegExp(`^${lineItem.productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });
      }

      if (product) {
        products.push(product);
      }
    }

    const inventoryResult = await updateInventoryFromOrder(products, skuItems);

    const updates = [];
    for (const update of inventoryResult.inventoryUpdates) {
      const product = products.find((item) => {
        const itemProductId = item.productId || item._id?.toString();
        return itemProductId && update.productId && itemProductId.toString() === update.productId.toString();
      }) || products.find((item) => item.sku === update.sku)
        || products.find((item) => item.productName && update.productName && item.productName.toLowerCase() === update.productName.toLowerCase());

      if (!product) {
        continue;
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: { quantity: update.newQuantity } },
        { new: true }
      );
      updates.push(updatedProduct);
    }

    // Step 8: Save notification history in MongoDB
    const notificationRecord = await Notification.create({
      notificationId,
      orderId,
      buyer: orderDetails?.buyer?.username || orderDetails?.buyer?.userId || '',
      seller: orderDetails?.seller?.username || orderDetails?.seller?.userId || '',
      productTitle: orderLineItems?.[0]?.title || '',
      sku: skuItems?.[0]?.sku || '',
      quantity: skuItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
      price: Number(orderDetails?.pricingSummary?.price?.value || 0),
      currency: orderDetails?.pricingSummary?.price?.currency || 'USD',
      eventDate: notification?.eventDate || orderDetails?.creationDate || new Date(),
      receivedAt: new Date(),
      processedAt: new Date(),
      isRead: false,
    });

    // Step 9: Emit a socket event to the frontend for live updates
    emitProductSold({
      orderId,
      buyer: notificationRecord.buyer,
      items: skuItems,
      total: notificationRecord.price,
      currency: notificationRecord.currency,
      eventDate: notificationRecord.eventDate,
    });

    logger.info('Inventory updated', { orderId, updates: updates.length });

    return {
      success: true,
      status: 200,
      message: 'eBay order notification processed successfully',
      data: {
        notificationId,
        orderId,
        inventoryUpdates: inventoryResult.inventoryUpdates,
        notification: notificationRecord,
      },
    };
  } catch (error) {
    logger.error('Error processing eBay notification', { message: error.message });
    return { success: false, status: 500, message: error.message || 'Failed to process eBay notification' };
  }
};

const getAllNotifications = async () => {
  try {
    const notifications = await Notification.find().sort({ eventDate: -1, createdAt: -1 });
    return {
      success: true,
      status: 200,
      data: notifications,
    };
  } catch (error) {
    logger.error('Error retrieving eBay notifications', { message: error.message });
    return { success: false, status: 500, message: error.message || 'Failed to fetch notifications' };
  }
};

// Step 10: Generate the eBay challenge response for endpoint verification
const handleEbayChallenge = (req) => {
  const challengeCode = req.query?.challenge_code || req.query?.challengeCode;
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;

  if (!challengeCode || !verificationToken) {
    return { success: false, status: 400, message: 'challenge_code and verification token are required' };
  }

  return {
    success: true,
    status: 200,
    challengeResponse: buildEbayChallengeResponse(challengeCode, verificationToken),
  };
};

export {
  processEbayOrderNotification,
  getAllNotifications,
  handleEbayChallenge,
  buildEbayDeletionChallengeResponse,
};

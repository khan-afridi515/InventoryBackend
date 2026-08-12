import crypto from 'crypto';
import Notification from '../model/notificationModel.js';
import Product from '../../Product/model/modal.js';
import { getValidAccessToken } from './ebayTokenService.js';
import { fetchEbayOrderDetails, buildEbayChallengeResponse } from './ebayOrderService.js';
import { updateInventoryFromOrder } from '../../Product/Service/inventoryService.js';
import { emitProductSold } from '../../../socket/index.js';
import logger from '../../../utils/logger.js';
import User from '../model/model.js';

// ==========================================
// GET - eBay Challenge Verification
// ==========================================

// export const ebayDeletionChallengeService = async (challengeCode) => {
//   try {
//     const verificationToken =
//       process.env.EBAY_VERIFICATION_TOKEN;

//     const endpoint =
//       process.env.EBAY_NOTIFICATION_ENDPOINT_URL;

//     if (!verificationToken) {
//       throw new Error(
//         "EBAY_VERIFICATION_TOKEN is not configured"
//       );
//     }

//     if (!endpoint) {
//       throw new Error(
//         "EBAY_DELETION_ENDPOINT is not configured"
//       );
//     }

//     // eBay requires:
//     // SHA256(challenge_code + verification_token + endpoint)

//     const challengeResponse = crypto
//       .createHash("sha256")
//       .update(
//         challengeCode +
//         verificationToken +
//         endpoint
//       )
//       .digest("hex");

//     return {
//       challengeResponse,
//     };

//   } catch (error) {
//     console.error(
//       "ebayDeletionChallengeService:",
//       error
//     );

//     throw error;
//   }
// };


export const ebayDeletionChallengeService = async (
    challengeCode
) => {
    try {
        // eBay Marketplace Account Deletion
        // verification token
        const verificationToken =
            process.env.EBAY_DELETION_VERIFICATION_TOKEN;

        // Exact endpoint URL registered with eBay
        const endpoint =
            process.env.EBAY_DELETION_ENDPOINT;

        if (!verificationToken) {
            throw new Error(
                "EBAY_DELETION_VERIFICATION_TOKEN is not configured"
            );
        }

        if (!endpoint) {
            throw new Error(
                "EBAY_DELETION_ENDPOINT is not configured"
            );
        }

        // eBay requires:
        // SHA256(
        //   challenge_code +
        //   verification_token +
        //   endpoint
        // )

        const hash = crypto.createHash("sha256");

        hash.update(challengeCode);
        hash.update(verificationToken);
        hash.update(endpoint);

        const challengeResponse =
            hash.digest("hex");

        console.log(
            "eBay challenge response generated successfully"
        );

        return {
            challengeResponse,
        };

    } catch (error) {
        console.error(
            "ebayDeletionChallengeService:",
            error
        );

        throw error;
    }
};


// ==========================================
// POST - eBay Account Deletion Notification
// ==========================================

// export const ebayDeletionNotificationService = async (
//   notification
// ) => {
//   try {
//     console.log(
//       "Processing eBay deletion notification..."
//     );

//     const data =
//       notification?.notification?.data;

//     if (!data) {
//       throw new Error(
//         "Invalid eBay deletion notification payload"
//       );
//     }

//     const {
//       username,
//       userId,
//       eiasToken,
//     } = data;

//     console.log("eBay deletion data:", {
//       username,
//       userId,
//       eiasToken,
//     });

//     if (!userId && !eiasToken) {
//       throw new Error(
//         "eBay user identifier not found"
//       );
//     }

//     /*
//       IMPORTANT:

//       Find your application user using the eBay
//       userId/eiasToken and remove the eBay-related
//       data from your database.

//       Example:

//       const user = await User.findOne({
//         ebayUserId: userId
//       });

//       if (user) {
//         user.ebayAccessToken = null;
//         user.ebayRefreshToken = null;
//         user.ebayUserId = null;

//         await user.save();
//       }
//     */

//     console.log(
//       "eBay account deletion processed for:",
//       userId || eiasToken
//     );

//     return {
//       success: true,
//       message:
//         "eBay account deletion notification received",
//     };

//   } catch (error) {
//     console.error(
//       "ebayDeletionNotificationService:",
//       error
//     );

//     throw error;
//   }
// };



export const ebayDeletionNotificationService = async (
    notification
) => {
    try {
        console.log(
            "Processing eBay deletion notification..."
        );

        // -----------------------------------------
        // 1. Validate notification payload
        // -----------------------------------------

        const data =
            notification?.notification?.data;

        if (!data) {
            throw new Error(
                "Invalid eBay deletion notification payload"
            );
        }

        // -----------------------------------------
        // 2. Extract eBay user identifiers
        // -----------------------------------------

        const {
            username,
            userId,
            eiasToken,
        } = data;

        console.log(
            "eBay deletion user information:",
            {
                username,
                userId,
                hasEiasToken: Boolean(eiasToken),
            }
        );

        if (!userId && !eiasToken) {
            throw new Error(
                "eBay user identifier not found"
            );
        }

        // -----------------------------------------
        // 3. Find your application user
        // -----------------------------------------

        let user = null;

        if (userId) {
            user = await User.findOne({
                ebayUserId: userId,
            });
        }

        // Optional fallback if your database stores
        // eiasToken instead of ebayUserId
        if (!user && eiasToken) {
            user = await User.findOne({
                ebayEiasToken: eiasToken,
            });
        }

        // -----------------------------------------
        // 4. Handle user not found
        // -----------------------------------------

        if (!user) {
            console.log(
                "No application user found for eBay deletion notification"
            );

            // Still acknowledge the notification.
            // eBay has successfully delivered it.
            return {
                success: true,
                message:
                    "eBay deletion notification received; user not found",
            };
        }

        // -----------------------------------------
        // 5. Remove eBay-related information
        // -----------------------------------------

        user.ebayUserId = null;
        user.ebayAccessToken = null;
        user.ebayRefreshToken = null;

        // Only use this if your User model actually
        // contains ebayEiasToken.
        user.ebayEiasToken = null;

        await user.save();

        // -----------------------------------------
        // 6. Log successful processing
        // -----------------------------------------

        console.log(
            `eBay account data removed for application user: ${user._id}`
        );

        return {
            success: true,
            message:
                "eBay account deletion notification processed successfully",
        };

    } catch (error) {
        console.error(
            "ebayDeletionNotificationService:",
            error
        );

        throw error;
    }
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

export { processEbayOrderNotification, getAllNotifications, handleEbayChallenge };

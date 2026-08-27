import EventNotificationSDK from 'event-notification-nodejs-sdk';
import { ebayNotificationConfig, environment } from '../../../config/ebayNotificationConfig.js';

const verifyEbaySignature = async (req, res, next) => {
  try {
    const responseCode = await EventNotificationSDK.process(
      req.body,
      req.headers['x-ebay-signature'],
      ebayNotificationConfig,
      environment
    );

    if (responseCode === 204) {
      return next();
    }

    if (responseCode === 412) {
      console.error('eBay signature mismatch', {
        payload: req.body,
        signature: req.headers['x-ebay-signature'],
      });
      return res.status(412).send();
    }

    return res.status(500).send();
  } catch (error) {
    console.error('eBay signature verification error:', error);
    return res.status(500).send();
  }
};

export default verifyEbaySignature;

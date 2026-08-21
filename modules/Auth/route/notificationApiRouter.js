import express from 'express';
import { authorizeAccessToken } from '../../../shared/authorizeAccessToken.js';
import { setupNotificationApiForOrderConfirmation } from '../services/ebayNotificationApiService.js';

const NotificationApiRouter = express.Router();

/**
 * POST /api/v1/ebay/notifications/setup
 * 
 * One-Shot Setup for ORDER_CONFIRMATION Notification API
 * 
 * Orchestrates the entire setup workflow:
 * 1. Create Notification API Destination
 * 2. Fetch available notification topics
 * 3. Find ORDER_CONFIRMATION topic
 * 4. Create subscription binding destination to ORDER_CONFIRMATION
 * 5. Return both destination and subscription details
 * 
 * Request body:
 * {
 *   "endpointUrl": "https://yourdomain.com/api/v1/ebay/order-confirmation",
 *   "verificationToken": "your-verification-token"
 * }
 * 
 * Response includes subscriptionId for testing and status checking.
 * Testing is a separate call (see POST /subscription/:subscriptionId/test).
 */
NotificationApiRouter.post('/ebay/notifications/setup', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    // const { endpointUrl, verificationToken } = req.body;
    
    const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;
    const endpointUrl = process.env.EBAY_API_ORDER_CONFIRM_URL
    if (!endpointUrl || !verificationToken) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'endpointUrl and verificationToken are required',
      });
    }

    const result = await setupNotificationApiForOrderConfirmation(
      userId,
      endpointUrl,
      verificationToken
    );

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in POST /setup:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to setup Notification API',
    });
  }
});

export { NotificationApiRouter };

import express from 'express';
import { authorizeAccessToken } from '../../../shared/authorizeAccessToken.js';
import {
  createNotificationDestination,
  getAvailableTopics,
  createNotificationSubscription,
  getSubscriptionStatus,
  testNotificationSubscription,
  getNotificationConfig,
  setupNotificationApiForOrderConfirmation,
} from '../services/ebayNotificationApiService.js';

const NotificationApiRouter = express.Router();

/**
 * POST /api/v1/ebay/notifications/destination
 * 
 * Create a Notification API Destination
 * This registers your webhook endpoint URL with eBay
 * 
 * Request body:
 * {
 *   "endpointUrl": "https://yourdomain.com/api/v1/ebay/order-confirmation",
 *   "verificationToken": "your-verification-token"
 * }
 */
NotificationApiRouter.post('/destination', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { endpointUrl, verificationToken } = req.body;

    if (!endpointUrl || !verificationToken) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'endpointUrl and verificationToken are required',
      });
    }

    const result = await createNotificationDestination(userId, endpointUrl, verificationToken);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in POST /destination:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to create destination',
    });
  }
});

/**
 * GET /api/v1/ebay/notifications/topics
 * 
 * Get Available Notification Topics from eBay
 * This returns all topics you can subscribe to (e.g., ORDER_CONFIRMATION, MARKETPLACE_ACCOUNT_DELETION)
 */
NotificationApiRouter.get('/topics', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;

    const result = await getAvailableTopics(userId);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in GET /topics:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to fetch topics',
    });
  }
});

/**
 * POST /api/v1/ebay/notifications/subscription
 * 
 * Create a Notification Subscription
 * This binds a destination to a specific topic
 * 
 * Request body:
 * {
 *   "destinationId": "the-destination-id-from-ebay",
 *   "topicId": "the-topic-id-from-ebay",
 *   "topicName": "ORDER_CONFIRMATION"
 * }
 */
NotificationApiRouter.post('/subscription', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { destinationId, topicId, topicName } = req.body;

    if (!destinationId || !topicId || !topicName) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'destinationId, topicId, and topicName are required',
      });
    }

    const result = await createNotificationSubscription(userId, destinationId, topicId, topicName);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in POST /subscription:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to create subscription',
    });
  }
});

/**
 * GET /api/v1/ebay/notifications/subscription
 * 
 * Get Current Notification Configuration
 * This returns the stored destination and subscription details
 */
NotificationApiRouter.get('/subscription', authorizeAccessToken, async (req, res) => {
  try {
    const result = await getNotificationConfig();

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in GET /subscription:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to fetch subscription',
    });
  }
});

/**
 * GET /api/v1/ebay/notifications/subscription/:subscriptionId/status
 * 
 * Get Subscription Status
 * This retrieves the current status of a specific subscription from eBay
 */
NotificationApiRouter.get('/subscription/:subscriptionId/status', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { subscriptionId } = req.params;

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'subscriptionId is required',
      });
    }

    const result = await getSubscriptionStatus(userId, subscriptionId);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in GET /subscription/:subscriptionId/status:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to fetch subscription status',
    });
  }
});

/**
 * POST /api/v1/ebay/notifications/subscription/:subscriptionId/test
 * 
 * Test Notification Subscription
 * This sends a test notification to verify the subscription works
 */
NotificationApiRouter.post('/subscription/:subscriptionId/test', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { subscriptionId } = req.params;

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'subscriptionId is required',
      });
    }

    const result = await testNotificationSubscription(userId, subscriptionId);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error('Error in POST /subscription/:subscriptionId/test:', error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Failed to test subscription',
    });
  }
});

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
NotificationApiRouter.post('/setup', authorizeAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { endpointUrl, verificationToken } = req.body;

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

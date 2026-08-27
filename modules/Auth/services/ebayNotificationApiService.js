import logger from '../../../utils/logger.js';
import { getValidAccessToken } from './ebayTokenService.js';
import EbayNotificationConfig from '../model/ebayNotificationConfigModel.js';

/**
 * Get the eBay API base URL based on environment
 */
const getEbayApiBaseUrl = () => {
  return process.env.EBAY_API_BASE_URL || 'https://api.ebay.com';
};

/**
 * Create a Notification API Destination
 * POST /commerce/notification/v1/destination
 *
 * This endpoint must be called first to register your webhook URL with eBay
 */
const createNotificationDestination = async (userId, endpointUrl, verificationToken) => {
  try {
    if (!endpointUrl) {
      throw new Error('endpointUrl is required');
    }

    if (!verificationToken) {
      throw new Error('verificationToken is required');
    }

    // Get valid eBay access token
    let accessToken;
    try {
      accessToken = await getValidAccessToken(userId);
    } catch (tokenErr) {
      return {
        success: false,
        status: 401,
        message: tokenErr.message || 'Failed to get valid eBay access token',
      };
    }

    const apiUrl = `${getEbayApiBaseUrl()}/commerce/notification/v1/destination`;

    logger.info('Creating eBay Notification API Destination', { endpointUrl });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinationUrl: endpointUrl,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      logger.error('Failed to create Notification API Destination', {
        status: response.status,
        error: responseData,
      });

      return {
        success: false,
        status: response.status,
        message: responseData.message || responseData.error_description || 'Failed to create destination',
        data: responseData,
      };
    }

    const { destinationId } = responseData;

    if (!destinationId) {
      throw new Error('eBay did not return a destinationId');
    }

    // Save destination config to MongoDB
    const config = await EbayNotificationConfig.findOneAndUpdate(
      { destinationUrl: endpointUrl },
      {
        destinationId,
        destinationUrl: endpointUrl,
        destinationStatus: 'ACTIVE',
        verificationToken,
        destinationCreatedAt: new Date(),
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    logger.info('Notification API Destination created successfully', { destinationId });

    return {
      success: true,
      status: 200,
      message: 'Notification API Destination created successfully',
      data: {
        destinationId,
        destinationUrl: endpointUrl,
        status: 'ACTIVE',
      },
    };
  } catch (error) {
    logger.error('Error creating Notification API Destination', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to create Notification API Destination',
    };
  }
};

/**
 * Get Available Notification Topics
 * GET /commerce/notification/v1/topic
 *
 * This endpoint returns all available notification topics
 */
const getAvailableTopics = async (userId) => {
  try {
    // Get valid eBay access token
    let accessToken;
    try {
      accessToken = await getValidAccessToken(userId);
    } catch (tokenErr) {
      return {
        success: false,
        status: 401,
        message: tokenErr.message || 'Failed to get valid eBay access token',
      };
    }

    const apiUrl = `${getEbayApiBaseUrl()}/commerce/notification/v1/topic`;

    logger.info('Fetching available Notification API topics');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      logger.error('Failed to fetch topics', {
        status: response.status,
        error: responseData,
      });

      return {
        success: false,
        status: response.status,
        message: responseData.message || responseData.error_description || 'Failed to fetch topics',
        data: responseData,
      };
    }

    logger.info('Available topics fetched successfully');

    return {
      success: true,
      status: 200,
      message: 'Available topics retrieved successfully',
      data: responseData,
    };
  } catch (error) {
    logger.error('Error fetching available topics', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to fetch available topics',
    };
  }
};

/**
 * Create a Notification Subscription
 * POST /commerce/notification/v1/subscription
 *
 * This binds a destinationId to a specific topic (e.g., ORDER_CONFIRMATION)
 */
const createNotificationSubscription = async (userId, destinationId, topicId, topicName) => {
  try {
    if (!destinationId) {
      throw new Error('destinationId is required');
    }

    if (!topicId) {
      throw new Error('topicId is required');
    }

    if (!topicName) {
      throw new Error('topicName is required');
    }

    // Get valid eBay access token
    let accessToken;
    try {
      accessToken = await getValidAccessToken(userId);
    } catch (tokenErr) {
      return {
        success: false,
        status: 401,
        message: tokenErr.message || 'Failed to get valid eBay access token',
      };
    }

    const apiUrl = `${getEbayApiBaseUrl()}/commerce/notification/v1/subscription`;

    logger.info('Creating Notification subscription', { destinationId, topicId });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinationId,
        topicId,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      logger.error('Failed to create subscription', {
        status: response.status,
        error: responseData,
      });

      return {
        success: false,
        status: response.status,
        message: responseData.message || responseData.error_description || 'Failed to create subscription',
        data: responseData,
      };
    }

    const { subscriptionId } = responseData;

    if (!subscriptionId) {
      throw new Error('eBay did not return a subscriptionId');
    }

    // Update config in MongoDB
    const config = await EbayNotificationConfig.findOneAndUpdate(
      { destinationId },
      {
        subscriptionId,
        topicId,
        topicName,
        subscriptionStatus: 'ACTIVE',
        subscriptionCreatedAt: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    logger.info('Notification subscription created successfully', { subscriptionId, topicId });

    return {
      success: true,
      status: 200,
      message: 'Notification subscription created successfully',
      data: {
        subscriptionId,
        destinationId,
        topicId,
        topicName,
        status: 'ACTIVE',
      },
    };
  } catch (error) {
    logger.error('Error creating subscription', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to create subscription',
    };
  }
};

/**
 * Get Subscription Status
 * GET /commerce/notification/v1/subscription/{subscriptionId}
 *
 * This retrieves the status of an existing subscription
 */
const getSubscriptionStatus = async (userId, subscriptionId) => {
  try {
    if (!subscriptionId) {
      throw new Error('subscriptionId is required');
    }

    // Get valid eBay access token
    let accessToken;
    try {
      accessToken = await getValidAccessToken(userId);
    } catch (tokenErr) {
      return {
        success: false,
        status: 401,
        message: tokenErr.message || 'Failed to get valid eBay access token',
      };
    }

    const apiUrl = `${getEbayApiBaseUrl()}/commerce/notification/v1/subscription/${subscriptionId}`;

    logger.info('Fetching subscription status', { subscriptionId });

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      logger.error('Failed to fetch subscription status', {
        status: response.status,
        error: responseData,
      });

      return {
        success: false,
        status: response.status,
        message: responseData.message || responseData.error_description || 'Failed to fetch subscription status',
        data: responseData,
      };
    }

    logger.info('Subscription status fetched successfully', { subscriptionId });

    return {
      success: true,
      status: 200,
      message: 'Subscription status retrieved successfully',
      data: responseData,
    };
  } catch (error) {
    logger.error('Error fetching subscription status', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to fetch subscription status',
    };
  }
};

/**
 * Test Notification Subscription
 * POST /commerce/notification/v1/subscription/{subscriptionId}/test
 *
 * This sends a test notification to verify the subscription works
 */
const testNotificationSubscription = async (userId, subscriptionId) => {
  try {
    if (!subscriptionId) {
      throw new Error('subscriptionId is required');
    }

    // Get valid eBay access token
    let accessToken;
    try {
      accessToken = await getValidAccessToken(userId);
    } catch (tokenErr) {
      return {
        success: false,
        status: 401,
        message: tokenErr.message || 'Failed to get valid eBay access token',
      };
    }

    const apiUrl = `${getEbayApiBaseUrl()}/commerce/notification/v1/subscription/${subscriptionId}/test`;

    logger.info('Testing notification subscription', { subscriptionId });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json().catch(() => ({}));

    // eBay returns 204 No Content on success, but we can also get 200 OK
    const isSuccess = response.ok;

    if (!isSuccess) {
      logger.error('Failed to test subscription', {
        status: response.status,
        error: responseData,
      });

      // Update config with test failure
      await EbayNotificationConfig.findOneAndUpdate(
        { subscriptionId },
        {
          lastTestDate: new Date(),
          lastTestStatus: 'FAILED',
          lastTestMessage: responseData.message || 'Test failed',
        }
      );

      return {
        success: false,
        status: response.status,
        message: responseData.message || responseData.error_description || 'Failed to test subscription',
        data: responseData,
      };
    }

    logger.info('Subscription test succeeded', { subscriptionId });

    // Update config with test success
    await EbayNotificationConfig.findOneAndUpdate(
      { subscriptionId },
      {
        lastTestDate: new Date(),
        lastTestStatus: 'SUCCESS',
        lastTestMessage: 'Test notification sent successfully',
      }
    );

    return {
      success: true,
      status: 200,
      message: 'Test notification sent successfully',
      data: { testStatus: 'SUCCESS' },
    };
  } catch (error) {
    logger.error('Error testing subscription', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to test subscription',
    };
  }
};

/**
 * Get Current Notification Configuration
 * 
 * Retrieves the stored destination and subscription details from MongoDB
 */
const getNotificationConfig = async () => {
  try {
    const config = await EbayNotificationConfig.findOne().sort({ createdAt: -1 });

    if (!config) {
      return {
        success: false,
        status: 404,
        message: 'No notification configuration found',
      };
    }

    return {
      success: true,
      status: 200,
      message: 'Notification configuration retrieved successfully',
      data: config,
    };
  } catch (error) {
    logger.error('Error retrieving notification config', { message: error.message });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to retrieve notification configuration',
    };
  }
};

/**
 * Setup Notification API for ORDER_CONFIRMATION
 * 
 * Orchestrates the entire workflow:
 * 1. Create Notification API Destination
 * 2. Get available topics from eBay
 * 3. Find the ORDER_CONFIRMATION topic
 * 4. Create subscription binding destination to ORDER_CONFIRMATION
 * 5. Return both destination and subscription details
 * 
 * This is a convenience endpoint for one-shot setup
 */
const setupNotificationApiForOrderConfirmation = async (
  userId,
  endpointUrl,
  verificationToken
) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }

    if (!endpointUrl) {
      throw new Error('endpointUrl is required');
    }

    if (!verificationToken) {
      throw new Error('verificationToken is required');
    }

    logger.info('Starting ORDER_CONFIRMATION Notification API setup', { endpointUrl });

    // Step 1: Create Notification API Destination
    const destinationResult = await createNotificationDestination(
      userId,
      endpointUrl,
      verificationToken
    );

    if (!destinationResult.success) {
      logger.error('Failed to create destination', destinationResult);
      return destinationResult;
    }

    const destinationId = destinationResult.data.destinationId;
    logger.info('Destination created successfully', { destinationId });

    // Step 2: Get available topics
    const topicsResult = await getAvailableTopics(userId);

    if (!topicsResult.success) {
      logger.error('Failed to fetch topics', topicsResult);
      return topicsResult;
    }

    const topics = topicsResult.data?.topics || [];
    logger.info('Available topics fetched', { topicCount: topics.length });

    // Step 3: Find ORDER_CONFIRMATION topic
    const orderConfirmationTopic = topics.find(
      (topic) => topic.topicName === 'ORDER_CONFIRMATION'
    );

    if (!orderConfirmationTopic) {
      logger.error('ORDER_CONFIRMATION topic not found', { availableTopics: topics.map((t) => t.topicName) });

      return {
        success: false,
        status: 404,
        message: 'ORDER_CONFIRMATION topic not found in available topics',
        data: {
          availableTopics: topics.map((t) => ({
            topicId: t.topicId,
            topicName: t.topicName,
          })),
        },
      };
    }

    logger.info('ORDER_CONFIRMATION topic found', {
      topicId: orderConfirmationTopic.topicId,
    });

    // Step 4: Create subscription
    const subscriptionResult = await createNotificationSubscription(
      userId,
      destinationId,
      orderConfirmationTopic.topicId,
      'ORDER_CONFIRMATION'
    );

    if (!subscriptionResult.success) {
      logger.error('Failed to create subscription', subscriptionResult);
      return subscriptionResult;
    }

    const subscriptionId = subscriptionResult.data.subscriptionId;
    logger.info('Subscription created successfully', { subscriptionId });

    // Step 5: Return both destination and subscription details
    return {
      success: true,
      status: 200,
      message: 'ORDER_CONFIRMATION Notification API setup completed successfully',
      data: {
        destination: {
          destinationId,
          destinationUrl: endpointUrl,
          status: 'ACTIVE',
        },
        subscription: {
          subscriptionId,
          destinationId,
          topicId: orderConfirmationTopic.topicId,
          topicName: 'ORDER_CONFIRMATION',
          status: 'ACTIVE',
        },
        nextSteps: {
          testSubscription: `POST /api/v1/ebay/notifications/subscription/${subscriptionId}/test`,
          checkStatus: `GET /api/v1/ebay/notifications/subscription/${subscriptionId}/status`,
        },
      },
    };
  } catch (error) {
    logger.error('Error setting up ORDER_CONFIRMATION Notification API', {
      message: error.message,
    });

    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to setup ORDER_CONFIRMATION Notification API',
    };
  }
};

export {
  createNotificationDestination,
  getAvailableTopics,
  createNotificationSubscription,
  getSubscriptionStatus,
  testNotificationSubscription,
  getNotificationConfig,
  setupNotificationApiForOrderConfirmation,
};

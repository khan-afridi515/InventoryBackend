const buildOrderConfirmationResponse = (payload) => ({
  success: true,
  status: 200,
  message: 'Order confirmation notification processed successfully',
  data: payload,
});

const processOrderConfirmationNotification = (payload = {}, headers = {}) => {
  try {
    const normalizedPayload = payload?.payload || payload;
    const metadata = normalizedPayload?.metadata;
    const notification = normalizedPayload?.notification;
    const order = notification?.data?.order;

    if (!metadata?.topic || metadata.topic !== 'ORDER_CONFIRMATION') {
      return {
        success: false,
        status: 400,
        message: 'Notification topic is required and must be ORDER_CONFIRMATION',
      };
    }

    if (!notification?.notificationId || !notification?.data?.order?.orderId) {
      return {
        success: false,
        status: 400,
        message: 'notificationId and orderId are required',
      };
    }

    if (!order?.orderLineItems || !Array.isArray(order.orderLineItems)) {
      return {
        success: false,
        status: 400,
        message: 'orderLineItems array is required',
      };
    }

    const signature = headers?.['x-ebay-signature'] || headers?.['X-EBAY-SIGNATURE'];

    return buildOrderConfirmationResponse({
      metadata,
      notification,
      order,
      signature,
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message || 'Failed to process order confirmation notification',
    };
  }
};

export { buildOrderConfirmationResponse, processOrderConfirmationNotification };

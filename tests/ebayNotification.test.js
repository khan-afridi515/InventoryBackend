import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrderConfirmationResponse, processOrderConfirmationNotification } from '../modules/Auth/services/ebayNotificationService.js';

test('processOrderConfirmationNotification accepts a valid eBay order confirmation payload', () => {
  const payload = {
    metadata: {
      topic: 'ORDER_CONFIRMATION',
      schemaVersion: '1.0.0',
      deprecated: false,
    },
    notification: {
      notificationId: 'notif-001',
      eventDate: '2026-07-23T10:00:00Z',
      publishDate: '2026-07-23T10:00:01Z',
      publishAttemptCount: 1,
      data: {
        order: {
          orderId: 'order-123',
          orderLineItems: [
            {
              orderLineItemId: 'line-1',
              listingId: 'listing-456',
              quantity: 2,
            },
          ],
        },
      },
    },
  };

  const result = processOrderConfirmationNotification(payload, { 'x-ebay-signature': 'demo-signature' });

  assert.equal(result.success, true);
  assert.equal(result.status, 200);
  assert.equal(result.data.order.orderId, 'order-123');
  assert.equal(result.data.order.orderLineItems[0].quantity, 2);
});

test('buildOrderConfirmationResponse rejects malformed payloads', () => {
  const result = processOrderConfirmationNotification({ notification: {} });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.message, /required/i);
});

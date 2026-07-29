import test from 'node:test';
import assert from 'node:assert/strict';
import { ebayOrderConfirmationChallengeService, ebayOrderConfirmationNotificationService } from '../modules/Auth/services/services.js';

test('auth services expose eBay confirmation handlers', async () => {
  const challengeResult = await ebayOrderConfirmationChallengeService({ query: { challenge_code: 'demo-code' } });
  assert.equal(challengeResult.success, true);
  assert.equal(challengeResult.status, 200);
  assert.match(challengeResult.challengeResponse, /^[a-f0-9]{64}$/i);

  const notificationResult = await ebayOrderConfirmationNotificationService({ body: { metadata: { topic: 'ORDER_CONFIRMATION' }, notification: { notificationId: 'notif-1', data: { order: { orderId: 'order-1', orderLineItems: [] } } } } });
  assert.equal(notificationResult.success, true);
  assert.equal(notificationResult.status, 200);
});

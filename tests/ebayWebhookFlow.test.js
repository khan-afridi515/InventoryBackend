import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEbayChallengeResponse } from '../modules/Auth/services/ebayOrderService.js';
import { updateInventoryFromOrder } from '../modules/Product/Service/inventoryService.js';

test('buildEbayChallengeResponse returns a deterministic signed response', () => {
  const response = buildEbayChallengeResponse('challenge-123', 'verify-token');

  assert.equal(typeof response, 'string');
  assert.match(response, /^[a-f0-9]{64}$/i);
});

test('updateInventoryFromOrder decreases stock for each ordered line item', async () => {
  const products = [
    { sku: 'SKU-1', quantity: 10 },
    { sku: 'SKU-2', quantity: 5 },
  ];

  const orderLineItems = [
    { sku: 'SKU-1', quantity: 2 },
    { sku: 'SKU-2', quantity: 1 },
  ];

  const result = await updateInventoryFromOrder(products, orderLineItems);

  assert.equal(result.updatedCount, 2);
  assert.deepEqual(result.inventoryUpdates, [
    { productId: undefined, sku: 'SKU-1', previousQuantity: 10, newQuantity: 8, matchedBy: 'sku' },
    { productId: undefined, sku: 'SKU-2', previousQuantity: 5, newQuantity: 4, matchedBy: 'sku' },
  ]);
});

test('updateInventoryFromOrder can match products by productId', async () => {
  const products = [
    { productId: 'prod-001', quantity: 10 },
  ];

  const orderLineItems = [
    { productId: 'prod-001', quantity: 2 },
  ];

  const result = await updateInventoryFromOrder(products, orderLineItems);

  assert.equal(result.updatedCount, 1);
  assert.deepEqual(result.inventoryUpdates, [
    { productId: 'prod-001', sku: undefined, previousQuantity: 10, newQuantity: 8, matchedBy: 'productId' },
  ]);
});

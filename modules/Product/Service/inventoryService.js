const updateInventoryFromOrder = async (products = [], orderLineItems = []) => {
  const inventoryUpdates = [];
  let updatedCount = 0;

  for (const lineItem of orderLineItems || []) {
    const product = products.find((item) => {
      const productIdValue = item.productId || item._id?.toString();
      const lookupProductId = lineItem.productId || lineItem.productIdentifier;
      const lookupSku = lineItem.sku !== undefined && lineItem.sku !== null ? String(lineItem.sku).trim() : '';
      const itemSku = item.sku !== undefined && item.sku !== null ? String(item.sku).trim() : '';
      const lookupName = lineItem.productName || lineItem.name || lineItem.title;

      const normalizedProductId = productIdValue !== undefined && productIdValue !== null ? String(productIdValue).trim() : '';
      const normalizedLookupProductId = lookupProductId !== undefined && lookupProductId !== null ? String(lookupProductId).trim() : '';

      return (normalizedLookupProductId && normalizedProductId && normalizedProductId === normalizedLookupProductId)
        || (lookupSku && itemSku && itemSku === lookupSku)
        || (lookupName && item.productName && item.productName.toLowerCase() === lookupName.toLowerCase());
    });

    if (!product) {
      continue;
    }

    const orderedQuantity = Number(lineItem.quantity || 0);
    const previousQuantity = Number(product.quantity || 0);
    const newQuantity = Math.max(0, previousQuantity - orderedQuantity);

    inventoryUpdates.push({
      productId: product.productId || product._id?.toString(),
      sku: product.sku,
      previousQuantity,
      newQuantity,
      matchedBy: lineItem.productId ? 'productId' : (lineItem.sku ? 'sku' : 'productName'),
    });
    updatedCount += 1;
  }

  return { updatedCount, inventoryUpdates };
};

export { updateInventoryFromOrder };

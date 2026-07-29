const updateInventoryFromOrder = async (products = [], orderLineItems = []) => {
  const inventoryUpdates = [];
  let updatedCount = 0;

  for (const lineItem of orderLineItems || []) {
    const product = products.find((item) => {
      const productIdValue = item.productId || item._id?.toString();
      const lookupProductId = lineItem.productId || lineItem.productIdentifier;
      const lookupSku = lineItem.sku;
      const lookupName = lineItem.productName || lineItem.name || lineItem.title;

      return (lookupProductId && productIdValue && productIdValue.toString() === lookupProductId.toString())
        || (lookupSku && item.sku && item.sku === lookupSku)
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

import mongoose from 'mongoose';

const productNotificationSchema = new mongoose.Schema({
  notificationId: { type: String, required: true, unique: true, index: true },
  orderId: { type: String, required: true, index: true },
  buyer: { type: String, default: '' },
  seller: { type: String, default: '' },
  productTitle: { type: String, default: '' },
  sku: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  eventDate: { type: Date, default: null },
  receivedAt: { type: Date, default: Date.now },
  processedAt: { type: Date, default: null },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ProductNotification', productNotificationSchema);

import mongoose from 'mongoose';

const ebayNotificationConfigSchema = new mongoose.Schema({
  // Destination details
  destinationId: { type: String, required: true, unique: true, index: true },
  destinationUrl: { type: String, required: true },
  destinationStatus: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },

  // Subscription details
  subscriptionId: { type: String, unique: true, sparse: true, index: true },
  topicId: { type: String, required: true },
  topicName: { type: String, required: true }, // e.g., 'ORDER_CONFIRMATION'
  subscriptionStatus: { type: String, enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], default: 'ACTIVE' },

  // Metadata
  verificationToken: { type: String, required: true },
  lastTestDate: { type: Date, default: null },
  lastTestStatus: { type: String, enum: ['SUCCESS', 'FAILED'], default: null },
  lastTestMessage: { type: String, default: null },

  // Timestamps
  destinationCreatedAt: { type: Date, default: Date.now },
  subscriptionCreatedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('EbayNotificationConfig', ebayNotificationConfigSchema);

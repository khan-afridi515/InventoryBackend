import mongoose from 'mongoose';

const ebayTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  tokenType: { type: String, default: 'Bearer' },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('EbayToken', ebayTokenSchema);

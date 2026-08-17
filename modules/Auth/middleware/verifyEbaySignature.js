import { jwtVerify } from 'jose';
import { fetchEbayPublicKey } from '../../../utils/ebayKeyCache.js';

// Step 1A: Verify the incoming webhook signature before processing any notification
const verifyEbaySignature = async (req, res, next) => {
  try {
    const signature = req.headers['x-ebay-signature'];
    const keyId = req.headers['x-ebay-signature-key-id'];

    if (!signature || !keyId) {
      return res.status(403).json({ success: false, status: 403, message: 'Missing eBay signature headers' });
    }

    const publicKey = await fetchEbayPublicKey(keyId);
    const payload = JSON.stringify(req.body || {});

    await jwtVerify(payload, publicKey);

    next();
  } catch (error) {
    return res.status(403).json({ success: false, status: 403, message: error.message || 'Signature verification failed' });
  }
};

export default verifyEbaySignature;

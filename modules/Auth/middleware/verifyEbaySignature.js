import crypto from 'crypto';

// Step 1A: Verify the incoming webhook signature before processing any notification
const verifyEbaySignature = (req, res, next) => {
  try {
    const signature = req.headers['x-ebay-signature'];
    const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;

    if (!verificationToken) {
      return res.status(500).json({ success: false, status: 500, message: 'eBay verification token is not configured' });
    }

    if (!signature) {
      return res.status(403).json({ success: false, status: 403, message: 'Missing eBay signature' });
    }

    const payload = JSON.stringify(req.body || {});
    const expectedSignature = crypto.createHash('sha256').update(`${payload}${verificationToken}`).digest('hex');

    if (signature !== expectedSignature) {
      return res.status(403).json({ success: false, status: 403, message: 'Invalid eBay signature' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: error.message || 'Signature verification failed' });
  }
};

export default verifyEbaySignature;

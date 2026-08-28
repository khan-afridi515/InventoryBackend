import { verifyEbaySignaturePayload } from './ebaySignatureVerifier.js';

const verifyEbaySignature = async (req, res, next) => {
  try {
    const isValid = await verifyEbaySignaturePayload(
      req.body,
      req.headers['x-ebay-signature'],
      req.rawBody
    );

    if (isValid) {
      return next();
    }

    console.error('eBay signature mismatch', {
      topic: req.body?.metadata?.topic,
      keyId: (() => {
        try {
          return JSON.parse(Buffer.from(req.headers['x-ebay-signature'], 'base64').toString('utf8')).kid;
        } catch {
          return undefined;
        }
      })(),
    });
    return res.status(412).send();
  } catch (error) {
    console.error('eBay signature verification error:', error);
    return res.status(412).send();
  }
};

export default verifyEbaySignature;

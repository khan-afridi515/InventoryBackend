import crypto from 'crypto';

const buildEbayChallengeResponse = (challengeCode, verificationToken) => {
  if (!challengeCode || !verificationToken) {
    throw new Error('challengeCode and verificationToken are required');
  }

  return crypto.createHash('sha256').update(`${challengeCode}${verificationToken}`).digest('hex');
};

const fetchEbayOrderDetails = async (orderId, accessToken) => {
  if (!orderId || !accessToken) {
    throw new Error('orderId and accessToken are required');
  }

  const response = await fetch(`https://api.sandbox.ebay.com/sell/fulfillment/v1/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.error_description || responseData.error || 'Failed to fetch eBay order details');
  }

  return responseData;
};

export { buildEbayChallengeResponse, fetchEbayOrderDetails };

import EbayToken from '../model/ebayTokenModel.js';

const getValidAccessToken = async (userId) => {
  const tokenRecord = await EbayToken.findOne({ userId }).sort({ createdAt: -1 });

  if (!tokenRecord) {
    throw new Error('No eBay token found');
  }

  // Check if token expires in more than 5 minutes (300,000 ms)
  if (tokenRecord.expiresAt && (new Date(tokenRecord.expiresAt).getTime() - 300000) > Date.now()) {
    return tokenRecord.accessToken;
  }

  return refreshAccessToken(userId);
};

const refreshAccessToken = async (userId) => {
  const tokenRecord = await EbayToken.findOne({ userId }).sort({ createdAt: -1 });

  if (!tokenRecord) {
    throw new Error('No eBay token found for refresh');
  }

  const response = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: tokenRecord.refreshToken,
    }),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 400 && responseData.error === 'invalid_grant') {
      throw new Error('invalid_grant: eBay refresh token expired. User must re-authenticate.');
    }
    throw new Error(responseData.error_description || responseData.error || 'Failed to refresh eBay access token');
  }

  tokenRecord.accessToken = responseData.access_token;
  tokenRecord.refreshToken = responseData.refresh_token || tokenRecord.refreshToken;
  tokenRecord.expiresAt = new Date(Date.now() + (responseData.expires_in || 3600) * 1000);
  tokenRecord.updatedAt = new Date();
  await tokenRecord.save();

  return tokenRecord.accessToken;
};

export { getValidAccessToken, refreshAccessToken };

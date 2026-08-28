import crypto from 'node:crypto';
import { ebayNotificationConfig, environment } from '../../../config/ebayNotificationConfig.js';

const publicKeyCache = new Map();

const getAppToken = async (config) => {
  const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
  const tokenResponse = await fetch(`https://${config.baseUrl}/identity/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope',
  });

  if (!tokenResponse.ok) {
    throw new Error(`eBay application token request failed with ${tokenResponse.status}`);
  }

  const token = await tokenResponse.json();
  return token.access_token;
};

const getPublicKey = async (keyId, config) => {
  if (publicKeyCache.has(keyId)) {
    return publicKeyCache.get(keyId);
  }

  const token = await getAppToken(config);
  const keyResponse = await fetch(`https://${config.baseUrl}/commerce/notification/v1/public_key/${encodeURIComponent(keyId)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!keyResponse.ok) {
    throw new Error(`eBay public key request failed with ${keyResponse.status}`);
  }

  const keyData = await keyResponse.json();
  const publicKey = keyData.key.replace(
    '-----BEGIN PUBLIC KEY-----',
    '-----BEGIN PUBLIC KEY-----\n'
  ).replace(
    '-----END PUBLIC KEY-----',
    '\n-----END PUBLIC KEY-----'
  );

  publicKeyCache.set(keyId, publicKey);
  return publicKey;
};

const verifyEbaySignaturePayload = async (payload, signatureHeader, rawBody) => {
  if (!signatureHeader) {
    throw new Error('Missing X-EBAY-SIGNATURE header');
  }

  const signatureData = JSON.parse(Buffer.from(signatureHeader, 'base64').toString('utf8'));
  const publicKey = await getPublicKey(
    signatureData.kid,
    ebayNotificationConfig[environment]
  );

  return crypto.verify(
    'sha256',
    rawBody || Buffer.from(JSON.stringify(payload)),
    publicKey,
    Buffer.from(signatureData.signature, 'base64')
  );
};

export { verifyEbaySignaturePayload };
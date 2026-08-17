import axios from 'axios';
import { importJWK, jwtVerify } from 'jose';

const keyCache = new Map(); // keyId -> { key, fetchedAt }
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const fetchEbayPublicKey = async (keyId) => {
  const cached = keyCache.get(keyId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.key;
  }

  const { data } = await axios.get(
    `https://api.ebay.com/commerce/notification/v1/public_key/${keyId}`
  );
  // data contains a JWK - import it
  const key = await importJWK(data, data.alg || 'ES256');
  keyCache.set(keyId, { key, fetchedAt: Date.now() });
  return key;
};

export { fetchEbayPublicKey };
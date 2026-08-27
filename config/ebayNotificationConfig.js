const configuredBaseUrl = process.env.EBAY_API_BASE_URL || "https://api.ebay.com";
const baseUrl = configuredBaseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
const environment = process.env.EBAY_ENVIRONMENT || "PRODUCTION";

const environmentConfig = {
    clientId: process.env.EBAY_CLIENT_ID,
    clientSecret: process.env.EBAY_CLIENT_SECRET,
    devId: process.env.EBAY_DEV_ID,
    redirectUri: process.env.RU_NAME,
    baseUrl,
};

const ebayNotificationConfig = {
    SANDBOX: {
        ...environmentConfig,
        baseUrl: environment === "SANDBOX" ? baseUrl : "api.sandbox.ebay.com",
    },
    PRODUCTION: {
        ...environmentConfig,
        baseUrl: environment === "PRODUCTION" ? baseUrl : "api.ebay.com",
    },
    endpoint: process.env.EBAY_NOTIFICATION_ENDPOINT_URL,
    verificationToken: process.env.EBAY_VERIFICATION_TOKEN,
};

export { ebayNotificationConfig, environment };

import { deleteUserOTP, emailVerifyRepository, getUserById, markUserAsVerified, otpVerifyRepository, saveRefreshToken, updateNewPasswordRepository, userLoginRepository, userRegistrationRepository } from "../Repository/repository.js";
import { generatePasswordHash } from "../utills/generateHashedPassword.js";
import { generateJWTAccessToken, generateJWTRefreshToken } from "../utills/generateJWT.js";
import { issueAndSendOTP } from "../utills/issueOTP.js";
import jwtVerify from "../utills/jwtVerify.js";
import { issueToken } from "../utills/otpResetToken.js";
import passwordHash from "../utills/passworHash.js";
import verifyPasswordAndHash from "../utills/varifyPasswordandHash.js";
import { emailValidation, otpVerificationValidation, userLoginValidation, userResetPasswordValidation } from "../validation/validate.js";
import crypto from "crypto";
import EbayOrderNotification from "../model/ebayOrderNotificationModel.js";




const sanitizedUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
});

const OTP_PURPOSES = {
    EMAIL_VERIFICATION: "email_verification",
    FORGOT_PASSWORD: "forgot_password",
};

const RESET_TOKEN_PURPOSE = "password_reset";

const ebayTokenService = async (bodyData = {}) => {
    try {
        const { code } = bodyData;

        const ebayClientId = process.env.EBAY_CLIENT_ID;
        const ebayClientSecret = process.env.EBAY_CLIENT_SECRET;
        const redirectUri = process.env.RU_NAME;

        console.log("All comming data", code, ebayClientId, ebayClientSecret, redirectUri);

        if (!code) {
            return {
                success: false,
                status: 400,
                message: "code is required",
            };
        }

        if (!redirectUri) {
            return {
                success: false,
                status: 400,
                message: "ru_Name must be configured in environment",
            };
        }

        if (!ebayClientId || !ebayClientSecret) {
            return {
                success: false,
                status: 400,
                message: "EBAY_CLIENT_ID and EBAY_CLIENT_SECRET must be configured",
            };
        }

        const authorizationHeader = Buffer.from(`${ebayClientId}:${ebayClientSecret}`).toString("base64");

        // const response = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
        const response = await fetch("https://api.sandbox.ebay.com/identity/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authorizationHeader}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }),
        });

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                message: responseData.error_description || responseData.error || "Failed to exchange authorization code",
                data: responseData,
            };
        }

        return {
            success: true,
            status: 200,
            message: "Authorization code exchanged successfully",
            data: responseData,
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to exchange authorization code",
        };
    }
};

const ebayFulfillmentOrdersService = async (req) => {
    try {
        const accessToken = req?.query?.accessToken || req?.body?.accessToken || req?.headers?.authorization?.replace(/^Bearer\s+/i, "");
        const { limit, offset, order_ids } = req?.query || {};

        if (!accessToken) {
            return {
                success: false,
                status: 400,
                message: "accessToken is required. Provide it as a query param, body field, or Authorization header.",
            };
        }

        // const baseUrl = process.env.EBAY_API_BASE_URL || "https://api.ebay.com";
        const baseUrl = "https://api.sandbox.ebay.com"
        const params = new URLSearchParams();

        if (limit) params.set("limit", limit);
        if (offset) params.set("offset", offset);
        if (order_ids) params.set("order_ids", order_ids);

        const url = `${baseUrl}/sell/fulfillment/v1/order${params.toString() ? `?${params.toString()}` : ""}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                message: responseData.error_description || responseData.error || "Failed to fetch eBay fulfillment orders",
                data: responseData,
            };
        }

        return {
            success: true,
            status: 200,
            message: "eBay fulfillment orders fetched successfully",
            data: responseData,
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to fetch eBay fulfillment orders",
        };
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// eBay Notification Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Verifies the X-EBAY-SIGNATURE header sent by eBay on every webhook POST.
 *
 * eBay signs the raw request body with HMAC-SHA256 using your
 * EBAY_VERIFICATION_TOKEN (configured in the eBay developer portal under
 * "Notification API → Destinations"). The resulting digest is base64-encoded
 * and compared against the incoming header value.
 *
 * @param {string} rawBody   - The raw (unparsed) request body string.
 * @param {string} signature - The value of the X-EBAY-SIGNATURE header.
 * @returns {boolean}
 */
const verifyEbaySignature = (rawBody, signature) => {
    try {
        const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;

        // If no token is configured, skip verification in dev (warn loudly)
        if (!verificationToken) {
            console.warn(
                "[eBay Webhook] ⚠️  EBAY_VERIFICATION_TOKEN is not set. " +
                "Signature verification is DISABLED. Set this env variable in production!"
            );
            return true;
        }

        if (!signature) {
            console.warn("[eBay Webhook] Missing X-EBAY-SIGNATURE header.");
            return false;
        }

        const expectedSignature = crypto
            .createHmac("sha256", verificationToken)
            .update(rawBody, "utf8")
            .digest("base64");

        // Constant-time comparison to prevent timing attacks
        return crypto.timingSafeEqual(
            Buffer.from(expectedSignature, "base64"),
            Buffer.from(signature, "base64")
        );
    } catch (err) {
        console.error("[eBay Webhook] Signature verification error:", err.message);
        return false;
    }
};

/**
 * Validates and extracts the ORDER_CONFIRMATION notification payload.
 * Conforms to the AsyncAPI 2.0.0 spec at version 1.0.0.
 *
 * @param {object} body - Parsed JSON body from eBay.
 * @returns {{ success: boolean, data?: object, error?: string }}
 */
const processOrderConfirmationNotification = (body) => {
    const { metadata, notification } = body;

    // ── Validate metadata ────────────────────────────────────────────────────
    if (!metadata || typeof metadata !== "object") {
        return { success: false, error: "Missing or invalid 'metadata' field." };
    }

    if (!metadata.topic) {
        return { success: false, error: "metadata.topic is required." };
    }

    // ── Validate notification envelope ───────────────────────────────────────
    if (!notification || typeof notification !== "object") {
        return { success: false, error: "Missing or invalid 'notification' field." };
    }

    if (!notification.notificationId) {
        return { success: false, error: "notification.notificationId is required." };
    }

    // ── Validate order data ──────────────────────────────────────────────────
    const orderData = notification?.data;
    const order = orderData?.order;

    if (!order || typeof order !== "object") {
        return { success: false, error: "notification.data.order is required." };
    }

    if (!order.orderId) {
        return { success: false, error: "order.orderId is required." };
    }

    if (!Array.isArray(order.orderLineItems) || order.orderLineItems.length === 0) {
        return { success: false, error: "order.orderLineItems must be a non-empty array." };
    }

    return {
        success: true,
        data: {
            metadata,
            notification,
            order,
        },
    };
};

/**
 * Main service for the POST /ebay/order-confirmation webhook.
 *
 * Flow:
 *  1. Verify X-EBAY-SIGNATURE using HMAC-SHA256.
 *  2. Validate the payload against the ORDER_CONFIRMATION spec.
 *  3. Guard against duplicate notifications (idempotency via notificationId).
 *  4. Persist the notification to MongoDB.
 *  5. Return 200 OK so eBay marks the delivery as successful.
 *
 * NOTE: eBay expects a 200 response within a few seconds. Heavy downstream
 * processing (email alerts, stock updates, etc.) should be queued asynchronously.
 */
const ebayOrderConfirmationNotificationService = async (req) => {
    try {
        const body    = req?.body || {};
        const headers = req?.headers || {};

        // ── 1. Signature verification ────────────────────────────────────────
        // Express parses the JSON body before this runs, so we reconstruct
        // the raw body from the parsed object for HMAC comparison.
        // To use the truly raw bytes, configure express.raw() on this route
        // and read req.rawBody (see router notes).
        const rawBody          = JSON.stringify(body);
        const incomingSignature = headers["x-ebay-signature"] || "";
        const isSignatureValid = verifyEbaySignature(rawBody, incomingSignature);

        if (!isSignatureValid) {
            console.warn("[eBay Webhook] ❌ Invalid signature — request rejected.");
            return {
                success: false,
                status: 403,
                message: "Invalid X-EBAY-SIGNATURE. Request could not be authenticated.",
            };
        }

        // ── 2. Payload validation ────────────────────────────────────────────
        const validation = processOrderConfirmationNotification(body);

        if (!validation.success) {
            console.warn("[eBay Webhook] ❌ Payload validation failed:", validation.error);
            return {
                success: false,
                status: 400,
                message: `Payload validation failed: ${validation.error}`,
            };
        }

        const { metadata, notification, order } = validation.data;

        // ── 3. Idempotency guard ─────────────────────────────────────────────
        const existingNotification = await EbayOrderNotification.findOne({
            notificationId: notification.notificationId,
        });

        if (existingNotification) {
            console.info(
                `[eBay Webhook] ⚠️  Duplicate notification ignored: ${notification.notificationId}`
            );
            return {
                success: true,
                status: 200,
                message: "Notification already processed (duplicate ignored).",
                data: { notificationId: notification.notificationId, duplicate: true },
            };
        }

        // ── 4. Persist to MongoDB ────────────────────────────────────────────
        const savedNotification = await EbayOrderNotification.create({
            // metadata
            topic:         metadata.topic,
            schemaVersion: metadata.schemaVersion,
            deprecated:    metadata.deprecated ?? false,

            // notification envelope
            notificationId:      notification.notificationId,
            eventDate:           notification.eventDate,
            publishDate:         notification.publishDate,
            publishAttemptCount: notification.publishAttemptCount ?? 1,

            // order data
            orderId:        order.orderId,
            orderLineItems: order.orderLineItems,

            // housekeeping
            rawPayload:          body,
            ebaySignatureHeader: incomingSignature,
            signatureVerified:   isSignatureValid,
        });

        console.info(
            `[eBay Webhook] ✅ ORDER_CONFIRMATION saved — orderId: ${order.orderId}, ` +
            `notificationId: ${notification.notificationId}`
        );

        // ── 5. Return success ────────────────────────────────────────────────
        // eBay marks delivery successful on any 2xx. Return minimal data.
        return {
            success: true,
            status: 200,
            message: "ORDER_CONFIRMATION notification received and recorded.",
            data: {
                notificationId: savedNotification.notificationId,
                orderId:        savedNotification.orderId,
                lineItemCount:  savedNotification.orderLineItems.length,
                savedAt:        savedNotification.createdAt,
            },
        };
    } catch (error) {
        console.error("[eBay Webhook] ❌ Unexpected error:", error);
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to process order confirmation notification.",
        };
    }
};

/**
 * Handles eBay's endpoint-verification GET challenge.
 *
 * When you register a destination in the eBay Notification API, eBay sends a
 * GET request to your webhook URL with a `challenge_code` query parameter.
 * You must respond with:
 *   { "challengeResponse": SHA256(challengeCode + verificationToken + endpoint) }
 *
 * @param {object} req - Express request object.
 * @returns {{ success: boolean, status: number, challengeResponse?: string, message?: string }}
 */
const ebayOrderConfirmationChallengeService = async (req) => {
    try {
        const challengeCode = req?.query?.challenge_code;

        if (!challengeCode) {
            return {
                success: false,
                status: 400,
                message: "Missing challenge_code query parameter.",
            };
        }

        const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;
        const endpointUrl       = process.env.EBAY_NOTIFICATION_ENDPOINT_URL;

        if (!verificationToken || !endpointUrl) {
            console.error(
                "[eBay Challenge] EBAY_VERIFICATION_TOKEN or EBAY_NOTIFICATION_ENDPOINT_URL " +
                "is not configured in .env"
            );
            return {
                success: false,
                status: 500,
                message: "Webhook endpoint is not properly configured on the server.",
            };
        }

        // eBay challenge hash: SHA256(challengeCode + verificationToken + endpointUrl)
        const challengeResponse = crypto
            .createHash("sha256")
            .update(challengeCode + verificationToken + endpointUrl)
            .digest("hex");

        console.info(`[eBay Challenge] ✅ Challenge accepted — code: ${challengeCode}`);

        return {
            success: true,
            status: 200,
            challengeResponse,
        };
    } catch (error) {
        console.error("[eBay Challenge] ❌ Error:", error);
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to process eBay challenge.",
        };
    }
};

const userRegistrationService = async (userData) => {
    try {

        const hashedPassword = await generatePasswordHash(userData.password);
        userData.password = hashedPassword;
        const result = await userRegistrationRepository(userData);
        if (result.status) {
            return {

                status: result.status,
                success: result.success,
                msg: "User with this email already exist"
            }
        }

        await issueAndSendOTP(result, OTP_PURPOSES.EMAIL_VERIFICATION);
        return {
            success: true,
            status: 201,
            msg: "User created successfully! OTP sent to your email successfully. Please verify your email.",
            data: {
                name: result.name,
                email: result.email,
                isActive: result.isActive,
                isVarified: result.isVarified,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                _id: result._id,
                __v: result.__v,
            }
        };
    } catch (error) {
        throw error;
    }
}

const emailVarifyService = async (userData) => {
    try {
    

        const user = await emailVerifyRepository(userData);

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            };
        }

        if (user.isVerified) {
            return {
                success: true,
                status: 200,
                message: "Email is already verified",
                data: sanitizedUser(user),
            };
        }

        const validOTP = await otpVerifyRepository(
            user._id,
            userData.otp,
            OTP_PURPOSES.EMAIL_VERIFICATION,
        );

        if (!validOTP) {
            return {
                success: false,
                status: 400,
                message: "Invalid or expired verification OTP",
            };
        }

        const verifiedUser = await markUserAsVerified(user._id);
        await deleteUserOTP(user._id, OTP_PURPOSES.EMAIL_VERIFICATION);

        return {
            success: true,
            status: 200,
            message: "Email verified successfully",
            data: sanitizedUser(verifiedUser),
        };
    } catch (err) {
        return {
            success: false,
            status: 500,
            message: err.message,
        };
    }
}

const resendEmailVerificationOTPService = async (emailData) => {
    try {
        // const { success, error } = emailValidation(emailData);

        // if (!success) {
        //   return settingErrorStatusAndMessage(error);
        // }

        const user = await emailVerifyRepository(emailData);

        console.log("user in email verification", user);

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            };
        }

        if (user.isVerified) {
            return {
                success: false,
                status: 400,
                message: "Email is already verified",
            };
        }

        await issueAndSendOTP(user, OTP_PURPOSES.EMAIL_VERIFICATION);

        return {
            success: true,
            status: 200,
            message: "Verification OTP sent successfully",
            data: {
                email: user.email,
            },
        };
    } catch (err) {
        return {
            success: false,
            status: 500,
            message: err.message,
        };
    }
}

const userLoginService = async (loginData) => {
    try {        
        // Run your clean preprocessed validation check
        const { success, data, error } = userLoginValidation(loginData);
        
        if (!success) {
            return {
                success: false,
                status: 400,
                msg: "Invalid login data"
            };
        }

        //veriable for password Check name is passwordCheckFlag
        let passwordCheckFlag = undefined; 

        // Fetch user information from database repository (Use data instead of loginData)
        let result = await userLoginRepository(data);

        if (!result) {
            return {
                success: false,
                status: 404,
                msg: "Email doesn't exist!"
            };
        }

        if (!result.isActive) {
            return {
                success: false,
                status: 401,
                msg: "User is not active!"
            };
        }

        if (result.isVarified === false) {
            return {
                success: false,
                status: 401,
                msg: "User is not verified!"
            };
        }

        let refreshToken = undefined;
        let accessToken = undefined;

        passwordCheckFlag = Boolean(loginData?.password && result?.password);
        
        //  TRADITIONAL PASSWORD LOGIN
        if (data.password && passwordCheckFlag) {
            const comparePassword = await verifyPasswordAndHash(data.password, result.password);

            if (!comparePassword) {
                return {
                    success: false,
                    status: 401,
                    msg: "Password doesn't match!"
                };
            }

            refreshToken = generateJWTRefreshToken(result);
            accessToken = generateJWTAccessToken(result);
            await saveRefreshToken(result._id, refreshToken);

            //  Return statement added for traditional users!
            return {
                success: true,
                status: 200,
                accessToken,
                refreshToken,
                user: {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                }
            };
        } 
        
        // GOOGLE PASSWORDLESS PASSTHROUGH LOGINS
        else if (Boolean(!data.password || data.password) && !passwordCheckFlag && Boolean(result.googleId)) {
            refreshToken = generateJWTRefreshToken(result);
            accessToken = generateJWTAccessToken(result);
            await saveRefreshToken(result._id, refreshToken); // Highly recommended to save here too

            return {
                success: true,
                status: 200,
                accessToken,
                refreshToken,
                user: {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                }
            };
        }
        else{
            // FALLBACK SECURITY GUARD:
            // Catches users trying to log in passwordless who DON'T have a Google Account setup
            return {
                success: false,
                status: 400,
                msg: "Password is required for traditional login accounts."
            };
        }        

    } catch (err) {
        console.error("Error in login service system wrapper loop:", err);
        throw err;
    }
};

const emailVerifyService = async (bodyData) => {
        try {
            const { success, data, error } = emailValidation(bodyData);

            if (!success) {
                return {
                    success: false,
                    status: 400,
                    msg: "Invalid email data"
                }
            }

            const result = await emailVerifyRepository(data);

            if (result.status) {
                return {
                    success: false,
                    status: 404,
                    message: "User not found",
                };
            }


            await issueAndSendOTP(result, OTP_PURPOSES.FORGOT_PASSWORD);

            return {
                success: true,
                status: 200,
                message: "Forgot password OTP sent successfully",
                data: {
                    email: result.email,
                },
            };
        }
        catch (err) {
            return {
                success: false,
                status: 500,
                message: err.message

            }
        }
}

const forgotOtpVerifyService = async (bodyData) => {
        try {

            const { success, data, error } = otpVerificationValidation(bodyData);

            if (!success) {
                return {
                    success: false,
                    status: 400,
                    msg: "Invalid OTP data"
                }
            }

            const user = await emailVerifyRepository(data);

            if (user.status) {
                return {
                    success: false,
                    status: 404,
                    msg: "User did not find!"
                }
            }


            const validOtp = await otpVerifyRepository(user._id, bodyData.otp, OTP_PURPOSES.FORGOT_PASSWORD);

            // Delete the OTP after verification attempt, whether it was successful or not
            // await deleteUserOTP(user._id, OTP_PURPOSES.FORGOT_PASSWORD);

            if (!validOtp) {
                return {
                    success: false,
                    status: 400,
                    msg: "Invalid or expired otp"
                }
            }


            const generatedToken = await issueToken(
                {
                    userId: user._id,
                    email: user.email,
                    purpose: RESET_TOKEN_PURPOSE
                },
                { expiresIn: "5m" }
            );

            return {
                success: true,
                status: 200,
                msg: "OTP Varified successfully!",
                data: {
                    email: user.email,
                    resetToken: generatedToken
                }
            }
        }
        catch (err) {

            return {
                success: false,
                status: 500,
                msg: err.message || "Internal server error"
            };
        }
}

 const resetPasswordservice = async (bodyData) => {
        try {

            // Sanitize resetToken by trimming whitespace and newlines
            if (bodyData.resetToken) {
                bodyData.resetToken = bodyData.resetToken.trim();
            }

            const { success, data, error } = userResetPasswordValidation(bodyData);

            if (!success) {
                return {
                    success: false,
                    status: 400,
                    msg: "Invalid reset password data",
                    errors: error?.errors
                }
            }


            if (!data || !data.resetToken) {
                return {
                    success: false,
                    status: 400,
                    msg: "Refresh token is required!"
                };
            }

            if (!data.newPassword) {
                return {
                    success: false,
                    status: 400,
                    msg: "New password is required!"
                };
            }

            const resetTokenData = jwtVerify(data.resetToken);
            console.log("resetToken", resetTokenData);

            if (!resetTokenData.success) {
                return {
                    success: false,
                    status: 409,
                    msg: "Invalid or expired reset token"
                }
            }

            // taking data from reset token
            // token may be signed as { payload: { userId, ... } } or directly as { userId, ... }
            const tokenPayload = resetTokenData.data?.payload || resetTokenData.data;
            const userId = tokenPayload?.userId;
            console.log("userId", userId);

            // getting user data
            const user = await getUserById(userId);
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    msg: "User did not find!"
                }
            }

            // hashing new password
            const hashedNewPassword = await passwordHash(data.newPassword);

            // updating password

            const updatePassword = await updateNewPasswordRepository(userId, hashedNewPassword);
            console.log("update password", updatePassword);

            if (!updatePassword) {
                return {
                    success: false,
                    status: 500,
                    msg: "Failed to update password!"
                }
            }

            return {
                success: true,
                status: 200,
                msg: "Password reset successfully!",
                data: {
                    email: user.email,
                }
            }
        }
        catch (err) {
            throw err
        }

    }

 const myProfileService = async (userId) => {
        try {
            if (!userId) {
                return {
                    success: false,
                    status: 401,
                    message: "You are not logged in",
                };

            }

            const result = await getUserById(userId);
            if (!result) {
                return {
                    success: false,
                    status: 404,
                    message: "User not found",
                };
            }

            return {
                success: true,
                status: 200,
                message: "User found successfully!",
                data: sanitizeUser(result)
            }
        }
        catch (err) {
            return {
                success: false,
                status: 500,
                message: err.message,
            }
        }
    }

export {userRegistrationService, ebayTokenService, ebayFulfillmentOrdersService, ebayOrderConfirmationNotificationService, ebayOrderConfirmationChallengeService, emailVarifyService, emailVerifyService, resendEmailVerificationOTPService, userLoginService, forgotOtpVerifyService, resetPasswordservice, myProfileService};
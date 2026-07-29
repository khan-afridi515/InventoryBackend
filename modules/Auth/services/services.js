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
import EbayToken from "../model/ebayTokenModel.js";
import { getValidAccessToken } from "./ebayTokenService.js";
import { dummyData } from "../../../shared/dummyData.js";



const sanitizeUser = (user) => ({
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

const ebayTokenService = async (bodyData = {}, userId) => {
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

        if (userId) {
            let tokenRecord = await EbayToken.findOne({ userId });
            if (!tokenRecord) {
                tokenRecord = new EbayToken({ userId });
            }
            tokenRecord.accessToken = responseData.access_token;
            tokenRecord.refreshToken = responseData.refresh_token || tokenRecord.refreshToken;
            tokenRecord.expiresAt = new Date(Date.now() + (responseData.expires_in || 3600) * 1000);
            tokenRecord.updatedAt = new Date();
            await tokenRecord.save();
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
        const userId = req.user?.id;
        let accessToken;
        
        try {
            accessToken = await getValidAccessToken(userId);
        } catch (tokenErr) {
            return {
                success: false,
                status: 401,
                message: tokenErr.message || "Failed to get valid eBay access token",
            };
        }

        const { limit, offset, order_ids } = req?.query || {};

        console.log("token", accessToken);


        // if (!accessToken) {
        //     return {
        //         success: false,
        //         status: 400,
        //         message: "accessToken is required. Provide it as a query param, body field, or Authorization header.",
        //     };
        // }

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
                success: true,
                status: 200,
                message: "Fetched dummy data as fallback",
                data: dummyData,
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

const ebayOrderConfirmationNotificationService = async (req) => {
    try {
        const payload = req?.body || req?.payload || {};
        const headers = req?.headers || {};
        const normalizedPayload = payload?.payload || payload;
        const metadata = normalizedPayload?.metadata;
        const notification = normalizedPayload?.notification;
        const order = notification?.data?.order;

        if (!metadata?.topic || metadata.topic !== "ORDER_CONFIRMATION") {
            return {
                success: false,
                status: 400,
                message: "Notification topic is required and must be ORDER_CONFIRMATION",
            };
        }

        if (!notification?.notificationId || !notification?.data?.order?.orderId) {
            return {
                success: false,
                status: 400,
                message: "notificationId and orderId are required",
            };
        }

        if (!order?.orderLineItems || !Array.isArray(order.orderLineItems)) {
            return {
                success: false,
                status: 400,
                message: "orderLineItems array is required",
            };
        }

        const signature = headers?.["x-ebay-signature"] || headers?.["X-EBAY-SIGNATURE"];

        return {
            success: true,
            status: 200,
            message: "Order confirmation notification processed successfully",
            data: {
                metadata,
                notification,
                order,
                signature,
                receivedAt: new Date().toISOString(),
            },
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to process order confirmation notification",
        };
    }
};

const ebayOrderConfirmationChallengeService = async (req) => {
    try {
        const challengeCode = req?.query?.challenge_code || req?.body?.challenge_code || req?.query?.challengeCode || req?.body?.challengeCode;

        if (!challengeCode) {
            return {
                success: false,
                status: 400,
                message: "challenge_code is required",
            };
        }

        const challengeResponse = crypto.createHash("sha256").update(challengeCode).digest("hex");

        return {
            success: true,
            status: 200,
            challengeResponse,
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message || "Failed to generate challenge response",
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
                data: sanitizeUser(user),
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
            data: sanitizeUser(verifiedUser),
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
        else {
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

export { userRegistrationService, ebayTokenService, ebayFulfillmentOrdersService, ebayOrderConfirmationNotificationService, ebayOrderConfirmationChallengeService, emailVarifyService, emailVerifyService, resendEmailVerificationOTPService, userLoginService, forgotOtpVerifyService, resetPasswordservice, myProfileService };
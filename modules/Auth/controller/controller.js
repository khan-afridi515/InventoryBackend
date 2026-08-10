import { settingErrorStatusAndMessage } from "../utills/settingError.js";
import { validateUserRegistrationData  } from "../validation/validate.js";
import { settingResponse } from "../utills/settingResponse.js";
import formatApiError from "../utills/formatApiError.js";
import { ebayFulfillmentOrdersService, ebayTokenService, ebayOrderConfirmationNotificationService, ebayOrderConfirmationChallengeService, emailVarifyService, emailVerifyService, forgotOtpVerifyService, myProfileService, resendEmailVerificationOTPService, resetPasswordservice, userLoginService, userRegistrationService } from "../services/services.js";
import { processEbayOrderNotification, getAllNotifications, handleEbayChallenge } from "../services/ebayWebhookService.js";
import { handledServiceResult } from "../utills/handleError.js";

import {
  ebayDeletionChallengeService,
  ebayDeletionNotificationService,
} from "../services/ebayWebhookService.js";

// GET - eBay endpoint verification
export const ebayDeletionChallengeController = async (req, res) => {
  try {
    const { challenge_code } = req.query;

    if (!challenge_code) {
      return res.status(400).json({
        success: false,
        message: "Missing challenge_code",
      });
    }

    const result = await ebayDeletionChallengeService(challenge_code);

    return res.status(200).json(result);

  } catch (error) {
    console.error("eBay deletion challenge error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Challenge verification failed",
    });
  }
};


// POST - eBay deletion notification
export const ebayDeletionNotificationController = async (req, res) => {
  try {
    console.log(
      "eBay deletion notification:",
      JSON.stringify(req.body, null, 2)
    );

    const result = await ebayDeletionNotificationService(req.body);

    return res.status(200).json(result);

  } catch (error) {
    console.error("eBay deletion notification error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process deletion notification",
    });
  }
};

const userRegistrationController = async (req, res) => {
  try {
    const { success, data, error } = validateUserRegistrationData(req.body);
    console.log("Check the validation error ", error);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    const result = await userRegistrationService(data);

    if (result.status != 201) {
      return res.status(result.status).json(result.msg);
    }

    return res.status(result.status).json(result)
  } catch (error) {
    const apiError = formatApiError(error, "Failed to register user");

    res.status(apiError.status).json({
      success: false,
      message: apiError.message,
      ...(apiError.field ? { field: apiError.field } : {}),
    });
  }
};

const verifyEmailOTPController = async (req, res) => {
  try {
    const result = await emailVarifyService(req.body);
    return handledServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const resendEmailVerificationOTPController = async (req, res) => {
  try {
    const result = await resendEmailVerificationOTPService(req.body);
    return handledServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const userLoginController = async (req, res) => {
    try {
    
        const result = await userLoginService(req.body);
        
        if (!result.success) {
            return res.status(result.status).json({
                success: false,
                message: result.msg || result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully!",
            loginData: result,
        });
    } catch (err) {
        console.error("Error in userLoginController:", err);
        res.status(406).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const emailVerifyController = async (req, res) => {
    try {


        const result = await emailVerifyService(req.body);

        return handledServiceResult(res, result);
    } catch (err) {
        console.error("Error in emailVerifyController:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const verifyForgotOtp = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const result = await forgotOtpVerifyService(req.body);
        await handledServiceResult(res, result);
    } catch (err) {
        console.error("Error in verifyForgotOtp:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const result = await resetPasswordservice(req.body);
        await handledServiceResult(res, result);
    } catch (err) {
        console.error("Error in resetPasswordController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const myProfileController = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await myProfileService(userId);
        await handledServiceResult(res, result);
    } catch (err) {
        console.error("Error in myProfileController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const ebayTokenController = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await ebayTokenService(req.body, userId);
        return res.status(result.status).json(result);
    } catch (err) {
        console.error("Error in ebayTokenController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

const ebayFulfillmentOrdersController = async (req, res) => {
    try {
        const result = await ebayFulfillmentOrdersService(req);
        return res.status(result.status).json(result);
    } catch (err) {
        console.error("Error in ebayFulfillmentOrdersController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

// Step 3: Controller receives the webhook request and passes it to the service layer
const ebayOrderConfirmationNotificationController = async (req, res) => {
    try {
        const result = await processEbayOrderNotification(req);
        return res.status(result.status).json(result);
    } catch (err) {
        console.error("Error in ebayOrderConfirmationNotificationController:", err);
        return res.status(500).json({
            success: false,
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

const getAllNotificationsController = async (req, res) => {
    try {
        const result = await getAllNotifications();
        return res.status(result.status).json(result);
    } catch (err) {
        console.error("Error in getAllNotificationsController:", err);
        return res.status(500).json({
            success: false,
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

/**
 * GET /ebay/order-confirmation
 *
 * Handles eBay's endpoint-verification challenge.
 * eBay sends a GET with ?challenge_code=<token> when you first register
 * or update a webhook destination. Must respond within a few seconds.
 *
 * Response format (required by eBay):
 *   Content-Type: application/json
 *   { "challengeResponse": "<sha256-hex-string>" }
 */
// Step 4: Controller handles eBay endpoint verification challenge
const ebayOrderConfirmationChallengeController = async (req, res) => {
    try {
        const result = handleEbayChallenge(req);

        if (!result.success) {
            return res.status(result.status).json({ success: false, message: result.message });
        }

        return res.status(200).json({ challengeResponse: result.challengeResponse });
    } catch (err) {
        console.error("Error in ebayOrderConfirmationChallengeController:", err);
        return res.status(500).json({
            success: false,
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

export { userRegistrationController, verifyEmailOTPController, resendEmailVerificationOTPController, userLoginController, emailVerifyController, verifyForgotOtp, resetPasswordController, myProfileController, ebayTokenController, ebayFulfillmentOrdersController, getAllNotificationsController, ebayOrderConfirmationNotificationController, ebayOrderConfirmationChallengeController}
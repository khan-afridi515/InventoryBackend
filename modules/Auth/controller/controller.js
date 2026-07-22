import { settingErrorStatusAndMessage } from "../utills/settingError.js";
import { validateUserRegistrationData  } from "../validation/validate.js";
import { settingResponse } from "../utills/settingResponse.js";
import formatApiError from "../utills/formatApiError.js";
import { ebayTokenService, emailVarifyService, emailVerifyService, forgotOtpVerifyService, myProfileService, resendEmailVerificationOTPService, resetPasswordservice, userLoginService, userRegistrationService } from "../services/services.js";
import { handledServiceResult } from "../utills/handleError.js";



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
            return res.status(result.status).json({ wrn: result.msg });
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
        const result = await ebayTokenService(req.body);
        return res.status(result.status).json(result);
    } catch (err) {
        console.error("Error in ebayTokenController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

export { userRegistrationController, verifyEmailOTPController, resendEmailVerificationOTPController, userLoginController, emailVerifyController, verifyForgotOtp, resetPasswordController, myProfileController, ebayTokenController}
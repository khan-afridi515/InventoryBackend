
import crypto from "crypto";
import { saveUserOTP } from "../Repository/repository.js";
import { sendOTPEmail } from "./sendOTPEmail.js";
import { deleteUserOTP } from "../Repository/repository.js";

const OTPGenerate = (length = 6) => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};


const OTP_PURPOSES = {
    EMAIL_VERIFICATION: "email_verification",
    FORGOT_PASSWORD: "forgot_password",
};


const RESET_TOKEN_PURPOSE = "password_reset";




const issueAndSendOTP = async (user, purpose) => {
    const otp = OTPGenerate();
    await saveUserOTP(user._id, otp, purpose);

    try {
        await sendOTPEmail(user.email, otp, purpose);
    } catch (err) {
        await deleteUserOTP(user._id, purpose);
        throw err;
    }

    return {
        email: user.email,
        purpose,
        expiresInMinutes: 5,
    };
};


export { issueAndSendOTP };
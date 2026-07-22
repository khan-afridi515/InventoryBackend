import express from "express";
import { ebayTokenController, emailVerifyController, myProfileController, resendEmailVerificationOTPController, resetPasswordController, userLoginController, userRegistrationController, verifyEmailOTPController, verifyForgotOtp } from "../controller/controller.js";
import { email } from "zod";
const AuthRouter = express.Router();



AuthRouter.post('/user', userRegistrationController);
AuthRouter.post('/email', verifyEmailOTPController);
AuthRouter.post('/resend', resendEmailVerificationOTPController);
AuthRouter.post('/login', userLoginController);
AuthRouter.post('/forgot-email-verify', emailVerifyController);
AuthRouter.post('/forgot-otp', verifyForgotOtp);
AuthRouter.post('/new-password', resetPasswordController);
AuthRouter.post('/profile', myProfileController);
AuthRouter.post('/ebay/token', ebayTokenController);

export {AuthRouter};



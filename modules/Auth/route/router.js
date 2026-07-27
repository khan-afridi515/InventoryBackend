import express from "express";
import { ebayFulfillmentOrdersController, ebayOrderConfirmationNotificationController, ebayOrderConfirmationChallengeController, ebayTokenController, emailVerifyController, myProfileController, resendEmailVerificationOTPController, resetPasswordController, userLoginController, userRegistrationController, verifyEmailOTPController, verifyForgotOtp } from "../controller/controller.js";
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
AuthRouter.get('/ebay/orders', ebayFulfillmentOrdersController);

// eBay Notification API — endpoint verification (GET) must be on the same path as the POST webhook
AuthRouter.get('/ebay/order-confirmation', ebayOrderConfirmationChallengeController);
AuthRouter.post('/ebay/order-confirmation', ebayOrderConfirmationNotificationController);

export {AuthRouter};



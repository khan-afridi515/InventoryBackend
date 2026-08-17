import express from "express";
import { ebayFulfillmentOrdersController, ebayOrderConfirmationNotificationController, ebayOrderConfirmationChallengeController, ebayTokenController, emailVerifyController, myProfileController, resendEmailVerificationOTPController, resetPasswordController, userLoginController, userRegistrationController, verifyEmailOTPController, verifyForgotOtp, getAllNotificationsController, ebayDeletionChallengeController, ebayDeletionNotificationController } from "../controller/controller.js";
import verifyEbaySignature from "../middleware/verifyEbaySignature.js";
import { authorizeAccessToken } from "../../../shared/authorizeAccessToken.js";




const AuthRouter = express.Router();



AuthRouter.post('/user', userRegistrationController);
AuthRouter.post('/email', verifyEmailOTPController);
AuthRouter.post('/resend', resendEmailVerificationOTPController);
AuthRouter.post('/login', userLoginController);
AuthRouter.post('/forgot-email-verify', emailVerifyController);
AuthRouter.post('/forgot-otp', verifyForgotOtp);
AuthRouter.post('/new-password', resetPasswordController);
AuthRouter.post('/profile', myProfileController);
AuthRouter.post('/ebay/token', authorizeAccessToken, ebayTokenController);
AuthRouter.get('/ebay/orders', authorizeAccessToken, ebayFulfillmentOrdersController);
// AuthRouter.get('/ebay/notifications', authorizeAccessToken, getAllNotificationsController);

// Step 1: eBay uses GET for endpoint verification challenge
AuthRouter.get('/ebay/order-confirmation', ebayOrderConfirmationChallengeController);

// Step 2: eBay sends POST notifications to this webhook endpoint
AuthRouter.post('/ebay/order-confirmation', verifyEbaySignature, ebayOrderConfirmationNotificationController);

AuthRouter.get(
  "/ebay/account-deletion",
  ebayDeletionChallengeController
);

// eBay sends deletion notification
AuthRouter.post(
  "/ebay/account-deletion",
  verifyEbaySignature,
  ebayDeletionNotificationController
);

export { AuthRouter };



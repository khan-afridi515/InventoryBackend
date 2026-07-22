import { z } from "zod";

const userRegistrationSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    role: z.enum(["user", "admin"]).default("user").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User Registration validation function - safeParse returns {success, data, error}
const validateUserRegistrationData = (userData) => {
  return userRegistrationSchema.safeParse(userData);
};


const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  
  // Preprocess catches "" or missing fields and converts them to undefined
  password: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().min(6, "Password must be at least 6 characters long").optional()
  ),
});

const userLoginValidation = (userData) => {
  console.log("userData", userData);
  return userLoginSchema.safeParse(userData);
};


const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const emailValidation = (userData) => {
  return emailSchema.safeParse(userData);
};


const otpVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const otpVerificationValidation = (otpData) => {
  return otpVerificationSchema.safeParse(otpData);
};

const userResetPasswordSchema = z
  .object({
    resetToken: z.string().min(10, "Invalid reset token"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// user reset password validation function
const userResetPasswordValidation = (passwordData) => {
  return userResetPasswordSchema.safeParse(passwordData);
};


export {validateUserRegistrationData, userLoginValidation, emailValidation, otpVerificationValidation, userResetPasswordValidation}
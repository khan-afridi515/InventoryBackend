//  import dotenv
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import dns from "dns";


const getOTPContent = (purpose, email, otp) => {
  if (purpose === "email_verification") {
    return {
      subject: "Verify Your Lumyana Account",
      html: `Dear User,
             Welcome to Lumyana. Use the verification code below to verify your email address for ${email}:

                                 <b>${otp}</b>

             If you did not create this account, you can ignore this email.

            Sincerely yours,

            The Lumyana team`,
    };
  }

  return {
    subject: "Your OTP for Password Reset",
    html: `Dear User,
           We received a request to reset the password for your Lumyana account ${email}. Your verification code is:

                               <b>${otp}</b>

           If you did not request this code, do not share it with anyone and ignore this email.

          Sincerely yours,

          The Lumyana team`,
  };
};


const transporter = nodemailer.createTransport({
  secure: false, // Changed from true to false for port 587
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Often helpful in local/dev environments
  },
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },
});


const sendOTPEmail = async (email, otp, purpose = "forgot_password") => {

  console.log("my email ", email, "my otp ", otp, "my purpose ", purpose, "sendOTPEmail");
  try {
    const { subject, html } = getOTPContent(purpose, email, otp);

    const info = await transporter.sendMail({
      from: `"Lumyana" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });
    return info;
  } catch (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

export {
  sendOTPEmail
}
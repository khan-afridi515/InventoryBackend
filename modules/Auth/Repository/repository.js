import mongoose from "mongoose";
import User from "../model/model.js";
import UserOTPVerify from "../model/otpModel.js";

const OTP_EXPIRE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

const userRegistrationRepository = async (userData) => {
    try {

        const existinguser = await User.findOne({ email: userData.email });

        if (existinguser) {
            return {
                success: false,
                status: 409,
            };
        }
        const result = await User.create(userData);
        return result;


    } catch (error) {
        throw error;
    }
}

const markUserAsVerified = async (userId) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                isVarified: true,
                isActive: true
            },
            { new: true },
        );

        console.log("User updated in verification", updatedUser);
        return updatedUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

const saveUserOTP = async (userId, otp, purpose) => {
    try {
        const user = await UserOTPVerify.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId), purpose },
            {
                otp,
                purpose,
                expireAt: new Date(Date.now() + OTP_EXPIRE_WINDOW_MS),
            },
            {
                returnDocument: "after",
                upsert: true,
                setDefaultsOnInsert: true,
            },
        );
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteUserOTP = async (userId, purpose) => {
    try {
        await UserOTPVerify.findOneAndDelete({
            userId: new mongoose.Types.ObjectId(userId),
            purpose,
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

const emailVerifyRepository = async (bodyData) => {
    try {
        // user find by email
        const emailexist = await User.findOne({ email: bodyData.email });

        if (!emailexist) {
            return {
                success: false,
                status: 401
            }
        }
        return emailexist;
    }
    catch (err) {
        throw err
    }
}

const otpVerifyRepository = async (userId, otp, purpose) => {
    try {
        //verify otp in data base 
        console.log("My verify otp repo", otp, "myid", userId, "mypurpose", purpose)
        const userOTPVerify = await UserOTPVerify.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            otp: otp,
            purpose: purpose,
            expireAt: { $gt: new Date() }
        });

        console.log("my userOTPVerify", userOTPVerify)
        return userOTPVerify;
    }
    catch (err) {
        console.log(err);
    }
}


const userLoginRepository = async (loginData) => {
    try {
        const emailexist = await User.findOne({ email: loginData.email });

        console.log("Repository user:", emailexist);

        if (!emailexist) {
            return null;
        }
        return emailexist;

    }
    catch (err) {
        throw err;
    }
}


const saveRefreshToken = async (userId, refreshToken) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { refreshToken },
            { returnDocument: 'after' }
        );
    } catch (err) {
        throw err;
    }
};


const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateNewPasswordRepository = async (userId, newPassword) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { password: newPassword },
            { returnDocument: 'after' }
        );
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};


export {
    userRegistrationRepository,
    saveUserOTP,
    deleteUserOTP,
    emailVerifyRepository,
    otpVerifyRepository,
    markUserAsVerified,
    userLoginRepository,
    saveRefreshToken,
    getUserById,
    updateNewPasswordRepository
}
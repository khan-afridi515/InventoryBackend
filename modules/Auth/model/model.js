// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    // 🚀 UPDATE 1: Changed 'required: true' to 'false' so Google users can register passwordless
    password: {
        type: String,
        required: false 
    },

    // 🚀 UPDATE 2: Added unique googleId field. 
    // 'sparse: true' ensures users signing up normally with an email/password can leave this null without unique-collision errors.
    googleId: {
        type: String,
        unique: true,
        sparse: true 
    },

    // 🚀 UPDATE 3: Added an optional avatar string field to hold their Google profile picture url
    avatar: {
        type: String,
        required: false
    },

  
    
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },

    isVarified: {
        type: Boolean,
        required: true,
        default: false
    },
    
    role: {
        type: String,
        required: true,
        default: "user"
    },

    ebayUserId: {
        type: String,
        sparse: true,
        index: true
    },

    ebayEiasToken: {
        type: String,
        sparse: true,
        index: true
    }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
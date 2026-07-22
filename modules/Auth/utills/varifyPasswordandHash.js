//External modules
import argon from "argon2";

//Internal modules
//This utility function is used to verify the plain password with hashed password
const verifyPasswordAndHash = async (plainPassword, hash) => {
    try {
        // FIX: Check if hash exists and is a valid string
        // This prevents the error when users registered via Google have no password hash
        if (!hash || typeof hash !== 'string') {
            throw new Error("No password found. User may have signed up with Google or social login.");
        }      
        return await argon.verify(hash, plainPassword);
    } catch (error) {
        console.log("Check the verify password and hash ", error);
        throw error;
    }
};

//export
export default verifyPasswordAndHash;
//External modules
import argon from "argon2";
//Internal modules

const generatePasswordHash = async (password) => {
    try {
        const hash = await argon.hash(password);
        return hash;
    } catch (error) {
        console.error("Error generating password hash:", error);
        throw error;
    }
}

//export
export  { generatePasswordHash };
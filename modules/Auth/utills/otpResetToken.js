import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const issueToken = async (payload, option = {}) => {

    try {
        const secretKey = process.env.ACCESS_Token_SECRET_Key;

        if (!secretKey) {
            throw new Error("JWT_SECRET not found");
        }

        const token = jwt.sign({ payload }, secretKey, { expiresIn: "10m" })

        return token;
    }
    catch (error) {
        throw error;
    }

}


export {
    issueToken
}

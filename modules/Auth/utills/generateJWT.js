//External modules
import jwt from "jsonwebtoken";

const generateJWTAccessToken = (UserData) => {
  try {
    return jwt.sign(
      {
        id: UserData._id,
        name: UserData.email,
        role: UserData.role
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  } catch (error) {
    throw error;
  }
};

const generateJWTRefreshToken = (userData) => {
  try {
    return jwt.sign({ id: userData._id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  } catch (error) {
    throw error;
  }
};

//export
export { generateJWTAccessToken, generateJWTRefreshToken };

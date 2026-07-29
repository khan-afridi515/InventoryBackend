import jwt from 'jsonwebtoken';

const authorizeAccessToken = (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: 'Access token secret is not configured',
      });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired access token',
      error: error.message,
    });
  }
};

export { authorizeAccessToken };

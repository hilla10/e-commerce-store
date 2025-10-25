import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No access token provided' });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - User not found' });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ message: 'Unauthorized - Token expired' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const adminRoute = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'Access Denied - Admin access required' });
    }
  } catch (error) {
    console.error('Error in adminRoute middleware:', error);
    return res.status(500).json({ message: error.message });
  }
};

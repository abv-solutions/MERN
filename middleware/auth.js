const config = require('../config/config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from the request headers
  const token = req.header('auth-token');
  // Check for token
  if (!token) {
    // Don't continue after middleware
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    // Decode token
    const decode = jwt.verify(token, config.JWT_SECRET);
    // Add token info to the request
    req.user = decode;
    // Continue after middleware
    next();
  } catch (err) {
    // Don't continue after middleware
    return err.message.includes('jwt expired')
      ? res.status(401).json({ msg: 'Login token has expired' })
      : res.status(400).json({ msg: 'Something went wrong' });
  }
};

module.exports = auth;

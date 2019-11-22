const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
  // Get fields from request body
  const { name, email, password } = req.body;
  // Validation for empty fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Empty fields are not allowed' });
  }
  // Create new user model
  const newUser = new User({
    name,
    email,
    password
  });
  // Create salt & hash for password
  bcrypt.genSalt(10, (err0, salt) => {
    if (err0) throw err0;
    bcrypt.hash(newUser.password, salt, async (err1, hash) => {
      if (err1) throw err1;
      newUser.password = hash;
      try {
        // Save new user to mongodb
        const user = await newUser.save();
        // Generate token
        jwt.sign(
          { id: user._id }, // Payload
          config.JWT_SECRET, // Secret key
          { expiresIn: 6 }, // Sign options
          (err2, token) => {
            if (err2) throw err2;
            // Send response
            res.status(201).json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      } catch (err) {
        let msg;
        if (err.message.includes('valid email')) {
          // Email validation failed
          msg = err.errors.email.message;
        } else if (err.message.includes('duplicate key')) {
          // Email already used
          msg = 'User already exists';
        } else {
          // Generic error
          msg = 'Something went wrong';
        }
        res.status(400).json({ msg });
      }
    });
  });
});

// Login user
router.post('/', async (req, res) => {
  // Get fields from request body
  const { email, password } = req.body;
  // Validation for empty fields
  if (!email || !password) {
    return res.status(400).json({ msg: 'Empty fields are not allowed' });
  }
  try {
    // Search user in mongodb
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: `User doesn't exist` });
    } else {
      // Check password
      bcrypt.compare(password, user.password, (err0, isMatch) => {
        if (err0) throw err0;
        if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid credentials' });
        } else {
          // Generate token
          jwt.sign(
            { id: user._id }, // Payload
            config.JWT_SECRET, // Secret key
            { expiresIn: 600 }, // Sign options
            (err1, token) => {
              if (err1) throw err1;
              // Send response
              res.status(200).json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        }
      });
    }
  } catch (err) {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

// Get user data using token from header
router.get('/user', auth, async (req, res) => {
  try {
    // User id comes from auth middleware
    const user = await User.findById(req.user.id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

module.exports = router;

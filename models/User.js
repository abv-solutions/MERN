const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create user schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a user name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add a user email'],
    lowercase: true,
    unique: true,
    trim: true,
    match: [
      /^([a-z\d]+([\._-]?[a-z\d]+)?)@([a-z\d]+(-?[a-z\d]+)?)(\.[a-z]{2,3}){1,2}$/,
      'Please fill a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a user password'],
    trim: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

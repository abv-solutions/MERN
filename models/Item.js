// Module calls (Node)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Mongoose Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export Mongoose model to other files
module.exports = Item = mongoose.model('item', ItemSchema);

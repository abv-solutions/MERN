const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

// Create item schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please add an item quantity'],
    default: 1
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

ItemSchema.plugin(timestamp);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

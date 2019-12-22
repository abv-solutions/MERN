const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

// Create item schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
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

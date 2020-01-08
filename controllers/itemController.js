const errorHandler = require('../utility/errors');
const Item = require('../models/Item');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ user_id: req.user.id }).sort({
      updatedAt: -1
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

// Get single item
exports.getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      if (item.user_id == req.user.id) {
        res.status(200).json(item);
      } else {
        res.status(400).json({ msg: 'You did not create this item' });
      }
    }
  } catch (err) {
    const { msg, status } = errorHandler(err, 'item');
    res.status(status).json({ msg });
  }
};

// Add item
exports.addItem = async (req, res) => {
  // Get fields from request body
  const { name } = req.body;
  // Validation for empty fields
  if (!name) {
    return res.status(400).json({ msg: 'Please add an item name' });
  }
  // Create new item model
  const newItem = new Item({
    name,
    user_id: req.user.id
  });
  try {
    // Save new item to mongodb
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  // Get fields from request body
  const { quantity } = req.body;
  // Validation for empty fields
  if (!quantity) {
    return res.status(400).json({ msg: 'Please add an item quantity' });
  }
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      if (item.user_id == req.user.id) {
        await Item.findOneAndUpdate({ _id: item._id }, req.body);
        res.status(200).json({ msg: 'Item edited' });
      } else {
        res.status(400).json({ msg: 'You did not create this item' });
      }
    }
  } catch (err) {
    const { msg, status } = errorHandler(err, 'item');
    res.status(status).json({ msg });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      if (item.user_id == req.user.id) {
        await item.remove();
        res.status(200).json({ msg: 'Item deleted' });
      } else {
        res.status(400).json({ msg: 'You did not create this item' });
      }
    }
  } catch (err) {
    const { msg, status } = errorHandler(err, 'item');
    res.status(status).json({ msg });
  }
};

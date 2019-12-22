const express = require('express');
const auth = require('../middleware/auth');
const Item = require('../models/Item');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ updatedAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      res.status(200).json(item);
    }
  } catch (err) {
    if (err.message.includes('failed for value')) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
});

// Create item
router.post('/', auth, async (req, res) => {
  // Validation for empty fields
  if (!req.body.name) {
    return res.status(400).json({ msg: 'Empty fields are not allowed' });
  }
  // Create new item model
  const newItem = new Item({
    name: req.body.name
  });
  try {
    // Save new item to mongodb
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

// Edit item
router.put('/:id', auth, async (req, res) => {
  // Get fields from request body
  const { quantity } = req.body;
  // Validation for empty fields
  if (!quantity) {
    return res.status(400).json({ msg: 'Empty fields are not allowed' });
  }
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      await Item.findOneAndUpdate({ _id: item._id }, req.body);
      res.status(200).json({ msg: 'Item edited' });
    }
  } catch (err) {
    if (err.message.includes('failed for value')) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      await item.remove();
      res.status(200).json({ msg: 'Item deleted' });
    }
  } catch (err) {
    if (err.message.includes('failed for value')) {
      res.status(404).json({ msg: `Item doesn't exist` });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
});

// Export to other files
module.exports = router;

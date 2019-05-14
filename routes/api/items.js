// Module calls (Node.js)
const express = require('express');
const router = express.Router();

// Import Mongoose Item Model
const Item = require('../../models/Item');

// Get Items
router.get('/', (req, res) => {
  // Query MongooseDB for items
  Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

// Create Item
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name  // Using BodyParser
  });
  newItem.save()
    .then(item => res.json(item));
});

// Delete Item
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)  // Using BodyParser
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

// Export to other files
module.exports = router;

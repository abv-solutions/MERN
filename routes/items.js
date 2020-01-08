const express = require('express');
const auth = require('../middleware/auth');
const {
  getItems,
  getSingleItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

const router = express.Router();

router
  .route('/')
  .get(auth, getItems)
  .post(auth, addItem);

router
  .route('/:id')
  .get(auth, getSingleItem)
  .put(auth, updateItem)
  .delete(auth, deleteItem);

module.exports = router;

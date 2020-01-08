const express = require('express');
const auth = require('../middleware/auth');
const { register, login, loadUser } = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(auth, loadUser)
  .post(login);

router.route('/register').post(register);

module.exports = router;

const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser
} = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router.route('/:id').get(getUser);

module.exports = router;

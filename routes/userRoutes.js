const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser
} = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.signUp);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router.route('/:id').get(getUser);

module.exports = router;

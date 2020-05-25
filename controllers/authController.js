const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // check if mail and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check is user exist
  const user = User.findOne({ email });
  // send token to client
  res.status(200).json({
    status: 'success',
    token
  });
};

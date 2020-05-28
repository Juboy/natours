const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(); //runs the query

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500).send('Not provided yet');
};

exports.createUser = (req, res) => {
  res.status(500).send('Not provided yet');
};

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email should not be empty'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password should not be empty'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm our password'],
    validate: {
      //this only works on save
      validator: function(el) {
        // this only points to current doc on NEW document creation
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});
userSchema.pre('save', async function(next) {
  //only run is password is modified
  if (!this.isModified('password')) return next();

  //hash the asswrod wirh the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require('mongoose');
const validator = require('validator');

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
    minlength: 8
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
const User = mongoose.model('User', userSchema);
module.exports = User;

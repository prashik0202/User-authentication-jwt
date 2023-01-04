const mongoose = require('mongoose');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
  email : {
    type : String,
    required : [true,'Please enter your email'],
    unique : true,
    lowercase : true,
    validate : [isEmail,'Please enter a valid email']
  },
  password : {
    type : String,
    required : [true,'Please enter password'],
    minlength : [6,'Password must contain 6 character']
  }
});

const User = mongoose.model('user',userSchema);

module.exports = User
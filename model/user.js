const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


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

// fire function after the doc is saved in database:
userSchema.post('save', function(doc,next){
  console.log('new user was created and saved',doc);
  next();
})

// fire function before the doc is saved in database:
userSchema.pre('save',async function(next){
  console.log('user is about to be created and saved',this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt)
  next();
})

//static method for login user:
userSchema.statics.login = async function(email,password){
  const user = await this.findOne({email : email });
  if(user){
    const auth = await bcrypt.compare(password,user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user',userSchema);

module.exports = User
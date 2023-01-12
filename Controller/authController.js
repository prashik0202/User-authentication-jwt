const User = require('../model/user');
const jwt = require('jsonwebtoken');

// >>>>>>>>HANDLE ERROR<<<<<<<< 
const handleError = (err) => {
  console.log(err.message , err.code);
  let errors = { email : '' , password : ''}; // created obj errors set values to be empty

  //incorrect email
  if(err.message === 'incorrect email'){
    errors.email = 'email is not correct!';
  }

  //incorrect password
  if(err.message === 'incorrect password'){
    errors.password = 'password is not correct!';
  }

  //validation for unique email address:
  if(err.code === 11000){  // 11000 is error code for unique parameter
    errors.email = 'Email is already registered'; // setting email ele as this message
    return errors; 
  }

  //validation error 
  if(err.message.includes('user validation failed')){   // checking that err message includes this line or not
    Object.values(err.errors).forEach(({ properties }) => { 
      errors[properties.path] = properties.message;  // we are setting the message to specific element
    })
  }
  return errors;
}
//handle error function ends

//returning the JWT:
const maxAge = 3 * 24 * 60 * 60;
const createTocken = (id) => {
  return jwt.sign({id }, 'prashik gamre', {
    expiresIn : maxAge
  });
}

module.exports.signup_get = (req,res) => {
  res.render('signup');      
}

module.exports.signup_post = async(req,res) => {
  const {email , password} = req.body;
  try{
    const user = await User.create({email,password});
    const token = createTocken(user._id);
    res.cookie('jwt',token,{ httpOnly : true , maxAge : maxAge * 1000});
    return res.status(201).json({ user : user._id});
  }catch(err){
    // console.log(err);
    const errorstatus = handleError(err);
    return res.status(400).json({errorstatus});
  }
    
}

module.exports.login_get = (req,res) => {
  res.render('login');      
}

module.exports.login_post = async(req,res) => {
  const {email , password} = req.body;
  try{
    const user = await User.login(email,password);
    const token = createTocken(user._id);
    res.cookie('jwt',token,{ httpOnly : true , maxAge : maxAge * 1000});
    res.status(200).json({user : user._id});
  }catch(err){
    const errorstatus = handleError(err);
    return res.status(400).json({ errorstatus });
  }    
}
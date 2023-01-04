const User = require('../model/user');

// >>>>>>>>HANDLE ERROR<<<<<<<< 
const handleError = (err) => {
  console.log(err.message , err.code);
  let errors = { email : '' , password : ''}; // created obj errors set values to be empty

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

module.exports.signup_get = (req,res) => {
  res.render('signup');      
}

module.exports.signup_post = async(req,res) => {
  const {email , password} = req.body;
  try{
    const user = await User.create({email,password});
    return res.status(201).json(user);
  }catch(err){
    // console.log(err);
    const errorstatus = handleError(err);
    return res.status(400).json(errorstatus);
  }
    
}

module.exports.login_get = (req,res) => {
  res.render('login');      
}

module.exports.login_post = (req,res) => {
  const {email , password} = req.body;
  console.log("email : "+email);
  console.log("password : "+password);   
  console.log(req.body);
  res.send('login');     
}
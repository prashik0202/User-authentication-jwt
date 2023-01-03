const User = require('../model/user');

module.exports.signup_get = (req,res) => {
  res.render('signup');      
}

module.exports.signup_post = async(req,res) => {
  const {email , password} = req.body;
  try{
    const user = await User.create({email,password});
    return res.status(201).json(user);
  }catch(err){
    console.log(err);
    return res.status(400).send('error,user not created!');
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
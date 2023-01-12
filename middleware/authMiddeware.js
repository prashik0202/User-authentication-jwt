const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    //check  json web tocken exists and verified:
    if(token){
        jwt.verify(token,'prashik gamre',(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');

            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

// check current user:
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'prashik gamre',async(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth , checkUser };


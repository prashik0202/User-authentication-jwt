const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };


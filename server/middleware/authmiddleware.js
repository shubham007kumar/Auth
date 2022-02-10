const jwt = require('jsonwebtoken')
const User = require('../Models/user.model')
const dotenv = require('dotenv')
dotenv.config()

const protect = async (req,res,next) =>{
   let token 
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try{
           token = req.headers.authorization.split(' ')[1]
           const decode = await jwt.verify(token,process.env.JWT_SECRET)
           req.user = await User.findById(decode.id).select('-password')
           next()
       }catch(err){
        res.status(401);
        throw new Error("Not authorized, token failed");
       }
   }
}

module.exports = protect
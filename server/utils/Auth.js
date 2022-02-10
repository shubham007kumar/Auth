const generateToken = require('./generateToken')
const User = require('../Models/user.model')

const register = async (req,res,role)=>{
    const {email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
       return res.status(400).json({
           message:'username is already taken',
           success:false
       })
    }
    const user = await User.create({email,password,role})
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
            role:role,
            token:generateToken(user._id)
        })
    }else{
        return res.status(500).json({
            message:'unable to create account',
            success:false
        })
    }
}

const login = async (req,res,role) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(user.role !== role){
       return  res.status(404).json({
            message:'please make login in right portal',
            success:false
        })
    }

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
    }
    else{
         res.status(500).json({
            message:'password is wrong',
            success:false
        })
    }

}

const checkRole = roles => (req,res,next) =>{
    if(roles.includes(req.user.role)){
        return next()
    }
    return res.status(401).json({
        message:'Unauthorized',
        success:false
    })
}

module.exports = {register,login,checkRole}
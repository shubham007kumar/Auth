const express = require('express')
const router = express.Router()
const {register,login} = require('../utils/Auth')
// router.post('/signup', async (req,res)=>{
//     const {name,email,password} = req.body
//     const userExist = await User.findOne({email})
//     if(userExist){
//         res.status(404);
//         throw new Error("User already exists");
//     }
//     const user = await User.create({
//         name,email,password
//     })
//     if(user){
//     res.status(201).json({
//         _id:user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//     })
//     }else{
//         res.status(400);
//         throw new Error("User not found");
//     }
// })

// router.post('/login', async (req,res)=>{
//     const {email,password}  = req.body
//     const user = await User.findOne({email});

//     if(user && user.matchPassword(password)){
//         res.json({
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             token:generateToken(user._id)
//         })
//     }else{
//         res.status(401);
//         throw new Error("Invalid Email or Password");
//     }
// })

/** Register for taxPayer */
router.post('/register-taxPayer',async(req,res)=>{
    await register(req,res,'taxPayer')
})

/** Register for taxAccountant */
router.post('/register-taxAccountant',async(req,res)=>{
    await register(req,res,'taxAccountant')
})

/** Register for admin */
router.post('/register-admin',async(req,res)=>{
    await register(req,res,'admin')
})

/** login for taxPayer */
router.post('/login-taxPayer',async(req,res)=>{
    await login(req,res,'taxPayer')
})

/** login for taxAccountant */
router.post('/login-taxAccountant',async(req,res)=>{
    await login(req,res,'taxAccountant')
})

/** login for admin */
router.post('/login-admin',async(req,res)=>{
    await login(req,res,'admin')
})


module.exports = router
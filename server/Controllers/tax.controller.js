const express = require('express')
const router = express.Router()
const Tax = require('../Models/tax.model')
const User = require('../Models/user.model')
const protect = require('../middleware/authmiddleware')
const {checkRole} = require('../utils/Auth')

router.get('/taxAccountant', protect , checkRole(["taxAccountant","admin"]), async (req,res) =>{
    const note = await Tax.find({user:req.user._id})
    res.json(note)
})

router.post('/taxAccountant/create', protect , checkRole(["taxAccountant","admin"]), async (req,res) =>{
     const {category,state,name,email,tax,dueDate} = req.body
        const taxs = new Tax({ user: req.user._id, category : category,state:state,name:name,email:email,tax:tax,dueDate:dueDate });
    
        const createtax = await taxs.save();
    
        res.status(201).json(createtax);
})

router.get('/taxAccountant/:id', protect ,checkRole(["taxAccountant","admin"] ), async (req,res)=>{
    const tax = await Tax.findById(req.params.id)
    if(tax){
        res.json(tax)
    }else{
        res.status(404).json({
            message:'tax not found'
        })
    }
})

router.put('/taxAccountant/update/:id', protect ,checkRole(["taxAccountant","admin"] ), async (req,res)=>{
      const {category} = req.body
      const tax = await Tax.findById(req.params.id)
      if(tax){
          tax.category = category
          const updateTax = await tax.save()
          res.json(updateTax)
      }else{
          res.status(404).json({
              message:'tax not found'
          })
      }
})

router.get('/taxPayer', protect , checkRole(["taxPayer"]) , async (req,res)=>{
     const user = await User.findById(req.user._id)
     const {email} = user
     const data = await Tax.findOne({email})
     if(data){
         return res.status(200).json(data)
     }else{
         res.status(401).json({
             message:"user not found",
             success:false
         })
     }
})

router.get('/taxPayer/:id', protect , async (req,res)=>{
    const tax = await Tax.findById(req.params.id)
    if(tax){
        res.json(tax)
    }else{
        res.status(404).json({
            message:'tax not found'
        })
    }
})

router.put('/taxPayer/update/:id', protect ,checkRole(["taxPayer"]), async (req,res)=>{
    const {category} = req.body
      const tax = await Tax.findById(req.params.id)
      if(tax){
          tax.category = category
          const updateTax = await tax.save()
          res.json(updateTax)
      }else{
          res.status(404).json({
              message:'tax not found'
          })
      }
})


module.exports = router
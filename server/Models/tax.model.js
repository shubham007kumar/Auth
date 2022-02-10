const {model,Schema} = require('mongoose')
const mongoose = require('mongoose')

const taxSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    category:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    tax:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        immutable:true
    }
},{
    versionKey:false,
    timestamps:true,
})

module.exports = model('tax',taxSchema)
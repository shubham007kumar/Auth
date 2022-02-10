const {model,Schema}  = require('mongoose')
const bcrypt = require('bcrypt');

const userScheme = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"taxPayer",
        enum:["taxPayer","taxAccountant","admin"]
    },
    password:{
        type:String,
        required:true
    }   
},{
    versionKey:false,
    timestamps:true,
})

userScheme.pre('save',async function(next){
   if(! this.isModified('password')){
       next()
   }
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password,salt)
})

userScheme.methods.matchPassword = async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password)
}

module.exports = model('user',userScheme)
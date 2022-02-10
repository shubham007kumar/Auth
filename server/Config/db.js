const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connect = () => {
    return mongoose.connect(`${process.env.MONGODB_URL}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((res)=>{
        console.log('db connect')
    }).catch((err)=>{
        console.log('something went wrong in db')
    })
}


module.exports = connect;
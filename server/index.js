const port = process.env.PORT || 3001
const express = require('express')
const dotenv = require('dotenv')
const connect = require('./Config/db.js')
const app = express()
app.use(express.json())
dotenv.config()

/** User controller */
const userController = require('./Controllers/user.controller')
app.use('/user',userController)

/** Tax Controller */
const taxController = require('./Controllers/tax.controller')
app.use('/tax',taxController)

app.listen(port, async ()=>{
    await connect()
    console.log(`server start at ${port}`)
})
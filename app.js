const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
require('./database/db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const userRouter = require('./api/V1/router/user')
const postRouter = require('./api/V1/router/postRouter')


const app = express()
const port = process.env.port || 3300
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/uploads", express.static(__dirname+'/uploads'))
app.use('/v1/user',userRouter)
app.use('/v1/post',postRouter)


app.listen(port,(err)=>{
    if (err) console.log('----------there is some error while connecting to server')
    console.log("-------------------server is running---------------")
})
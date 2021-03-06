const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
require('./database/db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const userRouter = require('./api/V1/router/user')
const postRouter = require('./api/V1/router/postRouter')


const app = express()
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/uploads", express.static(__dirname+'/uploads'))
app.use('/v1/user',userRouter)
app.use('/v1/post',postRouter)

app.post('/fileupload', (req,res) =>{
    let  photo  = req.files.photo
    let uploadPath = __dirname+'/uploads/'
    let splitted = photo.name.split(".")
    let fileExt = splitted[splitted.length-1]
    uploadPath += moment().unix()+"."+fileExt
    photo.mv(uploadPath, (err)=>{
        if(err){
            console.log(err)
            return res.send('err')
        }
        res.send("uploaded")
    })
})

app.listen(3300,()=>{
    console.log("-------------------server is running---------------")
})
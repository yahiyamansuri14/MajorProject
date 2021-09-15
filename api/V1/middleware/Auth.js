const jwt = require('jsonwebtoken')
require('dotenv').config()
let checkToken = async ( req, res, next ) =>{
    let { token } = req.headers
    console.log("rcvd token", token)
    let decoded = null
    try{
        decoded = await jwt.verify( token, process.env.ACCESS_TOKEN_SECRET)
        req.decoded = decoded
    }catch(e){
        //console.log(e)
        return res.send({status:"ERR", message:"Invalid Authentications Token...",data:[]})
    }
    /* console.log(req.decoded.id) */
    next()
}

module.exports = { checkToken }
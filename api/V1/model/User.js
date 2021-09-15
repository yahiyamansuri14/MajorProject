const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    userLogin:String,
    gender:String,
    pwd:String,
    dob:Date,
    currentTown:String,
    homeTown:String,
    school:String,
    university:String,
    bio:String,
    rel_status:String,
    profileUrl:String
},{timestamps:true})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
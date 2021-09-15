const UserModel = require('../model/User')
const FriendModel = require('../model/Friend')
const LookupFriendModel = require('../model/LookupFriend')
const FriendHelper = require('../helper/FriendHelper')
const OtpModel = require('../model/Otp')
//need to import email module
const sendMail = require('../helper/SendMail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uploadFile = require('../helper/UploadFile')
require('dotenv').config()


let login = async (req, res) => {
    let { userLogin, pwd } = req.body
    /* console.log(userLogin,pwd) */
    let dbData = await UserModel.findOne({ userLogin })
    if (dbData != null) {
        let dbPwd = dbData['pwd']
        /* console.log(dbPwd) */
        let isSame = await bcrypt.compare(pwd, dbPwd)
        /* console.log(pwd,dbPwd) */
        let { _id, firstName, lastName, userLogin, gender, dob } = dbData
        let user = { _id, firstName, lastName, userLogin, gender, dob }
        /* console.log(dbData) */
        if (isSame) {
            const accessToken = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken)
            //            return res.send({ status: "OK", message: "login succesfull...", data: [user, { token: accessToken }] })
            return res.send({ status: "OK", message: "login succesfull...", data:  {user, token: accessToken } })
        } else {
            return res.send({ status: "ERR", message: "Invalid Email or Password" })
        }
    } else {
        return res.send({ status: "ERR", message: "Invalid Email or Password..." })
    }
}

let register = async (req, res) => {
    let { firstName, lastName, userLogin, pwd, gender, dob, otp } = req.body
    let password = await bcrypt.hash(pwd, 10)
    let otp_db
    UserModel.findOne({ userLogin }).then(async data => {
        if (data != null) {
            res.send({ status: "ERR", message: "user already exists" })
        } else {
            OtpModel.findOne({ userLogin: userLogin })
                .then(data => {
                    otp_db = data.otp
                    if (otp == otp_db) {
                        let newUser = new UserModel({ firstName, lastName, userLogin, gender, dob, pwd: password })
                        newUser.save()
                            .then(data => {
                                res.send({ status: "OK", msg: "data saved sucefully" })
                            })
                            .catch(err => {
                                res.send({ status: "ERR", msg: "signup un successfull" })
                            })

                    } else {
                        res.send({ status: "ERR" })
                    }
                })
                .catch(err => console.log('there is some errror'))
        }
    })
}

let sentOtp = (req, res) => {
    let { userLogin } = req.body
    console.log(userLogin)
    let otp = Math.floor(100000 + Math.random() * 900000)
    console.log("otp for",userLogin,"is",otp)
    sendMail({ 'userLogin': userLogin, 'otp': otp })
    let newOtp = new OtpModel({ otp, userLogin })
    newOtp.save()
        .then(data => {
            res.send({ status: "OK", msg: "OTP sent successfully..." })
        })
        .catch(err => {
            console.log("otp sending failed")
            res.send({ status: "OK", msg: "there is some error,try after some time" })
        })
}

let getUserProfile = (req, res) => {
    let { id } = req.params
    UserModel.findOne({ _id: id })
        .then(dbData => {
            let { _id, firstName, lastName, userLogin, gender, dob } = dbData
            let user = { _id, firstName, lastName, userLogin, gender, dob }
            console.log(user)
            res.send({ status: "OK", message: "Profile Retrived Succefully", data: [user] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "Error while Retriving user profile", data: [] })
        })
}

let sentFriendRequest = async (req, res) => {
    let sender_id = req.decoded.id
    let receiver_id = req.params.id
    console.log(sender_id, receiver_id)
    let result = await FriendHelper.checkInLookupFriend(sender_id, receiver_id)
    console.log('22222222222222222', result)
    if (!result) {
        let newRequest = new LookupFriendModel({ sender_id, receiver_id })
        newRequest.save()
            .then(data => {
                console.log(data)
                res.send({ status: "OK", message: "Request Sent Successfully..." })
            })
            .catch(err => {
                console.log(err)
                res.send({ status: "ERR", message: "Request Failed" })
            })
    } else {
        res.send({ status: "ERR", message: "Friend Request Already Sent" })
    }
}

let acceptFriendRequest = async (req, res) => {
    let receiver_id = req.decoded.id
    let sender_id = req.params.id
    console.log('sender id', sender_id)
    console.log('receiver id', receiver_id)
    //check if its first friend request then make and friend array and push data
    let data = await FriendModel.findOne({ user_id: receiver_id })
    if (data == null) {
        //its first friend we are adding to list
        let friends = []
        friends.push(sender_id)
        console.log('first time', friends)
        let newFriend = new FriendModel({ user_id: receiver_id, friends })
        newFriend.save()
            .then(async data => {
                //console.log(data)
                await LookupFriendModel.findOneAndDelete({ sender_id, receiver_id })
                res.send({ status: 'OK', message: "added to friend list", data: [data] })
            })
            .catch(err => {
                console.log(err)
                res.send({ status: "ERR", message: "failed to add frined try letter", data: [data] })
            })
    } else {
        //its not first time request so get the data and then update the data
        console.log('b/w first and second', data.friends)
        data.friends.push(sender_id)
        console.log('second time', data.friends)
        try {
            let new_data = await FriendModel.findOneAndUpdate({ user_id: receiver_id }, data)
            await LookupFriendModel.findOneAndDelete({ sender_id, receiver_id })
            return res.send({ status: "OK", message: "addedd to friend lis(in else)", data: [new_data] })
        } catch (e) {
            console.log(e)
            return res.send({ status: "ERR", message: "failed to add friend list(in else)", data: [data] })
        }
    }

}

let showFriendRequest = async (req, res) => {
    let receiver_id = req.decoded.id
    console.log(receiver_id)
    LookupFriendModel.find({ receiver_id })
        .then(data => {
            console.log(data)
            res.send({ status: "OK", message: "success", data: [data] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "failed", data: [] })
        })

}

let getUserProfileById = async (req,res) =>{

    let id = req.decoded.id
    UserModel.findOne({ _id: id })
        .then(dbData => {
            let { _id, firstName, lastName, userLogin, gender, dob,currentTown,homeTown,school,university,bio,rel_status } = dbData
            let user = { _id, firstName, lastName, userLogin, gender, dob,currentTown,homeTown,school,university,bio,rel_status }
            console.log(user)
            res.send({ status: "OK", message: "Profile Retrived Succefully", data: user })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "Error while Retriving user profile", data: [] })
        })
}

let updateUserProfile = async (req,res) =>{
    let id = req.decoded.id
    let { photo } = req.files
    let fileUrl = null
    if ( photo != null){
        fileUrl = await uploadFile(photo)
    }  
    console.log( typeof fileUrl) 
    let data = req.body
    data['fileUrl'] = `${fileUrl}`
    console.log('in update user profile',data)
    try{
        let updated = await UserModel.findOneAndUpdate({_id:id}, data)
        return res.send({status:"OK", message:"profile updated", data:updated})
    }catch(e){
        console.log(e)
        return res.send({status:"ERR", message:"failed to update profile", data:data})
    }
}

let getAllFriendRequest = async (req, res) =>{
    let id = req.decoded.id
    //id = "609abdbe2e35f321446192b3"
    console.log(id)
    let friendId = await LookupFriendModel.find({receiver_id:id}, {sender_id:1, _id:0})
    console.log(friendId)
    res.send({status:"OK", message:"success", data:friendId})
}

let getAllUser = async (req,res) =>{
    let users = []
    try{
        users = await UserModel.find({},{pwd:0})
    }catch(e){

    }
    res.send({status:"OK", message:"user info retrieved succefully", data:users})
}

module.exports = { getAllUser,login, register, sentOtp, getUserProfile, sentFriendRequest, acceptFriendRequest, showFriendRequest, getUserProfileById, updateUserProfile, getAllFriendRequest }
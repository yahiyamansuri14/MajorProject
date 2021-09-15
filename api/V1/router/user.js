const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/Auth')
const userController = require('../controller/userController')
//sending OTP api
router.post('/sentotp', userController.sentOtp)
//signup api
router.post('/signup', userController.register)
//login api
router.post('/login', userController.login)
//get user profile api
router.post('/getuserprofile/:id', authMiddleWare.checkToken, userController.getUserProfile)
//accept friend request
router.post('/acceptrequest/:id', authMiddleWare.checkToken, userController.acceptFriendRequest)
//sent friend request
router.post('/sendfriendrequest/:id', authMiddleWare.checkToken, userController.sentFriendRequest)
//show friend request
router.post('/showfriendrequest', authMiddleWare.checkToken, userController.showFriendRequest)
//get user profile by id
router.post('/getuserprofilebyid', authMiddleWare.checkToken, userController.getUserProfileById)
//update user profile by id
router.post('/updateuserprofile', authMiddleWare.checkToken, userController.updateUserProfile)
//get all friend request
router.post('/getallfriendrequest', authMiddleWare.checkToken, userController.getAllFriendRequest)
//get all user info for people you may know
router.post('/getalluser', authMiddleWare.checkToken, userController.getAllUser)
module.exports = router
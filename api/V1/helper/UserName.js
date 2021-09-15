const UserModel = require('../model/User')
let getUserName = async (id) =>{
    let user = await UserModel.findOne({_id:id})
    console.log(user)
    let username = user.firstName+" "+user.lastName
    return username
}

module.exports = getUserName
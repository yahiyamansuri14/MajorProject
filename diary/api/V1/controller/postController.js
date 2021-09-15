const uploadFile = require('../helper/UploadFile')
const postModel = require('../model/Post')

let testSavePost = async (req,res) =>{
    console.log('in testSavePost')
    let photo = req.files.photo
    let path = uploadFile(photo)
    console.log(path)
    if ( path == null)
        res.send("failed")
    else
        res.send("ok")
    
}
let savePost = async (req, res) => {
    let { textContent, likes, dislikes } = req.body
    console.log(req.files)
    let { photo } = req.files
    console.log(photo)
    let fileUrl = await uploadFile(photo)
    let newPost = new postModel({ textContent, likes, dislikes, user_id: req.decoded.id,fileUrl })
    newPost.save()
        .then(data => {
            console.log(data)
            res.send({ status: "OK", message: "post save successfully...", data: [data] })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "ERR", message: "post not saved...", data: [] })
        })
}

let getAllPost = async (req, res) => {
    console.log(req.body)
    let posts = []
    try {
        posts = await postModel.find({})
        console.log(posts)
    } catch (e) {

    }
    res.send({ status: "OK", message: "Success", data: [posts] })
}

let addLike = async (req, res) =>{
        let { id } = req.params
        let  data  = {}
        data = req.body
        console.log(data)
        try{
            let updated = await postModel.findOneAndUpdate( {_id:id,user_id:req.decoded.id}, data)
            console.log(updated)
            return  res.send({status:"OK",message:"Like added succefully", data:[updated]})
        }catch(e){
            return res.send({status:"ERR",message:"something went wrong!!!not able to like"})
        }
}

module.exports = { savePost, getAllPost, addLike, testSavePost }
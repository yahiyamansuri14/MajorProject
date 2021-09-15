const moment = require('moment')
let uploadFile = ( fileData ) =>{ 
    
    //let uploadPath = __dirname+'/uploads/'
    let uploadPath = 'E:\\senior-project\\backend\\diary\\uploads\\'
    console.log(uploadPath)
    let splitted = fileData.name.split(".")
    let fileExt = splitted[splitted.length-1]
    uploadPath += moment().unix()+"."+fileExt
    console.log(uploadPath)
    fileData.mv(uploadPath, (err)=>{
        if(err){
            console.log(err)
            return null
        }
    })
    return uploadPath
}

module.exports = uploadFile
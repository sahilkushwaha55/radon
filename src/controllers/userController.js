const UserModel= require("../models/userModel")

const bookdetail= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getbookdetail= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.bookdetail= bookdetail
module.exports.getbookdetail= getbookdetail
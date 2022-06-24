const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}



const authenicate = async function(req,res,next){
    try{
    const author_Id = req.body.authorId
    let token = req.headers["x-Auth-token"]
    if(!token) token = req.headers["x-auth-token"]
    if(!token) return res.status(401).send({status : false, msg : "You are not logged in(token Missing)"})

    let decodeToken = jwt.verify(token, "this is my secret key")
    if(!decodeToken) return res.status(403).send({status : false,  msg: "Token is invalid"})
    next()
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


const authorisation = async function(req,res,next){
    try{
        let token = req.headers["x-Auth-token"]
        if(!token) token = req.headers["x-auth-token"]
        let blogId = req.params.blogId
        let check = isValidObjectId(blogId)
        if(!check) return res.status(404).send({status: false, msg : "Not a valid blog"})
        let blogDetail =await blogModel.findById(blogId)
        let decodeToken = jwt.verify(token,"this is my secret key")

        if(blogDetail.authorId != decodeToken.author_Id) 
        return res.status(403).send({status : true, msg : "You are not authorised"})
        next()
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


module.exports.authenicate = authenicate
module.exports.authorisation = authorisation
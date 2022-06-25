const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


//=============== Fuction to Check Id is valid or not ===========================

const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}


//====================Authentication Middleware function==========================

const authenicate = async function(req,res,next){
    try{
    let token = req.headers["x-Auth-token"]
    if(!token) token = req.headers["x-auth-token"]
    if(!token) return res.status(401).send({status : false, msg : "You are not logged in(token Missing)"})

    let decodeToken = jwt.verify(token, "this is my secret key")
    if(!decodeToken) return res.status(403).send({status : false,  msg: "Token is invalid"})
    req.author_Id=decodeToken.author_Id
    next()
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


//========================== Authorisation Middleware function ===============================


const authorisation = async function(req,res,next){
    try{
        let blogId = req.params.blogId
        let check = isValidObjectId(blogId)
        if(!check) return res.status(404).send({status: false, msg : "Not a valid blog Id"})
        let blogDetail =await blogModel.findById(blogId)
        if(!blogDetail) return res.status(400).send({staus : false, msg : "No such blog"})
        // let decodeToken = jwt.verify(token,"this is my secret key")

        if(blogDetail.authorId != req.author_Id) 
        return res.status(403).send({status : true, msg : "You are not authorised"})
        next()
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


module.exports.authenicate = authenicate
module.exports.authorisation = authorisation
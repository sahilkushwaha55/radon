const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')

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
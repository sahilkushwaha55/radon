const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


const authenticate = async function(req, res, next) {

    try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

    next()
    }
    catch(err){
        res.status(500).send({msg : err.message})
    }
}


const authorise = async function(req, res, next) {
    // comapre the logged in user's id and the id in request

    try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-thorium");
    let userToBeModified = req.params.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != decodedToken.userId) return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
    }
    catch(err){
        res.status(500).send({msg : "Error", Error : err.message})
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


//=================Function for checking the given values don't have only blank space and null value============

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    if (typeof value == "number") return false
    return true
}


//===================Author creation controller function=========================


const authorCreate = async function(req,res){
    try{
    const bodyData = req.body
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    let pass = req.body.password
    let title = ['Mr','Mrs','Miss']
    // A Fuction with regex to check the password have in right formate ex Sahil@123 
    //[ Minimum eight characters, at least one letter, one number and one special character ]
    function validatepassword(pass) 
    {
        let checkpass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        let check2 = checkpass.test(pass)
        if(!check2) return res.status(400).send({status : false, msg : "Password formate : Minimum eight characters, at least one letter, one number and one special character"})
        return check2
    }

    // A function with regex to check the name only have Alphabets, Dots, Spaces [Number not allow]
    function validateName(name){
        let checkname = /[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
        let check2 = checkname.test(name)
        if(!check2) return res.status(400).send({status : false, msg : "Name formate is not right (You can only use letter space and dot)"})
        return check2
    }

    //Edge cases
    if(!bodyData) return res.status(400).send({status : false, msg : "Please enter data"})
    if(!isValid(fname)) return res.status(400).send({status : false, msg : "Please enter First Name"})
    if(!isValid(lname)) return res.status(400).send({status : false, msg : "Please enter Last Name"})
    if(title.indexOf(req.body.title)== -1) return res.status(400).send({status : false, msg : "Please enter title [Mr, Mrs or Miss]"})
    if(!isValid(email)) return res.status(400).send({status : false, msg : "Email Id Required"})
    if(!isValid(pass)) return res.status(400).send({status : false, msg : "Please enter a Password"})
    
    validatepassword(pass)
    validateName(req.body.fname)
    validateName(req.body.lname)

    // A Function with regex to valid that email have in the right formate
    function validateEmail(email1) 
    {
        var re = /\S+@\S+\.\S+/
        return re.test(email1)
    }
    

    const emailcheck = validateEmail(email)
    if(!emailcheck) return res.status(400).send({status: false, msg : 'not a valid email'})
    const checkemail2 = await authorModel.find({email : email})  // Checking email is new or has already register with any author
    if(checkemail2.length!=0) return res.status(400).send({status : false, msg: "Already have an account with this email Id"})
    const saveData = await authorModel.create(bodyData)
    res.status(201).send({status : true, data : saveData})
    }
    catch(err){
        res.status(500).send({status : false, msg : err.message})
    }
}


//====================Author login Function===========================


const authorLogin = async function(req,res){
    try{
    const email = req.body.email
    const password =req.body.password
    //email and password required to login
    if(!email || !password) return res.status(400).send({status : false, msg : "Please Enter email and password"})
    const findAuthor = await authorModel.findOne({email : email, password : password})  //checking has any account with email and password
    if(!findAuthor) return res.status(403).send({status : false, msg : "Email or Password is incorrect"})
    // Creating JWT token
    const token = jwt.sign({
        author_Id : findAuthor._id.toString(),
        author_email : findAuthor.email
    }, "this is my secret key")
    res.setHeader("x-api-key",token)
    res.status(200).send({status : true, data : {token : token}});
}
    catch(err){
        res.status(500).send({status : false, msg : err.message})
    }
}


module.exports.authorCreate = authorCreate
module.exports.authorLogin = authorLogin
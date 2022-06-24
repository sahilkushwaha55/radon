const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}



const authorCreate = async function(req,res){
    try{
    const bodyData = req.body
    function validatepassword(pass) 
    {
        var checkpass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        let check2 = checkpass.test(pass)
        if(!check2) return res.status(400).send({status : false, msg : "Password formate : Minimum eight characters, at least one letter, one number and one special character"})
        return check2
    }
    //Edge cases
    if(!bodyData) return res.status(400).send({status : false, msg : "Please enter data"})
    const email = req.body.email
    let pass = req.body.password
    let pass2 = validatepassword(pass)
    if(!isValid(req.body.fname)) return res.status(400).send({status : false, msg : "Please enter First Name"})
    if(!isValid(req.body.lname)) return res.status(400).send({status : false, msg : "Please enter Last Name"})
    if(!isValid(req.body.title)) return res.status(400).send({status : false, msg : "Please enter title [Mr, Mrs or Miss]"})
    if(!isValid(email)) return res.status(400).send({status : false, msg : "Email Id Required"})
    if(!isValid(pass2)) return res.status(400).send({status : false, msg : "Please enter a Password"})
    function validateEmail(email1) 
    {
        var re = /\S+@\S+\.\S+/
        return re.test(email1)
    }
    
    
    const emailcheck = validateEmail(email)
    if(!emailcheck) return res.status(400).send('not a valid email')
    const saveData = await authorModel.create(bodyData)
    res.status(201).send({status : true, msg : saveData})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


const authorLogin = async function(req,res){
    try{
    const email = req.body.email
    const password =req.body.password
    if(!email || !password) return res.status(400).send({status : false, msg : "Please Enter email and password"})
    const findAuthor = await authorModel.findOne({email : email, password : password})
    if(!findAuthor) return res.status(403).send({status : false, msg : "Email or Password is incorrect"})
    const token = jwt.sign({
        author_Id : findAuthor._id.toString(),
        author_email : findAuthor.email
    }, "this is my secret key")
    res.status(200).send({status : true, msg : token})
}
    catch(err){
        res.status(500).send({status : false, msg : err.message})
    }
}


module.exports.authorCreate = authorCreate
module.exports.authorLogin = authorLogin
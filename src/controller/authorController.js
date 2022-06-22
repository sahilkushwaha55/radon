const authorModel = require('../models/authorModel')


const authorCreate = async function(req,res){
    try{
    const bodyData = req.body
    if(!bodyData) return res.status.send()
    const email = req.body.email
    function validateEmail(email1) 
    {
        var re = /\S+@\S+\.\S+/
        return re.test(email1)
    }
    
    const emailcheck = validateEmail(email)
    if(!emailcheck) return res.send('not a valid email')
    const saveData = await authorModel.create(bodyData)
    res.send({status : true, msg : saveData})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.authorCreate = authorCreate
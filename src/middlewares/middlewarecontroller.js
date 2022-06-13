const createuser = require('../models/user')
const produc = require('../models/product')


const orderHead = function(req,res,next){
    const headData = req.headers.isfreeappuser
    if (headData)
    next()
    else
    res.send('isFreeAppUser request is missing a mandatory header')
}


const usercheck = async function(req,res,next){
    const scdata = req.body.userId
    const check = await createuser.findById( {_id : scdata}).select( {_id : 1})
    if (check)
    next()
    else
    res.send('Not a valid user')
}


const productcheck = async function(req,res,next){
    const scdata = req.body.productId
    const check = await produc.findById( {_id : scdata}).select( {_id : 1})
    if (check)
    next()
    else
    res.send('Not a valid product')
}



const userHead = function(req,res,next){
    const headData = req.headers.isfreeappuser
    if (headData)
    next()
    else
    res.send('isFreeAppUser request is missing a mandatory header')
}



const orderdetails = async function(req,res,next){
    const headData = req.headers.isfreeappuser
    if (headData){
        if(headData==true)
        {
            const scdata=req.body
            const mydata = await createuser.
        }
    }
    else
    {
        res.send('isFreeAppUser request is missing a mandatory header')
    }
}


module.exports.orderHead = orderHead
module.exports.usercheck = usercheck
module.exports.productcheck = productcheck
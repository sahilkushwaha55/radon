const createuser = require('../models/user')
const produc = require('../models/product')
const orderModel = require('../models/orderModel')


// const createorder = async function(req,res) {
//     const scdata = req.body
//     const headData = req.headers.isfreeappuser
//         scdata.isfreeappuser=headData
//         const mydata = await orderModel.create(scdata)
//         res.send(mydata)
// }



const orderdetails = async function(req,res){
    const headData = req.headers.isfreeappuser
    if (headData){
        const scdata=req.body
        scdata.isFreeAppUser= headData
        if(headData=='true'){
            scdata.amount = 0
            const mydata = await orderModel.create(scdata)
            res.send(mydata)
        }
        else
        {
            const checkuser = await createuser.findById( { _id : scdata.userId})
            const checkproduct = await produc.findById( { _id : scdata.productId})
            scdata.amount = checkproduct.price
            const value = checkuser.balance - scdata.amount
            if(value > 0){
                const mydata = await orderModel.create(scdata)
                await createuser.updateOne(
                    { _id : scdata.userId},
                    { $set : { balance : value}}
                )
                res.send(scdata)
            }
            else{
                res.send('do not have sufficent money')
            }
        }
    }
    else
    {
        res.send('isFreeAppUser request is missing a mandatory header')
    }
}


module.exports.orderdetails = orderdetails
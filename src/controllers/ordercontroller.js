const orderModel = require('../models/orderModel')

const createorder = async function(req,res) {
    const scdata = req.body
    const headData = req.headers.isfreeappuser
        scdata.isfreeappuser=headData
        const mydata = await orderModel.create(scdata)
        res.send(mydata)
}

module.exports.createorder = createorder
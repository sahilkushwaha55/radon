const product = require('../models/product')

const createProduct = async function(req,res){
    const scdata = req.body
    const mydata = await product.create(scdata)
    res.send(mydata)
}

module.exports.createProduct = createProduct
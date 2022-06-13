const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name : String,
    category : String,
    price : Number
})

module.exports = mongoose.model('produc',product)
const mongoose =require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const order = new mongoose.Schema( {
        userId: {
            type : ObjectId,
            ref : "letuser"
        },
        productId: {
            type : ObjectId,
            ref : "produc"
        },
        amount: Number,
        isFreeAppUser: {
            type : Boolean,
            default : false
        }, 
        date : String
})

module.exports = mongoose.model('order',order)
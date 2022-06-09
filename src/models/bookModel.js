const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "newAuthor"
    },
    price: Number,
    ratings: Number,
    publisher : {
        type : ObjectId,
        ref: "newPublisher",
        required : true
    },
    isHardCover : {
        type : Boolean,
        default : false
    }


}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)

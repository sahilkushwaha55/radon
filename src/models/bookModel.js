//const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        required : true,
        type : String
    } ,
    authorName: String, 
    tags: [String],
    year : {
        type : Number,
        default : 2021
    } ,
    totalpage : Number,
    instock : Boolean ,
    prices: {
        indianPrice: String,
        europePrice: String,
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover

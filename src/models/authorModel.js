const mongoose  = require("mongoose")

const authorSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true,  //required means mandatory key
        trim: true
    },
    lname : {
        type : String,
        required : true,
        trim : true
    },
    title : {
        type : String,
        enum : ['Mr','Mrs','Miss'], //enum allow use to enter data only related to enum values( can't enter any other)
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true});  //It saves the time of creating document and updating time in the document 

module.exports = mongoose.model('author',authorSchema)
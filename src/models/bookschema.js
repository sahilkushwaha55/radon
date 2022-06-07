const mongoose = require('mongoose')



const bookschema = new mongoose.Schema ( {
    name: String,
    author_id: {
        type : Number,
        required : true
    },
    price: Number,
    ratings: Number,

}, {timestamps : true});

module.exports = mongoose.model('sellbook', bookschema)
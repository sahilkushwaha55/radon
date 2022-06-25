const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId : {
        type : ObjectId,  //ObjectId taking reference of author collection Id (linking two document)
        ref : 'author',
        required : true
    },
    tags : [String],
    category : {
        type : [String],
        required : true
    },
    subcategory : [String],
    deletedAt : Date,
    isDeleted : {
        type : Boolean,
        default : false
    },
    publishedAt : Date,
    isPublished : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})  //It saves the time of creating document and updating time in the document 

module.exports = mongoose.model('blog',blogSchema)
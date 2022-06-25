const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


//=================Function for checking the given values don't have only blank space and null value============


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}


//=============== Fuction to Check Id is valid or not ===========================

const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}


//====================Create a new blog function===================

const createBlog = async function(req,res){
    try{
    const bodyData = req.body
    let category = req.body.category
//Edge Cases
    if(!isValid(req.body.title)) return res.status(400).send({staus: false, msg : "Please enter Title"})
    if(!isValid(req.body.body)) return res.status(400).send({ status : false, msg: "Please enter Blog body"})
    if(!isValid(req.body.category)) return res.status(400).send({status : false, msg: "Please enter Blog category"})
    if(req.body.authorId) return res.status(400).send({status : false, msg : "You don't need to enter author Id(It will take automatically)"})
    for(let i = 0;i<category.length;i++){
        if(!isValid(category[i]))
        return res.status(400).send({status : false, msg : "You can't enter blank space in the category section"})
    }
    const saveData = await blogModel.create({authorId : req.author_Id, ...bodyData})
    res.status(201).send({status : true, data : saveData})
    }
    catch(err){
        res.status(500).send({status : false, msg: err.message})
    }
}



//==================Get blog detail and filter it with query paramas===========================


const getBlogDetail = async function(req,res){
    try{
        let querydata = req.query
        let authorId = isValidObjectId(req.query.authorId)
        if(req.query.authorId){
        if(!authorId) return res.status(400).send({status : false, msg : "Please enter a valid author Id"})
        }
        const data = await blogModel.find({$and : [ { isPublished : true, isDeleted : false, ...querydata}]})
        if(data.length==0) return res.status(404).send({status : false, msg : "No data found"})
        res.status(200).send({status : true, msg : data})
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


//========================================Delete a blog with blog Id in path params========================


const deleteBlog = async function(req,res){
    try{
        const blogId = req.params.blogId
        const checkBlog = await blogModel.findOne({_id : blogId, isDeleted : false})
        if(!checkBlog) return res.status(404).send({status : false, msg : 'No such blog'})
        if(checkBlog.isDeleted==true) return res.status(400).send({status : false, msg : "No such blog available to delete"})
        const data = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {$set : {isDeleted : true}},
            {new : true}
        )
        res.status(200).send({status: true, msg : "Blog deleted"})
    }
    catch(err){
        res.status(500).send({status : false, msg : err.message})
    }
}


//==================================Update blog with this function========================


const UpdateBlog = async function(req,res){
    try{
    const data = req.body
    if(Object.keys(data).length==0) return res.status(400).send({status : false, msg : "Please enter data"})
    let {title,body,tags,subcategory,publishedAt} = data
    if(title) {
        if(!isValid(title))
        return res.status(400).send({status : false, msg : "Only blank space is not acceptable, You should ente some data in title part or remove the title part"})
    }
    if(body) {
        if(!isValid(body))
        return res.status(400).send({status : false, msg : "Only blank space is not acceptable, You should ente some data in Body part or remove the Body part"})
    }
    if(tags) {
        if(!isValid(tags))
        return res.status(400).send({status : false, msg : "Only blank space is not acceptable, You should ente some data in Tags part or remove the Tags part"})
    }
    if(subcategory) {
        if(!isValid(subcategory))
        return res.status(400).send({status : false, msg : "Only blank space is not acceptable, You should ente some data in subcategory part or remove the subcategory part"})
    }
    const blogId = req.params.blogId
    // if(!isValidObjectId(blogId)) return res.status(400).send({status : false, msg : "Please enter a valid blog Id"})
    const updateData = await blogModel.findById(blogId)
    if(updateData.isDeleted == true) return res.status(404).send({status : false, msg : "blog doesn't exist"})
    if(tags) updateData.tags.push(tags)
    if(subcategory) updateData.subcategory.push(subcategory)
    if(publishedAt){
        const updateData2 = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {$set : {title : title, body : body, tags: updateData.tags, subcategory : updateData.subcategory, isPublished : true, publishedAt : publishedAt}},
            {new : true}
        )
        return res.status(200).send({status : true, data : updateData2})
    }
    const updateData3 = await blogModel.findOneAndUpdate(
        {_id : blogId},
        {$set : {title : title, body : body, tags: updateData.tags, subcategory : updateData.subcategory}},
        {new : true}
    )
    res.status(200).send({status : true, data : updateData3})
    }
    catch(err){
        res.status(500).send({Status: false, msg : err.message})
    }
}


//======================== Delete blog using filter options (Delete Query) =================================


const deletequery = async function(req,res){
    try{
    const data =req.query
    if(Object.keys(data).length==0) return res.status(400).send({status : false, msg : "Please enter any key"})
    if(req.query.authorId) return res.status(403).send({status: false, msg : "You can't delete any other author Id / (if you want to delete your blog, You don't need to enter It)"})
    const finalData = await blogModel.updateMany(
        { authorId : req.author_Id, isDeleted : false , ...data},
        {$set : {isDeleted : true}},
        {new : true}
        )
        if(finalData.modifiedCount == 0) return res.status(404).send({status : false, msg : 'No such blog available'})
        res.status(200).send({status : true, msg : finalData})
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}



module.exports.createBlog = createBlog
module.exports.getBlogDetail = getBlogDetail
module.exports.deleteBlog = deleteBlog
module.exports.deletequery = deletequery
module.exports.UpdateBlog = UpdateBlog
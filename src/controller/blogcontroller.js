const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}


const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}


const createBlog = async function(req,res){
    try{
    const bodyData = req.body
    let token = req.headers["x-Auth-token"]
    if(!token) token = req.headers["x-auth-token"]
    let decodeToken = jwt.verify(token,"this is my secret key")
//Edge Cases
    if(!isValid(req.body.title)) return res.status(400).send("Please enter Title")
    if(!isValid(req.body.body)) return res.status(400).send("Please enter Blog body")
    if(!isValid(req.body.category)) return res.status(400).send("Please enter Blog category")

    const saveData = await blogModel.create({authorId : decodeToken.author_Id, ...bodyData})
    res.status(201).send({status : true, data : saveData})
    }
    catch(err){
        res.status(500).send({status : false, msg: err.message})
    }
}



const getBlogDetail = async function(req,res){
    try{
        let querydata = req.query
        let authorId = isValidObjectId(req.query.authorId)
        if(!authorId) return res.status(400).send({status : false, msg : "Please enter a valid author Id"})
        const data = await blogModel.find({$and : [ { isPublished : true, isDeleted : false, ...querydata}]})
        if(data.length==0) return res.status(404).send({status : false, msg : "No data found"})
        res.status(200).send({status : true, msg : data})
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


const deleteBlog = async function(req,res){
    try{
        const blogId = req.params.blogId
        const checkBlog = await blogModel.findById(blogId)
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
        res.status(500).send({msg : err.message})
    }
}



const UpdateBlog = async function(req,res){
    try{
    const data = req.body
    if(!data) return res.status(400).send({status : false, msg : "Please enter data"})
    let {title,body,tags,subcategory,publishedAt} = data
    // if(!isValid(title)|| !isValid(publishedAt)|| !isValid(tags)|| !isValid(subcategory)|| !isValid(body)) 
    // return res.status(400).send("Your can't save blank space data")
    // if(!isValid(body)) return res.status(400).send("Please enter Blog body")
    // if(!isValid(subcategory)) return res.status(400).send("Please enter Blog subcategory")
    // if(!isValid(tags)) return res.status(400).send("Please enter tags")
    // if(!isValid(publishedAt)) return res.status(400).send("Please enter publishedAt")
    const blogId = req.params.blogId
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
        res.status(500).send({msg : err.message})
    }
}



const deletequery = async function(req,res){
    try{
    //const blogId = req.params.blogId
    // const authorId =req.query.authorId
    // const category = req.query.category
    // const tags = req.query.tags
    // const subcategory = req.query.subcategory
    // const isPublished = req.query.isPublished
    // const blog = await blogModel.findById(blogId)
    // if(!blog) return res.send('no such blog')
    const data =req.query
    if(Object.keys(data).length==0) return res.status(400).send({status : false, msg : "Please enter any key"})
    let token = req.headers["x-Auth-token"]
    if(!token) token = req.headers["x-auth-token"]
    let decodeToken = jwt.verify(token,"this is my secret key")
    const finalData = await blogModel.updateMany(
        { authorId : decodeToken.author_Id, ...data},
        {$set : {isDeleted : true}},
        {new : true}
        )
        if(finalData.modifiedCount == 0) return res.status(404).send({status : false, msg : 'No such blog available'})
        res.status(200).send({msg : finalData})
    }
    catch(err){
        res.send({msg : err.message})
    }
}



module.exports.createBlog = createBlog
module.exports.getBlogDetail = getBlogDetail
module.exports.deleteBlog = deleteBlog
module.exports.deletequery = deletequery
module.exports.UpdateBlog = UpdateBlog
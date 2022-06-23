const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')

const createBlog = async function(req,res){
    try{
    const bodyData = req.body
    let token = req.headers["x-Auth-token"]
    if(!token) token = req.headers["x-auth-token"]
    let decodeToken = jwt.verify(token,"this is my secret key")
//Edge Cases
    if(!req.body.title) return res.status(400).send("Please enter Title")
    if(!req.body.body) return res.status(400).send("Please enter Blog body")
    if(!req.body.category) return res.status(400).send("Please enter Blog category")

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
        const data = await blogModel.find({$and : [ { isPublished : true, isDeleted : false, ...querydata}]})
        if(!data) return res.status(404).send({status : false, msg : "No data found"})
        res.status(200).send({status : true, msg : data})
    }
    catch(err){
        res.status(500).send({status: false, msg : err.message})
    }
}


const deleteBlog = async function(req,res){
    try{
        const blogId = req.params.blogId
        console.log(blogId)
        const checkBlog = await blogModel.findById(blogId)
        if(!checkBlog) return res.status(404).send('No such blog')
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
    const blogId = req.params.blogId
    const updateData = await blogModel.findById(blogId)
console.log(data)
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
    const authorId =req.query.authorId
    const category = req.query.category
    const tags = req.query.tags
    const subcategory = req.query.subcategory
    const isPublished = req.query.isPublished
    // const blog = await blogModel.findById(blogId)
    // if(!blog) return res.send('no such blog')
    const finalData = await blogModel.updateMany(
        { $or :[{authorId : authorId}, {category : category}, {tags : tags}, {subcategory : subcategory},{isPublished : isPublished}]},
        {$set : {isDeleted : true}},
        {new : true}
        )
        if(finalData.modifiedCount == 0) return res.status(404).send({status : false, msg : 'No such blog available'})
        res.send({msg : finalData})
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
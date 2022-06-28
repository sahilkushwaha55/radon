const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')
const blogcontroller = require('../controller/blogcontroller')
const authorModel = require('../models/authorModel')
const mid = require('../middleware/auth')

//Create a new author account or document
router.post('/authors', authorController.authorCreate)

//Create a new blog document 
router.post('/blogs',mid.authenicate ,blogcontroller.createBlog)

//Get and see the detail of all blog and filter it with query params
router.get('/blogs',mid.authenicate ,blogcontroller.getBlogDetail)

//Update a blog using blog Id present in the path params(auhor can update only it own blog)
router.put('/blogs/:blogId', mid.authenicate,mid.authorisation,blogcontroller.UpdateBlog)

//Delete a blog using blog Id preesnt in the path params(auhtor can delete on its own blog)
router.delete('/blogs/:blogId', mid.authenicate, mid.authorisation,blogcontroller.deleteBlog)

//Delete blog using query params(only blog author can)
router.delete('/blogs', mid.authenicate, blogcontroller.deletequery)

//Author login API using valid email id and password
router.post('/login', authorController.authorLogin)


module.exports = router
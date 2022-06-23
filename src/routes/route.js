const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')
const blogcontroller = require('../controller/blogcontroller')
const authorModel = require('../models/authorModel')
const mid = require('../middleware/auth')


router.post('/createAuthor', authorController.authorCreate)

router.post('/createBlog',mid.authenicate ,blogcontroller.createBlog)

router.get('/getBlogDetail',mid.authenicate ,blogcontroller.getBlogDetail)

router.put('/blogs/:blogId', mid.authenicate,mid.authorisation,blogcontroller.UpdateBlog)

router.delete('/delete/:blogId', mid.authenicate, mid.authorisation,blogcontroller.deleteBlog)

router.delete('/deletequery', blogcontroller.deletequery)

router.post('/authorLogin', authorController.authorLogin)


module.exports = router
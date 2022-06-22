const express = require('express')
const router = express.Router()
//const usercontroller = require('../controller/usercontroller')
const authorController = require('../controller/authorController')
const blogcontroller = require('../controller/blogcontroller')


router.post('/createAuthor', authorController.authorCreate)

router.post('/createBlog', blogcontroller.createBlog)

router.get('/getBlogDetail', blogcontroller.getBlogDetail)

router.put('/blogs/:blogId', blogcontroller.UpdateBlog)

router.delete('/delete/:blogId', blogcontroller.deleteBlog)

router.delete('/delete', blogcontroller.deletequery)


module.exports = router
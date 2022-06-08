const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
const controllertoadd = require('../controllers/controllertoadd')
const bookschema = require('../models/bookschema')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/bookdetail", UserController.bookdetail )

// router.get("/getbookdetail", UserController.getbookdetail )

router.post('/saveauthor', controllertoadd.authordetail)

router.post('/savebook',controllertoadd.bookdetail)

router.post('/findauthor', controllertoadd.findauthor)

router.get('/updateprice', controllertoadd.updateprice)

router.get('/bookinrange', controllertoadd.inRange)

//========================find author by id===========================


router.get('/books-by-authorid/:Id',async function (req,res){
    let getid = req.params.Id
    let scdata= await bookschema.find( {author_id : getid}).select({name : 1, _id: 0})
    res.send(scdata)
})

router.get('/oldauthor', controllertoadd.oldauthor)


module.exports = router;
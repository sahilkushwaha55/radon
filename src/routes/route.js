const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const controllertoadd = require('../controllers/controllertoadd')

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

module.exports = router;
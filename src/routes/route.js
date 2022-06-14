const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid = require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", mid.logincheck, userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", mid.getuser,mid.checkuserid, userController.getUserData)

router.put("/users/:userId", mid.checkuserid, userController.updateUser)

router.delete('/users/:userId',mid.checkuserid, userController.deleteUser)

module.exports = router;
const express = require('express');
const router = express.Router();
const productcontroller = require('../controllers/productcontroller')
const createUser = require('../controllers/createuser')
const ordercontroller = require('../controllers/ordercontroller')
const MRC = require('../middlewares/middlewarecontroller')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post('/createproduct', productcontroller.createProduct)

router.post('/createuser', createUser.usercreate)

router.post('/createorder', MRC.orderHead, MRC.usercheck, MRC.productcheck, ordercontroller.createorder)



module.exports = router;
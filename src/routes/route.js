const express = require('express');

const try1=require('./myfunction.js')

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send("this file is access from"+ try1.abc)
    try1.funct()
    res.send('My first ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My second api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My third api!')
});

module.exports = router;
// adding this comment for no reason
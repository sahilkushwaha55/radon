const express = require('express');

const try1=require('./myfunction.js')  //my test

const try2=require('../logger/logger')  //problem one

const try3=require('../util/helper')   //problem two

const try4=require('../validator/formatter.js')  //problem three

const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log("this file is access from"+ try1.abc)
    try1.funct()
    res.send('My first ever api!')
});

router.get('/test-me2', function (req, res) {
    try2.welcome()
    res.send('My second api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My third api!')
    try3.printDate()
    try3.printMonth()
    try3.getBatchInfo()
});


router.get('/test-me4', function (req, res) {
    res.send('My second api!')
    // res.send("My original text  :"+try4.mytext)
    // res.send("My trim text  :"+ try4.trimmer)
    // res.send("My Upper text  :" + try4.upper)
    // res.send("My Lower text  :"+ try4.lower)
    console.log("My original text is :" + try4.mytext)
    console.log('My trim text is :' + try4.mytext.trim())
    console.log('My Upper text is :' + try4.mytext.toUpperCase())
    console.log('My Lower text is :' + try4.mytext.toLowerCase())
});


module.exports = router;
// adding this comment for no reason
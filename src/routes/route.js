const express = require('express');
const { json } = require('express/lib/response');

var _ = require('lodash');

const try2=require('../logger/logger')  //problem one

const try3=require('../util/helper')   //problem two

const try4=require('../validator/formatter.js')  //problem three

const router = express.Router();


//=================welcome problem==============================


router.get('/test-me', function (req, res) {
    try2.welcome()
    res.send('My second api!')
});


//==========================Date, Time and Batch information=================


router.get('/test-me2', function (req, res) {
    res.send('My third api!')
    try3.printDate()
    try3.printMonth()
    try3.getBatchInfo()
});



//=========================Trim,Upper case and lower case=================



router.get('/test-me3', function (req, res) {
    res.send('My second api!')
    console.log("My original text is :" + try4.mytext)
    console.log('My trim text is :' + try4.mytext.trim())
    console.log('My Upper text is :' + try4.mytext.toUpperCase())
    console.log('My Lower text is :' + try4.mytext.toLowerCase())
});



//=====================Lodash package problem========================


router.get('/hello', function (req, res) {
    res.send('lodash npm program of months')
    let months=['jan','fab','march','april','may','june','july','aug','sep','oct','nov','dec']
    let oddno=[1,3,5,7,9,11,13,15,17,19]
    let arry=[3,7,3,2,3]
    let arry2=[3,78,12,2,13]
    let arry3=[6,7,9,2,8]
    let arry4=[30,71,3,2,39]
    let keyvalues=[['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    let values=_.chunk(months, 4)
    console.log("split array using chunck" + values)
    console.log("get lasst 9 odd function using tail" +_.tail(oddno))
    console.log("merge 5 are with unique no: "+ _.union(oddno,arry,arry2,arry3,arry4))
    console.log( _.fromPairs(keyvalues))
});



module.exports = router;
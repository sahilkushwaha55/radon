const express = require('express');
const { json } = require('express/lib/response');

//const try1=require('./myfunction.js')  //my test

const try2=require('../logger/logger')  //problem one

const try3=require('../util/helper')   //problem two

const try4=require('../validator/formatter.js')  //problem three

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     console.log("this file is access from"+ try1.abc)
//     try1.funct()
//     res.send('My first ever api!')
// });

router.get('/test-me', function (req, res) {
    try2.welcome()
    res.send('My second api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
    try3.printDate()
    try3.printMonth()
    try3.getBatchInfo()
});


router.get('/test-me3', function (req, res) {
    res.send('My second api!')
    console.log("My original text is :" + try4.mytext)
    console.log('My trim text is :' + try4.mytext.trim())
    console.log('My Upper text is :' + try4.mytext.toUpperCase())
    console.log('My Lower text is :' + try4.mytext.toLowerCase())
});


router.get('/candidate/:name', function (req, res) {
    console.log("The request object is "+ JSON.stringify(req.params))
    console.log("Candidate name is :" + req.params.name)
    res.send('candidate name checker')
});


router.get('/candidate', function(req, res){
    console.log('Query parameters for this request are '+ JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state;
    let district = req.query.district;
    console.log('State is '+ state);
    console.log('Gender is '+gender);
    console.log('District is '+district);
    let candidate = ['Akash','Saloni','Sagar'];
    res.send(candidate);
})


router.get('/GET/movies',function(req, res){
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    res.send(movies)
})


router.get('/GET/movies/:no',function(req, res){
    console.log("The request object is "+ JSON.stringify(req.params))
    console.log("Candidate name is :" + req.params.no)
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    if(req.params.no<movies.length && req.params.no>=0)
    res.send(movies[req.params.no])
    else
    res.send('It is not a valid number')
})




router.get('/GET/films',function(req, res){
    let movies = [ {
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Nemo'
       }]
       
    res.send(movies)
})


router.get('/testing/purpose',function(req,res){
    console.log('show this things')
})


router.get('/GET/films/:filmId',function(req, res){
    console.log("The request Id is "+ JSON.stringify(req.params))
    console.log("Id name is :" + req.params.filmId)
    let movies = [ {
        id: 1,
        name: 'The Shining'
       }, {
        id: 2,
        name: 'Incendies'
       }, {
        id: 3,
        name: 'Rang de Basanti'
       }, {
        id: 4,
        name: 'Finding Nemo'
       }]


       let count=0
       for(let i=0;i<movies.length;i++){
        if(req.params.filmId==movies[i].id){
            count++
            res.send(movies[i])
        }
       }
       if(count===0)
       res.send('No movie exists with this id')
       
   // res.send(movies)
})



module.exports = router;
// adding this comment for no reason
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


//============Request, response and API problem class time===============


router.get('/candidate/:name', function (req, res) {
    console.log("The request object is "+ JSON.stringify(req.params))
    console.log("Candidate name is :" + req.params.name)
    res.send('candidate name checker')
});



router.get('/candidate', function(req, res){
    console.log('Query parameters for this request are '+ JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+ state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidate = ['Akash','Saloni','Sagar']
    res.send(candidate)
})


//============Assignment===================
//================Print array of movies name=============


router.get('/GET/movies',function(req, res){
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    res.send(movies)
})


//==========Request for any one movie by index and handel scenario=================


router.get('/GET/movies/:no',function(req, res){
    console.log("The request object is "+ JSON.stringify(req.params))
    console.log("Candidate name is :" + req.params.no)
    let movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    if(req.params.no<movies.length && req.params.no>=0)
    res.send(movies[req.params.no])
    else
    res.send('It is not a valid number')
})


//===================Print movie array of object====================



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


//===============Print movie object by it id==========================



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
})




//==================POST API cricket player problem======================



let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },{
        "name": "sahil",
        "dob": "1/1/1998",
        "gender": "male",
        "city": "varanasi",
        "sports": [
            "cricket"
        ]
    },

   ]

   
   router.post('/post/player',function(req, res){
    let element=req.body
    let check=0
    for (let i=0;i<players.length;i++){
        if(players[i].name===element.name)
        check++
    }
    if(check===0)
    players.push(element)
    else
    console.log("Player already exist")
    res.send(players)
})



module.exports = router;
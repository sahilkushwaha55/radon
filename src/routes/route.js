const express = require('express');
const { json } = require('express/lib/response');


const router = express.Router();




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
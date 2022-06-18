const axios = require('axios')

const getweather = async function(req,res){
    try{
    let q = req.query.q
    let appid = req.query.appid
    let options = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
    }
    let result = await axios(options)
   // res.status(200).send(result.data)
   res.status(200).send(result.data.main)
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}


const sortcities = async function(req,res){
    try{
    let options = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Bengaluru = await axios(options)
    let options2 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Mumbai = await axios(options2)
    let options3 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Delhi = await axios(options3)
    let options4 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Kolkata = await axios(options4)
    let options5 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Chennai = await axios(options5)
    let options6 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=London&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let London = await axios(options6)
    let options7 = {
        method : 'get',
        url : `http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=31ffb0d13db41af662659a81d176a4f9`
    }
    let Moscow = await axios(options7)
    let arr =[{
        city : Bengaluru.data.name,
        temp : Bengaluru.data.main.temp
    },
    {
        city : Mumbai.data.name,
        temp : Mumbai.data.main.temp
    },
    {
        city : Delhi.data.name,
        temp : Delhi.data.main.temp
    },
    {
        city : Kolkata.data.name,
        temp : Kolkata.data.main.temp
    },
    {
        city : Chennai.data.name,
        temp : Chennai.data.main.temp
    },
    {
        city : Moscow.data.name,
        temp : Moscow.data.main.temp
    },
    {
        city : London.data.name,
        temp : London.data.main.temp
    }
    ]
    let Srot = arr.sort(function(a,b){return a.temp-b.temp})
    res.status(200).send(Srot)
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}

module.exports.getweather = getweather
module.exports.sortcities = sortcities
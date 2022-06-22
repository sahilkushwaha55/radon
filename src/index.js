const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const route = require('./routes/route')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
//console.log('hello world')

mongoose.connect('mongodb+srv://sahilkushwaha:aasahil@cluster0.jluapfr.mongodb.net/blogProject?retryWrites=true&w=majority')
.then(()=> console.log('mongodb connected'))

app.use('/',route)

app.listen(process.env.PORT || 3000, function() {
    console.log("Express app running on port" + (process.env.PORT || 3000))
})
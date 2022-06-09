const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherco = require('../models/publisherModel')

const createBook= async function (req, res) {
    if(req.body.author_id && req.body.publisher){
        let getauthorid= null
        getauthorid = await authorModel.findById(req.body.author_id)
        if(getauthorid){
            let getpublisher = null
            getpublisher = await publisherco.findById(req.body.publisher)
            if(getpublisher){
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
            }
            else
            res.send('not a valid publisher')
    }
    else
    res.send("Not a valid author")
    }
    else{
        res.send(' Author id and publisher is required ')
    }
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id').populate('publisher')
    res.send({data: specificBook})

}


const updatedata = async function (req, res){
    let scdata = await bookModel.find( {$or : [ {publisher : "62a1cc5fd78d83fca4114009"}, {publisher : "62a1cc76d78d83fca411400b"} ] }).update({isHardCover: false })
    let mydata = await bookModel.find( {$or : [ {publisher : "62a1cc5fd78d83fca4114009"}, {publisher : "62a1cc76d78d83fca411400b"} ] })
    res.send(mydata)
}


const updateprice = async function (req,res){
    let scdata = await bookModel.find( {ratings : {$gt : 3.5}}).update( {$inc :{price : 10}})
    res.send("all price are increase")
}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updatedata = updatedata
module.exports.updateprice = updateprice

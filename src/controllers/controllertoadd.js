const authorSchema = require('../models/authorSchema')
const bookschema = require('../models/bookschema')


//============save author data=============

const authordetail = async function (req,res){
    let scdata = req.body
    let savedata = await authorSchema.create(scdata)
    res.send({ msg : savedata})
}


//============save book data==================


const bookdetail = async function (req,res){
    let scdata = req.body
    let savedata = await bookschema.create(scdata)
    res.send({ msg : savedata})
}


//=================find authoor book=============


const findauthor = async function (req,res){
    let scdata= req.body.author_name
    let getauthordata = await authorSchema.findOne({author_name : scdata})
    let getauthorid = getauthordata.author_id
    let getdetail= await bookschema.find({author_id : getauthorid})
    res.send({ msg: getdetail})
}



//=====================find book and update price=============


const updateprice = async function (req, res){
    let scdata = await bookschema.update(
        {name: "Two states"},
        { $set : {price : 100}}
    )
    let bookdetail = await bookschema.findOne( { name : "Two states"})
    let newprice= bookdetail.price
    let authorname= await authorSchema.findOne({author_id : bookdetail.author_id})
    res.send({AuthorName : authorname.author_name,
        NewPrice : newprice
    })
}



//===================find book b/w price range=======================


const inRange = async function (req, res){
    let scdata = await bookschema.find( {price :  { $gte: 50, $lte: 100}}).select({author_id : 1})
    let authorname = await authorSchema.find().select({author_name: 1, author_id :1})
    let final = 
    res.send(authorname)
}




//========================author older than 50 year===========================


const oldauthor = async function(req,res){
    let scdata = await authorSchema.find( {age : {$gt : 50}}).select({author_id : 1, author_name : 1, age : 1, _id: 0})
    let arry=[]
    let nameof=[]
    for (let i =0;i<scdata.length;i++){
        let try1 = undefined
        try1= await bookschema.findOne({$and : [ {author_id : scdata[i].author_id}, {ratings : {$gt : 4.0}}]}).select({author_id:1, _id:0})
        if(try1)
        arry.push(try1)
    }
    for ( let i=0;i<scdata.length;i++){
        for(let j=i;j<arry.length;j++){
            if (scdata[i].author_id==arry[j].author_id)
            nameof.push(scdata[i])
        }
    }
    res.send(nameof)
}



module.exports.authordetail=authordetail
module.exports.bookdetail=bookdetail
module.exports.findauthor = findauthor
module.exports.updateprice = updateprice
module.exports.inRange = inRange
module.exports.oldauthor = oldauthor
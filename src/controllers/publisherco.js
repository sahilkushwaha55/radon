const publisherco = require('../models/publisherModel')

const addpublisher = async function(req,res){
    const scdata = req.body
    const printdt = await publisherco.create(scdata)
    res.send(printdt)
}

module.exports.addpublisher = addpublisher
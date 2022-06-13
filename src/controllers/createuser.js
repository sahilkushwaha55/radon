const usersmodel = require('../models/user')

const usercreate = async function(req,res){
    const scdata = req.body
    const headData = req.headers.isfreeappuser
    if(headData){
        scdata.isFreeAppUser = headData
    const mydata = await usersmodel.create(scdata)
    res.send(scdata)
    }
    else
    res.send('isFreeAppUser request is missing a mandatory header')
}

module.exports.usercreate = usercreate
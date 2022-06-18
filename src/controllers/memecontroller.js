const axios = require('axios')

const getmeme = async function (req,res){
    try{
    let options = {
        method : "get",
        url : `https://api.imgflip.com/get_memes`
    }
    let result = await axios(options)
    res.status(200).send(result.data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const editmeme = async function(req,res){
    try{
    let temp = req.query.temp
    let text0 = req.query.text0
    let text1 =req.query.text1
    let user = req.query.user
    let pass = req.query.pass
    let options = {
        method : 'get',
        url : `https://api.imgflip.com/caption_image?template_id=${temp}&text0=${text0}&text1=${text1}&username=${user}&password=${pass}`
    }
    let result = await axios(options)
    res.status(200).send(result.data)
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}

module.exports.getmeme = getmeme
module.exports.editmeme = editmeme
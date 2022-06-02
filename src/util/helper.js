const today= new Date()
const printDate = function(){
    console.log("DAY :" +today.getDate())
}
const printMonth=function(){
    console.log("MONTH :" + (today.getMonth() + 1))
}
const getBatchInfo=function(){
    console.log("Radon, W2D2, the topic for today is Nodejs module system")
}

module.exports.printDate=printDate
module.exports.printMonth=printMonth
module.exports.getBatchInfo=getBatchInfo
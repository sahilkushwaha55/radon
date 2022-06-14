const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  let data = abcd.body;
  let savedData = await userModel.create(data);
  //console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

const loginUser = async function (req, res) {
   let userName = req.body.emailId;
   let password = req.body.password;

   let user = await userModel.findOne({ emailId: userName, password: password });
  
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
  //res.send ('login successful and token generated')
};

const getUserData = async function (req, res) {
  

   let userId = req.params.userId;
   let userDetails = await userModel.findById(userId);

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, {new : true});
  res.send({ status: user, data: updatedUser });
};




const deleteUser = async function (req, res) {
  
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
  
    let userData = req.body.isDeleted;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {isDeleted : userData}, {new : true});
    res.send({ status: user, data: updatedUser });
  };



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
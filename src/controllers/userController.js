const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (abcd, xyz) {
  try{
  let data = abcd.body;
  if( Object.keys(data).length !=0){
  let savedData = await userModel.create(data);
  xyz.status(201).send({ msg: savedData });
  }
  else xyz.status(400).send({msg : "BAD REQUEST"})
  }
  catch (error){
    console.log('This is the error : ', error.message)
    xyz.status(500).send({msg : "Error", error : error.message})
  }
};



const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};



const getUserData = async function (req, res) {

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    res.send({ status: true, data: userDetails });
};



const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};



const postMessage = async function (req, res) {
    let message = req.body.message
    
    let user = await userModel.findById(req.params.userId)
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
}



const deleteUser = async function(req,res){
  let scdata = req.params.userId
  let searchdata = await userModel.findOneAndUpdate({_id : scdata},{isDeleted : true}, {new : true})
  res.send ({status: true, data: searchdata})
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteUser = deleteUser

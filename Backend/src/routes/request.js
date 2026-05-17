const express = require("express")
const {userAuth}= require("../middlewares/auth.js");
const ConnectionRequest= require("../models/connectionRequest.js");
const User = require("../models/user.js");

const requestRouter= express.Router()

//:STATUS - it's used for dynamic api (interested or rejected)
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
   try{ 
       const fromUserId = req.user._id;
       const toUserId = req.params.toUserId;
       const status = req.params.status;
       const allowedStatus =["ignored","interested"];
       if(!allowedStatus.includes(status)){
         return res.status(400).json({message: "Invalid Status Type:"+status});
       }

       const toUser = await User.findById(toUserId);

       if(!toUser){
         return res.status(404).send({message:"User not exist"})
       }

       //if there is an existing connection requests

       const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
         {fromUserId,toUserId},
         {fromUserId:toUserId,toUserId:fromUserId},
        ]
       });
       if(existingConnectionRequest){
         return res.status(400).send({message:"Connection Request Already Exist"})
       }

       const connectionRequest = new ConnectionRequest({
         fromUserId,
         toUserId,
         status
       })
       const data = await connectionRequest.save();// agar database mai save karna hog toh .save use karogaoi
        
      

       res.json({
         message:req.user.firstName + " is " + status + " in " + toUser.firstName,
         data,
       })
   }catch(err)
   {
    res.status(400).send("ERROR :"+err.message)
   }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{

    const loggedInUser = req.user;
  

    const {status,requestId}= req.params;
   

    const allowedStatus =["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid Status"});

    };

    const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested" ,
    });
   


  if (!connectionRequest) {
 return res.status(404).json({
   message: "Connection request not found "
 });
}

    connectionRequest.status = status;
   

    const data = await connectionRequest.save();
    res.json({message: "Connection request  "+status,data});

  }catch(err){
    res.status(400).send("ERROR :"+ err.message)
  }
})



module.exports = requestRouter
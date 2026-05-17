const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest= require("../models/connectionRequest.js");
const { connection, connections } = require("mongoose");
const User =require("../models/user.js");
const userRouter = express.Router();
const User_Data  = "firstName lastName about skills age gender photUrl"

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
    

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status:"interested",
        })
        .populate("fromUserId",User_Data);
        // its is use for filtering
        

        res.json({message:"Data fetch Successfully",
            data:connectionRequests,
            
        })


    }catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
})

userRouter.get("/user/connection",userAuth,async(req,res)=>{
   try{

     const loggedInUser = req.user;

     const connectionRequests = await ConnectionRequest.find({
        $or:[
            { toUserId : loggedInUser._id,
              status:"accepted"
            },
            {
                fromUserId : loggedInUser._id,
                status:"accepted"
            }
        ]
     }).populate("fromUserId",User_Data)
     .populate("toUserId",User_Data)

        //map function is used for callbreak function 
        //row is define that what we are populate just show him
     const data = connectionRequests.map((row)=> {
        //.toString() is used to compare in mongoose function
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
         return row.fromUserId
    });

     res.json({data})

   }catch(err){
    res.status(400).send("ERROR :"+ err.message)
   } 
})

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        limit = limit>50 ?50 :limit;
        const skip = (page - 1)*limit;

        const connectionRequests = await ConnectionRequest.find({
          $or:[{fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
          ]
        }).select("fromUserId toUserId");
        
        const hideUserFromFeed = new Set();
         connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString())

        })

        const users = await User.find({
            $and:[
                {_id :{$nin :Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(User_Data)
        .skip(skip).limit(limit)

        res.json({data:users})
    }

    catch(err){
          res.status(400).send("ERROR :"+ err.message)
    }
})


module.exports = userRouter;
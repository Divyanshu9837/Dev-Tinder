const express = require("express")
const {userAuth}= require("../middlewares/auth.js")
const jwt=require("jsonwebtoken")
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")



const sendResetPasswordMail = async(name,email,token)=>{
    try{
        
    }catch(err){
        res.status(400).send({success:false,msg:error.message})
    }
    
}
const forgetRouter = express.Router()

forgetRouter.post("/forget-password",userAuth,async(req,res)=>{
try{

const email = req.body.email;
const userData= await User.findOne({email:email})
if(userData){
    const randomString = randomstring.generate();
    const data = await User.updateOne({email:email},{$set:{token:randomString}})

    res.status(200).send({success:true,msg:"Please check you inbox of mail "})

}else{
    res.status(200).send({success:true,msg:"this email does not exits"})
}
}catch(err){
    res.status(400).send({success:false,msg:error.message})

}
})


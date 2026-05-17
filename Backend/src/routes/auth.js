const express = require("express")
const authRouter= express.Router();
const jwt =require("jsonwebtoken");
const bcrypt= require("bcrypt");
const User =require("../models/user.js");
const { validationSignUpData } = require("../utils/validation.js");


authRouter.post("/signup",async(req ,res)=>{
  try{
    //validation 
    validationSignUpData(req);

    const{firstName,lastName,Email,Password,age,gender}= req.body;


    //Encrypting password

    const passwordHash = await bcrypt.hash(Password,10);
   
    
   
    //Creating a new instance of the User model
    const user = new User({
        firstName,
        lastName,
        Email,
        Password:passwordHash,
        age,
        gender
    })
  
        const savedUser= await user.save();
        const token = await savedUser.getJWT()
        res.cookie("token",token,
            {expires:new Date(Date.now()+8*3600000)}
        )
        
        res.json({message:"Data successfully added",data:savedUser})
    }
    catch(err)
    {
        res.status(408).send("Error:"+ err.message)
    }
});


authRouter.post("/login",async(req,res)=>{
try{
    const{Email,Password}= req.body;

    //verify email is present or not
    const user= await User.findOne({Email:Email});
    
    if(!user){
        throw new Error("Invalid Credentials!")
    }
    const isPasswordValid= await user.validatePassword(Password);
    if(isPasswordValid){

        const token = await user.getJWT()
       
        // Add the token to cookie and send the response back to the user

        res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
        //when you want to expires JWT token using expiresIN 
        res.send(user)
    }else{
        throw new Error("Invalid Credentials!")
    }
}
catch(err)
{
    res.status(400).send("ERROR: " + err.message)
}

});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    .send("logout successful!!")
})

module.exports = authRouter;
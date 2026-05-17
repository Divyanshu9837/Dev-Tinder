const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt= require("bcrypt");
const jwt =require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    firstName :{
        type:String
    },
    lastName:{
        type:String
    },
    Email:{
        type:String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not Correct formate:"+value)
            }
        }
    },
    Password:{
        type:String,
    },
    age:{
        type:Number,
       
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not correct")
            }
        }
    },
    about:{
        type:String,
        default:"default value should be entered"
    },
    photUrl:{
        type:String,
        default:"https://media.istockphoto.com/id/1133155626/photo/young-man-practicing-upward-facing-dog-pose.jpg?s=612x612&w=0&k=20&c=OurrPhYAyU2B2TkhHaspwoZmjGC91LR_l9DxF7pULCc="
    },
    skills:{
        type:[String],
        maxLength:5
      
    },
    token:{
        type:String,
        default:""
    }
},
{
    timestamps:true
})



userSchema.methods.getJWT = async function(){
    const user = this;
    const token =await jwt.sign({_id:user._id},"Anu@123@",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword =async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.Password;
    
   
    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPasswordValid;
}
module.exports= mongoose.model("User",userSchema);
const validator = require("validator");
const validationSignUpData =(req)=>{
    const{firstName,lastName,Email,Password}=req.body;//which one want you use validation
    if(!firstName || !lastName){
        throw new Error("Please Enter Your Name")
    }
    else if(firstName.length<3 || firstName.length>10){
        throw new Error("is Shoter than the minimum allowed length (4)")
    }
    else if(!validator.isEmail(Email)){
        throw new Error("Please Enter a Valid Email")
    }
    else if(!validator.isStrongPassword(Password) ){
        throw new Error("Please Enter a Strong Password")
    }

};
const validationEditProfileData=(req)=>{
    const allowedEditFields=["userName","lastName","age","gender","about","skills"]
    const isEditAllowed = Object.keys(req.body).every((fields)=>allowedEditFields.includes(fields)
)
return isEditAllowed;
};
 
module.exports={validationSignUpData,validationEditProfileData}
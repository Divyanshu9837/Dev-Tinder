const express = require("express");
const app = express();
const {admin}=require("./middlewares/auth.js")
const connectDB =require("./config/database.js")
const cookieParser= require("cookie-parser");
const cors = require("cors")

//Its is a middleware and is used for JSON data function
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/userR.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



 
connectDB()
.then(()=>{
    console.log(" Database is successfully connected");
    
app.listen(2001,()=>{
    console.log("server is running on port 2001")
})
    
})
.catch((err)=>{
    console.log("Database connection is  failed");
    
})


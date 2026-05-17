const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://dev:6Pt5fLkqMdaCyubw@namastenodejs.apnwrw2.mongodb.net/DevTender")
}

module.exports = connectDB

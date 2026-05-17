const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, 
        // its use for require to id of the person
        ref:"User",
        //reference to user collection
        required :true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :true

    },
    status:{
        type:String,
        required :true,

        //enum is a validator used for restrict a field value to predefined list of allowing options

        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`

        }
    }
},{
    timestamps:true,//for Date and time
});

//compound "index" is used for Querry run fast and take a short time to complete

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save", function(next) {

  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    return next(new Error("Cannot send connection request to yourself"));
  }
});

const ConnectionRequestModel= new mongoose.model("ConnectionRequest",
    connectionRequestSchema)
module.exports = ConnectionRequestModel;
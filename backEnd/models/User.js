const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName:{
      type:String,
      required:true,
      trim:true,
   },
   lastName:{
      type:String,
      required:true,
      trim:true,
   },
   email:{
      type:String,
      required:true,
      trim:true,
   },
   password:{
      type:String,
      required:true,
   },
   accountType:{
      type:String,
      enum:["Student","Admin", "Instructor"],
      required:true,
   },
   additionalDetails:{
      type:mongoose.Schema.Types.objectId,
      required:true,
      ref:"Profile",
   },
   courses:[
      {
         type:mongoose.Schema.Types.objectId,
         ref:"Course",
      }
   ],
   image:{
      type:String,
   },
   courseProgress:[
      {
         type:mongoose.Schema.Types.objectId,
         ref:"CourseProgress",
      }
   ],
   token:{
      type:String,
   },
   resetPasswordExpires:{
      type:Date,
   },
});

module.exports = mongoose.model("User", userSchema);
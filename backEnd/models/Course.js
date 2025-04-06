const mongoose = require("mongoose");
const Categories = require("./Category");

const courseSchema = new mongoose.Schema({
   coursename:{
      type:String,
   },
   courseDescription:{
      type:String,
   },
   instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   whatYouWillLearn:{
      type:String,
   },
   courseContent:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Section",
      }
   ],
   ratingAndReviews:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"RatingAndReview",
      }
   ],
   price:{
      type:String,
   },
   thumbnail:{
      type:String,
   },
   category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
   },
   studentsEnrolled:[
      {
         types:mongoose.Schema.Types.objectId,
         required:true,
         ref:"User",
      }
   ],
   tags:{
      type:String,
   },
});


module.exports = mongoose.model("Course",courseSchema);
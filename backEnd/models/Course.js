const mongoose = require("mongoose");

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
   tag:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Tag",
   },
   studentsEnrolled:[
      {
         types:mongoose.Schema.Types.objectId,
         required:true,
         ref:"User",
      }
   ],
});


module.exports = mongoose.model("Course",courseSchema);
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


exports.createCourse = async(req,res)=>{
   try{
      const {courseName , courseDescription , Price , category, whatYouWillLearn } = req.body;

      const thumbnail = req.files.thumbnailImage ; 


      if(!courseName || !courseDescription || !thumbnail || !Price || !category || !whatYouWillLearn){
         return res.status(401).json({
            success:false,
            message:"Please fill all the fields",
            details:{ courseName , courseDescription , thumbnail , Price, category , whatYouWillLearn},

         })
      }

      const userId = req.user.id;
      const insturctorDetails = await User.findById(userId);
      if(!insturctorDetails){
         return res.status(401).json({
            success:false,
            message:"Instructor not found",
         })
      }

      const categoryDetails = await Category.findById(category);
      if(!categoryDetails){
         return res.status(404).json({
            success:false,
            message:"category not Found"
         })
      }

      const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

      const newCourse = await Course.create({
         courseName,
         courseDescription,
         instructor:insturctorDetails._id,
         Price, 
         whatYouWillLearn:whatYouWillLearn,
         category:categoryDetails._id,
         thumbnail:thumbnailImage.secure_url,
      })

      await User.findByIdAndUpdate(
         {_id: insturctorDetails._id,},
         { $push:{courses:newCourse.id}},
         {new:true},
      );

      //update category Ka schema - HW
      await Category.findByIdAndUpdate(
         {_id:category},
         {$push :{course :newCourse.id}},
         {new:true},
      )

      return res.status(200).json({
         success:true,
         message:"Course created Successfully",
         data:newCourse,
      })

   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Something went wrong while creating the course",
         error:e.message,
      })
   }
}


exports.getAllCourses = async(req,res)=>{

   try{
      const allCourses = await Course.find({} , {
         courseName: true,
         price: true,
         thumbnail: true,
         instructor: true,
         ratingAndReviews: true,
         studentsEnroled: true,
      })
      .populate("instructor")
      .exec();
      
      return res.status(200).json({
          success:true,
          message:"Courses fetched Successfully",
          data:allCourses,
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Something went wrong while fetching the courses",
         error:e.message,
      })
   }
}


exports.getCourseDetails = async (req,res) => {
   try {
      const {courseId} = req.body;
      const courseDetails = await Course.find(
         {_id:courseId})
         .populate(
             {
                 path:"instructor",
                 populate:{
                     path:"additionalDetails",
                 },
             }
         )
         .populate("category")
         //.populate("ratingAndreviews")
         .populate({
             path:"courseContent",
             populate:{
                 path:"subSection",
             },
         })
         .exec();

      if(!courseDetails){
         return res.status(400).json({
            success:false,
            message:`could not find Any course with courseID : ${courseId}`,
         })
      }

      return res.status(200).json({
         success:true,
         message:"course Details fetched successFully",
         data:courseDetails,
      })
      
   }
   catch(e){

      console.log(e);
      return res.status(500).json({
         success:false,
         message:e.message,
      });
  
   }
}


exports.deleteAccount = async(req,res) => {
   try {
      const id = req.user.id;
      const userDetails = await User.findById(id);

      if(!userDetails) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      // Delete profile
      await Profile.findByIdAndDelete(userDetails.additionalDetails);
      
      // Delete user
      await User.findByIdAndDelete(id);

      // Clear the token cookie
      res.clearCookie("token");

      return res.status(200).json({
         success: true,
         message: 'User deleted successfully',
      });
   }
   catch(error) {  // Changed from 'e' to 'error' to match variable name
      return res.status(500).json({
         success: false,
         message: 'User cannot be deleted successfully',
         error: error.message,  // Changed from e.message to error.message
      });
   }
};


// a functionality in add course that onece created it will go into draft then after creating all the section and subsection
//  it will be inserted into stack and once approved by atleast one Admin it will be puublished
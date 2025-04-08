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


exports.getCourseDetails = async (req,res)=>
{
   try{
      const {courseId} = req.body;
      const courseDetails = await Course.findById(courseId)
                                                .populate(
                                                   {
                                                      path:"instructor",
                                                      populate:{
                                                         path:"additionalDetails",
                                                      },
                                                   }

                                                )
                                                .populate(
                                                   "category"
                                                ).populate(
                                                   "ratingAndreviews"
                                                ).populate(
                                                   {
                                                      path:"courseContent",
                                                      populate:{
                                                         path:"subSection",
                                                      },
                                                   }
                                                ).exec();
                                             
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

      console.log(error);
      return res.status(500).json({
         success:false,
         message:error.message,
      });
  
   }
}
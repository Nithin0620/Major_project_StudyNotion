const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


exports.createCourse = async(req,res)=>{
   try{
      const {courseName , courseDescription , Price , tag, whatYouWillLearn } = req.body;

      const thumbnail = req.files.thumbnailImage ; 


      if(!courseName || !courseDescription || !thumbnail || !Price || !tag || !whatYouWillLearn){
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

      const tagDetails = await Tag.findById(tag);
      if(!tagDetails){
         return res.status(404).json({
            success:false,
            message:"Tag not Found"
         })
      }

      const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

      const newCourse = await Course.create({
         courseName,
         courseDescription,
         instructor:insturctorDetails._id,
         Price,
         whatYouWillLearn:whatYouWillLearn,
         tag:tagDetails._id,
         thumbnail:thumbnailImage.secure_url,
      })

      await User.findByIdAndUpdate(
         {_id:userId},
         { $push:{courses:newCourse.id}},
         {new:true},
      );

      //update TAg Ka schema - HW
      await Tag.findByIdAndUpdate(
         {_id:tag},
         {$push :{course :newCourse.id}},
         {new:true},
      );

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


exports.showAllCourses = async(req,res)=>{

   try{
      const allCourses = await Course.find({});
      
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
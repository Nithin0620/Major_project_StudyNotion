const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res)=>{
   try{
      const {sectionName , courseId} = req.body;

      if(!sectionName , !courseId){
         return res.status(401).json({
            success:false,
            message:"All fields are required",
         })
      }

      const newSection = await Section.create({sectionName});
      const updatedCourseDetails = await Section.findByIdAndUpdate(
                                          courseId,
                                          {
                                             $push :{
                                                courseContent : newSection._id,
                                             }
                                          },
                                       {new:true})
                                       .populate({
                                          path:"courseContent",
                                          populate:{
                                             path:"subSection",
                                          },
                                       }).exec();
      
      return res.status(200).json({
         success:true,
         message:"new Course created successfully",
      })
   }
   catch(e){
      return res.status(500).json({
         succes:false,
         message:"error occured during creating new course",
      })
   }
}


exports.updateSection = async(req,res)=>{
   try{
      const {sectionName , courseId} = req.body;

      if(!sectionName , !courseId){
         return res.status(401).json({
            success:false,
            message:"Missing Fields",
         })
      }

      const section = await Section.findByIdAndUpdate(courseId,
                                                      {sectionName},
                                                      {new:true},
      )

      return res.status(200).json({
         success:true,
         message:'Section Updated Successfully',
     });

 }
 catch(error) {
     return res.status(500).json({
         success:false,
         message:"Unable to update Section, please try again",
         error:error.message,
     });
 }
}



exports.deleteSection = async(req,res)=>{
   try{
      const {sectionId} = req.params;

      await Section.findByIdAndDelete(sectionId) ;

      //TODO[Testing]: do we need to delete the entry from the course schema ??


      return res.status(200).json({
         success:true,
         message:"Section Deleted Successfully",
      })


   }
   catch(error) {
      return res.status(500).json({
         success:false,
         message:"Unable to delete Section, please try again",
         error:error.message,
      });
   }
}
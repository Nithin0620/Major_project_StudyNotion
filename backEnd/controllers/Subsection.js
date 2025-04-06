const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createSubSection= async(req,res)=>{

   try{
      const {sectionId , title,timeDuration , description}=req.body;

      const video = req.files.videoFile;

      if(!sectionId || !title || !timeDuration || !description || !video){
         return res.status(400).josn({
            success:false,
            message:"All fields are required",
         });
      }

      const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

      const subSectionDetails = await SubSection.create({
         title:title,
         timeDuration: timeDuration,
         description : description,
         videoUrl : uploadDetails.secure_url,
      })

      const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                            {
                                                               $push:{
                                                                  subSection : subSectionDetails._id,
                                                               }
                                                            },
                                                            {new:true})
                                                            .populate("subSection")
   
      return res.status(200).json({
         succcess:true,
         message:'Sub Section Created Successfully',
         updatedSection, 
      });
   }
   catch(error) {
      return res.status(500).json({
         success:false,
         message:"Internal Server Error",
         error:error.message,
      })
   }
};


//HW: updateSubSection

//HW:deleteSubSection
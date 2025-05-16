const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.updateProfile = async(req,res)=>{
   try{
      const {dateOfBirth = "" , gender , about="" , contactNumber} = req.body;

      const id = req.user.id;

      if(!contactNumber || !id || !gender){
         return res.status(400).json({
            success:false,
            message:"all fields Are Required",
         })
      }

      const userDetails = await User.findById(id);
      const profileId = userDetails.additionalDetails;
      const profileDetails = await Profile.findById(profileId);

      profileDetails.dateOfBirth = dateOfBirth;
      profileDetails.about = about;
      profileDetails.gender = gender;
      profileDetails.contactNumber = contactNumber;

      await profileDetails.save();

      // Get the full user details including the updated profile
      const updatedUser = await User.findById(id)
         .populate("additionalDetails")
         .exec();

      return res.status(200).json({
         success: true,
         message: "Profile Details saved successfully",
         profileDetails: updatedUser
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:e.message,
      })
   }
}


exports.deleteAccount = async(req,res)=>{
   try{
      const id = req.user.id;
      const userDetails = await User.findById(id);

      if(!userDetails){
         return res.status(400).json({
            success:false,
            message:"USer not found",
         })
      }

      await Profile.findByIdAndDelete(userDetails.additionalDetails);
      //TOOD: HW unenroll user form all enrolled courses

      await User.findByIdAndDelete(id);

      return res.status(200).json({
         success:true,
         message:'User Deleted Successfully',
      })

   }
   catch(error) {
      return res.status(500).json({
         success:false,
         messagrrore:'User cannot be deleted successfully',
         error:e.message,
      });
   }
};


exports.getUserDetails = async (req, res) => {

   try {
       //get id
       const id = req.user.id;

       //validation and get user details
       const userDetails = await User.findById(id).populate("additionalDetails").exec();
       //return response
       return res.status(200).json({
           success:true,
           message:'User Data Fetched Successfully',
           userDetails:userDetails,
       });
      
   }
   catch(error) {
       return res.status(500).json({
           success:false,
           message:error.message,
       });
   }
}



exports.updateDisplayPicture = async (req, res) => {
   try {
     const displayPicture = req.files.displayPicture
     const userId = req.user.id
     const image = await uploadImageToCloudinary(
       displayPicture,
       process.env.FOLDER_NAME,
       1000,
       1000
     )
     console.log(image)
     const updatedProfile = await User.findByIdAndUpdate(
       { _id: userId },
       { image: image.secure_url },
       { new: true }
     )
     res.send({
       success: true,
       message: `Image Updated successfully`,
       data: updatedProfile,
     })
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     })
   }
};
 
exports.getEnrolledCourses = async (req, res) => {
   try {
     const userId = req.user.id
     const userDetails = await User.findOne({
       _id: userId,
     })
       .populate("courses")
       .exec()
     if (!userDetails) {
       return res.status(400).json({
         success: false,
         message: `Could not find user with id: ${userDetails}`,
       })
     }
     return res.status(200).json({
       success: true,
       data: userDetails.courses,
     })
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     })
   }
};
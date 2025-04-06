const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res)=>{
   try{
      const {dateOfBirth = "" , gender , about="" , contactNumber} = req.body;

      const id = req.user.id;

      if(!contactNumber , !id , !gender){
         return res.status(400).json({
            success:fasle,
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

      return res.status(200).json({
         success:false,
         message:"Profile Details saved",
         profileDetails
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
         message:'User cannot be deleted successfully',
      });
   }
};


exports.getAllUserDetails = async (req, res) => {

   try {
       //get id
       const id = req.user.id;

       //validation and get user details
       const userDetails = await User.findById(id).populate("additionalDetails").exec();
       //return response
       return res.status(200).json({
           success:true,
           message:'User Data Fetched Successfully',
       });
      
   }
   catch(error) {
       return res.status(500).json({
           success:false,
           message:error.message,
       });
   }
}
const user = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

require("dotenv").config();



exports.sendOTP = async(req,res) =>{

   try{
      const {email} = req.body;
      
      const checkUserPresent = await user.findOne({email});

      if(checkUserPresent){
         return res.status(401).json({
            success:false,
            message:"User already registered"
         })
      }

      var otp = otpGenerator.generate(6,{
         upperCaseAlphabets : false,
         lowerCaseAlphabets : false,
         specialChars : false,
      })
      console.log("otp :" ,otp);

      let result = await OTP.findOne({otp:otp});
      while(result){
         otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
         })
         result = await OTP.findOne({otp:otp});
      }

      const otpPayload = {email,otp};
      const otpBody = await OTP.create(otpPayload);
      console.log("otpBody : ", otpBody);

      res.status(200).json({
         success:true,
         message:"Otp sent Successfylly",
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message: e.message,
      })
   }

};


exports.signUP = async(req,res) =>{
   try{

      const {
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
         accountType,
         contactNumber,
         otp,
      } = req.body;


      if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
         return res.status(403).json({
            success:false,
            message:"Please Fill all the fields",
         })
      }

      if(password !== confirmPassword){
         return res.status(400).json({
            success:false,
            message:"Password and Confirm Password should be same",
         })
      }

      const existingUser = await user.findOne({email});
      if(existingUser){
         return res.status(400).json({
            success:false,
            message:"User already exists",
         })
      }

      const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
      console.log(recentOtp);

      if(recentOtp.length === 0){
         return res.status(400).json({
            success:false,
            message:"OTP expired or not found",
         })
      }else if(recentOtp[0].otp !== otp){
         return res.status(400).json({
            success:false,
            message:"Invalid OTP",
         })
      }


      const hashedPassword = await bcrypt.hash(password,10);

      const profileDetails = await profile.create({
         gender:null,
         dateOfBirth :null,
         about : null,
         contactNumber : contactNumber,
      });

      const USER = await user.create({
         firstName,
         lastName,
         email,
         contactNumber,
         password:hashedPassword,
         accountType,
         profile : profileDetails._id,
         image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
      })

      return res.status(200).json({
         success:false,
         message:"User Registered Successfully",
         USER,
      })
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"User cannot be registrered. Please try again",
         
     })
   }
}

exports.logIN = async(req,res)=>{
   try{

   }
   catch(e){
      
   }
}
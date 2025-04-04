const user = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next)=>{
   try{
      const token = req.headers("Authorization").replace("Bearer ","") || req.body.token || req.cookies.token;
      if(!token){
         return res.status(401).json({

            success:false,
            message:"token is missing",
         })
      }
      try{
         const decode = jwt.verify(token, process.env.JWT_SECRET);
         console.log(docode);
         req.user = decode;
      }
      catch(e){
         return res.status(401).json({
            success:false,
            message:"token is invalid",
         });
      }
      next();

   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Something went wront while validating the token",
      });
   }
}


exports.isStudent = async(req,res,next) =>{
   try{
      if(req.user.accountType !== "Student"){
         return res.status(401).json({
            success:false,
            message:"This is a protected rouute for Students only",
         })
      }
      next();
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:'User role cannot be verified, please try again'
     })
   }
}

exports.isAdmin = async(req,res,next) =>{
   try{
      if(req.user.accountType !== "Admin"){
         return res.status(401).json({
            success:false,
            message:"This is a protected rouute for Admin only",
         })
      }
      next();
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:'User role cannot be verified, please try again'
     })
   }
}

exports.isInstructor = async(req,res,next) =>{
   try{
      if(req.user.accountType !== "Instructor"){
         return res.status(401).json({
            success:false,
            message:"This is a protected rouute for Instructor only",
         })
      }
      next();
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:'User role cannot be verified, please try again'
     })
   }
}
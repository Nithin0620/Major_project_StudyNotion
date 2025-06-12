const {instance} = require("../config/razorpay");
const Course =  require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/tamplets/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


exports.capturePayment = async(req,res)=>{
   const {course_id} = req.body;
   const userId = req.user.id;

   if(!course_id){
      return res.json({
         success:false,
         message:"Please provide valid Course ID",
      })
   }

   try{
      let course = await Course.findById(course_id);
      if(!course){
         return res.json({
            success:false,
            message:"Couldn't find the COurse ",
         })
      }
      const uid = new mongoose.Types.ObjectId.createFromTime(userId);

      if(course.studentsEnrolled.includes(uid)){
         return res.status(200).json({
            success:false,
            message:"Student already Registered",
         })
      }

   }
   catch(e){
      console.error(error);
      return res.status(500).json({
          success:false,
          message:error.message,
      });
   }

   const amount = course.price;
   const currency = "INR";

   const options = {
      amount:amount * 100,
      currency,
      receipt : Math.random(Date.now()).toString(),
      notes: {
         courseId:course_id,
         userId,
      }
   };

   try{
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      return res.status(200).json({
         success:true,
         courseName:course.courseName,
         courseDescription:course.courseDescription,
         thumbnail: course.thumbnail,
         orderId: paymentResponse.id,
         currency:paymentResponse.currency,
         amount:paymentResponse.amount,
      })
   }
   catch(error) {
      console.log(error);
      res.json({
          success:false,
          message:"Could not initiate order",
      });
   }

}


exports.verifySignature = async(req,res)=>{
   const webhookSecret = "12345678"

   const signature = req.header["x-razorpay-signature"];

   const shasum = crypto.createHmac("sha256",webhookSecret);
   shasum.update(JSON.stringify(req.body));
   const digest = shasum.digest("hex");

   if(signature === digest){
      console.log("Payment is Authorised");

      const {courseId , userId} = req.body.payment.entity.notes;

      try{
         const enrolledCourse = await Course.findOneAndUpdate(
                                             {_id:courseId},
                                             {$push:{studentEnrolled : userId}},
                                             {new:true},
         )

         if(!enrolledCourse){
            return res.status(500).josn({
               success:false,
               message:"Course Not Found",
            })
         }

         const enrolledStudent = await User.findOneAndUpdate(
                                             {_id:userId},
                                             {$push:{courses:courseId}},
                                             {new:true},
         )
         console.log(enrolledStudent);

         const emailResponse = await mailSender(
                                       enrolledStudent.email,
                                       "Congratulations from StudyNotion",
                                       "Congratulations, you are onboarded into new StudyNotion Course",
         )
      }
      catch(error) {
         console.log(error);
         return res.status(500).json({
            success:false,
            message:error.message,
         });
     }
   }
   else {
      return res.status(400).json({
            success:false,
            message:'Invalid request',
      });
   }
   
}
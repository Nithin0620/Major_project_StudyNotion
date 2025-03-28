const nodeMailer = require("nodemailer");
require("dotenv").config();

const mailSender = (email,title,body)=>{
   try{
      let transporter=nodeMailer.createTransporter({
         host:process.env.MAIL_HOST,
         auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
         }
      })
      let info = transporter.sendMail({
         from:"StudyNotion",
         to:`${email}`,
         subject:`${title}`,
         html:`<h1>${body}</h1>`
      })
      return info;
   }
   catch(e){
      console.log(e.message);

   }
}

module.exports = mailSender;
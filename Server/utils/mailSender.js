const nodeMailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {  // Added async
   try {
      let transporter = nodeMailer.createTransport({  // Fixed: createTransport instead of createTransporter
         host: process.env.MAIL_HOST,
         auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         }
      });

      let info = await transporter.sendMail({  // Added await
         from: "StudyNotion",
         to: `${email}`,
         subject: `${title}`,
         html: `<h1>${body}</h1>`
      });

      return info;
   }
   catch(e) {
      console.log(e.message);
      throw e;  // Re-throw error for proper error handling
   }
}

module.exports = mailSender;
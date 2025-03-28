const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = ()=>{
   mongoose.connect(process.env.DATABASE_URL,{

   })
   .then(()=>{console.log("data base connected Successfully")})
   .catch((e)=>{
      console.log("error occured during database connection");
      process.exit(1);
   })
}
const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = () => {
   mongoose.connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      family: 4,  // Use IPv4, skip trying IPv6
   })
   .then(() => {
      console.log("Database connected successfully")
   })
   .catch((error) => {
      console.log("Error connecting to database:", error.message);
      process.exit(1);
   })
}
const express = require("express");
const router= express.Router();


const {
   login,
   signUP,
   sendOTP,
   changePassword,
} = require("../controllers/Auth");


const {
   resetPasswordToken,
   resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../midlewares/auth");



router.post("/login", login);

router.post("/signup" , signUP);

router.post("/sendotp" , sendOTP);

router.post("/changepassword" , changePassword);


router.post("/reset-password-token" , resetPasswordToken);

router.post("/reset-password" , resetPassword);


module.exports = router;
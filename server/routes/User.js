
const express = require("express");
const router = express.Router();


const { registerUser, logIn,  sendOtp } = require("../controllers/Auth.js");
// const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");
// const router = require("./Profile");


// routes

//login
router.post("/login", logIn);

//signup
router.post("/signup", registerUser);

// otp
// router.post("/reset-password-token", resetPasswordToken);

// send otp
router.post('/sendotp', sendOtp);

// reset password
// router.post("/reset-password", resetPassword);


// logout
// router.post('/logout', logOut)



// export the router
module.exports = router;

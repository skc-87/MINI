require("dotenv").config();
const User = require("../models/User");
const OTP = require("../models/OTP");
// const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mailSender = require("../utils/mailSender");
// const twilio = require('twilio');
const accountSid = "ACba26daeb6cf744b8d51a1e50090bf623";
const authToken = "97b9d8f1ecd1723de69f200807959abc";
const client = require("twilio")(accountSid, authToken);

// sendOTP :- OTP must be verified before signUp

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from body of request
    console.log("req in send otp function -> ", req);
    const { contactNumber } = req.body;

    // check if user already exists
    // var checkUserPresent = await User.findOne({ contactNumber });

    // // if a user already exist , then send a response
    // if (checkUserPresent) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "User already exists..."
    //     });
    // }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check otp is unique or not
    const result = await OTP.findOne({ otp });

    // this method is wrong because we have to interact with db many times | in industry some library are used that always sends unique otp
    while (result) {
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    console.log("Otp generated : ", otp);

    // Send OTP via SMS
    let msgOption = {
      body: `Your OTP is: ${otp}. It is valid for 5 minutes`,
      from: "+13345390381",
      to: `+91${contactNumber}`,
    };

    const message = await client.messages.create(msgOption);
    console.log("Otp sent : ", message);
 

    // otp object
    const otpPayload = { contactNumber, otp };

    //create an entry for otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // const mailRes = mailSender({ otpPayload });
    // console.log(mailRes);

    //return response successfully

    res.status(200).json({
      success: true,
      message: "OTP created successfully",
      otp,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// signUp
exports.signUp = async (req, res) => {
  try {
    // fetch data from the body of the request
    const { firstName, lastName, email, contactNumber, otp } = req.body;
    console.log("In the backend -> ", req.body);

    // validating the details
    if (!firstName || !lastName || !email || !otp || !contactNumber) {
      return res.status(403).json({
        success: false,
        message: "Enter all the details carefully...",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ contactNumber });
    if (existingUser) {
      return res.status(400).json({
        success: true,
        message:
          "User is already exists, please goand login or try with another email address...",
      });
    }

    // finding the most recent otp
    const recentOtp = await OTP.find({ contactNumber })
      .sort({ createdAt: -1 })
      .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
    console.log(recentOtp);

    // validating the otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    console.log("otp verified");

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      // contactNumber: hashedContactNumber,
      // accountType,
      // approved: approved,
      // additionalDetails: profileDetails._id, // saving the id as reference
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    console.log("User registered successfully ");

    //return response
    return res.status(200).json({
      success: true,
      message: "User is registered successfully...",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "User can't be registered, please try again later...",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    //  get data from req body
    const { contactNumber, otp } = req.body;

    //validating the data
    if (!contactNumber || !otp) {
      res.status(403).json({
        success: false,
        message:
          "All fields are necessary, please enter the details carefully...",
      });
    }

    // check user existing or not
    const user = await User.findOne({ contactNumber });
    console.log("User found -> ", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, please go and register first...",
      });
    }

    const recentOtp = await OTP.find({ contactNumber })
      .sort({ createdAt: -1 })
      .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
    console.log("recent otp -> ", recentOtp);

    //generate jwt token, after matching the password
    if (recentOtp[0].otp === otp) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      // console.log("payload");

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      // req.user=user;
      console.log("token");
      user.otp = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Please check otp...",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again later...",
    });
  }
};

// change password
// exports.changePassword = async (req, res) => {

//     try {

//         const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

//         const user = await User.findOne({ email });

//         // verify the user with the email address
//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found, please go and register first..."
//             });
//         }

//         // verify password
//         if (!(await bcrypt.compare(oldPassword, user.password))) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Wrong password please try using forgot password..."
//             });
//         }

//         // update the password
//         const updateResponse = await User.findOneAndUpdate(
//             req.user.id,
//             {
//                 password: oldPassword
//             }
//         );

//         // mailing feature is left

//     } catch (e) {

//         console.log(e);
//         return res.status(500).json({
//             success: false,
//             message: "Please try again later..."
//         })

//     }

// }

const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const twilio = require("twilio");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP.js");
const mailSender = require("../utils/mailSender.js");

// Generate the token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    console.log("User ID to generate token -> ", userId);

    // Assuming method names should be generateAccessToken and generateRefreshToken
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Save without validating

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error in LogIn user -> ", error);

    const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
    const message = error?.errors || "Internal Server Error"; // Get the error message

    return res.status(statusCode).json({
      statuscode: statusCode,
      data: null,
      success: false,
      message: message, // Include the message in the response
      errors: error || [], // Include specific errors if any
    });
  }
};

// send otp
const sendOtp = async (req, res) => {
  try {
    // fetch email from body of request
    console.log("req in send otp function -> ", req.body);
    const { email, contactNumber } = req.body;
    // console.log(`Email -> ${email} contactNumber -> ${contactNumber}`)

    // generate otp
    var otpGenerated = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check otp is unique or not
    const result = await OTP.findOne({ otpGenerated });

    // this method is wrong because we have to interact with db many times | in industry some library are used that always sends unique otp
    while (result) {
      var otpGenerated = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otpGenerated });
    }
    console.log("Otp generated : ", otpGenerated);

    // Send OTP via SMS
    // if (contactNumber) {
    //   let msgOption = {
    //     body: `Your One-Time Password (OTP) for Saarthi is: ${otpGenerated}. It is valid for 5 minutes. Please do not share this OTP with anyone. Enjoy exploring India's rich cultural heritage with Saarthi !!`,
    //     from: "+18142001751",
    //     to: `+91${contactNumber}`,
    //   };

    //   const accountSid = process.env.ACCOUNT_SID;
    //   const authToken = process.env.AUTH_TOKEN;

    //   console.log(`Account sid ${accountSid} and Auth Token ${authToken}`);

    //   const client = twilio(accountSid, authToken);

    //   const message = await client.messages.create(msgOption);
    //   console.log("Otp sent : ", message);
    // } else {
    // send via email
    //   const title = "Verification Email from Saarthi";
    //   const msg = `This mail is to provide you with your One-Time Password (OTP) for Saarthi. It is valid for 5 minutes. Please do not share this OTP with anyone.<br>Enjoy exploring India's rich cultural heritage with Saarthi !!`;

    //   const name = "";
    //   const data = otpGenerated;

    //   const mailRes = mailSender({ email, data, title, msg, name });
    //   console.log("Mail res -> ", mailRes);
    // }

    // otp object
    const otpPayload = { contactNumber, otpGenerated, email };
    console.log(`Otp payload : ${otpPayload}`);

    //create an entry for otp
    const otpBody = await OTP.create({
      contactNumber: contactNumber || "",
      otp: otpPayload.otpGenerated,
      email: otpPayload.email || "",
    });
    console.log("OTP body -> ", otpBody);

    return res
      .status(201)
      .json(new ApiResponse(200, {}, "Otp created Successfully"));
  } catch (error) {
    console.log("Error in sending otp -> ", error);

    const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
    const message = error?.errors || "Internal Server Error"; // Get the error message

    return res.status(statusCode).json({
      statuscode: statusCode,
      data: null,
      success: false,
      message: message, // Include the message in the response
      errors: error || [], // Include specific errors if any
    });
  }
};

// register user
// const registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, contactNumber, email, password, otp } = req.body;
//     console.log("Req body in register user -> ", req.body);

//     // validate the data of the user
//     if (!firstName || !lastName || !contactNumber || !email || !password || !otp) {
//       //   throw new ApiError(400, {}, "Please proivide the credentials carefully");
//       throw new Error(400, {}, "Please provide the credentials carefully");
//     }

//     // find if the user exists already
//     const existingUser = await User.findOne({
//       $or: [{ contactNumber }, { email }],
//     });

//     // console.log("Existing user -> ", existingUser);

//     // If user exists already suggest for login
//     if (existingUser) {
//       // throw new ApiError(409, {}, "The user already exists.. please go and login")
//       throw new Error(400, {}, "The user already exists");
//     }

//     const recentOtp = await Otp.find({ $or: [{ contactNumber }, { email }] })
//       .sort({ createdAt: -1 })
//       .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
//     console.log("recent otp -> ", recentOtp);

//     if (recentOtp[0]?.otp != otp) {
//       //   throw new ApiError(401, {}, "Invalid OTP");
//       throw new Error(400, {}, "The user already exists");
//     }

//     // check files in the req
//     // const files = req?.files;
//     // console.log("Files in the register in the register user -> ", files.profileImg)

//     // if (!files) {
//     //     throw new ApiError(400, {}, "Please provide the profile image");
//     // }

//     // const pathOfImg = files?.profileImg[0]?.path;
//     // // console.log("Path of the image file -> ", pathOfImg);

//     // if (!pathOfImg) {
//     //     throw new ApiError(400, {}, "Error in path of the image");
//     // }

//     // upload the image to cloudinary
//     // const uploadedImg = await uploadOnCloudinary(pathOfImg);
//     // console.log("Response from cloudinary -> ", uploadedImg);

//     // if (!uploadedImg) {
//     //     throw new ApiError(400, {}, "Error in uploading image to cloudinary");
//     // }

//     // register the user
//     const registeredUser = await User.create({
//       firstName,
//       lastName,
//       profileImg: uploadedImg?.secure_url || " ",
//       contactNumber: contactNumber || "",
//       email: email || "",
//       password,
//     });

//     console.log("Registered user -> ", registeredUser);

//     if (!registeredUser) {
//       throw new ApiError(400, {}, "Error in registering the user");
//     }

//     const {
//       password: _,
//       createdAt,
//       updatedAt,
//       ...userData
//     } = registeredUser._doc;

//     // console.log("User Data -> ",userData);

//     await Otp.findOneAndDelete({
//       $or: [{ contactNumber }, { email }],
//     });

//     return res
//       .status(201)
//       .json(new ApiResponse(200, userData, "User Registered Successfully"));
//   } catch (error) {
//     console.log("Error in register user -> ", error);

//     const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
//     const message = error?.errors || "Internal Server Error"; // Get the error message

//     return res.status(statusCode).json({
//       statuscode: statusCode,
//       data: null,
//       success: false,
//       message: message, // Include the message in the response
//       errors: error || [], // Include specific errors if any
//     });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, email, password, otp } =
      req.body;
    console.log("Req body in register user -> ", req.body);

    // Validate the data of the user
    // if (!firstName || !lastName || !contactNumber || !email || !otp) {
    //   throw new Error("Please provide the credentials carefully");
    // }

    // Find if the user exists already
    const existingUser = await User.findOne({
      $or: [{ contactNumber }, { email }],
    });

    // If user exists already suggest for login
    if (existingUser) {
      throw new Error("The user already exists, please login");
    }

    const recentOtp = await OTP.find({ $or: [{ contactNumber }, { email }] })
      .sort({ createdAt: -1 })
      .limit(1); // Sorting in reverse order to get the most recent OTP

    console.log("recent otp -> ", recentOtp);

    if (recentOtp[0]?.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    // Register the user
    const registeredUser = await User.create({
      firstName,
      lastName,
      contactNumber,
      email,
      //   password,
      //   profileImg: uploadedImg?.secure_url || " ",
    });

    console.log("Registered user -> ", registeredUser);

    if (!registeredUser) {
      throw new Error("Error in registering the user");
    }

    const {
      password: _,
      createdAt,
      updatedAt,
      ...userData
    } = registeredUser._doc;

    // Remove the OTP after successful registration
    await OTP.findOneAndDelete({
      $or: [{ contactNumber }, { email }],
    });

    return res.status(201).json({
      statuscode: 200,
      data: userData,
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Error in register user -> ", error);

    const statusCode = error.statusCode || 500; // Use 500 as default if no status code is defined
    const message = error.message || "Internal Server Error"; // Get the error message

    return res.status(statusCode).json({
      statuscode: statusCode,
      data: null,
      success: false,
      message: message, // Include the message in the response
      errors: error.stack || [], // Include specific errors if any
    });
  }
};

// logIn the user
const logIn = async (req, res) => {
  try {
    const { email, contactNumber, password, otp } = req.body;
    console.log(
      `Email -> ${email}, Phone No. -> ${contactNumber}, Password -> ${password} otp -> ${otp}`
    );

    // const contactNumber = contactNumber;

    if (!email && !contactNumber) {
      throw new ApiError(
        400,
        {},
        "Please provide either email or contactNumber."
      );
    }

    const user = await User.findOne({
      $or: [
        { email: email || null }, // Match email if provided
        { contactNumber: contactNumber || null }, // Match contactNumber if provided
      ],
    });

    console.log("User in db -> ", user);

    if (!user) {
      throw new ApiError(400, {}, "User not registered");
    }

    if (email) {
      if (!password) {
        throw new ApiError(400, {}, "Please provide your password");
      }

      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
        throw new ApiError(400, {}, "Incorrect Password");
      }
    } else {
      if (!otp) {
        throw new ApiError(400, {}, "Please provide your otp");
      }

      const recentOtp = await OTP.find({ contactNumber })
        .sort({ createdAt: -1 })
        .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
      console.log("recent otp -> ", recentOtp);

      if (recentOtp[0].otp !== otp) {
        throw new ApiError(400, {}, "Please enter correct otp");
      }
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user?._id
    );

    if (!accessToken || !refreshToken) {
      throw new ApiError(400, {}, "Error in generating token");
    }

    const { password: _, refreshToken: __, ...userResponse } = user.toObject();

    console.log(`USer response -> ${userResponse}`);
    console.log(`Acess Token -> ${accessToken}`);

    const options = {
      httpOnly: true,
      secure: false,
      domain: "localhost",
      maxAge: 86400,
    };

    await OTP.findOneAndDelete({ contactNumber });

    // return res
    //   .status(200)
    //   .cookie("accessToken", accessToken, options)
    //   .cookie("refreshToken", refreshToken, options)
    //   .json(
    //     new ApiResponse(
    //       200,
    //       {
    //         loggedInUser: userResponse,
    //       },
    //       "User logged In Successfully"
    //     )
    //   );

    // return res
    //   .status(200)
    //   .cookie("accessToken", accessToken, options)
    //   // .cookie("refreshToken", refreshToken, options)
    //   .json({
    //     statuscode: 200,
    //     data: {
    //       loggedInUser: userResponse,
    //     },
    //     success: true,
    //     message: "User logged in successfully",
    //   });

    return res.status(200).json({
      statuscode: 200,
      data: {
        loggedInUser: userResponse,
      },
      success: true,
      message: "User logged in successfully",
      accessToken: accessToken, // Send the token in the response body (commonly done)
    });

  //   res.cookie("token", accessToken, options).status(200).json({
  //     success: true,
  //     accessToken,
  //     userResponse,
  //     message: "Logged in successfully"
  // })
    
  } catch (error) {
    console.log("Error in LogIn user -> ", error);

    const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
    const message = error?.errors || "Internal Server Error"; // Get the error message

    return res.status(statusCode).json({
      statuscode: statusCode,
      data: null,
      success: false,
      message: message, // Include the message in the response
      errors: error || [], // Include specific errors if any
    });
  }
};

// logOut
// const logOut = async (req, res) => {
//   try {
//     // console.log("User to be logout -> ", req);

//     const cookies = req?.cookies;

//     // console.log("Cookies in logout -> ", cookies)

//     const { accessToken, refreshToken } = cookies;

//     if (!accessToken) {
//       throw new ApiError(400, {}, "No cookies found, user alredy logOut");
//       // throw new Error(403, "User not logged in");
//     }

//     // console.log("accessToken -> ", accessToken);

//     const decodedAccessToken = jwt.verify(
//       accessToken,
//       process.env.ACCESS_TOKEN_SECRET
//     );

//     console.log("Decoded Token -> ", decodedAccessToken);

//     const logOutUser = await User.findByIdAndUpdate(
//       decodedAccessToken._id,
//       {
//         $unset: {
//           refreshToken: "",
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     if (!logOutUser) {
//       throw new ApiError(400, "Error in deleting access token");
//     }

//     const options = {
//       httpOnly: true,
//       secure: false,
//     };

//     return res
//       .status(200)
//       .clearCookie("accessToken", options)
//       .clearCookie("refreshToken", options)
//       .json(new ApiResponse(200, {}, "User log out successfully"));
//   } catch (error) {
//     console.log("Error in logout user -> ", error);

//     const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
//     const message = error?.errors || "Server Error"; // Get the error message

//     return res.status(statusCode).json({
//       statuscode: statusCode,
//       data: null,
//       success: false,
//       message: message, // Include the message in the response
//       errors: error || [], // Include specific errors if any
//     });
//   }
// };

module.exports = {
  generateAccessAndRefreshToken,
  registerUser,
  logIn,
  // logOut,
  sendOtp,
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User.js");

// auth
// exports.auth = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer", "");

//     console.log("TOken in middleware -> ", token);

//     if (!token) {
//       throw new ApiError(401, {}, "Unauthorized request");
//     }

//     // console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
//     const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     console.log("Decoded token: ", decodedToken);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       // Discuss about front-end
//       throw new ApiError(401, {}, "Invalid Access Token");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in auth middleware  -> ", error);

//     const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
//     const message = error?.errors || "Internal Server Error"; // Get the error message

//     return res.status(statusCode).json({
//       statuscode: statusCode,
//       data: null,
//       success: false,
//       message: message, // Include the message in the response
//       errors: error, // Include specific errors if any
//     });
//   }
// };

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    console.log("Token in middleware -> ", token);

    if (!token) {
      throw new ApiError(401, {}, "Unauthorized request");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log("Decoded token: ", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, {}, "User not found or invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware -> ", error);

    // Handle different types of JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        statuscode: 401,
        data: null,
        success: false,
        message: "Invalid token",
        errors: error,
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        statuscode: 401,
        data: null,
        success: false,
        message: "Token has expired",
        errors: error,
      });
    }

    // Handle other generic errors
    const statusCode = error.statuscode || 500;
    const message = error?.errors || "Internal Server Error";
    return res.status(statusCode).json({
      statuscode: statusCode,
      data: null,
      success: false,
      message: message,
      errors: error,
    });
  }
};

// is Admin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log("In the try of isAdmin...");
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin...",
      });
    }
    console.log("Try of isAdmin ends here...");
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "User role cant't be verified...",
    });
  }
};

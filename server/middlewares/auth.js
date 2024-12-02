const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// auth
exports.auth = async (req, res, next) => {

    try {
        //extract tokken
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        //if token is missing, then return reponse
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing...",
            });
        }

        //verify the token
        try {
            console.log("Authenticating...")
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (e) {
            // verification-issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid...",
            });
        }

        console.log("Authenticated...")
        next();

    } catch (e) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the tokem..."
        });

    }

}







// is Admin
exports.isAdmin = async (req, res, next) => {

    try {
        console.log("In the try of isAdmin...");
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin..."
            });
        }
        console.log("Try of isAdmin ends here...");
        next();
    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "User role cant't be verified..."
        });

    }

}
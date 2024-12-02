const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const twilio = require("twilio");
const otpGenerator = require("otp-generator");
const { Otp } = require("../models/OTP.model.js");
const { mailSender } = require("../utils/mailSender.js");



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
}



// send otp
const sendOtp = async (req, res) => {
    try {
        // fetch email from body of request
        console.log("req in send otp function -> ", req.body)
        const { email, phoneNo } = req.body;
        // console.log(`Email -> ${email} PhoneNo -> ${phoneNo}`)


        // generate otp
        var otpGenerated = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // check otp is unique or not
        const result = await Otp.findOne({ otpGenerated });

        // this method is wrong because we have to interact with db many times | in industry some library are used that always sends unique otp
        while (result) {
            var otpGenerated = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await Otp.findOne({ otpGenerated });
        }
        console.log("Otp generated : ", otpGenerated);


        // Send OTP via SMS
        if (phoneNo) {
            let msgOption = {
                body: `Your One-Time Password (OTP) for Saarthi is: ${otpGenerated}. It is valid for 5 minutes. Please do not share this OTP with anyone. Enjoy exploring India's rich cultural heritage with Saarthi !!`,
                from: "+18142001751",
                to: `+91${phoneNo}`,
            };

            const accountSid = process.env.ACCOUNT_SID;
            const authToken = process.env.AUTH_TOKEN;

            console.log(`Account sid ${accountSid} and Auth Token ${authToken}`);

            const client = twilio(accountSid, authToken);


            const message = await client.messages.create(msgOption);
            console.log("Otp sent : ", message);

        } else {
            // send via email
            const title = "Verification Email from Saarthi"
            const msg = `This mail is to provide you with your One-Time Password (OTP) for Saarthi. It is valid for 5 minutes. Please do not share this OTP with anyone.<br>Enjoy exploring India's rich cultural heritage with Saarthi !!`;

            const name = "";
            const data = otpGenerated;


            const mailRes = mailSender({ email, data, title, msg, name });
            console.log("Mail res -> ", mailRes);

        }


        // otp object
        const otpPayload = { phoneNo, otpGenerated, email };
        console.log(`Otp payload : ${otpPayload}`)


        //create an entry for otp
        const otpBody = await Otp.create(
            {
                phoneNo: otpPayload.phoneNo || "",
                otp: otpPayload.otpGenerated,
                email: otpPayload.email || ""
            }
        );
        console.log("OTP body -> ", otpBody);


        return res.status(201).json(
            new ApiResponse(200, {}, "Otp created Successfully")
        )

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
}



// register user
const registerUser = async (req, res) => {

    try {

        const { firstName, lastName, phoneNo, email, password, otp } = req.body;
        console.log("Req body in register user -> ", req.body);

        // validate the data of the user
        if (!firstName || !lastName || !phoneNo || !email || !password || !otp) {
            throw new ApiError(400, {}, "Please proivide the credentials carefully");
        }

        // find if the user exists already
        const existingUser = await User.findOne({
            $or: [{ phoneNo }, { email }]
        });

        // console.log("Existing user -> ", existingUser);

        // If user exists already suggest for login
        if (existingUser) {
            throw new ApiError(409, {}, "The user already exists.. please go and login")
        }

        const recentOtp = await Otp.find({ $or: [{ phoneNo }, { email }] })
            .sort({ createdAt: -1 })
            .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
        console.log("recent otp -> ", recentOtp);


        if (recentOtp[0]?.otp != otp) {
            throw new ApiError(400, {}, "Please enter correct otp");
        }



        // check files in the req
        const files = req?.files;
        console.log("Files in the register in the register user -> ", files.profileImg)

        if (!files) {
            throw new ApiError(400, {}, "Please provide the profile image");
        }

        const pathOfImg = files?.profileImg[0]?.path;
        // console.log("Path of the image file -> ", pathOfImg);

        if (!pathOfImg) {
            throw new ApiError(400, {}, "Error in path of the image");
        }



        // upload the image to cloudinary
        const uploadedImg = await uploadOnCloudinary(pathOfImg);
        // console.log("Response from cloudinary -> ", uploadedImg);

        if (!uploadedImg) {
            throw new ApiError(400, {}, "Error in uploading image to cloudinary");
        }


        // register the user
        const registeredUser = await User.create({
            firstName,
            lastName,
            profileImg: uploadedImg?.secure_url || " ",
            phoneNo: phoneNo || "",
            email: email || "",
            password
        })

        console.log("Registered user -> ", registeredUser);

        if (!registeredUser) {
            throw new ApiError(400, {}, "Error in registering the user")
        }

        const { password: _, createdAt, updatedAt, ...userData } = registeredUser._doc;

        // console.log("User Data -> ",userData);

        await Otp.findOneAndDelete({
            $or: [
                { phoneNo },
                { email }
            ]
        });


        return res.status(201).json(
            new ApiResponse(200, userData, "User Registered Successfully")
        )


    } catch (error) {
        console.log("Error in register user -> ", error);

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


}



// logIn the user
const logIn = async (req, res) => {
    try {
        const { email, phoneNo, password, otp } = req.body;
        console.log(`Email -> ${email}, Phone No. -> ${phoneNo}, Password -> ${password} otp -> ${otp}`);

        if (!email && !phoneNo) {
            throw new ApiError(400, {}, "Please provide either email or phoneNo.");
        }


        const user = await User.findOne({
            $or: [
                { email: email || null },  // Match email if provided
                { phoneNo: phoneNo || null } // Match phoneNo if provided
            ]
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

            const recentOtp = await Otp.find({ phoneNo })
                .sort({ createdAt: -1 })
                .limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
            console.log("recent otp -> ", recentOtp);

            if (recentOtp[0].otp !== otp) {
                throw new ApiError(400, {}, "Please enter correct otp");
            }

        }



        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);

        if (!accessToken || !refreshToken) {
            throw new ApiError(400, {}, "Error in generating token");
        }

        const { password: _, refreshToken: __, ...userResponse } = user.toObject();

        const options = {
            httpOnly: true,
            secure: false
        }

        await Otp.findOneAndDelete({ phoneNo });


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        loggedInUser: userResponse
                    },
                    "User logged In Successfully"
                )
            )


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
}




// logOut
const logOut = async (req, res) => {
    try {
        // console.log("User to be logout -> ", req);

        const cookies = req?.cookies;

        // console.log("Cookies in logout -> ", cookies)

        const { accessToken, refreshToken } = cookies;

        if (!accessToken) {
            throw new ApiError(400, {}, "No cookies found, user alredy logOut")
            // throw new Error(403, "User not logged in");
        }

        // console.log("accessToken -> ", accessToken);

        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token -> ", decodedAccessToken);


        const logOutUser = await User.findByIdAndUpdate(
            decodedAccessToken._id,
            {
                $unset: {
                    refreshToken: ""
                }
            },
            {
                new: true
            }
        )

        if (!logOutUser) {
            throw new ApiError(400, "Error in deleting access token");
        }

        const options = {
            httpOnly: true,
            secure: false
        }


        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(200, {}, "User log out successfully")
            )




    } catch (error) {
        console.log("Error in logout user -> ", error);

        const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
        const message = error?.errors || "Server Error"  // Get the error message

        return res.status(statusCode).json({
            statuscode: statusCode,
            data: null,
            success: false,
            message: message, // Include the message in the response
            errors: error || [], // Include specific errors if any
        });
    }
}


module.exports = {
    generateAccessAndRefreshToken,
    registerUser,
    logIn,
    logOut,
    sendOtp
};


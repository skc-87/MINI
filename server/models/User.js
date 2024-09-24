
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    // accountType: {
    //     type: String,
    //     enum: ["Customer", "Agent"],
    //     required: true
    // },
    token: {
        type: String,
    },
    image: {
        type: String, // It will be storing the url of the image
        required: true
    },


    // password: {
    //     type: String,
    //     required: true,
    // },
    // additionalDetails: {
    //     type: mongoose.Schema.Types.ObjectId, // It will store id
    //     required: true,
    //     ref: "Profile" // It will be referring to the Profile model
    // },
    // courses: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Courses" // It will be reffering to the Courses Model
    // }],
    
    // courseProgress: [
    //     { // Here it will be an array and each element will be as the following
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "CourseProgress"  // It will be reffering to the CoursesProgress model
    //     }
    // ],

    // resetPasswordExpires: {
    //     type: Date,
    // }

});


// mailing function
// async function sendVerificationEmail(email) {

//     try {
//         const mailResponse = await mailSender(email, "Registration Email from StudyNotion", "Congratulations you are successfully logedin");
//         console.log("Mail send successfully...");
//         console.log(mailResponse);
//     } catch (e) {
//         console.log("Error in sending otp...");
//         console.log(e);
//         throw e;
//     }

// }

// userSchema.pre("save", async function (next) {
//     await sendVerificationEmail(this.email);
//     next();
// });

module.exports = mongoose.model("User", userSchema);
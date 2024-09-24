const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({

    contactNumber: {
        type: Number,
        required: true,
    },
    otp: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },

});


// mailing function
// async function sendVerificationEmail(email, otp) {

//     try {
//         const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
//         console.log("Mail send successfully...");
//         console.log(mailResponse);
//     } catch (e) {
//         console.log("Error in sending otp...");
//         console.log(e);
//         throw e;
//     }

// }

// OTPSchema.pre("save", async function (next) {
//     await sendVerificationEmail(this.email, this.otp);
//     next();
// });


module.exports = mongoose.model("OTP", otpSchema);
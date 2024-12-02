const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: Number,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 5 * 60, // OTP expires after 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Otp", otpSchema);

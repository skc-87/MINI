const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const User = require("../models/User.js");
const crypto = require("crypto");

require("dotenv").config();

// Initiate payment
exports.capturePayment = async (req, res) => {
  // console.log("Request -> ", req);
  const { total } = req.body;

  const options = {
    amount: total * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  console.log("Ready to initiate payment");

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
    console.log("initiated payment");
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: true,
      message: "Could not initiate order",
    });
  }
};

// verify payment
exports.verifyPayment = async (req, res) => {
  console.log("Inside verify payment  ");
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;

  console.log(
    "razorpay_order_id -> ",
    razorpay_order_id,
    "  razorpay_payment_id -> ",
    razorpay_payment_id,
    "razorpay_signature -> ",
    razorpay_signature
  );

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature 
  ) {
    return res.status(200).json({
      success: false,
      message: "payment Failed",
    });
  }
  console.log("Every thing is available");

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  console.log(
    "Expected signature -> ",
    expectedSignature,
    " Razorpay Signature -> ",
    razorpay_signature
  );

  if (expectedSignature === razorpay_signature) {
    // return res
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  } else {
    // console.log("Payment Failed response")
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }
};

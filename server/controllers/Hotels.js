const Hotels = require("../models/Hotels");
const Tours = require("../models/Tours");
require("dotenv").config();
const uploadImageToCloudinary = require("../utils/cloudinary.js");

// create about
exports.createHotels = async (req, res) => {
  try {
    // console.log("Req.body -> ", req.files.image)
    const { name, ratingAndReview, price, tourId } = req.body;
    const image = req.files.image;
    console.log("Image -> ", image);

    if (!image || !name || !price || !tourId) {
      return res.status(403).json({
        success: false,
        message: "Enter all the details carefully...",
      });
    }

    // upload image
    const uploadedImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    // console.log("Image link -> ", imageLink)

    const response = await Hotels.create({
      name,
      ratingAndReview,
      price,
      image: uploadedImage?.secure_url,
    });

    console.log("Response at create hotels controller -> ", response);

    const updatedTour = await Tours.findByIdAndUpdate(
      { _id: tourId },
      {
        $push: { hotels: response?._id },
      },
      { new: true }
    );

    console.log("Updated tour -> ", updatedTour);

    return res.status(200).json({
      success: true,
      message: "Data entered successfully",
      response,
    });
  } catch (e) {
    console.log("Error in hotels controller -> ", e);
    return res.status(200).json({
      success: false,
      message: "Data can't be entered",
    });
  }
};

// Get about
exports.getHotels = async (req, res) => {
  try {
    const response = await Hotels.find({}).exec();

    console.log(response);

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      response,
    });
  } catch (e) {
    console.log("Error in hotels controller -> ", e);
    return res.status(200).json({
      success: false,
      message: "Data can't be fetched",
    });
  }
};

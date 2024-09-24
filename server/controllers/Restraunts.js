const Restraunts = require("../models/Restraunts")
const Tours = require("../models/Tours")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
require("dotenv").config();


// create lifestyle
exports.createRestraunts = async (req, res) => {

    try {
        const { name, description, tourId } = req.body

        const image = req.files.image;
        console.log("Image -> ", image)

        if (!image || !name  || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        // upload image
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        // console.log("Image link -> ", imageLink)

        const response = await Restraunts.create({
            image: uploadedImage?.secure_url,
            name,
            // description
        });

        console.log("Response at create restraunts controller -> ", response);


        const updatedTour = await Tours.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { restruantSuggestions: response?._id }
            },
            { new: true },
        )

        console.log("Updated tour -> ", updatedTour)



        return res.status(200).json({
            success: true,
            message: "Data entered successfully",
            response
        })

    } catch (e) {
        console.log("Error in restraunts controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get restraunts
exports.getRestraunts = async (req, res) => {

    try {

        const response = await Restraunts.find({}).exec();

        console.log(response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in get restraunts controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }

}
const ThingsToDo = require("../models/ThingsToDo")
require("dotenv").config();
const uploadImageToCloudinary = require("../utils/cloudinary.js")
const Tours = require("../models/Tours")


// create things to do
exports.createThingsToDo = async (req, res) => {

    try {
        const { title, description, tourId } = req.body

        const image = req.files.image;
        console.log("Image -> ", image)


        if (!image || !title || !description || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        // upload image
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        // console.log("Image link -> ", imageLink)

        const response = await ThingsToDo.create({
            image: uploadedImage?.secure_url,
            title,
            description
        });

        console.log("Response at create things to do controller -> ", response);


        const updatedTour = await Tours.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { thingsToDo: response?._id }
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
        console.log("Error in things to do controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get restraunts
exports.getThingsToDo = async (req, res) => {

    try {

        const response = await ThingsToDo.find({}).exec();

        console.log(response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in get things to do controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }

}
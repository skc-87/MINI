const About = require("../models/About")
const Tour = require("../models/Tours")
require("dotenv").config();


// create about
exports.createAbout = async (req, res) => {

    try {
        const { title, description, tourId } = req.body

        if (!title || !description||!tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        const response = await About.create({
            title,
            description,
        });

        console.log("About response at about controller -> ", response);

        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { about: response?._id }
            },
            { new: true },
        )

        console.log("Updated tour -> ",updatedTour)



        return res.status(200).json({
            success: true,
            message: "Data entered successfully",
            updatedTour
        })

    } catch (e) {
        console.log("Error in about controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get about
exports.getAbout = async (req, res) => {

    try {

        const response = await About.find({}).exec();

        console.log(response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in about controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }
    
}
const Conclusion = require("../models/Conclusion.js");
require("dotenv").config();


// create about
exports.createConclusion = async (req, res) => {

    try {
        const { conclusion, tourId } = req.body

        if (!conclusion || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        const response = await Conclusion.create({
            conclusion
        });

        console.log("Response at create conclusion controller -> ", response);


        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { conclusion: response?._id }
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
        console.log("Error in conclusion controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get about
exports.getConclusion = async (req, res) => {

    try {

        const response = await Conclusion.find({}).exec();

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
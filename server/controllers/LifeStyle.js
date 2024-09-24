const LifeStyle = require("../models/LifeStyle")
require("dotenv").config();


// create lifestyle
exports.createLifeStyle = async (req, res) => {

    try {
        const { title, description, tourId } = req.body

        if (!title || !description || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        const response = await LifeStyle.create({
            title,
            description
        });

        console.log("Response at create lifestyle controller -> ", response);



        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { lifeStyle: response?._id }
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
        console.log("Error in lifestyle controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get lifestyle
exports.getLifeStyle = async (req, res) => {

    try {

        const response = await LifeStyle.find({}).exec();

        console.log(response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in lifestyle controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }

}
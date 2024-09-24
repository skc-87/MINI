const BestTimeToVisit = require("../models/BestTimeToVisit")
const Tour = require("../models/Tours")
require("dotenv").config();



// create best time to visit 
exports.createBestTimeToVisit = async (req, res) => {

    try {
        const { month, seasonInfo, crowd, weather, conclusion, tourId } = req.body
        console.log("Req body -> ", req.body);

        if (!month || !seasonInfo || !crowd || !weather || !conclusion || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        const response = await BestTimeToVisit.create({
            month,
            seasonInfo,
            crowd,
            weather,
            conclusion
        });

        console.log("Response response at Best time to visit controller -> ", response);

        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { bestTimeToVisit: response?._id }
            },
            { new: true },
        )

        console.log("Updated tour -> ",updatedTour)


        return res.status(200).json({
            success: true,
            message: "Data entered successfully",
            response
        })

    } catch (e) {
        console.log("Error in about controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}



// Get best time to visit
exports.getBestTimeToVisit = async (req, res) => {

    try {

        const response = await BestTimeToVisit.find({}).exec();

        console.log("Best time to visit -> ",response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in best time to find controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }

}
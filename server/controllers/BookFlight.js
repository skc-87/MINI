const BookFlight = require("../models/BookFlight.js")
require("dotenv").config();



// create book flight
exports.createBookFlight = async (req, res) => {

    try {
        const { destination, duration, price, company, tourId } = req.body
        console.log("Req body -> ", req.body);

        if (!destination || !duration || !price || !company || !tourId) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        const response = await BookFlight.create({
            destination,
            duration,
            price,
            company
        });

        console.log("Response response at create book your  flight controller -> ", response);


        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: tourId },
            {
                $push: { bookYourFlight: response?._id }
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
        console.log("Error in about controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be entered",
        })

    }

}


// Get book flights
exports.getBookFlight = async (req, res) => {

    try {

        const response = await BookFlight.find({}).exec();

        console.log("Book flight -> ", response);

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            response
        })

    } catch (e) {
        console.log("Error in book flight controller -> ", e);
        return res.status(200).json({
            success: false,
            message: "Data can't be fetched",
        })

    }

}
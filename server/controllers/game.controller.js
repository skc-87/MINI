import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Wallet } from "../models/wallet.model.js";



// Check the questions
const checkQuestions = async (req, res) => {

    try {
        // Number of correct questions
        const { noOfCorrectQuestions } = req.body;
        if (noOfCorrectQuestions) {
            throw new ApiError(400, {}, "Please provide the number of correct questions");
        }

        // User
        const user = req.user;
        if (!user) {
            throw new ApiError(400, {}, "User not found");
        }

        // Generate a random number between 0 and 10
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        // Calculate the numbers of coins
        const coinsGenerated = randomNumber * noOfCorrectQuestions;


        const coinsSaved = await Wallet.findByIdAndUpdate(user?.wallet?._id, {
            $inc: { coins: coinsGenerated }
        });

        if (!coinsSaved) {
            throw new ApiError(400, {}, "Error in updating the coins");
        }

        return res.status(200).json(
            new ApiResponse(201, coinsGenerated, "You have generated coins successfully")
        )


    } catch (error) {
        console.log("Error in check Questions -> ", error);

        const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
        const message = error?.errors || "Internal Server Error"; // Get the error message

        return res.status(statusCode).json({
            statuscode: statusCode,
            data: null,
            success: false,
            message: message, // Include the message in the response
            errors: error || [], // Include specific errors if any
        });

    }

}


// Redeem the coins
const redeemCoins = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new ApiError(400, {}, "Un-authorized access");
        }

        const wallet = await Wallet.findById(user?.wallet?._id);
        if (!wallet) {
            throw new ApiError(400, {}, "wallet not found");
        }

        const coins = wallet?.coins;
        if (coins < 500) {
            throw new ApiError(400, {}, "Minimum 50 coins are required in order to redeem")
        }

        const rupees = coins / 10;


        const updatedWallet = await Wallet.findByIdAndUpdate(
            wallet._id,
            {
                $inc: { balance: rupees },
                $set: { coins: 0 }  // Reset coins after redeeming, if desired
            },
            { new: true }
        );


        const newTransaction = new Transaction({
            sender: "Saarthi",
            receiver: user?._id,
            amount: rupees,
            type: "Redeemed Coins",
            status: "success",
            description: `You won ${rupees} from the Saarthi`
        });


        await newTransaction.save();


        return res.status(200).json(
            new ApiResponse(201, updatedWallet, `Congratulations you have won ${rupees}`)
        )

    } catch (error) {

        console.log("Error in redeem coins -> ", error);

        const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
        const message = error?.errors || "Internal Server Error"; // Get the error message

        return res.status(statusCode).json({
            statuscode: statusCode,
            data: null,
            success: false,
            message: message, // Include the message in the response
            errors: error || [], // Include specific errors if any
        });

    }
}


export {
    checkQuestions,
    redeemCoins
}
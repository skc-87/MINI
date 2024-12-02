import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Wallet } from "../models/wallet.model.js";


import { v4 as uuidv4 } from 'uuid';



// create wallet
const createWallet = async (req, res) => {

    try {
        const user = req.user;

        console.log("User in create wallet -> ", user);
        if (!user) {
            throw new ApiError(400, {}, "Unauthorized access");
        }

        const { identificationType, identificationNumber, bankAccount } = req.body;

        if (!identificationType || !identificationNumber) {
            throw new ApiError(400, {}, "Please provide the credentials");
        }

        // check  whether the wallet for the user existst or not
        const existingWallet = await Wallet.findOne({ owner: user._id });

        if (existingWallet) {
            throw new ApiError(400, {}, "We are sorry but you can have only one wallet");
        }


        const wallet = await Wallet.create({
            owner: user._id,
            identificationType,
            identificationNumber,
            bankAccount
        });


        // add the wallet id to the user also
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                wallet: wallet._id,
            },
            { new: true }
        );


        if (!wallet) {
            throw new ApiError(400, {}, "Oops there is some error in creating your wallet, please try again later");
        }

        const response = {
            wallet,
            user: updatedUser
        }


        return res.status(200, response, "Congrats your wallet created successfully");


    } catch (error) {
        console.log("Error in create wallet -> ", error);

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



// Deposit money to wallet
const depositMoney = async (req, res) => {

    try {
        const user = req.user;

        if (!user) {
            throw new ApiError(400, {}, "Unauthorized access");
        }

        const { amount } = req.body;

        if (!amount || amount < 0) {
            throw new ApiError(400, {}, "Invalid amount");
        }


        // Create a customer
        const customer = await stripe.customers.create({
            email: user.email,
            source: user._id
        });

        if (!customer) {
            throw new ApiError(400, {}, "Error in creating customer");
        }


        // Create a charge
        const charge = await stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                customer: customer.id,
                receipt_email: user.email,
                description: "Deposited to Saarthi Wallet"
            },
            {
                idempotencyKey: uuidv4(), // Use the updated v4() from the uuid module
            }
        );


        if (!charge) {
            throw new ApiError(400, {}, "Error in creating charge");
        }



        // Save the transaction if successful
        if (charge.status === "succeeded") {

            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId,
                amount: amount,
                type: "deposit",
                status: "success",
                description: "Stripe Deposit"
            });


            await newTransaction.save();


            await Wallet.findByIdAndUpdate(user?.wallet?._id, {
                $inc: { balance: amount }
            });


            return res.status(201).json(
                new ApiResponse(200, newTransaction, "Deposit successfully")
            );

        } else {
            throw new ApiError(400, {}, "Error in creating transaction");
        }

    } catch (error) {
        console.log("Error in register user -> ", error);

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




// Deposit money to bank
const depositMoneyToBank = async (req, res) => { 
    try {
        const user = req.user;

        const { amount } = req.body;

        if (!user) {
            throw new ApiError(400, {}, "Unauthorized Access");
        }

        const wallet = await Wallet.findById({ _id: user.wallet._id });


        if (!wallet) {
            throw new ApiError(200, {}, "Wallet not found");
        }

        const balance = wallet.balance;

        if (amount > balance) {
            throw new ApiError(200, {}, "Insufficient Balance");
        }

        // Create a customer
        const customer = await stripe.customers.create({
            email: user.email,
            source: user._id
        });

        if (!customer) {
            throw new ApiError(400, {}, "Error in creating customer");
        }


        // Create a charge
        const charge = await stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                customer: customer.id,
                receipt_email: user.email,
                description: "Deposited to Saarthi Wallet"
            },
            {
                idempotencyKey: uuidv4(), // Use the updated v4() from the uuid module
            }
        );


        if (!charge) {
            throw new ApiError(400, {}, "Error in creating charge");
        }



        // Save the transaction if successful
        if (charge.status === "succeeded") {

            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId,
                amount: amount,
                type: "credit to bank",
                status: "success",
                description: "expenditure"
            });


            await newTransaction.save();

            await Wallet.findByIdAndUpdate(user?.wallet?._id, {
                $inc: { balance: -amount }
            });


            return res.status(201).json(
                new ApiResponse(200, newTransaction, "Transaction sccessfull")
            );


        } else {
            throw new ApiError(400, {}, "Error in transaction");
        }

    } catch (error) {
        console.log("Error in create wallet -> ", error);

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



// deduct the money
const deductMoney = async (req, res) => {
    try {
        const user = req.user;
        const { amount } = req.body;

        if (!user) {
            throw new ApiError(200, {}, "Unauthorized access");
        }

        const wallet = await Wallet.findById({ _id: user.wallet._id });

        if (!wallet) {
            throw new ApiError(200, {}, "Wallet not found");
        }

        const balance = wallet.balance;

        if (amount > balance) {
            throw new ApiError(200, {}, "Insufficient Balance");
        }

        // Create a customer
        const customer = await stripe.customers.create({
            email: user.email,
            source: user._id
        });

        if (!customer) {
            throw new ApiError(400, {}, "Error in creating customer");
        }


        // Create a charge
        const charge = await stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                customer: customer.id,
                receipt_email: user.email,
                description: "Deposited to Saarthi Wallet"
            },
            {
                idempotencyKey: uuidv4(), // Use the updated v4() from the uuid module
            }
        );


        if (!charge) {
            throw new ApiError(400, {}, "Error in creating charge");
        }



        // Save the transaction if successful
        if (charge.status === "succeeded") {

            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId,
                amount: amount,
                type: "debit",
                status: "success",
                description: "expenditure"
            });


            await newTransaction.save();

            await Wallet.findByIdAndUpdate(user?.wallet?._id, {
                $inc: { balance: -amount }
            });


            return res.status(201).json(
                new ApiResponse(200, newTransaction, "Transaction sccessfull")
            );


        } else {
            throw new ApiError(400, {}, "Error in transaction");
        }

    } catch (error) {
        console.log("Error in register user -> ", error);

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
    createWallet,
    depositMoney,
    deductMoney,
    depositMoneyToBank
}
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

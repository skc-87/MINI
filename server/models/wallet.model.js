import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        bankAccount: {
            type: String,
            required: true
        },
        identificationType: {
            type: String,
            required: true,
        },
        identificationNumber: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            default: 0
        },
        coins: {
            type: Number,
            default: 0
        },
        transactions: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Wallet = mongoose.model("Wallet", walletSchema)
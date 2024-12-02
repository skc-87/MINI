import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    noOfReview: {
        type: Number,
        default: 0
    },
    avgStarsCount: {
        type: Number,
        default: 0
    },
    guideRatings: {
        type: Number,
        default: 0
    },
    transportations: {
        type: Number,
        default: 0
    },
    valueForMoney: {
        type: Number,
        default: 0
    },
    safety: {
        type: Number,
        default: 0
    },
    customerReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerReview"
        }
    ]
});

module.exports = mongoose.model('Review', reviewSchema);
const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bestTimeToVisitSchema = new mongoose.Schema({

    month: {
        type: String,
        required: true,
        trim: true,
    },
    seasonInfo: {
        type: String,
        required: true,
        trim: true,
    },
    crowd: {
        type: String,
        required: true,
        trim: true,
    },
    weather: {
        type: String,
        required: true,
        trim: true,
    },
    conclusion: {
        type: String,
        required: true,
        trim: true,
    },

});

module.exports = mongoose.model("BestTimeToVisit", bestTimeToVisitSchema);
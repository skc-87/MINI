const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ratingAndReview: {
        type: String,
        // required: true
    },
    price: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Hotels", hotelsSchema);
const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const restrauntSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    }

});

module.exports = mongoose.model("Restraunts", restrauntSchema);
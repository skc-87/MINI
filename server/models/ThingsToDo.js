const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const thingsToDoSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model("ThingsToDo", thingsToDoSchema);
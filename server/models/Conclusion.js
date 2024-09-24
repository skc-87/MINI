const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const conclusionSchema = new mongoose.Schema({
    conclusion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Conslusion", conclusionSchema);
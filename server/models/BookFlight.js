const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bookFlightSchema = new mongoose.Schema({

    destination:{
        type:String,
        required:true,
        trim:true
    },
    duration:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:String,
        required:true,
        trim:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },

});

module.exports = mongoose.model("BookFlight", bookFlightSchema);
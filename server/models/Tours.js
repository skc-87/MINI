const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String, // create object reference
    required: true,
    trim: true,
  },
  image: {
    // create object reference
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bestTimeToVisit: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    ref: "BestTimeToVisit",
  },
  bookYourFlight: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      // required: true,
      ref: "BookFlight",
    },
  ],
  hotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Hotels",
    },
  ],
  about: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "About",
    },
  ],
  // howToReach:{

  // },
  lifeStyle: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "LifeStyle",
    },
  ],
  restruantSuggestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Restraunts",
    },
  ],
  thingsToDo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "ThingsToDo",
    },
  ],
  conclusion: {
    type: String,
    // required: true,
    ref: "Conslusion",
  },
});

module.exports = mongoose.model("Tours", tourSchema);

import mongoose from "mongoose";


const destinationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    description: [{
        type: String,
        required: true
    }],
    activity: [{
        type: String,
        required: true
    }],
    details: [{ // To be corrrected
        type: [String],
        default: []
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'], // Specify the type as 'Point' for GeoJSON
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Array of numbers for [longitude, latitude]
            required: true
        }
    },
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    // nearbyPlaces: { 
    // fetch from the map
    // }
}, {
    timestamps: true
});


export const Destination = mongoose.model('Destination', destinationSchema);
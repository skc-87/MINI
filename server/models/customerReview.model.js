import mongoose from "mongoose";

const customerReviewSchema = (
  {
    imageUrl: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    starCount: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviewHeading: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestams: true
  }
);


export const CustomerReview = mongoose.model('CustomerReview', customerReviewSchema);


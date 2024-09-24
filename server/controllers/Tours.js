const Tours = require("../models/Tours");
const Category = require("../models/Category");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create tours
exports.createTours = async (req, res) => {
  try {
    const {
      title,
      overview,
      bestTimeToVisit,
      // bookYourFlight,
      // hotels,
      // about,
      // lifeStyle,
      // restraunts,
      // thingsToDo,
      conclusion,
      categoryId,
      category,
    } = req.body;

    const image = req.files.image;
    console.log("Image -> ", image);

    if (
      !title ||
      !overview ||
      !bestTimeToVisit ||
      // !bookYourFlight ||
      // !hotels ||
      // !about ||
      // !lifeStyle ||
      // !restraunts ||
      // !thingsToDo ||
      !conclusion ||
      !categoryId ||
      !image ||
      !category
    ) {
      return res.status(403).json({
        success: false,
        message: "Enter all the details carefully...",
      });
    }

    // upload image
    const uploadedImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    // console.log("Image link -> ", imageLink)

    const response = await Tours.create({
      title,
      overview,
      image: uploadedImage?.secure_url,
      bestTimeToVisit,
      // bookYourFlight,
      // hotels,
      // about,
      // lifeStyle,
      // restruantSuggestions: restraunts,
      // thingsToDo,
      conclusion,
      category,
    });

    console.log("About response at tours controller -> ", response);

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found...",
      });
    }

    // console.log(categoryDetails);

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      {
        $push: { tours: response?._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Data entered successfully",
      response,
    });
  } catch (e) {
    console.log("Error in tours controller -> ", e);
    return res.status(200).json({
      success: false,
      message: "Data can't be entered",
    });
  }
};

// Get tours
exports.getTours = async (req, res) => {
  try {
    const response = await Tours.find({})
      // .populate('bestTimeToVisit')
      .populate("bookYourFlight")
      .populate("hotels")
      .populate("about")
      .populate("lifeStyle")
      .populate("restruantSuggestions")
      .populate("thingsToDo")
      // .populate('conclusion')
      .exec();

    console.log(response);

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      response,
    });
  } catch (e) {
    console.log("Error in get tours controller -> ", e);
    return res.status(200).json({
      success: false,
      message: "Data can't be fetched",
    });
  }
};

// get tour by id
exports.getToursById = async (req, res) => {
  try {
    const {tourId} = req.body;
    console.log("Tour id -> ", tourId);
    const tourDetails = await Tours.find({ _id: tourId })
      // .populate('bestTimeToVisit')
      .populate("bookYourFlight")
      .populate("hotels")
      .populate("about")
      .populate("lifeStyle")
      .populate("restruantSuggestions")
      .populate("thingsToDo")
      // .populate('conclusion')
      .exec();

      if(!tourDetails){
        return res.json({
          success:false,
          message:`Couldn't find tour with id ${tourId}`
        })
      }

      return res.json({
        success:true,
        message:`Found tour with id ${tourId}`,
        tourDetails
      })

  } catch (e) {
    console.log("Error in get tour by id controller -> ", e);
    return res.status(200).json({
      success: false,
      message: "Data can't be fetched",
    });
  }
};














// update Tour
// exports.createTours = async (req, res) => {
//   try {
//     const {
//       title,
//       overview,
//       bestTimeToVisit,
//       bookYourFlight,
//       hotels,
//       about,
//       lifeStyle,
//       restraunts,
//       thingsToDo,
//       conclusion,
//       categoryId,
//       category,
//     } = req.body;

//     const image = req.files.image;
//     console.log("Image -> ", image);

//     if (
//       !title ||
//       !overview ||
//       !bestTimeToVisit ||
//       !bookYourFlight ||
//       !hotels ||
//       !about ||
//       !lifeStyle ||
//       !restraunts ||
//       !thingsToDo ||
//       !conclusion ||
//       !categoryId ||
//       !image ||
//       !category
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Enter all the details carefully...",
//       });
//     }

//     // upload image
//     const uploadedImage = await uploadImageToCloudinary(
//       image,
//       process.env.FOLDER_NAME
//     );
//     // console.log("Image link -> ", imageLink)

//     const response = await Tours.create({
//       title,
//       overview,
//       image: uploadedImage?.secure_url,
//       bestTimeToVisit,
//       bookYourFlight,
//       hotels,
//       about,
//       lifeStyle,
//       restruantSuggestions: restraunts,
//       thingsToDo,
//       conclusion,
//       category,
//     });

//     console.log("About response at tours controller -> ", response);

//     const categoryDetails = await Category.findById(categoryId);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category details not found...",
//       });
//     }

//     // console.log(categoryDetails);

//     const updatedCategory = await Category.findByIdAndUpdate(
//       { _id: categoryId },
//       {
//         $push: { tours: response?._id },
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Data entered successfully",
//       response,
//     });
//   } catch (e) {
//     console.log("Error in tours controller -> ", e);
//     return res.status(200).json({
//       success: false,
//       message: "Data can't be entered",
//     });
//   }
// };
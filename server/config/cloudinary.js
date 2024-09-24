// require("dotenv").config();

// const cloudinary = require('cloudinary').v2;
// // const database = require("../config/database");

// // database.connect();

// exports.cloudinaryConnect = () => {

//     try {
//         // console.log("cloud name ", CLOUD_NAME)

//         cloudinary.config({
//             // configuring cloudinary to upload media
//             clound_name: dysvguvul,
//             api_key: 823891537925136,
//             api_secret: pvq_dYROJxLUJFVpRA6F5GbhJZ4,
//         });

//     } catch (e) {
//         console.log("Error in cloudinary config")
//         console.log(e);
//     }

// };



require("dotenv").config();

const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            // configuring cloudinary to upload media
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    } catch (e) {
        console.log("Error in cloudinary config");
        console.log(e);
    }
};

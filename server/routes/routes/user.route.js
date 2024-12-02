import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verify } from "../middlewares/auth.middleware.js";
import { registerUser, logIn, logOut, sendOtp, generateAccessAndRefreshToken } from "../controllers/user.controller.js";



const router = Router();


// send Otp
router.route('/sendOtp').post(sendOtp);

// generate access and refres token
router.route('/generateAccessAndRefreshToken').post(verify, generateAccessAndRefreshToken);


// register
router.route('/registerUser')
    .post(
        upload.fields([
            {
                name: "profileImg", // Wrap the object inside an array
                maxCount: 1
            }
        ]),
        registerUser
    );


// logIn
router.route("/logIn").post(logIn);

// logOut
router.route("/logOut").post(logOut);



export default router;
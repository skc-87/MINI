import { Router } from "express";
import { verify } from "../middlewares/auth.middleware.js";
import { checkQuestions, redeemCoins } from "../controllers/game.controller.js";


const router = Router();


// check questions
router.route("/check-questions").post(verify, checkQuestions);


// redeem-coins
router.route("/redeem-coins").post(verify, redeemCoins);


export default router;
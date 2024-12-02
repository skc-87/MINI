import { Router } from "express";
import { verify } from "../middlewares/auth.middleware.js";
import { createWallet, depositMoney, deductMoney, depositMoneyToBank } from "../controllers/transaction.controller.js";


const router = Router();


// create wallet
router.route("/create-wallet").post(verify, createWallet);



// deposit money
router.route("/deposit-money").post(verify, depositMoney);



// deduct money
router.route("/deduct-money").post(verify, deductMoney);



// deposit money to bank
router.route("/deposit-money-to-bank").post(verify, depositMoneyToBank);



export default router;

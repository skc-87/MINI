const express = require("express");
const { auth } = require("../middlewares/auth.js");
const {
  createWallet,
  depositMoney,
  deductMoney,
  depositMoneyToBank,
} = require("../controllers/transaction.controller.js");

const router = express.Router();

console.log("Inside transaction routes");
// create wallet
router.post("/create-wallet", auth, createWallet);

// deposit money
router.post("/deposit-money", depositMoney);

// deduct money
router.post("/deduct-money", deductMoney);

// deposit money to bank
router.post("/deposit-money-to-bank", depositMoneyToBank);

module.exports = router;

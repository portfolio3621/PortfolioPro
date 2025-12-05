const express = require("express");
const { Message } = require("../utils/message");
const User = require("../models/userModel");
const Portfolio = require("../models/portfolioModel");
const Bill = require("../models/BillModel");
const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const userData = await User.find({});

    const portfolioBasic = await Portfolio.find({ Type: "Basic" });
    const portfolioStandard = await Portfolio.find({ Type: "Standard" });
    const portfolioPremium = await Portfolio.find({ Type: "Premium" });

    const bill = await Bill.find({});

    Message(res, 200, true, "", {
      user: userData.length,
      portfolio: {
        basic: portfolioBasic.length,
        standard: portfolioStandard.length,
        premium: portfolioPremium.length,
      },
      bills: bill.length,
    });
  } catch (error) {
    Message(res, 400, false, error.message, error);
  }
});

module.exports = router;

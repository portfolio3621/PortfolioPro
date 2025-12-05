const express = require("express");
const {
  createPortfolio,
  getSingleData,
  getAllData,
  updateData,
  deleteData,
} = require("../controllers/portfolioControllers");
const router = express.Router();

router.post("/portfolio", createPortfolio);
router.put("/portfolio/:id", updateData);
router.delete("/portfolio/:id", deleteData);
router.get("/portfolio/:id", getSingleData);
router.get("/all-portfolio", getAllData);

module.exports = router;

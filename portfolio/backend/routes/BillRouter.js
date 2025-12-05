const express = require("express");
const {
  bookBill,
  getBill,
  updateBill,
  getAllBill,
  deleteBill,
  recoverBill,
} = require("../controllers/BillControllers");
const router = express.Router();

router.post("/", bookBill);
router.post("/recover", recoverBill);
router.get("/", getAllBill);
router.get("/:id", getBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;

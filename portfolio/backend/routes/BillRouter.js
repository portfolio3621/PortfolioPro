const express = require("express");
const {
  bookBill,
  getBill,
  updateBill,
  getAllBill,
  deleteBill,
  recoverBill,
  unClaimOrClaimBill,
} = require("../controllers/BillControllers");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

router.route("/").post(isAuthenticatedUser, bookBill);
router.route("/recover").put(isAuthenticatedUser, recoverBill);
router.get("/", getAllBill);
router.get("/:id", getBill);
router.put("/:id", updateBill);
router.put("/:id/:status", unClaimOrClaimBill);
router.delete("/:id", deleteBill);

module.exports = router;

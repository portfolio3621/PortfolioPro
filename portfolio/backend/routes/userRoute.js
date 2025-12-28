const express = require("express");
const router = express.Router();
const {
  register,
  updateData,
  getAllData,
  getSingleData,
  deleteSingleData,
  login,
  logout,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  changePassword,
  forgotPassword,
  resetPassword,
  getSingleDataForResetPassword,
  verifyPassword,
  getSingleDataById,
  dashboardData,
  dashboardSingleBillData,
  socialLinksRegister,
} = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../utils/auth");

router.get("/get-all-user", getAllData);
router.get("/get-user-id/:id", getSingleDataById);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.route("/verifyPassword").post(isAuthenticatedUser, verifyPassword);
router.route("/changePassword").put(isAuthenticatedUser, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/user/:token", getSingleDataForResetPassword);
router.route("/update-user").put(isAuthenticatedUser, updateData);
router.route("/update-social-links").put(isAuthenticatedUser, socialLinksRegister);
router.route("/delete-user").delete(isAuthenticatedUser, deleteSingleData);
router.route("/get-data").get(isAuthenticatedUser, getSingleData);
router.route("/get-data-of-bills").get(isAuthenticatedUser, dashboardData);
router.route("/get-data-of-bills/:id").get(isAuthenticatedUser, dashboardSingleBillData);

// Add new experience to user's array
router.route("/experience").put(isAuthenticatedUser, addExperience);

// Update experience at a specific index
router.route("/experience/:index").put(isAuthenticatedUser, updateExperience); // add this in controller

// Delete experience at a specific index
router
  .route("/experience/:index")
  .delete(isAuthenticatedUser, deleteExperience); // add this in controller

// Education routes
router.route("/education").put(isAuthenticatedUser, addEducation);
router.route("/education/:index").put(isAuthenticatedUser, updateEducation);
router.route("/education/:index").delete(isAuthenticatedUser, deleteEducation);

module.exports = router;

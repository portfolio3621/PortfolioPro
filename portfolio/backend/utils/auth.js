const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const { Message } = require("./message");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return Message(res, 401, false, "Login first to handle this resource");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

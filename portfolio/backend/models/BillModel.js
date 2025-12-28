const mongoose = require("mongoose");

const BillModel = new mongoose.Schema(
  {
    portfolioId: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["Claim", "UnClaim"],
    },
    unclaimedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const Bill = mongoose.model("bill", BillModel);

module.exports = Bill;

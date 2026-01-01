const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Claim", "UnClaim"],
    },

    unclaimedAt: Date,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Bill = mongoose.model("bill", BillSchema);
module.exports = Bill;
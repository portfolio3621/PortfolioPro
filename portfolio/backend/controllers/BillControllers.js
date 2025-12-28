const Bill = require("../models/BillModel");
const { Message } = require("../utils/message");
const crypto = require("crypto");

exports.bookBill = async (req, res) => {
  try {
    const { portfolioId, status } = req.body;
    const userId = req.user.id;
    if (!portfolioId || !status) {
      return Message(
        res,
        400,
        false,
        "PortfolioId,userId and status is required"
      );
    }
    const data = await Bill.create({ portfolioId, status, userId });
    Message(res, 201, true, "Bill has booked", data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.getBill = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return Message(res, 400, false, "Id is required");
    }
    const getbill = await Bill.findById(id);
    Message(res, 200, true, null, getbill);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.recoverBill = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;

    if (!token) {
      return Message(res, 400, false, "Token is required");
    }

    const bill = await Bill.findOneAndUpdate(
      { token },                 // ✅ query by token
      {
        token: null,
        userId,
        status:"Claim"
      },
      { new: true }
    );

    if (!bill) {
      return Message(res, 400, false, "Your Token is Wrong, please check");
    }

    Message(res, 200, true, "Bill recovered successfully", bill);
  } catch (err) {
    Message(res, 500, false, err.message, err);
  }
};

exports.updateBill = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return Message(res, 400, false, "Id is required");
    }

    const bill = await Bill.findById(id);
    if (!bill) {
      return Message(res, 404, false, "Bill is not found");
    }

    const data = await Bill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    Message(res, 200, true, "Successfully updated", data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.unClaimOrClaimBill = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id) {
      return Message(res, 400, false, "Id is required");
    }

    // ✅ Correct validation
    if (status !== "Claim" && status !== "UnClaim") {
      return Message(res, 400, false, "Bill status is wrong");
    }

    const bill = await Bill.findById(id);
    if (!bill) {
      return Message(res, 404, false, "Bill not found");
    }

    let updateData = { status };

    // ✅ Only generate token for UnClaim
    if (status === "UnClaim") {
      updateData.token = crypto.randomBytes(20).toString("hex");
    } else {
      updateData.token = null;
    }

    const data = await Bill.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    Message(res, 200, true, "Successfully updated", data);
  } catch (err) {
    Message(res, 500, false, err.message);
  }
};


exports.getAllBill = async (req, res) => {
  try {
    const data = await Bill.find();

    Message(res, 200, true, null, data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return Message(res, 400, false, "Id is required in the params");
    }
    const idVerification = await Bill.findById(id);

    if (!idVerification) {
      return Message(res, 404, false, "Portfolio is not found");
    }
    await Bill.findByIdAndDelete(id);
    Message(res, 200, true, "Portfolio has been deleted");
  } catch (err) {
    Mesage(res, 400, false, err.message);
  }
};

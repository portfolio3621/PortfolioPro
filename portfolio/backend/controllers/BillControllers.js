const Bill = require("../models/BillModel");
const { Message } = require("../utils/message");
const crypto = require("crypto");

exports.bookBill = async (req, res) => {
  try {
    const { portfolioId, userId, status } = req.body;
    if (!portfolioId || !userId || !status) {
      return Message(
        res,
        400,
        false,
        "PortfolioId,userId and status is required"
      );
    }
    let token = crypto.randomBytes(20).toString("hex");
    const data = await Bill.create({ portfolioId, status, userId, token });
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
    if (!token) return Message(res, 400, false, "Token is required");
    const bill = await Bill.findOne({ token });
    if (!bill)
      return Message(res, 400, false, "Your Token is Wrong, please check");

    Message(res, 200, true, "Bill recovered successfully", bill);
  } catch (err) {
    Message(res, 400, false, err.message);
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

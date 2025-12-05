const Portfolio = require("../models/portfolioModel");
const { Message } = require("../utils/message");

exports.createPortfolio = async (req, res) => {
  try {
    const { title, path, thumbnail, Type, price } = req.body;
    if (!title || !path || !thumbnail || !price) {
      return Message(
        res,
        400,
        false,
        "portfolio's title, type, path, thumbnail and price is required"
      );
    }
    const portfolioData = await Portfolio.create(req.body);

    return Message(res, 201, true, "Successfully created", portfolioData);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.getSingleData = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return Message(res, false, "Id is required in the params");
    }
    const data = await Portfolio.findById(id);

    Message(res, 200, true, null, data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.getAllData = async (req, res) => {
  try {
    const data = await Portfolio.find();

    Message(res, 200, true, null, data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return Message(res, 400, false, "Id is required in the params");
    }
    const idVerification = await Portfolio.findById(id);

    if (!idVerification) {
      return Message(res, 404, false, "Portfolio is not found");
    }

    const data = await Portfolio.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    Message(res, 201, true, "Successfully updated a value", data);
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return Message(res, 400, false, "Id is required in the params");
    }
    const idVerification = await Portfolio.findById(id);

    if (!idVerification) {
      return Message(res, 404, false, "Portfolio is not found");
    }
    await Portfolio.findByIdAndDelete(id);
    Message(res, 200, true, "Portfolio has been deleted");
  } catch (err) {
    Mesage(res, 400, false, err.message);
  }
};

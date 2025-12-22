const mongoose = require("mongoose");

const portfolioModel = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
      unique:true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    category:{
      type:String,
      require: true,
    },
    Type:{
      type:String,
      enum:["Basic","Standard","Premium"],
      require:true
    }
  },
  { versionKey: false }
);

const portfolio = mongoose.model("portfolio", portfolioModel);

module.exports = portfolio;

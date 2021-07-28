const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  number: {
    type: String,
    unique: true,
  },
  typeFurn: {
    type: String,
  },
  priceFurn: {
    type: String,
  },
  priceDeliv: {
    type: String,
  },
  dateDeliv: {
    type: String,
  },
  priceConstr: {
    type: String,
  },
  dateConstr: {
    type: String,
  },
  teamDeliv: {
    type: String,
  },
  teamConstr: {
    type: String,
  },
  status: {
    type: String,
  },
  commentsWhenCreate: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Order", orderSchema);

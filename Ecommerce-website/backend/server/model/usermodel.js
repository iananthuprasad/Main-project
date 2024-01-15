const mongoose = require("mongoose");

const schemaUsers = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    },
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity:{ type: Number,default:1},
    },
  ],
});

const users = mongoose.model("users", schemaUsers);

module.exports = users;

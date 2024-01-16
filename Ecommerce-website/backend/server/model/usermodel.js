const mongoose = require("mongoose");

const schemaUsers = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  },
  wishlist: [
    {
      type: String,
      required: false,
    },
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const users = mongoose.model("users", schemaUsers);

module.exports = users;

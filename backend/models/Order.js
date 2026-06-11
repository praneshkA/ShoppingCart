const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: String,
  number: String,
  products: [ProductItemSchema],
  address: String,

  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  totalAmount: Number,

  paymentMode: {
    type: String,
    enum: ["COD", "UPI", "Card", "Mock"],
    default: "COD",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
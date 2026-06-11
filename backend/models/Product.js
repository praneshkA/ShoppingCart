const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,

  date: {
    type: Date,
    default: Date.now,
  },

  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
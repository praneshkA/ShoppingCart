const User = require("../models/User");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      cart: user.cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({
        success: false,
        message: "User or product not found",
      });
    }

    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({
        productId,
        quantity,
      });
    }

    await user.save();

    res.json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.error("Add cart error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const index = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not in cart",
      });
    }

    if (user.cart[index].quantity <= quantity) {
      user.cart.splice(index, 1);
    } else {
      user.cart[index].quantity -= quantity;
    }

    await user.save();

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Remove cart error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
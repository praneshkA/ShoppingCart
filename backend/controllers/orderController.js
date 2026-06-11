const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const {
      name,
      number,
      products,
      address,
      totalAmount,
      paymentMode,
    } = req.body;

    if (!name || !number || !products || !address || !totalAmount || !paymentMode) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const order = new Order({
      userId: req.userId,
      name,
      number,
      products,
      address,
      totalAmount,
      paymentMode,
    });

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};
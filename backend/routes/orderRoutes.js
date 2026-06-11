const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/orderController");

router.post("/order", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);

module.exports = router;
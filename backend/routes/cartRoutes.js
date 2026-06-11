const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/cart", verifyToken, getCart);
router.post("/cart/add", verifyToken, addToCart);
router.post("/cart/remove", verifyToken, removeFromCart);

module.exports = router;
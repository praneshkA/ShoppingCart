const express = require("express");
const router = express.Router();

const { upload } = require("../utils/upload");

const {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  removeProduct,
} = require("../controllers/productController");

router.get("/allproducts", getAllProducts);
router.get("/products/:category", getProductsByCategory);
router.get("/product/:id", getProductById);

router.post("/addproduct", upload.single("image"), addProduct);
router.post("/removeproduct", removeProduct);

module.exports = router;
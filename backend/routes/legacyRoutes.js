const express = require("express");
const router = express.Router();

const {
  removeProduct,
} = require("../controllers/productController");

router.get("/allproducts", (req, res) => {
  res.redirect("/api/allproducts");
});

router.get("/products/:category", (req, res) => {
  const category = req.params.category;
  res.redirect(`/api/products/${category}`);
});

// Keeping your old route also working
router.post("/removeproduct", removeProduct);

module.exports = router;
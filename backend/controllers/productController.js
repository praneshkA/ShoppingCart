const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error in /api/allproducts:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching category products:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      id: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, new_price, old_price } = req.body;

    if (!name || !category || !new_price || !old_price || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newProduct = new Product({
      id: lastProduct ? lastProduct.id + 1 : 1,
      name,
      category,
      new_price,
      old_price,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Product.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    console.error("Remove product error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  removeProduct,
};
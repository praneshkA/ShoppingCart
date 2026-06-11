const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const { uploadDir } = require("./utils/upload");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const legacyRoutes = require("./routes/legacyRoutes");

const app = express();
const port = process.env.PORT || 4000;
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

const response = await axios.get(`${API_BASE_URL}/api/allproducts`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
connectDB();

// Static image folder
app.use("/images", express.static(uploadDir));

// Test route
app.get("/api", (req, res) => {
  res.send("Express API is running");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/", uploadRoutes);
app.use("/", legacyRoutes);




app.get("/", (req, res) => {
  res.send("EcoWear backend is running successfully");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend health check passed",
  });
});
// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const express = require("express");
const cors = require("cors");
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
connectDB();

// Static image folder
app.use("/images", express.static(uploadDir));

// Root route
app.get("/", (req, res) => {
  res.send("EcoWear backend is running successfully");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend health check passed",
  });
});

// Test API route
app.get("/api", (req, res) => {
  res.send("Express API is running");
});

// API routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

// Non-api routes
app.use("/", uploadRoutes);
app.use("/", legacyRoutes);

// Server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
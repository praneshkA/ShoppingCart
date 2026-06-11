const express = require("express");
const router = express.Router();

const { upload } = require("../utils/upload");

const {
  uploadProductImage,
} = require("../controllers/uploadController");

router.post("/upload", upload.single("product"), uploadProductImage);

module.exports = router;
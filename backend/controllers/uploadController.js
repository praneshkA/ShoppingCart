const uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  res.json({
    success: true,
    image_url: fileUrl,
  });
};

module.exports = {
  uploadProductImage,
};
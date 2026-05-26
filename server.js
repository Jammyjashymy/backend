const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json({
  limit: "50mb",
}));

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// TEST ROUTE
app.get("/", (req, res) => {

  res.json({
    message: "Portfolio Backend Running Successfully",
  });

});

// IMAGE UPLOAD ROUTE
app.post("/upload", async (req, res) => {

  try {

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {

      folder: "jasmin_portfolio",

    });

    res.json({

      success: true,

      imageUrl: uploadedImage.secure_url,

    });

  } catch (error) {

    console.error("Upload error:", error.message);

    res.status(500).json({

      success: false,

      message: error.message || "Upload Failed",

    });
  }
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
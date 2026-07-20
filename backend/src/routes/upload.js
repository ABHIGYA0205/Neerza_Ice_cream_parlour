const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/auth");

// Upload single image


router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      res.json({
        url: req.file.path || `/uploads/${req.file.filename}`,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }
  }
);

// Upload multiple images
router.post(
  "/multiple",
  protect,
  adminOnly,
  upload.array("images", 5),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = req.files.map((file) =>
      file.path && file.path.startsWith("http")
        ? file.path
        : `/uploads/${file.filename}`
    );

    res.json({ urls });
  }
);

module.exports = router;
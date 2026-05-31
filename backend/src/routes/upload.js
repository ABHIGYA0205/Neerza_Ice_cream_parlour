const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, adminOnly } = require('../middleware/auth');

// @desc    Upload single image
// @route   POST /api/upload
router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Cloudinary returns path, local returns filename
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
router.post('/multiple', protect, adminOnly, upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const urls = req.files.map((file) => `/uploads/${file.filename}`);
  res.json({ urls });
});

module.exports = router;

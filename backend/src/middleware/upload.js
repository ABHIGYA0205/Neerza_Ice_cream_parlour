const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Local storage fallback when Cloudinary is not configured
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

// Use Cloudinary storage if configured, otherwise local
let upload;
try {
  const config = require('../config/env');
  if (config.cloudinary.cloudName) {
    const { storage } = require('../config/cloudinary');
    upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
  } else {
    upload = multer({ storage: localStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
  }
} catch {
  upload = multer({ storage: localStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
}

module.exports = upload;

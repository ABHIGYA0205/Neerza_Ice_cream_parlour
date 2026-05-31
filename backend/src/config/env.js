const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/amul-store',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  storePhone: process.env.STORE_PHONE || '918209524367',
  storeName: process.env.STORE_NAME || 'Neerza Amul Ice Cream Parlour',
  frontendUrl: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:3000'],
};

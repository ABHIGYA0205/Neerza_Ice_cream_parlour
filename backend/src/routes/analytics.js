const express = require('express');
const router = express.Router();
const { trackEvent, getDashboardStats } = require('../controllers/analyticsController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/track', trackEvent);
router.get('/dashboard', protect, adminOnly, getDashboardStats);

module.exports = router;

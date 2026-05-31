const express = require('express');
const router = express.Router();
const { getReviews, getAllReviews, createReview } = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.get('/:productId', getReviews);
router.post('/', createReview);

module.exports = router;

const Review = require('../models/Review');

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews (for homepage / general)
// @route   GET /api/reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate('product', 'name')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create review
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

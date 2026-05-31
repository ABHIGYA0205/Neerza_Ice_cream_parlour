const Analytics = require('../models/Analytics');
const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Track an event
// @route   POST /api/analytics/track
exports.trackEvent = async (req, res) => {
  try {
    const { eventType, productId, sessionId, metadata } = req.body;
    await Analytics.create({
      eventType,
      product: productId,
      sessionId,
      metadata,
    });

    // Update product counters
    if (productId) {
      const updateField = eventType === 'view' ? 'viewCount'
        : eventType === 'cart_add' ? 'cartAddCount'
        : eventType === 'whatsapp_order' ? 'orderCount'
        : null;

      if (updateField) {
        await Product.findByIdAndUpdate(productId, { $inc: { [updateField]: 1 } });
      }
    }

    res.status(201).json({ message: 'Event tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/analytics/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      availableProducts,
      outOfStock,
      lowStock,
      topViewed,
      topCarted,
      topOrdered,
      categoryDistribution,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Product.countDocuments({ availability: true, stock: { $gt: 0 } }),
      Product.countDocuments({ $or: [{ stock: 0 }, { availability: false }] }),
      Product.find({ stock: { $gt: 0, $lte: 5 } }).select('name stock price').limit(10),
      Product.find().sort({ viewCount: -1 }).select('name viewCount').limit(5),
      Product.find().sort({ cartAddCount: -1 }).select('name cartAddCount').limit(5),
      Product.find().sort({ orderCount: -1 }).select('name orderCount').limit(5),
      Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        { $project: { name: '$category.name', count: 1 } },
        { $sort: { count: -1 } },
      ]),
    ]);

    // Daily WhatsApp orders (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dailyOrders = await Analytics.aggregate([
      {
        $match: {
          eventType: 'whatsapp_order',
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalProducts,
      totalCategories,
      availableProducts,
      outOfStock,
      lowStock,
      topViewed,
      topCarted,
      topOrdered,
      categoryDistribution,
      dailyOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

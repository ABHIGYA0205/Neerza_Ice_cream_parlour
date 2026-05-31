const Banner = require('../models/Banner');

// @desc    Get active banners
// @route   GET /api/banners
exports.getBanners = async (req, res) => {
  try {
    const now = new Date();
    const query = req.query.all === 'true'
      ? {}
      : {
          isActive: true,
          startDate: { $lte: now },
          $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }],
        };

    const banners = await Banner.find(query).sort({ displayOrder: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create banner
// @route   POST /api/banners
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update banner
// @route   PUT /api/banners/:id
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete banner
// @route   DELETE /api/banners/:id
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

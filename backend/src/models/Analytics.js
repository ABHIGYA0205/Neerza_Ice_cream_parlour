const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: ['view', 'cart_add', 'whatsapp_order', 'search'],
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  sessionId: {
    type: String,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

analyticsSchema.index({ eventType: 1, createdAt: -1 });
analyticsSchema.index({ product: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);

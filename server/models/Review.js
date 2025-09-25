const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  pros: [String],
  cons: [String],
  images: [String],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  reported: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isApproved: {
    type: Boolean,
    default: true
  },
  adminResponse: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Text search index
reviewSchema.index({
  title: 'text',
  comment: 'text'
});

// Other indexes
reviewSchema.index({ product: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ isApproved: 1 });

// Get helpful count
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpful.length;
});

// Check if user found review helpful
reviewSchema.methods.isHelpfulByUser = function(userId) {
  return this.helpful.some(h => h.user.toString() === userId.toString());
};

// Toggle helpful status
reviewSchema.methods.toggleHelpful = function(userId) {
  const existingIndex = this.helpful.findIndex(h => h.user.toString() === userId.toString());
  
  if (existingIndex > -1) {
    this.helpful.splice(existingIndex, 1);
    return false; // Removed helpful
  } else {
    this.helpful.push({ user: userId });
    return true; // Added helpful
  }
};

// Report review
reviewSchema.methods.reportReview = function(userId, reason) {
  const existingReport = this.reported.find(r => r.user.toString() === userId.toString());
  
  if (!existingReport) {
    this.reported.push({ user: userId, reason });
    return this.save();
  }
  
  throw new Error('You have already reported this review');
};

module.exports = mongoose.model('Review', reviewSchema);
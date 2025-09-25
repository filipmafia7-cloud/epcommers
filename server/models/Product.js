const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  helpful: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['smartphones', 'laptops', 'tablets', 'accessories', 'gaming', 'audio', 'wearables']
  },
  brand: {
    type: String,
    required: true
  },
  model: String,
  specifications: {
    type: Map,
    of: String
  },
  features: [String],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    unique: true
  },
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  warranty: {
    duration: Number,
    type: String
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [reviewSchema],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  salesCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String]
}, {
  timestamps: true
});

// Generate slug from title
productSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Generate SKU if not provided
  if (!this.sku) {
    this.sku = `${this.brand.toUpperCase()}-${Date.now()}`;
  }
  
  // Calculate original price if discount is applied
  if (this.discount > 0 && !this.originalPrice) {
    this.originalPrice = this.price / (1 - this.discount / 100);
  }
  
  next();
});

// Update ratings when reviews change
productSchema.methods.updateRatings = function() {
  if (this.reviews.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.ratings.average = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.ratings.count = this.reviews.length;
  }
  return this.save();
};

// Increment view count
productSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Check if product is in stock
productSchema.methods.isInStock = function(quantity = 1) {
  return this.stock >= quantity && this.isActive;
};

// Reduce stock after purchase
productSchema.methods.reduceStock = function(quantity) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    this.salesCount += quantity;
    return this.save();
  }
  throw new Error('Insufficient stock');
};

// Text search index
productSchema.index({
  title: 'text',
  description: 'text',
  brand: 'text',
  tags: 'text'
});

// Compound indexes for filtering
productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1, category: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ salesCount: -1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
const express = require('express');
const Product = require('../models/Product');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { validate, validateProductQuery, schemas } = require('../middleware/validation');

const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', validateProductQuery, optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = 'newest',
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      search,
      inStock,
      featured
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (rating) filter['ratings.average'] = { $gte: parseFloat(rating) };
    if (inStock === 'true') filter.stock = { $gt: 0 };
    if (featured === 'true') filter.isFeatured = true;

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'price-asc':
        sortObj = { price: 1 };
        break;
      case 'price-desc':
        sortObj = { price: -1 };
        break;
      case 'rating':
        sortObj = { 'ratings.average': -1 };
        break;
      case 'popular':
        sortObj = { salesCount: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    // Add text score for search results
    if (search) {
      sortObj.score = { $meta: 'textScore' };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-reviews')
      .lean();

    const total = await Product.countDocuments(filter);

    // Get categories and brands for filters
    const categories = await Product.distinct('category', { isActive: true });
    const brands = await Product.distinct('brand', { isActive: true });

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories,
        brands
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true, 
      isFeatured: true 
    })
    .sort({ salesCount: -1 })
    .limit(8)
    .select('-reviews')
    .lean();

    res.json({ products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID or slug
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by ID first, then by slug
    let product = await Product.findById(identifier).populate('reviews.user', 'name avatar');
    
    if (!product) {
      product = await Product.findOne({ slug: identifier }).populate('reviews.user', 'name avatar');
    }

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment view count
    await product.incrementViewCount();

    // Get related products
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      isActive: true
    })
    .limit(4)
    .select('-reviews')
    .lean();

    res.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(schemas.product), async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validate(schemas.product), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product review
router.post('/:id/reviews', authenticateToken, validate(schemas.review), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Add review
    const review = {
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
      title: req.body.title,
      pros: req.body.pros || [],
      cons: req.body.cons || []
    };

    product.reviews.push(review);
    await product.updateRatings();

    // Populate the new review with user data
    await product.populate('reviews.user', 'name avatar');

    res.status(201).json({
      message: 'Review added successfully',
      review: product.reviews[product.reviews.length - 1]
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name avatar')
      .select('reviews ratings');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let reviews = [...product.reviews];

    // Sort reviews
    switch (sort) {
      case 'newest':
        reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest':
        reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        reviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        reviews.sort((a, b) => b.helpful.length - a.helpful.length);
        break;
    }

    const skip = (page - 1) * limit;
    const paginatedReviews = reviews.slice(skip, skip + parseInt(limit));

    res.json({
      reviews: paginatedReviews,
      ratings: product.ratings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: reviews.length,
        pages: Math.ceil(reviews.length / limit)
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle review helpful
router.post('/:productId/reviews/:reviewId/helpful', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = product.reviews.id(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const existingIndex = review.helpful.findIndex(
      h => h.toString() === req.user._id.toString()
    );

    if (existingIndex > -1) {
      review.helpful.splice(existingIndex, 1);
    } else {
      review.helpful.push(req.user._id);
    }

    await product.save();

    res.json({
      message: 'Review helpful status updated',
      helpfulCount: review.helpful.length,
      isHelpful: existingIndex === -1
    });
  } catch (error) {
    console.error('Toggle helpful error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product brands
router.get('/meta/brands', async (req, res) => {
  try {
    const brands = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ brands });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
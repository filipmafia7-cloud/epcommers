const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  phone: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Product validation schemas
const productSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  shortDescription: Joi.string().max(200).optional(),
  price: Joi.number().positive().required(),
  originalPrice: Joi.number().positive().optional(),
  discount: Joi.number().min(0).max(100).optional(),
  category: Joi.string().valid('smartphones', 'laptops', 'tablets', 'accessories', 'gaming', 'audio', 'wearables').required(),
  brand: Joi.string().min(2).max(50).required(),
  model: Joi.string().optional(),
  stock: Joi.number().integer().min(0).required(),
  specifications: Joi.object().optional(),
  features: Joi.array().items(Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  weight: Joi.number().positive().optional(),
  dimensions: Joi.object({
    length: Joi.number().positive(),
    width: Joi.number().positive(),
    height: Joi.number().positive()
  }).optional(),
  warranty: Joi.object({
    duration: Joi.number().positive(),
    type: Joi.string()
  }).optional(),
  isFeatured: Joi.boolean().optional(),
  seoTitle: Joi.string().max(60).optional(),
  seoDescription: Joi.string().max(160).optional(),
  seoKeywords: Joi.array().items(Joi.string()).optional()
});

// Order validation schemas
const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().optional()
  }).required(),
  paymentMethod: Joi.string().valid('wallet', 'credit_card', 'paypal', 'bank_transfer').optional(),
  shippingMethod: Joi.string().valid('standard', 'express', 'overnight').optional(),
  notes: Joi.string().max(500).optional()
});

// Review validation schemas
const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().min(3).max(100).required(),
  comment: Joi.string().min(10).max(1000).required(),
  pros: Joi.array().items(Joi.string()).optional(),
  cons: Joi.array().items(Joi.string()).optional()
});

// Address validation schema
const addressSchema = Joi.object({
  type: Joi.string().valid('home', 'work', 'other').optional(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
  isDefault: Joi.boolean().optional()
});

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        message: 'Validation error',
        errors
      });
    }
    
    next();
  };
};

// Query validation for products
const validateProductQuery = (req, res, next) => {
  const querySchema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    sort: Joi.string().valid('newest', 'oldest', 'price-asc', 'price-desc', 'rating', 'popular').optional(),
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    rating: Joi.number().min(1).max(5).optional(),
    search: Joi.string().optional(),
    inStock: Joi.boolean().optional(),
    featured: Joi.boolean().optional()
  });

  const { error } = querySchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      message: 'Invalid query parameters',
      error: error.details[0].message
    });
  }
  
  next();
};

module.exports = {
  validate,
  validateProductQuery,
  schemas: {
    register: registerSchema,
    login: loginSchema,
    product: productSchema,
    order: orderSchema,
    review: reviewSchema,
    address: addressSchema
  }
};
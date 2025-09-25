import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ShoppingCart, Grid, List } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  inStock: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: 1199,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 1250,
      category: 'smartphones',
      brand: 'Apple',
      inStock: true
    },
    {
      id: '2',
      title: 'MacBook Air M3',
      price: 1099,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 890,
      category: 'laptops',
      brand: 'Apple',
      inStock: true
    },
    {
      id: '3',
      title: 'AirPods Pro 2',
      price: 249,
      originalPrice: 279,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 2100,
      category: 'accessories',
      brand: 'Apple',
      inStock: true
    },
    {
      id: '4',
      title: 'iPad Pro 12.9"',
      price: 1099,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 750,
      category: 'tablets',
      brand: 'Apple',
      inStock: true
    },
    {
      id: '5',
      title: 'Samsung Galaxy S24 Ultra',
      price: 1199,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 980,
      category: 'smartphones',
      brand: 'Samsung',
      inStock: true
    },
    {
      id: '6',
      title: 'Dell XPS 13',
      price: 999,
      originalPrice: 1099,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 650,
      category: 'laptops',
      brand: 'Dell',
      inStock: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'tablets', name: 'Tablets' },
    { id: 'accessories', name: 'Accessories' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order for newest
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our amazing collection of tech products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} products found
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                    } rounded-t-2xl ${viewMode === 'list' ? 'rounded-l-2xl rounded-tr-none' : ''}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full object-cover hover:scale-110 transition-transform duration-500 ${
                          viewMode === 'list' ? 'h-full' : 'h-64'
                        }`}
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${product.originalPrice - product.price} OFF
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-teal-400 transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-teal-400">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.brand}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center ripple disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
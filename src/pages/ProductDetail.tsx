import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  specifications: { [key: string]: string };
  category: string;
  brand: string;
  inStock: boolean;
  stockCount: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProduct: Product = {
        id: id || '1',
        title: 'iPhone 15 Pro Max',
        price: 1199,
        originalPrice: 1299,
        images: [
          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        rating: 4.9,
        reviews: 1250,
        description: 'The iPhone 15 Pro Max represents the pinnacle of smartphone technology, featuring the revolutionary A17 Pro chip, advanced camera system, and stunning titanium design. Experience unprecedented performance and capture life in extraordinary detail.',
        specifications: {
          'Display': '6.7-inch Super Retina XDR',
          'Chip': 'A17 Pro',
          'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
          'Storage': '256GB',
          'Battery': 'Up to 29 hours video playback',
          'Material': 'Titanium',
          'Colors': 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium'
        },
        category: 'smartphones',
        brand: 'Apple',
        inStock: true,
        stockCount: 15
      };
      setProduct(mockProduct);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0]
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl skeleton"></div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded skeleton w-2/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link
            to="/products"
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-teal-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all">
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-teal-400'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-teal-400">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount} in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center ripple"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="w-4 h-4 text-teal-400" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-teal-400 text-teal-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">{key}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Reviews feature coming soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
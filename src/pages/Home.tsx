import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Latest iPhone 15 Pro",
      subtitle: "Revolutionary camera system",
      price: "$999",
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      discount: "10% OFF"
    },
    {
      title: "MacBook Pro M3",
      subtitle: "Unleash your creativity",
      price: "$1,999",
      image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800",
      discount: "15% OFF"
    },
    {
      title: "Gaming Setup",
      subtitle: "Ultimate gaming experience",
      price: "$1,499",
      image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800",
      discount: "20% OFF"
    }
  ];

  const mockProducts = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: 1199,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 1250
    },
    {
      id: '2',
      title: 'MacBook Air M3',
      price: 1099,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 890
    },
    {
      id: '3',
      title: 'AirPods Pro 2',
      price: 249,
      originalPrice: 279,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 2100
    },
    {
      id: '4',
      title: 'iPad Pro 12.9"',
      price: 1099,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 750
    }
  ];

  useEffect(() => {
    setFeaturedProducts(mockProducts);
    
    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${slide.image})`
              }}
            >
              <div className="flex items-center justify-center h-full text-white text-center">
                <div className="max-w-4xl px-4">
                  <div className="animate-fade-in-up">
                    <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {slide.discount}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <div className="text-4xl font-bold mb-8 text-teal-400">
                      {slide.price}
                    </div>
                    <Link
                      to="/products"
                      className="inline-flex items-center bg-gradient-to-r from-teal-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ripple"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-teal-400 scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Free delivery on orders over $100</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Warranty</h3>
              <p className="text-gray-600 dark:text-gray-400">2-year comprehensive warranty</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Support</h3>
              <p className="text-gray-600 dark:text-gray-400">24/7 customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover our most popular and cutting-edge devices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product: any, index) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 scroll-reveal card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${(product.originalPrice - product.price)} OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.title}
                  </h3>
                  
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
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center ripple"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get the latest tech news and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-teal-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
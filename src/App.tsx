import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-teal-400 mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold mb-2">TechStore</h2>
          <p className="text-gray-400">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <ScrollToTop />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
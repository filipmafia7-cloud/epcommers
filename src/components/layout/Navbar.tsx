import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-glass border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">TechStore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-teal-400 bg-teal-400/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-teal-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-teal-400 bg-teal-400/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-teal-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">TechStore</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your premier destination for cutting-edge technology and electronics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Smartphones</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Laptops</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Gaming</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-400 transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span className="text-gray-600 dark:text-gray-400">support@techstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-gray-600 dark:text-gray-400">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TechStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
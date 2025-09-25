import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-teal-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shopping Cart ({totalItems} items)
          </h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-teal-400 font-bold text-xl">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-teal-400">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-teal-400 hover:text-teal-300 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
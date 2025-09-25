import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
}

const AdminProducts: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: 1199,
      category: 'smartphones',
      stock: 25,
      status: 'active',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'MacBook Air M3',
      price: 1099,
      category: 'laptops',
      stock: 15,
      status: 'active',
      image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'AirPods Pro 2',
      price: 249,
      category: 'accessories',
      stock: 50,
      status: 'active',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Product Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your product inventory
            </p>
          </div>
          <button className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="all">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-32"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-12"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full skeleton w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-gray-600 dark:text-gray-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${
                          product.stock < 10 ? 'text-red-600' : 'text-gray-900 dark:text-white'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
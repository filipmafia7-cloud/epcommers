import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Package, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
    topProducts: []
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalSales: 125430,
        totalOrders: 1247,
        totalProducts: 156,
        totalUsers: 3421,
        recentOrders: [
          { id: '1', customer: 'John Doe', amount: 299, status: 'completed' },
          { id: '2', customer: 'Jane Smith', amount: 1199, status: 'processing' },
          { id: '3', customer: 'Mike Johnson', amount: 599, status: 'shipped' }
        ],
        topProducts: [
          { name: 'iPhone 15 Pro', sales: 234 },
          { name: 'MacBook Air M3', sales: 189 },
          { name: 'AirPods Pro', sales: 156 }
        ]
      });
    }, 1000);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      change: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      change: '+8.2%'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'from-purple-500 to-violet-600',
      change: '+3.1%'
    },
    {
      title: 'Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-orange-500 to-red-600',
      change: '+15.3%'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user.name}! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-500 text-sm font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {stats.recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${order.amount}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Top Selling Products
            </h2>
            <div className="space-y-4">
              {stats.topProducts.map((product: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {product.sales} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Package className="w-6 h-6 mx-auto mb-2" />
              <span className="block font-medium">Add Product</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <BarChart3 className="w-6 h-6 mx-auto mb-2" />
              <span className="block font-medium">View Analytics</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="block font-medium">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
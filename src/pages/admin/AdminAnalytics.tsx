import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState({
    revenue: { current: 0, previous: 0, change: 0 },
    orders: { current: 0, previous: 0, change: 0 },
    customers: { current: 0, previous: 0, change: 0 },
    avgOrderValue: { current: 0, previous: 0, change: 0 },
    topProducts: [],
    revenueChart: [],
    ordersChart: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        revenue: { current: 125430, previous: 98750, change: 27.0 },
        orders: { current: 1247, previous: 1089, change: 14.5 },
        customers: { current: 3421, previous: 2987, change: 14.5 },
        avgOrderValue: { current: 156.80, previous: 142.30, change: 10.2 },
        topProducts: [
          { name: 'iPhone 15 Pro', revenue: 45600, units: 38 },
          { name: 'MacBook Air M3', revenue: 32890, units: 29 },
          { name: 'AirPods Pro', revenue: 18750, units: 75 }
        ],
        revenueChart: [
          { date: '2024-01-01', value: 12500 },
          { date: '2024-01-02', value: 15200 },
          { date: '2024-01-03', value: 18900 },
          { date: '2024-01-04', value: 16700 },
          { date: '2024-01-05', value: 21300 },
          { date: '2024-01-06', value: 19800 },
          { date: '2024-01-07', value: 23400 }
        ],
        ordersChart: [
          { date: '2024-01-01', value: 45 },
          { date: '2024-01-02', value: 52 },
          { date: '2024-01-03', value: 68 },
          { date: '2024-01-04', value: 61 },
          { date: '2024-01-05', value: 78 },
          { date: '2024-01-06', value: 72 },
          { date: '2024-01-07', value: 85 }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const metricCards = [
    {
      title: 'Total Revenue',
      current: formatCurrency(analytics.revenue.current),
      change: analytics.revenue.change,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      current: analytics.orders.current.toLocaleString(),
      change: analytics.orders.change,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Customers',
      current: analytics.customers.current.toLocaleString(),
      change: analytics.customers.change,
      icon: Users,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Avg Order Value',
      current: formatCurrency(analytics.avgOrderValue.current),
      change: analytics.avgOrderValue.change,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your store's performance and insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium flex items-center ${
                    metric.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                    {formatChange(metric.change)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded skeleton w-20"></div>
                  ) : (
                    metric.current
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {metric.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Revenue Trend
            </h2>
            {isLoading ? (
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
            ) : (
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics.revenueChart.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-teal-500 to-orange-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{
                        height: `${(item.value / Math.max(...analytics.revenueChart.map(i => i.value))) * 200}px`
                      }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(item.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Orders Trend
            </h2>
            {isLoading ? (
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
            ) : (
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics.ordersChart.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{
                        height: `${(item.value / Math.max(...analytics.ordersChart.map(i => i.value))) * 200}px`
                      }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(item.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Top Performing Products
          </h2>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full skeleton"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded skeleton w-32"></div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded skeleton w-20"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded skeleton w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.topProducts.map((product: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
                      {formatCurrency(product.revenue)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.units} units sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
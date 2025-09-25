import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}

const AdminOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const mockOrders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 1299,
      status: 'delivered',
      date: '2024-01-15',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 599,
      status: 'shipped',
      date: '2024-01-14',
      items: 1
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      total: 249,
      status: 'processing',
      date: '2024-01-13',
      items: 1
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      total: 1899,
      status: 'pending',
      date: '2024-01-12',
      items: 3
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage customer orders
          </p>
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
                  placeholder="Search orders, customers, or emails..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
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
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-32"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded skeleton w-40"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-8"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full skeleton w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.customer}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 dark:text-white">
                          {order.items}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${order.total}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No orders found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
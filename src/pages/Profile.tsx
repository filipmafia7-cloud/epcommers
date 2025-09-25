import React, { useState } from 'react';
import { User, Wallet, Package, Settings, CreditCard, MapPin, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateWallet } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [walletAmount, setWalletAmount] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  const handleAddFunds = () => {
    const amount = parseFloat(walletAmount);
    if (amount > 0) {
      updateWallet(amount, 'credit', 'Added funds to wallet');
      setWalletAmount('');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'wallet', name: 'Wallet', icon: Wallet },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-teal-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Add phone number"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Update Profile
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'wallet' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Digital Wallet
                  </h3>
                  
                  {/* Wallet Balance */}
                  <div className="bg-gradient-to-r from-teal-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 mb-2">Current Balance</p>
                        <p className="text-3xl font-bold">${user.wallet.balance.toFixed(2)}</p>
                      </div>
                      <Wallet className="w-12 h-12 text-white/80" />
                    </div>
                  </div>

                  {/* Add Funds */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Add Funds
                    </h4>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        value={walletAmount}
                        onChange={(e) => setWalletAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <button
                        onClick={handleAddFunds}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Add Funds
                      </button>
                    </div>
                  </div>

                  {/* Transaction History */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Transactions
                    </h4>
                    <div className="space-y-3">
                      {user.wallet.transactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'credit' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {transaction.type === 'credit' ? '+' : '-'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className={`font-bold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Order History
                  </h3>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No orders found. Start shopping to see your orders here!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Email Notifications
                          </p>
                          <p className="text-sm text-gray-500">
                            Receive updates about your orders
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Payment Methods
                          </p>
                          <p className="text-sm text-gray-500">
                            Manage your payment options
                          </p>
                        </div>
                      </div>
                      <button className="text-teal-500 hover:text-teal-600 font-medium">
                        Manage
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Shipping Addresses
                          </p>
                          <p className="text-sm text-gray-500">
                            Manage your delivery addresses
                          </p>
                        </div>
                      </div>
                      <button className="text-teal-500 hover:text-teal-600 font-medium">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
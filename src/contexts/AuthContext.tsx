import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  wallet: {
    balance: number;
    transactions: Transaction[];
  };
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateWallet: (amount: number, type: 'credit' | 'debit', description: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: email === 'admin@techstore.com' ? 'Admin User' : 'John Doe',
        email,
        role: email === 'admin@techstore.com' ? 'admin' : 'user',
        wallet: {
          balance: 1500,
          transactions: [
            {
              id: '1',
              type: 'credit',
              amount: 100,
              description: 'Welcome bonus',
              date: new Date().toISOString()
            }
          ]
        }
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
        wallet: {
          balance: 100,
          transactions: [
            {
              id: '1',
              type: 'credit',
              amount: 100,
              description: 'Welcome bonus',
              date: new Date().toISOString()
            }
          ]
        }
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateWallet = (amount: number, type: 'credit' | 'debit', description: string) => {
    if (!user) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      date: new Date().toISOString()
    };

    const updatedUser = {
      ...user,
      wallet: {
        ...user.wallet,
        balance: type === 'credit' ? user.wallet.balance + amount : user.wallet.balance - amount,
        transactions: [newTransaction, ...user.wallet.transactions]
      }
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateWallet,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
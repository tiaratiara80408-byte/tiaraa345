import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DashboardView from './views/DashboardView';
import TeamView from './views/TeamView';
import MatchesView from './views/MatchesView';
import StatsView from './views/StatsView';
import TrainingView from './views/TrainingView';
import LoginView from './views/LoginView';
import ChatView from './views/ChatView';
import MarketplaceView from './views/MarketplaceView';
import ProfileView from './views/ProfileView';
import CartModal from './components/CartModal';
import Notification from './components/Notification';
import type { Page, Product, User } from './types';
import { mockUser } from './data/mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [user, setUser] = useState<User>(mockUser);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  // Initialize dark mode state, checking localStorage or defaulting to true
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
    showNotification("Ditambahkan ke keranjang!");
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item.id === productId);
      if (productIndex > -1) {
        const newCart = [...prevCart];
        newCart.splice(productIndex, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    showNotification("Pembelian berhasil!");
  };

  // Modified to accept optional user data from registration
  const handleLogin = (userData?: Partial<User>) => {
    if (userData) {
      setUser(prev => ({ ...prev, ...userData }));
      showNotification(`Selamat datang, ${userData.name || 'Coach'}!`);
    } else {
      showNotification("Login berhasil!");
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    // Reset to mock user on logout for demo purposes
    setUser(mockUser); 
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'team':
        return <TeamView />;
      case 'matches':
        return <MatchesView />;
      case 'toko':
        return <MarketplaceView onAddToCart={handleAddToCart} />;
      case 'chat':
        return <ChatView />;
      case 'profil':
        return <ProfileView 
          user={user} 
          onLogout={handleLogout} 
          showNotification={showNotification} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />;
      case 'training':
        return <TrainingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100 text-slate-900 dark:bg-slate-900 dark:text-gray-200 transition-colors duration-300">
      <Notification message={notification} />
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100 dark:bg-slate-900 shadow-2xl overflow-hidden">
        <Header 
          cartItemCount={cart.length} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        <main className="flex-grow overflow-y-auto pb-20 px-4 bg-gray-100 dark:bg-slate-900 transition-colors duration-300 scrollbar-hide">
          {renderContent()}
        </main>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;
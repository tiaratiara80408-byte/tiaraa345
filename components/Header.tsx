import React from 'react';
import { ShoppingCartIcon } from './icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 transition-colors border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.014 5.683a.75.75 0 011.972 0l3.334 2.035a.75.75 0 010 1.282l-3.334 2.035a.75.75 0 01-1.972 0L5.68 9.001a.75.75 0 010-1.282l3.334-2.035z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">VolleyApp</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-white transition-colors" aria-label="Buka Keranjang">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                {cartItemCount}
            </span>
            )}
        </button>
      </div>
    </header>
  );
};

export default Header;
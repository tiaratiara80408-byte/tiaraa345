import React from 'react';
import type { Page } from '../types';
import { HomeIcon, UsersIcon, CalendarIcon, PaperAirplaneIcon, ShoppingCartIcon, UserCircleIcon } from './icons';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  label: Page;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
    }`}
    aria-label={`Go to ${label}`}
  >
    {icon}
    <span className="text-xs capitalize">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'dashboard', icon: <HomeIcon /> },
    { label: 'team', icon: <UsersIcon /> },
    { label: 'matches', icon: <CalendarIcon /> },
    { label: 'toko', icon: <ShoppingCartIcon /> },
    { label: 'chat', icon: <PaperAirplaneIcon className="rotate-90"/> },
    { label: 'profil', icon: <UserCircleIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 flex justify-around z-20 transition-colors">
      {navItems.map(({ label, icon }) => (
        <NavItem
          key={label}
          label={label}
          icon={icon}
          isActive={currentPage === label}
          onClick={() => setCurrentPage(label)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
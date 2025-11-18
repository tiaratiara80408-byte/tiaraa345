import React, { useState } from 'react';
import type { User } from '../types';
import { LogoutIcon } from '../components/icons';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  showNotification: (message: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, showNotification, isDarkMode, toggleDarkMode }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    showNotification(newState ? "Notifikasi diaktifkan" : "Notifikasi dinonaktifkan");
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    // showNotification message is handled by the visual switch, but we can add one here if needed
    // showNotification(isDarkMode ? "Mode Terang diaktifkan" : "Mode Gelap diaktifkan");
  };

  const SettingRow: React.FC<{label: string, children: React.ReactNode}> = ({ label, children }) => (
    <div className="flex justify-between items-center p-4 transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50">
      <span className="font-semibold text-slate-700 dark:text-gray-200">{label}</span>
      {children}
    </div>
  );

  const ToggleSwitch: React.FC<{enabled: boolean}> = ({enabled}) => (
    <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${enabled ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-slate-600'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : ''}`}></div>
    </div>
  );

  const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profil</h2>
        <p className="text-gray-500 dark:text-gray-400">Kelola akun dan pengaturan Anda</p>
      </div>

      <div className="flex flex-col items-center space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 transition-colors">
        <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-slate-700 shadow-lg" />
        <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg divide-y divide-gray-200 dark:divide-slate-700 shadow-sm border border-gray-200 dark:border-slate-700 transition-colors overflow-hidden">
        <div onClick={handleToggleNotifications} className="cursor-pointer">
          <SettingRow label="Notifikasi">
            <ToggleSwitch enabled={notificationsEnabled} />
          </SettingRow>
        </div>
        <div onClick={handleToggleDarkMode} className="cursor-pointer">
          <SettingRow label="Mode Gelap">
            <ToggleSwitch enabled={isDarkMode} />
          </SettingRow>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg divide-y divide-gray-200 dark:divide-slate-700 shadow-sm border border-gray-200 dark:border-slate-700 transition-colors overflow-hidden">
        <button className="w-full text-left">
            <SettingRow label="Riwayat Pesanan">
                <ChevronRightIcon />
            </SettingRow>
        </button>
        <button className="w-full text-left">
            <SettingRow label="Bantuan & Dukungan">
                <ChevronRightIcon />
            </SettingRow>
        </button>
        <button className="w-full text-left">
            <SettingRow label="Tentang Aplikasi">
                <ChevronRightIcon />
            </SettingRow>
        </button>
      </div>

      <div>
        <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-600/20 hover:bg-red-100 dark:hover:bg-red-600/30 text-red-600 dark:text-red-400 font-bold py-3 px-4 rounded-lg transition-colors border border-red-100 dark:border-transparent">
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
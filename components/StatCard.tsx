import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg flex items-center justify-between shadow-sm border border-gray-200 dark:border-transparent transition-colors">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          {change && <p className="text-sm text-green-500 dark:text-green-400">{change}</p>}
        </div>
      </div>
      <div className="text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
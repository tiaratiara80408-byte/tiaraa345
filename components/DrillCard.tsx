import React from 'react';
import type { Drill } from '../types';
import { DrillDifficulty } from '../types';

interface DrillCardProps {
  drill: Drill;
}

const difficultyColors = {
  [DrillDifficulty.BEGINNER]: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  [DrillDifficulty.INTERMEDIATE]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  [DrillDifficulty.ADVANCED]: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

const DrillCard: React.FC<DrillCardProps> = ({ drill }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-3 shadow-sm border border-gray-200 dark:border-transparent transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{drill.category}</p>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">{drill.title}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[drill.difficulty]}`}>
          {drill.difficulty}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{drill.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-3">
        <span>Durasi: {drill.duration} menit</span>
        <span>Pemain: {drill.playerCount}</span>
      </div>
      <button className="w-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 font-bold py-2 px-4 rounded-lg transition-colors">
        Lihat Detail
      </button>
    </div>
  );
};

export default DrillCard;
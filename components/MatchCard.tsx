import React from 'react';
import type { Match } from '../types';
import { MatchStatus } from '../types';
import { CalendarIcon, ClockIcon, MapPinIcon } from './icons';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isUpcoming = match.status === MatchStatus.UPCOMING;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 shadow-sm border border-gray-200 dark:border-transparent transition-colors">
      <div className="flex justify-around items-center text-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-1 font-bold text-indigo-600 dark:text-indigo-400">
            {match.teamA.charAt(0)}
          </div>
          <span className="font-semibold text-sm text-slate-900 dark:text-gray-200">{match.teamA}</span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 font-bold">
          {isUpcoming ? 'VS' : `${match.result?.teamAScore} - ${match.result?.teamBScore}`}
        </div>
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-1 font-bold text-pink-500 dark:text-pink-400">
            {match.teamB.charAt(0)}
          </div>
          <span className="font-semibold text-sm text-slate-900 dark:text-gray-200">{match.teamB}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-slate-700 pt-3 text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{new Date(match.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-4 w-4" />
          <span>{match.time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{match.location}</span>
        </div>
      </div>
      {isUpcoming && (
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
          Mulai Pertandingan
        </button>
      )}
    </div>
  );
};

export default MatchCard;
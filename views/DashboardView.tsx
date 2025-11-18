import React from 'react';
import StatCard from '../components/StatCard';
import MatchCard from '../components/MatchCard';
import { matches, team, trainingSessions } from '../data/mockData';
import { MatchStatus } from '../types';
import { TrophyIcon, ChartBarIcon, ChartPieIcon, CheckCircleIcon, ExclamationTriangleIcon, CalendarIcon } from '../components/icons';

const DashboardView: React.FC = () => {
  const totalMatches = matches.length;
  const wins = matches.filter(m => m.status === MatchStatus.COMPLETED && ((m.teamA === team.name && m.result && m.result.teamAScore > m.result.teamBScore) || (m.teamB === team.name && m.result && m.result.teamBScore > m.result.teamAScore))).length;
  const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(0) : 0;
  
  const upcomingMatches = matches.filter(m => m.status === MatchStatus.UPCOMING);
  const recentCompleted = matches.filter(m => m.status === MatchStatus.COMPLETED).slice(0, 1);

  const activityItems = [
    ...recentCompleted.map(m => ({ type: 'match_result', data: m })),
    ...trainingSessions.slice(0,2).map(ts => ({ type: 'training', data: ts }))
  ].sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const ActivityItem: React.FC<{item: any}> = ({ item }) => {
    if (item.type === 'match_result') {
      const isWin = (item.data.teamA === team.name && item.data.result.teamAScore > item.data.result.teamBScore) || (item.data.teamB === team.name && item.data.result.teamBScore > item.data.result.teamAScore);
      return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
          {isWin ? <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-1" /> : <ExclamationTriangleIcon className="h-5 w-5 text-red-500 dark:text-red-400 mt-1" />}
          <div>
            <p className="font-semibold text-sm text-slate-900 dark:text-gray-200">Hasil Pertandingan</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isWin ? 'Menang' : 'Kalah'} melawan {item.data.teamA === team.name ? item.data.teamB : item.data.teamA} ({item.data.result.teamAScore} - {item.data.result.teamBScore})
            </p>
          </div>
        </div>
      );
    }
    if (item.type === 'training') {
      return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
          <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-1" />
          <div>
            <p className="font-semibold text-sm text-slate-900 dark:text-gray-200">Latihan: {item.data.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.data.date).toLocaleDateString('id-ID', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      );
    }
    return null;
  }


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400">Selamat datang kembali, Pelatih!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Pertandingan" value={String(totalMatches)} change="+3" icon={<ChartBarIcon className="h-8 w-8" />} />
        <StatCard label="Menang" value={String(wins)} change="+2" icon={<TrophyIcon className="h-8 w-8" />} />
        <StatCard label="Win Rate" value={`${winRate}%`} change="+5%" icon={<ChartPieIcon className="h-8 w-8" />} />
      </div>

       <div>
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Aktivitas Tim</h3>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 space-y-1 shadow-sm border border-gray-200 dark:border-transparent transition-colors">
          {activityItems.map((item, index) => <ActivityItem key={index} item={item} />)}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Pertandingan Mendatang</h3>
        <div className="space-y-4">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.slice(0, 1).map(match => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow-sm border border-gray-200 dark:border-transparent">
              <p className="text-gray-500 dark:text-gray-400">Tidak ada pertandingan mendatang.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Saatnya jadwalkan latih tanding!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
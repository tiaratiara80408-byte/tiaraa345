
import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { team, matches } from '../data/mockData';
import { MatchStatus } from '../types';
import { UsersIcon, ChartPieIcon, TrophyIcon } from '../components/icons';

type StatTab = 'team' | 'player';

const StatsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StatTab>('team');

  const wins = matches.filter(m => m.status === MatchStatus.COMPLETED && ((m.teamA === team.name && m.result && m.result.teamAScore > m.result.teamBScore) || (m.teamB === team.name && m.result && m.result.teamBScore > m.result.teamAScore))).length;
  const losses = matches.filter(m => m.status === MatchStatus.COMPLETED).length - wins;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Statistik</h2>
        <p className="text-gray-400">Analisis performa tim dan pemain</p>
      </div>

      <div className="flex bg-slate-800 rounded-lg p-1 space-x-1">
        <button
          onClick={() => setActiveTab('team')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'team' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Tim
        </button>
        <button
          onClick={() => setActiveTab('player')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'player' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Pemain
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 gap-4">
          <StatCard label="Total Pertandingan" value={String(matches.length)} icon={<UsersIcon className="h-8 w-8" />} />
          <StatCard label="Menang" value={String(wins)} icon={<TrophyIcon className="h-8 w-8" />} />
          <StatCard label="Kalah" value={String(losses)} icon={<ChartPieIcon className="h-8 w-8" />} />
        </div>
      )}

      {activeTab === 'player' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Statistik Pemain</h3>
          {team.roster.map(player => (
            <div key={player.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="bg-slate-700 font-bold h-10 w-10 flex items-center justify-center rounded-full text-lg">{player.number}</span>
                  <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <p className="text-sm text-gray-400">{player.position}</p>
                  </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-2xl text-indigo-400">{player.stats.totalPoints}</p>
                    <p className="text-xs text-gray-400">Total Poin</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-sm border-t border-slate-700 pt-3">
                <div><p className="font-semibold">{player.stats.aces}</p><p className="text-xs text-gray-400">Aces</p></div>
                <div><p className="font-semibold">{player.stats.blocks}</p><p className="text-xs text-gray-400">Blocks</p></div>
                <div><p className="font-semibold">{player.stats.errors}</p><p className="text-xs text-gray-400">Errors</p></div>
                <div><p className="font-semibold text-green-400">{player.stats.efficiency}%</p><p className="text-xs text-gray-400">Efisiensi</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsView;

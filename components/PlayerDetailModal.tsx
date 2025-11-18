
import React from 'react';
import type { Player } from '../types';
import Modal from './Modal';

interface PlayerDetailModalProps {
  player: Player;
  onClose: () => void;
}

const StatBar: React.FC<{ label: string; value: number; maxValue: number; color: string }> = ({ label, value, maxValue, color }) => (
  <div>
    <div className="flex justify-between items-baseline mb-1">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}{label === 'Efisiensi' ? '%' : ''}</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div className={`${color.replace('text-', 'bg-')} h-2.5 rounded-full`} style={{ width: `${(value / maxValue) * 100}%` }}></div>
    </div>
  </div>
);


const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ player, onClose }) => {
  if (!player) return null;

  const maxStatValues = { aces: 50, blocks: 60, errors: 30, efficiency: 100 };

  return (
    <Modal isOpen={!!player} onClose={onClose} title="Detail Pemain">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <span className="bg-indigo-500/20 text-indigo-400 font-bold h-16 w-16 flex items-center justify-center rounded-full text-3xl">{player.number}</span>
          <div>
            <h3 className="text-2xl font-bold">{player.name}</h3>
            <p className="text-md text-gray-400">{player.position}</p>
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400">Total Poin</p>
            <p className="text-5xl font-bold text-indigo-400">{player.stats.totalPoints}</p>
        </div>

        <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-slate-700 pb-2">Statistik Detail</h4>
            <StatBar label="Aces" value={player.stats.aces} maxValue={maxStatValues.aces} color="text-green-400" />
            <StatBar label="Blocks" value={player.stats.blocks} maxValue={maxStatValues.blocks} color="text-sky-400" />
            <StatBar label="Errors" value={player.stats.errors} maxValue={maxStatValues.errors} color="text-red-400" />
            <StatBar label="Efisiensi" value={player.stats.efficiency} maxValue={maxStatValues.efficiency} color="text-yellow-400" />
        </div>
      </div>
    </Modal>
  );
};

export default PlayerDetailModal;

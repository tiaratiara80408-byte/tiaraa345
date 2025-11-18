
import React, { useState } from 'react';
import MatchCard from '../components/MatchCard';
import Modal from '../components/Modal';
import { matches } from '../data/mockData';
import { Match, MatchStatus } from '../types';
import { PlusIcon } from '../components/icons';

type MatchTab = 'upcoming' | 'completed';

const MatchesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MatchTab>('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchList, setMatchList] = useState<Match[]>(matches);

  const [homeTeam, setHomeTeam] = useState('Garuda Volley');
  const [awayTeam, setAwayTeam] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [matchLocation, setMatchLocation] = useState('');

  const upcomingMatches = matchList.filter(m => m.status === MatchStatus.UPCOMING).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedMatches = matchList.filter(m => m.status === MatchStatus.COMPLETED).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedMatches = activeTab === 'upcoming' ? upcomingMatches : completedMatches;

  const handleScheduleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awayTeam || !matchDate || !matchTime || !matchLocation) return;
    
    const newMatch: Match = {
        id: Math.max(...matchList.map(m => m.id), 0) + 1,
        teamA: homeTeam,
        teamB: awayTeam,
        date: matchDate,
        time: matchTime,
        location: matchLocation,
        status: MatchStatus.UPCOMING,
    };

    setMatchList(prevMatches => [newMatch, ...prevMatches]);

    setAwayTeam('');
    setMatchDate('');
    setMatchTime('');
    setMatchLocation('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pertandingan</h2>
          <p className="text-gray-400">Jadwal dan hasil pertandingan</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-full shadow-lg">
          <PlusIcon />
        </button>
      </div>

      <div className="flex bg-slate-800 rounded-lg p-1 space-x-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Mendatang
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'completed' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          Selesai
        </button>
      </div>
      
      <div className="space-y-4">
        {displayedMatches.length > 0 ? (
          displayedMatches.map(match => <MatchCard key={match.id} match={match} />)
        ) : (
          <p className="text-gray-500 text-center py-8">Tidak ada pertandingan dalam kategori ini.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Jadwalkan Pertandingan">
        <form className="space-y-4" onSubmit={handleScheduleMatch}>
          <div>
            <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-300">Tim Tuan Rumah</label>
            <input type="text" id="homeTeam" value={homeTeam} onChange={e => setHomeTeam(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-300">Tim Lawan</label>
            <input type="text" id="awayTeam" value={awayTeam} onChange={e => setAwayTeam(e.target.value)} placeholder="Nama tim lawan" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="matchDate" className="block text-sm font-medium text-gray-300">Tanggal</label>
                <input type="date" id="matchDate" value={matchDate} onChange={e => setMatchDate(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ colorScheme: 'dark' }} required />
            </div>
            <div>
                <label htmlFor="matchTime" className="block text-sm font-medium text-gray-300">Waktu</label>
                <input type="time" id="matchTime" value={matchTime} onChange={e => setMatchTime(e.target.value)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ colorScheme: 'dark' }} required />
            </div>
          </div>
          <div>
            <label htmlFor="matchLocation" className="block text-sm font-medium text-gray-300">Lokasi</label>
            <input type="text" id="matchLocation" value={matchLocation} onChange={e => setMatchLocation(e.target.value)} placeholder="Nama venue" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Jadwalkan
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MatchesView;
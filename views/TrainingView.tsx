import React, { useState } from 'react';
import DrillCard from '../components/DrillCard';
import Modal from '../components/Modal';
import { drills, trainingSessions, beginnerGuides } from '../data/mockData';
import type { BeginnerGuide, TrainingSession } from '../types';
import { PlusIcon, CalendarIcon, ClockIcon, MapPinIcon, CheckCircleIcon } from '../components/icons';

type TrainingTab = 'schedule' | 'drills' | 'guide';

const BeginnerGuideCard: React.FC<{ guide: BeginnerGuide }> = ({ guide }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700 transition-colors">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {/* Image Header */}
                {guide.imageUrl && (
                    <div className="h-32 w-full overflow-hidden relative">
                        <img src={guide.imageUrl} alt={guide.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-4">
                            <h4 className="font-bold text-lg text-white shadow-sm">{guide.title}</h4>
                        </div>
                    </div>
                )}
                
                <div className="p-4">
                    {!guide.imageUrl && (
                         <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{guide.title}</h4>
                         </div>
                    )}
                    <div className="flex justify-between items-start">
                         <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
                         <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-400 ml-2 mt-1`}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                         </div>
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-800/50">
                    <div className="mt-3 space-y-3">
                        {guide.steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 group">
                                <div className="mt-0.5">
                                    <CheckCircleIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-slate-800 dark:text-gray-200">{step.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 text-sm font-bold rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition-colors">
                        Tandai Selesai
                    </button>
                </div>
            )}
        </div>
    )
};

const TrainingView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TrainingTab>('guide'); // Default to guide to show new feature
    const [sessionList, setSessionList] = useState<TrainingSession[]>(trainingSessions);

    const [sessionTitle, setSessionTitle] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionLocation, setSessionLocation] = useState('');
    const [sessionNotes, setSessionNotes] = useState('');

    const handleScheduleSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionTitle || !sessionDate || !sessionTime || !sessionLocation) return;
        
        const newSession: TrainingSession = {
            id: Math.max(...sessionList.map(s => s.id), 0) + 1,
            title: sessionTitle,
            date: sessionDate,
            time: sessionTime,
            location: sessionLocation,
            notes: sessionNotes,
        };

        setSessionList(prevSessions => [newSession, ...prevSessions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        
        setSessionTitle('');
        setSessionDate('');
        setSessionTime('');
        setSessionLocation('');
        setSessionNotes('');
        setIsModalOpen(false);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latihan</h2>
            <p className="text-gray-500 dark:text-gray-400">Jadwal, drills, dan panduan dasar</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-full shadow-lg">
          <PlusIcon />
        </button>
      </div>

       <div className="flex bg-gray-200 dark:bg-slate-800 rounded-lg p-1 space-x-1">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`w-full py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'schedule' ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
        >
          Jadwal
        </button>
        <button
          onClick={() => setActiveTab('drills')}
          className={`w-full py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'drills' ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
        >
          Drills
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`w-full py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'guide' ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
        >
          Panduan
        </button>
      </div>

      {activeTab === 'schedule' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Sesi Latihan Mendatang</h3>
           <div className="space-y-4">
            {sessionList.length > 0 ? sessionList.map(session => (
              <div key={session.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-3 shadow-sm border border-gray-200 dark:border-transparent">
                 <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{session.title}</h4>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{new Date(session.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                   <div className="border-t border-gray-100 dark:border-slate-700 pt-3 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{session.location}</span>
                      </div>
                      {session.notes && <p className="text-xs italic mt-2">"{session.notes}"</p>}
                  </div>
              </div>
            )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 rounded-lg border border-dashed border-gray-300 dark:border-slate-700">
                    Belum ada jadwal latihan.
                </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'drills' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Drill Library</h3>
          <div className="space-y-4">
            {drills.map(drill => (
              <DrillCard key={drill.id} drill={drill} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Dasar-Dasar Bermain Voli</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Pelajari teknik dan aturan dasar untuk meningkatkan permainanmu.</p>
           <div className="space-y-4">
                {beginnerGuides.map(guide => (
                    <BeginnerGuideCard key={guide.id} guide={guide} />
                ))}
          </div>
        </div>
      )}

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Jadwalkan Sesi Latihan">
        <form className="space-y-4" onSubmit={handleScheduleSession}>
          <div>
            <label htmlFor="sessionTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Sesi</label>
            <input type="text" id="sessionTitle" value={sessionTitle} onChange={e => setSessionTitle(e.target.value)} placeholder="e.g., Team Practice" className="mt-1 block w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal</label>
                <input type="date" id="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className="mt-1 block w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" style={{colorScheme: 'dark'}} required />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</label>
                <input type="time" id="time" value={sessionTime} onChange={e => setSessionTime(e.target.value)} className="mt-1 block w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" style={{colorScheme: 'dark'}} required/>
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</label>
            <input type="text" id="location" value={sessionLocation} onChange={e => setSessionLocation(e.target.value)} placeholder="Nama venue" className="mt-1 block w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" required />
          </div>
           <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Catatan</label>
            <textarea id="notes" rows={3} value={sessionNotes} onChange={e => setSessionNotes(e.target.value)} placeholder="Catatan tambahan untuk sesi latihan" className="mt-1 block w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Buat Jadwal
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TrainingView;
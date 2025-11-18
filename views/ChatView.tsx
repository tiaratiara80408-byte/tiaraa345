
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { chatMessages } from '../data/mockData';
import type { ChatMessage } from '../types';
import { PaperAirplaneIcon, UsersIcon, StarIcon } from '../components/icons';

type ChatTab = 'team' | 'ai';

const ChatView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChatTab>('team');
  
  // State for Team Chat
  const [teamMessages, setTeamMessages] = useState<ChatMessage[]>(chatMessages);
  
  // State for AI Chat
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
        id: 100,
        senderId: 99,
        senderName: 'Asisten AI',
        text: 'Halo Coach! Saya siap membantu menyusun strategi, ide latihan, atau analisis lawan. Ada yang bisa saya bantu?',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [teamMessages, aiMessages, activeTab, isLoading]);

  // Helper to generate random player reply for demo purposes
  const simulatePlayerReply = () => {
    setTimeout(() => {
        const replies = [
            "Siap, Coach!",
            "Diterima infonya, Coach.",
            "Oke, otw.",
            "Mantap, siap laksanakan!",
            "Baik, Coach."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const randomPlayerId = Math.floor(Math.random() * 8) + 1; // Random ID 1-9
        
        const replyMsg: ChatMessage = {
            id: Date.now(),
            senderId: randomPlayerId,
            senderName: `Pemain #${randomPlayerId}`, // Simplified name for demo
            text: randomReply,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setTeamMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      senderId: 0, // 0 is the current user (Coach)
      senderName: 'Coach',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setNewMessage('');

    if (activeTab === 'team') {
        // Logic for Team Chat
        setTeamMessages(prev => [...prev, userMsg]);
        simulatePlayerReply();
    } else {
        // Logic for AI Chat
        if (isLoading) return;
        
        setAiMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMsg.text,
                config: {
                systemInstruction: 'Anda adalah Asisten Pelatih Bola Voli yang berpengalaman, cerdas, dan suportif. Tugas Anda adalah membantu Pelatih Utama dengan strategi permainan, ide latihan (drills), analisis performa, dan motivasi tim. Berikan jawaban yang ringkas, praktis, dan dalam Bahasa Indonesia yang natural.',
                },
            });

            if (response.text) {
                const aiMsg: ChatMessage = {
                id: Date.now() + 1,
                senderId: 99,
                senderName: 'Asisten AI',
                text: response.text,
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                };
                setAiMessages(prev => [...prev, aiMsg]);
            }
        } catch (error) {
            console.error('Error generating AI response:', error);
            const errorMsg: ChatMessage = {
                id: Date.now() + 1,
                senderId: 99,
                senderName: 'System',
                text: "Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba lagi.",
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            };
            setAiMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }
  };

  const displayedMessages = activeTab === 'team' ? teamMessages : aiMessages;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pesan</h2>
        
        {/* Tab Switcher */}
        <div className="flex p-1 mt-2 bg-gray-200 dark:bg-slate-800 rounded-lg">
            <button
                onClick={() => setActiveTab('team')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-bold transition-all ${
                    activeTab === 'team' 
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
                <UsersIcon className="h-4 w-4 mr-2" />
                Tim
            </button>
            <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-bold transition-all ${
                    activeTab === 'ai' 
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
                <StarIcon className="h-4 w-4 mr-2" />
                Asisten AI
            </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 pb-24 px-4 scrollbar-hide">
        {displayedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}
          >
            {msg.senderId !== 0 && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  msg.senderId === 99 
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' 
                  : 'bg-gray-300 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
                }`}
              >
                {msg.senderId === 99 ? 'AI' : msg.senderName.charAt(0)}
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                msg.senderId === 0
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-slate-900 dark:bg-slate-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-transparent'
              }`}
            >
              {msg.senderId !== 0 && <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-1 opacity-80">{msg.senderName}</p>}
              <p className="text-sm whitespace-pre-wrap leading-snug">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.senderId === 0 ? 'text-indigo-200' : 'text-gray-400'} text-right`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {activeTab === 'ai' && isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    AI
                </div>
                <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-200 dark:border-transparent shadow-sm">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-[57px] left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 border-t border-gray-200 dark:border-slate-700 flex items-center space-x-2 transition-colors z-10"
        aria-label="Message Input Form"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={activeTab === 'team' ? "Pesan untuk tim..." : isLoading ? "Sedang berpikir..." : "Tanya strategi..."}
          disabled={isLoading && activeTab === 'ai'}
          className="flex-grow bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500 transition-colors border border-transparent focus:border-indigo-500"
          aria-label="Message Input"
        />
        <button
          type="submit"
          disabled={(isLoading && activeTab === 'ai') || newMessage.trim() === ''}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-2.5 rounded-full shadow-md transition-colors flex-shrink-0"
          aria-label="Send Message"
        >
          <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
        </button>
      </form>
    </div>
  );
};

export default ChatView;

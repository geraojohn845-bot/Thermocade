'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPortalDesktop() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('decks');
  const [decks, setDecks] = useState([
    { id: 'mod-01', title: 'First Law of Thermodynamics', count: 48, description: 'Heat capacity, work functions, isobaric and adiabatic thermal state transformations.' },
    { id: 'mod-02', title: 'Entropy & Heat Engines', count: 36, description: 'Carnot cycles, reversible processes, thermal efficiency formulas, and Clausius entropy balance.' },
    { id: 'mod-03', title: 'Phase Equilibria & Gibbs', count: 32, description: 'Maxwell Relations, chemical potential equilibrium, and Clausius-Clapeyron transitions.' },
    { id: 'mod-04', title: 'Kinetic Theory & Stat Mech', count: 26, description: 'Maxwell-Boltzmann molecular velocity profiles, microstates, and partition functions.' },
  ]);

  const [selectedDeck, setSelectedDeck] = useState(decks[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDeckObj = {
      id: `mod-0${decks.length + 1}`,
      title: newTitle,
      count: 0,
      description: newDesc || 'Custom thermodynamic module created in Admin Portal.',
    };

    setDecks([...decks, newDeckObj]);
    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#2D1810] flex flex-row font-outfit w-full">
      
      {/* 1. Permanent Desktop Left Sidebar */}
      <aside className="w-64 bg-[#FFF9F0] border-r border-[#F4A261]/30 p-6 flex flex-col justify-between shrink-0 min-h-screen">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8800] to-[#F4A261] flex items-center justify-center text-white text-lg shadow-md font-bold">
              ⚡
            </div>
            <div>
              <h1 className="font-extrabold text-sm font-[family-name:var(--font-fredoka)] tracking-tight">
                Smart Thermo
              </h1>
              <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-wider">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('decks')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-xs transition ${
                activeTab === 'decks'
                  ? 'bg-[#FF8800] text-white shadow-md'
                  : 'text-[#78350F] hover:bg-orange-100/50'
              }`}
            >
              <span>📚</span>
              <span>Quiz Decks</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-xs transition ${
                activeTab === 'analytics'
                  ? 'bg-[#FF8800] text-white shadow-md'
                  : 'text-[#78350F] hover:bg-orange-100/50'
              }`}
            >
              <span>📊</span>
              <span>Game Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-xs transition ${
                activeTab === 'leaderboard'
                  ? 'bg-[#FF8800] text-white shadow-md'
                  : 'text-[#78350F] hover:bg-orange-100/50'
              }`}
            >
              <span>🏆</span>
              <span>Global Standings</span>
            </button>
          </nav>
        </div>

        {/* User Profile / Exit */}
        <div className="pt-4 border-t border-orange-200/50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center font-bold text-xs text-[#92400E]">
              👨‍🏫
            </div>
            <div>
              <span className="block text-xs font-bold">Sysop Admin</span>
              <span className="text-[10px] text-gray-500">Instructor Mode</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            title="Exit to Student Arcade"
            className="text-xs text-gray-500 hover:text-[#FF8800] transition"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* 2. Main Desktop Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        
        {/* Top Header Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-[#F4A261]/20 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810]">
              Dashboard Overview
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Manage curriculum question pools and monitor student engagement.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-arcade px-4 py-2 text-xs flex items-center space-x-1.5"
          >
            <span>+ Create New Deck</span>
          </button>
        </header>

        {/* Content Body: Two-Column Split Grid */}
        <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-3 gap-6">
          
          {/* Left 2 Columns: Active Decks */}
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                Active Topic Modules ({decks.length})
              </h3>
              <span className="text-xs text-gray-400">Click a deck to inspect</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {decks.map((deck, idx) => {
                const isSelected = selectedDeck.id === deck.id;
                return (
                  <div
                    key={deck.id}
                    onClick={() => setSelectedDeck(deck)}
                    className={`squircle-card p-5 cursor-pointer transition border-2 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#FF8800] ring-4 ring-orange-500/10 shadow-md bg-white'
                        : 'border-transparent hover:border-orange-200 bg-white/90'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold bg-orange-50 text-[#D97706] px-2.5 py-1 rounded-md border border-orange-100">
                          📚 {deck.count} Questions
                        </span>
                        <span className="text-xs font-semibold text-gray-400 uppercase">
                          Mod 0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#2D1810] font-[family-name:var(--font-fredoka)] mb-1">
                        {deck.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-2">
                        {deck.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-orange-50 text-xs font-bold text-[#FF8800]">
                      <span>Select Deck to Edit →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Column: Sticky Selected Deck Management Panel */}
          <div className="col-span-1">
            <div className="squircle-card p-6 sticky top-24 shadow-md bg-white border border-orange-200">
              <span className="text-[10px] font-extrabold uppercase bg-orange-100 text-[#92400E] px-2.5 py-1 rounded-md">
                Active Selection
              </span>
              <h3 className="text-lg font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810] mt-3 mb-1">
                {selectedDeck.title}
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {selectedDeck.description}
              </p>

              <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-orange-100 mb-4">
                <div className="flex justify-between text-xs font-bold text-[#78350F] mb-1">
                  <span>Total Question Pool:</span>
                  <span>{selectedDeck.count} Items</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-500">
                  <span>Difficulty Spread:</span>
                  <span>Standard / Advanced</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => alert(`Opening Question Editor for: ${selectedDeck.title}`)}
                  className="btn-arcade w-full py-3 text-xs flex items-center justify-center space-x-2"
                >
                  <span>✏️ Manage Questions ({selectedDeck.count})</span>
                </button>
                <button
                  onClick={() => alert(`Quick bulk import tool opened for ${selectedDeck.title}`)}
                  className="w-full py-3 bg-orange-50 text-[#92400E] hover:bg-orange-100 font-bold text-xs rounded-full transition border border-orange-200 flex items-center justify-center space-x-1.5"
                >
                  <span>📥 Quick Import Raw Data</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Create Deck Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="squircle-card p-6 w-full max-w-md shadow-2xl bg-white border border-orange-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-extrabold text-[#2D1810] font-[family-name:var(--font-fredoka)]">
                Create New Topic Deck
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] mb-1">
                  Deck Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Thermodynamic Cycles & Efficiency"
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-orange-200 rounded-xl text-xs font-semibold text-[#2D1810] focus:outline-none focus:ring-2 focus:ring-[#FF8800]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] mb-1">
                  Short Description
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly describe the thermodynamic concepts covered..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-orange-200 rounded-xl text-xs font-semibold text-[#2D1810] focus:outline-none focus:ring-2 focus:ring-[#FF8800]"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-arcade flex-1 py-2.5 text-xs"
                >
                  Create Deck →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
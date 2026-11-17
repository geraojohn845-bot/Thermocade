
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPortalDesktop() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('decks');

  const [decks, setDecks] = useState([
    {
      id: 'mod-01',
      title: 'First Law of Thermodynamics',
      count: 48,
      description:
        'Heat capacity, work functions, isobaric and adiabatic thermal state transformations.',
    },
    {
      id: 'mod-02',
      title: 'Entropy & Heat Engines',
      count: 36,
      description:
        'Carnot cycles, reversible processes, thermal efficiency formulas, and Clausius entropy balance.',
    },
    {
      id: 'mod-03',
      title: 'Phase Equilibria & Gibbs',
      count: 32,
      description:
        'Maxwell Relations, chemical potential equilibrium, and Clausius-Clapeyron transitions.',
    },
    {
      id: 'mod-04',
      title: 'Kinetic Theory & Stat Mech',
      count: 26,
      description:
        'Maxwell-Boltzmann molecular velocity profiles, microstates, and partition functions.',
    },
  ]);

  const [selectedDeck, setSelectedDeck] = useState(decks[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // CREATE NEW DECK
  const handleCreateDeck = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) return;

    const newDeckObj = {
      id: `mod-${String(decks.length + 1).padStart(2, '0')}`,
      title: newTitle.trim(),
      count: 0,
      description:
        newDesc.trim() ||
        'Custom thermodynamic module created in Admin Portal.',
    };

    setDecks((previousDecks) => [...previousDecks, newDeckObj]);
    setSelectedDeck(newDeckObj);

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5E1] text-[#2D1810] flex flex-col lg:flex-row font-outfit overflow-x-hidden">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 lg:shrink-0 bg-[#FFF9F0] border-b lg:border-b-0 lg:border-r border-[#F4A261]/30 p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-h-0 lg:min-h-screen">

        <div>
          {/* LOGO */}
          <div className="flex items-center space-x-3 mb-5 lg:mb-8">
            <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-[#FF8800] to-[#F4A261] flex items-center justify-center text-white text-lg shadow-md font-bold">
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

          {/* NAVIGATION */}
          <nav className="grid grid-cols-3 lg:grid-cols-1 gap-2">

            <button
              onClick={() => setActiveTab('decks')}
              className={`w-full min-w-0 flex items-center justify-center lg:justify-start space-x-1.5 lg:space-x-3 px-2 lg:px-4 py-3 rounded-2xl font-bold text-[10px] sm:text-xs transition ${
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
              className={`w-full min-w-0 flex items-center justify-center lg:justify-start space-x-1.5 lg:space-x-3 px-2 lg:px-4 py-3 rounded-2xl font-bold text-[10px] sm:text-xs transition ${
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
              className={`w-full min-w-0 flex items-center justify-center lg:justify-start space-x-1.5 lg:space-x-3 px-2 lg:px-4 py-3 rounded-2xl font-bold text-[10px] sm:text-xs transition ${
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

        {/* ADMIN PROFILE */}
        <div className="hidden lg:flex pt-4 mt-6 border-t border-orange-200/50 items-center justify-between">

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center font-bold text-xs text-[#92400E]">
              👨‍🏫
            </div>

            <div>
              <span className="block text-xs font-bold">
                Sysop Admin
              </span>

              <span className="text-[10px] text-gray-500">
                Instructor Mode
              </span>
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

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 w-full min-h-screen overflow-x-hidden">

        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-md border-b border-[#F4A261]/20 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-20">

          <div className="min-w-0">
            <h2 className="text-xl font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810]">
              Dashboard Overview
            </h2>

            <p className="text-xs text-gray-500 font-medium">
              Manage curriculum question pools and monitor student engagement.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-arcade px-4 py-3 sm:py-2 text-xs flex items-center justify-center space-x-1.5 shrink-0"
          >
            <span>+ Create New Deck</span>
          </button>

        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">

          {/* ACTIVE DECKS */}
          <div className="xl:col-span-2 space-y-4 min-w-0">

            <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                Active Topic Modules ({decks.length})
              </h3>

              <span className="text-xs text-gray-400">
                Click a deck to inspect
              </span>
            </div>

            {/* DECK CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {decks.map((deck, idx) => {
                const isSelected = selectedDeck.id === deck.id;

                return (
                  <div
                    key={deck.id}
                    onClick={() => setSelectedDeck(deck)}
                    className={`squircle-card p-5 cursor-pointer transition border-2 flex flex-col justify-between min-w-0 bg-white ${
                      isSelected
                        ? 'border-[#FF8800] ring-4 ring-orange-500/10 shadow-md'
                        : 'border-transparent hover:border-orange-200'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold bg-orange-50 text-[#D97706] px-2.5 py-1 rounded-md border border-orange-100">
                          📚 {deck.count} Questions
                        </span>

                        <span className="text-xs font-semibold text-gray-400 uppercase shrink-0">
                          Mod {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-[#2D1810] font-[family-name:var(--font-fredoka)] mb-1 break-words">
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

          {/* SELECTED DECK MANAGEMENT */}
          <div className="xl:col-span-1 min-w-0">

            <div className="squircle-card p-5 sm:p-6 xl:sticky xl:top-24 shadow-md bg-white border border-orange-200">

              <span className="text-[10px] font-extrabold uppercase bg-orange-100 text-[#92400E] px-2.5 py-1 rounded-md">
                Active Selection
              </span>

              <h3 className="text-lg font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810] mt-3 mb-1 break-words">
                {selectedDeck.title}
              </h3>

              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {selectedDeck.description}
              </p>

              {/* QUESTION STATISTICS */}
              <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-orange-100 mb-4">

                <div className="flex justify-between flex-wrap gap-2 text-xs font-bold text-[#78350F] mb-1">
                  <span>Total Question Pool:</span>
                  <span>{selectedDeck.count} Items</span>
                </div>

                <div className="flex justify-between flex-wrap gap-2 text-xs font-semibold text-gray-500">
                  <span>Difficulty Spread:</span>
                  <span>Standard / Advanced</span>
                </div>

              </div>

              {/* MANAGEMENT BUTTON */}
              <div className="space-y-2.5">
                <button
                  onClick={() =>
                    alert(`Opening Question Editor for: ${selectedDeck.title}`)
                  }
                  className="btn-arcade w-full py-3 px-2 text-xs flex items-center justify-center space-x-2"
                >
                  <span>✏️ Manage Questions ({selectedDeck.count})</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* CREATE DECK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">

          <div className="squircle-card p-5 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl bg-white border border-orange-200">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center gap-3 mb-4">
              <h3 className="text-lg font-extrabold text-[#2D1810] font-[family-name:var(--font-fredoka)]">
                Create New Topic Deck
              </h3>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 shrink-0 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* CREATE FORM */}
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

              {/* MODAL ACTIONS */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

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

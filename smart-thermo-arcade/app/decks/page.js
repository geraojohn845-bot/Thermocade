'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeckSelectionScreen() {
  const [nickname, setNickname] = useState('KelvinExplorer');
  const [selectedDeck, setSelectedDeck] = useState('first-law');
  const router = useRouter();

  useEffect(() => {
    // Load player nickname saved from the Welcome screen
    const savedName = localStorage.getItem('thermo_player_nickname');
    if (savedName) setNickname(savedName);
  }, []);

  const decks = [
    {
      id: 'first-law',
      title: 'First Law of Thermo',
      description: 'Internal energy, isobaric/isothermal work, and energy conservation (ΔU = Q - W).',
      mode: 'Standard (45s/Q)',
      topScore: 'Top: 940 pts',
    },
    {
      id: 'entropy',
      title: 'Entropy & Second Law',
      description: 'Carnot cycles, Clausius inequality, statistical disorder, and reversible vs. spontaneous paths.',
      mode: 'Challenging (30s/Q)',
      topScore: 'Top: 810 pts',
    },
    {
      id: 'calorimetry',
      title: 'Calorimetry & Heat Transfer',
      description: 'Specific heat, latent heats of fusion/vaporization, conduction Fourier gradients, and radiative balance.',
      mode: 'Standard (40s/Q)',
      topScore: 'Top: 885 pts',
    },
  ];

  const handleLaunchSprint = () => {
    localStorage.setItem('thermo_selected_deck', selectedDeck);
    router.push('/play');
  };

  return (
    <div className="flex flex-col min-h-[90vh] py-6 max-w-md mx-auto">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl hover:bg-orange-50 transition"
        >
          ←
        </button>
        <div className="text-xs font-bold text-[#78350F] bg-orange-100/60 px-3 py-1 rounded-full">
          Player: {nickname}
        </div>
      </div>

      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810]">
          Choose Deck
        </h1>
        <p className="text-xs text-[#78350F] mt-1 font-medium">
          Select a thermodynamic system to begin your 10-question sprint.
        </p>
      </div>

      {/* Decks List */}
      <div className="space-y-4 mb-6 flex-1">
        {decks.map((deck) => {
          const isSelected = selectedDeck === deck.id;
          return (
            <div
              key={deck.id}
              onClick={() => setSelectedDeck(deck.id)}
              className={`squircle-card p-5 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-[#FF8800] ring-4 ring-orange-500/10 shadow-lg scale-[1.02]'
                  : 'border-transparent hover:border-orange-200'
              }`}
            >
              <h3 className="font-bold text-lg text-[#2D1810] font-[family-name:var(--font-fredoka)] mb-1">
                {deck.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {deck.description}
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#92400E]">
                <span className="bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                  ⚡ {deck.mode}
                </span>
                <span className="bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                  🏆 {deck.topScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Launch Sprint Button */}
      <button
        onClick={handleLaunchSprint}
        className="btn-arcade w-full py-4 text-base flex items-center justify-center space-x-2 mt-auto"
      >
        <span>Launch Sprint</span>
        <span className="text-xl">→</span>
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomeScreen() {
  const [nickname, setNickname] = useState('KelvinExplorer');
  const [mode, setMode] = useState('arcade');

  const router = useRouter();

  const handleRandomizeNickname = () => {
    const prefixes = [
      'Kelvin',
      'Carnot',
      'Entropy',
      'Joule',
      'Rankine',
      'Adiabatic',
    ];

    const suffixes = [
      'Explorer',
      'Master',
      'Wizard',
      'Cycl',
      'Dynamic',
      'Sprite',
    ];

    const randomName = `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${suffixes[Math.floor(Math.random() * suffixes.length)]}`;

    setNickname(randomName);
  };

  const handleStartPlaying = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) return;

    try {
      localStorage.setItem('thermo_player_nickname', trimmedNickname);
      localStorage.setItem('thermo_game_mode', mode);

      router.push('/decks');
    } catch (error) {
      console.error('Failed to save player information:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[90vh] py-6 px-4">

      <div className="bg-[#FFE5CC] text-[#D97706] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase shadow-sm">
        🔥 Physics & Chemistry Quiz
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center font-[family-name:var(--font-fredoka)] tracking-tight text-[#2D1810] mb-2 leading-tight">
        SMART THERMO <span className="text-[#FF8800]">ARCADE</span>
      </h1>

      <p className="text-sm text-[#78350F] text-center mb-6 max-w-xs font-medium">
        Test your thermodynamics mastery through high-energy arcade challenges!
      </p>

      <div className="squircle-card p-6 w-full max-w-sm shadow-xl bg-white">

        <form onSubmit={handleStartPlaying} className="space-y-5">

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                Player Nickname
              </label>

              <span className="text-[10px] text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3 text-lg">🤖</span>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                className="w-full pl-10 pr-10 py-3 bg-[#FFF9F0] border border-[#F4A261]/40 rounded-2xl font-semibold text-[#2D1810] focus:outline-none focus:ring-2 focus:ring-[#FF8800] transition"
                placeholder="Enter nickname..."
                required
              />

              <button
                type="button"
                onClick={handleRandomizeNickname}
                title="Generate Random Nickname"
                className="absolute right-3 text-gray-500 hover:text-[#FF8800] text-lg transition"
              >
                🎲
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2">
              Select Gameplay Mode
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setMode('casual')}
                aria-pressed={mode === 'casual'}
                className={`cursor-pointer p-3 rounded-2xl border-2 transition flex flex-col items-center text-center ${
                  mode === 'casual'
                    ? 'border-[#FF8800] bg-orange-50/50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-xl mb-1">🧘</span>
                <h3 className="font-bold text-xs text-[#2D1810]">Casual Practice</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Untimed • Revives</p>
              </button>

              <button
                type="button"
                onClick={() => setMode('arcade')}
                aria-pressed={mode === 'arcade'}
                className={`cursor-pointer p-3 rounded-2xl border-2 transition flex flex-col items-center text-center ${
                  mode === 'arcade'
                    ? 'border-[#FF8800] bg-orange-50/50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-xl mb-1">⏱️</span>
                <h3 className="font-bold text-xs text-[#2D1810]">Arcade Rush</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">60s • 2x Multiplier</p>
              </button>

            </div>
          </div>

          <button
            type="submit"
            className="btn-arcade w-full py-4 text-base flex items-center justify-center space-x-2 mt-2"
          >
            <span>Start Playing</span>
            <span className="text-xl">→</span>
          </button>

        </form>
      </div>
    </div>
  );
}

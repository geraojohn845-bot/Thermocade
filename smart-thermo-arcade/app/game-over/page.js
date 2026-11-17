'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function GameOverScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('Alex_Thermo');
  const [score, setScore] = useState(450);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('thermo_player_nickname');
    const finalScore = localStorage.getItem('thermo_final_score');
    if (savedName) setNickname(savedName);
    if (finalScore) setScore(parseInt(finalScore, 10));

    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10); // Get top 10 scores

      if (error) {
        console.error('Error fetching leaderboard:', error.message);
      } else if (data) {
        // Format rows and mark the current active user
        const formatted = data.map((item, idx) => ({
          rank: idx + 1,
          name: item.nickname,
          title: idx === 0 ? 'Carnot Heat Engine Master' : 'Entropy Explorer',
          score: item.score,
          isUser: item.nickname === localStorage.getItem('thermo_player_nickname')
        }));
        setLeaderboard(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[92vh] py-4 max-w-md mx-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => router.push('/decks')}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lg hover:bg-orange-50 transition"
        >
          ←
        </button>
        <span className="text-xs font-bold text-[#78350F] bg-orange-100/60 px-3 py-1 rounded-full">
          Sprint Completed ⚡
        </span>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-fredoka)] text-[#2D1810]">
          Game Over!
        </h1>
        <p className="text-xs text-[#78350F] mt-1 font-medium">
          Thermodynamics Quiz Completed! 🎉
        </p>
      </div>

      {/* Total Performance Squircle Card */}
      <div className="squircle-card p-5 mb-5 shadow-md text-center relative overflow-hidden">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#FF8800] to-[#F4A261] flex items-center justify-center text-white text-2xl shadow-md">
          🏆
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-1">
          Total Performance
        </h3>
        <div className="text-3xl font-extrabold text-[#2D1810] font-[family-name:var(--font-fredoka)] mb-3">
          {score} <span className="text-sm font-semibold text-gray-500">/ 500</span>
        </div>

        <div className="w-full bg-orange-100 h-2.5 rounded-full overflow-hidden mb-4">
          <div
            className="bg-[#FF8800] h-full rounded-full transition-all duration-500"
            style={{ width: `${(score / 500) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-orange-100">
          <div className="bg-[#FFF9F0] p-2 rounded-2xl border border-orange-100">
            <span className="block text-[10px] text-gray-500 uppercase font-bold">Accuracy</span>
            <span className="text-sm font-extrabold text-[#2D1810] font-[family-name:var(--font-fredoka)]">
              {Math.round((score / 500) * 100)}%
            </span>
          </div>
          <div className="bg-[#FFF9F0] p-2 rounded-2xl border border-orange-100">
            <span className="block text-[10px] text-gray-500 uppercase font-bold">Best Streak</span>
            <span className="text-sm font-extrabold text-[#2D1810] font-[family-name:var(--font-fredoka)]">
              🔥 5
            </span>
          </div>
          <div className="bg-[#FFF9F0] p-2 rounded-2xl border border-orange-100">
            <span className="block text-[10px] text-gray-500 uppercase font-bold">Rank Tier</span>
            <span className="text-sm font-extrabold text-[#FF8800] font-[family-name:var(--font-fredoka)]">
              Top 5%
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mb-6 flex-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#78350F] mb-3 flex items-center space-x-1.5">
          <span>🏆</span>
          <span>Live Supabase Leaderboard</span>
        </h3>

        {loading ? (
          <div className="text-center py-6 text-xs text-gray-500">Loading live standings...</div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-500 bg-white rounded-2xl border border-orange-100">
            No scores recorded yet. Be the first on the board!
          </div>
        ) : (
          <div className="space-y-2.5">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                  player.isUser
                    ? 'bg-orange-50/80 border-[#FF8800] shadow-sm relative'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-[#92400E] font-bold text-xs flex items-center justify-center shrink-0">
                    {player.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-[#2D1810] font-[family-name:var(--font-fredoka)] flex items-center space-x-1.5">
                      <span>{player.name}</span>
                      {player.isUser && (
                        <span className="bg-[#FF8800] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                          YOU
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-medium">{player.title}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#FF8800] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                  {player.score} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Play Again Button */}
      <button
        onClick={() => router.push('/decks')}
        className="btn-arcade w-full py-3.5 text-base flex items-center justify-center space-x-2 mt-auto"
      >
        <span>Play Again 🔄</span>
      </button>
    </div>
  );
}
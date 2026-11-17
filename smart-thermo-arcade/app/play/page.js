'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function PlayScreen() {
  const router = useRouter();
  
  const questions = [
    {
      id: 1,
      topic: '1ST LAW • CLOSED SYSTEMS',
      tier: 'Tier 1',
      prompt: 'What does the First Law of Thermodynamics state about energy in an isolated system?',
      options: [
        { key: 'A', text: 'Energy cannot be created or destroyed, only transformed', correct: true },
        { key: 'B', text: 'Entropy of an isolated system always decreases over time', correct: false },
        { key: 'C', text: 'Absolute zero can be reached in finite isothermal steps', correct: false },
        { key: 'D', text: 'Energy is continuously destroyed due to friction losses', correct: false },
      ],
      explanation: 'The First Law is simply the law of conservation of energy applied to thermodynamic systems: ΔU = Q - W.',
    },
    {
      id: 2,
      topic: 'ISOBARIC PROCESSES',
      tier: 'Tier 1',
      prompt: 'In an isobaric process, which thermodynamic property remains constant?',
      options: [
        { key: 'A', text: 'Internal energy (U)', correct: false },
        { key: 'B', text: 'Pressure (P = constant)', correct: true },
        { key: 'C', text: 'Temperature (T = constant)', correct: false },
        { key: 'D', text: 'Volume (V = constant)', correct: false },
      ],
      explanation: 'An isobaric process is a thermodynamic process in which the pressure stays constant (ΔP = 0).',
    },
    {
      id: 3,
      topic: 'ADIABATIC EXPANSION',
      tier: 'Tier 2',
      prompt: 'For an adiabatic expansion of an ideal gas, what is the net heat transfer (Q)?',
      options: [
        { key: 'A', text: 'Q = nRT ln(V2/V1)', correct: false },
        { key: 'B', text: 'Q = ΔU + W', correct: false },
        { key: 'C', text: 'Q = 0', correct: true },
        { key: 'D', text: 'Q = Maximum possible work', correct: false },
      ],
      explanation: 'By definition, an adiabatic process involves no heat transfer between the system and its surroundings (Q = 0).',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (isAnswered) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered]);

  const handleAnswer = (optionKey) => {
    if (isAnswered) return;
    setSelectedOption(optionKey);
    setIsAnswered(true);

    const chosen = currentQ.options.find((o) => o.key === optionKey);
    if (chosen && chosen.correct) {
      setScore((prev) => prev + 40);
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(45);
    } else {
      const finalScore = score;
      localStorage.setItem('thermo_final_score', finalScore);

      const nickname = localStorage.getItem('thermo_player_nickname') || 'KelvinExplorer';
      try {
        const { error } = await supabase
          .from('leaderboard')
          .insert([{ nickname: nickname, score: finalScore }]);
        
        if (error) {
          console.error('Error saving score to Supabase:', error.message);
        }
      } catch (err) {
        console.error('Unexpected error saving score:', err);
      }

      router.push('/game-over');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-[92vh] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.push('/decks')}
            className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-lg hover:bg-orange-50 transition"
          >
            ←
          </button>

          <div className="flex items-center space-x-2">
            <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-orange-100 flex items-center space-x-1 text-xs font-bold text-[#78350F]">
              <span>⭐</span>
              <span>{score} pts</span>
            </div>
            <div className="bg-orange-100 text-[#92400E] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              ⏱️ {timeLeft}s
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs font-bold text-[#78350F] mb-1">
            <span>QUESTION {currentIndex + 1} / {questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-orange-200/50 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FF8800] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="squircle-card p-5 mb-4 shadow-md bg-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-extrabold uppercase bg-orange-50 text-[#D97706] px-2.5 py-1 rounded-md border border-orange-100">
              {currentQ.topic}
            </span>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {currentQ.tier}
            </span>
          </div>
          <h2 className="text-base font-bold text-[#2D1810] font-[family-name:var(--font-fredoka)] leading-snug">
            {currentQ.prompt}
          </h2>
        </div>

        <div className="space-y-3 mb-4">
          {currentQ.options.map((opt) => {
            let cardStyle = 'bg-white border-gray-200 hover:border-orange-300';
            if (isAnswered) {
              if (opt.correct) {
                cardStyle = 'bg-green-100 border-green-500 text-green-900 shadow-sm';
              } else if (selectedOption === opt.key) {
                cardStyle = 'bg-red-100 border-red-500 text-red-900 shadow-sm';
              } else {
                cardStyle = 'opacity-60 bg-white border-gray-200';
              }
            }

            return (
              <div
                key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center space-x-3 ${cardStyle}`}
              >
                <span className="w-7 h-7 rounded-full bg-orange-50 text-[#FF8800] font-bold flex items-center justify-center text-xs shrink-0 border border-orange-200">
                  {opt.key}
                </span>
                <span className="text-xs font-semibold text-[#2D1810] leading-snug">
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {isAnswered && (
          <div className="bg-[#FFF8F0] border border-[#F4A261]/40 rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#D97706] mb-1">
              <span>💡</span>
              <span>THERMO FACT</span>
            </div>
            <p className="text-xs text-[#78350F] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {isAnswered && (
        <button
          onClick={handleNextQuestion}
          className="btn-arcade w-full py-3.5 text-base flex items-center justify-center space-x-2 mt-4"
        >
          <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Leaderboard'}</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
}
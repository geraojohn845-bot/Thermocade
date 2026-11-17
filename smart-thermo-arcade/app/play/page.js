import { supabase } from '@/lib/supabaseClient';

// ... inside your PlayScreen component ...

  const handleNextQuestion = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(45);
    } else {
      // 1. Calculate final score
      const finalScore = score;
      localStorage.setItem('thermo_final_score', finalScore);

      // 2. Save score to Supabase Leaderboard table
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

      // 3. Head to Game Over / Leaderboard screen
      router.push('/game-over');
    }
  };
import { useState, useEffect } from 'react';
import type { MappedLesson } from '../../types/curriculum';

interface BattleGameProps {
  lesson: MappedLesson;
  onComplete: (passed: boolean, rewards: { xp: number; gold: number; streak: number }) => void;
}

export function BattleGame({ lesson, onComplete }: BattleGameProps) {
  // Game state
  const [playerHp, setPlayerHp] = useState(85);
  const [enemyHp, setEnemyHp] = useState(60);
  const [isCasting, setIsCasting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'victory' | 'defeat'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);

  // Get 1-3 random exercises for the battle
  const battleExercises = lesson.exercises.slice(0, Math.min(3, lesson.exercises.length));
  const currentQuestion = battleExercises[questionIndex] ?? battleExercises[0];
  const questionOptions = currentQuestion.options || [];

  // Auto-timeout if no answer after 60 seconds
  useEffect(() => {
    if (gamePhase !== 'playing' || selectedAnswer) return;

    const timeout = setTimeout(() => {
      // Auto-fail if no answer
      setPlayerHp((prev) => Math.max(0, prev - 20));
      setSelectedAnswer('timeout');
      setIsCasting(true);
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCasting(false);
      }, 1000);
    }, 60000); // 60 second timeout

    return () => clearTimeout(timeout);
  }, [gamePhase, selectedAnswer]);

  const handleStartBattle = () => {
    setQuestionIndex(0);
    setGamePhase('playing');
  };

  const handleAnswer = (answer: string) => {
    if (isCasting || selectedAnswer) return;

    setSelectedAnswer(answer);
    setIsCasting(true);

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      // Deal damage to enemy
      setTimeout(() => {
        setEnemyHp((prev) => Math.max(0, prev - 30));
        setTimeout(() => {
          const newEnemyHp = enemyHp - 30;
          const hasNextQuestion = questionIndex + 1 < battleExercises.length;
          if (newEnemyHp <= 0 || !hasNextQuestion) {
            setGamePhase('victory');
            onComplete(true, {
              xp: 250,
              gold: 80,
              streak: 1,
            });
          } else {
            setQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsCasting(false);
          }
        }, 800);
      }, 1500);
    } else {
      // Take damage
      setTimeout(() => {
        const newHp = playerHp - 20;
        setPlayerHp(Math.max(0, newHp));
        setTimeout(() => {
          if (newHp <= 0) {
            setGamePhase('defeat');
            onComplete(false, { xp: 0, gold: 0, streak: 0 });
          } else {
            setSelectedAnswer(null);
            setIsCasting(false);
          }
        }, 800);
      }, 1500);
    }
  };

  if (gamePhase === 'intro') {
    return (
      <div className="w-full bg-surface-container-low p-6 rounded-xl border border-outline-variant">
        <div className="text-center mb-4">
          <h3 className="font-headline-md text-xl text-primary mb-2">Battle Arena</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Defeat the enemy by answering questions correctly!
          </p>
        </div>
        <button
          onClick={handleStartBattle}
          className="w-full bg-primary text-on-primary px-6 py-3 rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 transition-all"
        >
          Enter Battle
        </button>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="w-full space-y-4">
        {/* HP Bars */}
        <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant">
          <div className="flex justify-between items-start gap-4">
            {/* Player */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary">You</span>
                <span className="text-xs text-on-surface-variant">{playerHp}/100</span>
              </div>
              <div className="h-3 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {/* VS Badge */}
            <div className="flex items-center justify-center pt-2 z-10 px-4">
              <div className="w-8 h-8 bg-primary rounded-full border border-surface-tint flex items-center justify-center text-white text-sm font-bold">
                ⚔️
              </div>
            </div>

            {/* Enemy */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-on-surface-variant">Enemy</span>
                <span className="text-xs text-on-surface-variant">{enemyHp}/100</span>
              </div>
              <div className="h-3 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className="h-full bg-error transition-all duration-500"
                  style={{ width: `${enemyHp}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-surface-container-high border-2 border-primary rounded-xl p-4">
          <p className="text-xs text-primary font-bold uppercase mb-2">Battle Question</p>
          <h4 className="font-headline-sm text-lg text-primary mb-4">{currentQuestion.question}</h4>

          {/* Options */}
          <div className="space-y-2">
            {questionOptions.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.answer;
              const showCorrect = isCasting && isCorrect;
              const showIncorrect = isCasting && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isCasting || selectedAnswer !== null}
                  className={`w-full text-left p-3 rounded-lg border-2 font-label-md transition-all ${
                    showCorrect
                      ? 'bg-success/20 border-success'
                      : showIncorrect
                      ? 'bg-error/20 border-error'
                      : isSelected
                      ? 'bg-primary/20 border-primary'
                      : 'bg-surface border-outline-variant hover:border-primary'
                  } ${isCasting || selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {showCorrect && (
                      <span className="material-symbols-outlined text-success text-lg">
                        check_circle
                      </span>
                    )}
                    {showIncorrect && (
                      <span className="material-symbols-outlined text-error text-lg">cancel</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Casting Animation */}
        {isCasting && (
          <div className="flex justify-center py-4">
            <span className="material-symbols-outlined text-5xl text-primary animate-ping">
              bolt
            </span>
          </div>
        )}
      </div>
    );
  }

  if (gamePhase === 'victory') {
    return (
      <div className="w-full bg-success/20 border border-success rounded-xl p-6 text-center space-y-4">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="font-headline-md text-xl text-primary">Victory!</h3>
        <p className="text-sm text-on-surface-variant mb-4">You defeated the enemy!</p>
        <div className="bg-surface rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>⭐ XP Earned:</span>
            <span className="font-bold text-primary">+250</span>
          </div>
          <div className="flex justify-between">
            <span>💰 Gold Earned:</span>
            <span className="font-bold text-primary">+80</span>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'defeat') {
    return (
      <div className="w-full bg-error/20 border border-error rounded-xl p-6 text-center space-y-4">
        <div className="text-4xl mb-2">💔</div>
        <h3 className="font-headline-md text-xl text-on-surface">Defeat</h3>
        <p className="text-sm text-on-surface-variant mb-4">Try again to win this battle!</p>
      </div>
    );
  }

  return null;
}

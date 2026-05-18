import { useState, useEffect } from 'react';
import type { MappedLesson } from '../../types/curriculum';

interface RiddleGameProps {
  lesson: MappedLesson;
  onComplete: (passed: boolean, rewards: { xp: number; gold: number; streak: number }) => void;
}

export function RiddleGame({ lesson, onComplete }: RiddleGameProps) {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'hint' | 'result'>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [didPass, setDidPass] = useState(false);

  // Get first exercise as the riddle (complex question)
  const riddle = lesson.exercises[0];
  const options = riddle.options || [];

  // Auto-timeout if no answer after 120 seconds (riddles need more time)
  useEffect(() => {
    if (gamePhase !== 'playing' || selectedAnswer) return;

    const timeout = setTimeout(() => {
      // Auto-fail if no answer
      setAttempts((prev) => prev + 1);
      setSelectedAnswer('timeout');
      setTimeout(() => {
        setGamePhase('result');
        onComplete(false, { xp: 0, gold: 0, streak: 0 });
      }, 1000);
    }, 120000); // 120 second timeout for riddles

    return () => clearTimeout(timeout);
  }, [gamePhase, selectedAnswer, onComplete]);

  const handleStartRiddle = () => {
    setDidPass(false);
    setAttempts(0);
    setShowHint(false);
    setSelectedAnswer(null);
    setGamePhase('playing');
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    setAttempts((prev) => prev + 1);

    // Case-insensitive and whitespace-trimmed comparison
    const isCorrect = answer.toLowerCase().trim() === (riddle.answer as string).toLowerCase().trim();

    setTimeout(() => {
      if (isCorrect) {
        setDidPass(true);
        setGamePhase('result');
        onComplete(true, {
          xp: 100,
          gold: 30,
          streak: 1,
        });
      } else if (attempts < 2) {
        // Allow retry
        setGamePhase('hint');
      } else {
        setDidPass(false);
        // Failed after 2 attempts
        setGamePhase('result');
        onComplete(false, { xp: 0, gold: 0, streak: 0 });
      }
    }, 1000);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setGamePhase('playing');
  };

  if (gamePhase === 'intro') {
    return (
      <div className="w-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 p-6 rounded-xl border-2 border-purple-500">
        <div className="text-center mb-4">
          <span className="material-symbols-outlined text-5xl text-purple-600 block mb-3">
            help
          </span>
          <h3 className="font-headline-md text-xl text-purple-600 mb-2">Riddle Challenge</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Solve the riddle to advance! You get a hint if needed.
          </p>
        </div>
        <button
          onClick={handleStartRiddle}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 transition-all"
        >
          Start Riddle
        </button>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="w-full space-y-4">
        {/* Riddle Card */}
        <div className="bg-gradient-to-br from-surface-container to-surface-container-high border-2 border-purple-500/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-purple-600">lightbulb</span>
            <p className="text-xs text-purple-600 font-bold uppercase">Riddle</p>
          </div>

          <h4 className="font-headline-sm text-lg text-primary mb-6 italic">
            {riddle.question}
          </h4>

          {/* Hint Section */}
          {showHint && riddle.hints && riddle.hints.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-xs text-yellow-700 font-bold mb-1">💡 HINT:</p>
              <p className="text-sm text-yellow-800">{riddle.hints[0]}</p>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-2">
            {options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === riddle.answer;
              const showResult = selectedAnswer !== null;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 font-label-md transition-all ${
                    showResult && isCorrect
                      ? 'bg-success/20 border-success'
                      : showResult && isSelected && !isCorrect
                      ? 'bg-error/20 border-error'
                      : isSelected
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-surface border-outline-variant hover:border-purple-500'
                  } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <span className="material-symbols-outlined text-success">
                        check_circle
                      </span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-error">cancel</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hint Button */}
          {!showHint && selectedAnswer === null && riddle.hints && (
            <button
              onClick={() => setShowHint(true)}
              className="w-full mt-4 px-4 py-2 border border-yellow-500/50 text-yellow-700 rounded-lg hover:bg-yellow-500/10 transition-all font-label-md text-sm"
            >
              💡 Get Hint (Attempt {attempts + 1}/3)
            </button>
          )}
        </div>
      </div>
    );
  }

  if (gamePhase === 'hint') {
    return (
      <div className="w-full space-y-4">
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 text-center">
          <p className="text-4xl mb-3">💡</p>
          <h3 className="font-headline-md text-lg text-yellow-800 mb-2">Here's a Hint!</h3>
          {riddle.hints && riddle.hints[0] && (
            <p className="text-sm text-yellow-700 mb-4 italic">"{riddle.hints[0]}"</p>
          )}
          <p className="text-xs text-on-surface-variant mb-4">Try again with this hint...</p>
          <button
            onClick={handleRetry}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'result') {
    const passed = didPass;

    return (
      <div
        className={`w-full rounded-xl p-6 text-center space-y-4 border-2 ${
          passed ? 'bg-success/20 border-success' : 'bg-error/20 border-error'
        }`}
      >
        <div className="text-4xl">{passed ? '🎉' : '🤔'}</div>
        <h3 className="font-headline-md text-xl text-primary">
          {passed ? 'Riddle Solved!' : 'Better Luck Next Time'}
        </h3>
        {passed && (
          <div className="bg-surface rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>⭐ XP Earned:</span>
              <span className="font-bold text-primary">+100</span>
            </div>
            <div className="flex justify-between">
              <span>💰 Gold Earned:</span>
              <span className="font-bold text-primary">+30</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

import { useState, useEffect } from 'react';
import type { Exercise } from '../../types/curriculum';
import { useGameStore } from '../../store/useGameStore';

interface GameTabProps {
  exercises: Exercise[];
  lessonId: string;
  lessonTitle: string;
}

export function GameTab({ exercises, lessonTitle }: GameTabProps) {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Get 3 random exercises for mini game
  const miniGameQuestions = exercises;

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const currentQuestion = miniGameQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < miniGameQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  if (miniGameQuestions.length === 0) {
    return (
      <div className="text-center p-6 rounded-xl bg-surface-container-low border border-outline-variant">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant">games</span>
        <p className="text-on-surface-variant mt-3">No exercises available for games</p>
      </div>
    );
  }

  // START STATE
  if (gameState === 'start') {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary rounded-2xl p-6 text-center">
          <span className="material-symbols-outlined text-5xl text-primary block mb-3">magic_button</span>
          <h3 className="font-headline-md text-xl text-primary mb-2">Mini Game Challenge</h3>
          <p className="text-on-surface-variant text-sm mb-4">
            Test your knowledge with {miniGameQuestions.length} quick {miniGameQuestions.length === 1 ? 'question' : 'questions'}!
          </p>
          <div className="flex gap-3 justify-center text-sm mb-4">
            <div className="bg-primary/20 px-3 py-1 rounded-full">
              <span className="font-bold text-primary">⭐ {miniGameQuestions.length * 10} XP</span>
            </div>
            <div className="bg-primary/20 px-3 py-1 rounded-full">
              <span className="font-bold text-primary">🏆 Easy</span>
            </div>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-primary text-on-primary px-6 min-h-[56px] flex items-center justify-center rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 active:brightness-90 transition-all"
          >
            Play Now
          </button>
        </div>
      </div>
    );
  }

  // PLAYING STATE
  if (gameState === 'playing') {
    const currentQuestion = miniGameQuestions[currentQuestionIndex];

    return (
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="bg-surface-container rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-on-surface-variant font-bold uppercase">
              Question {currentQuestionIndex + 1} / {miniGameQuestions.length}
            </p>
            <p className="text-xs font-bold text-primary">
              {correctAnswers} ⭐
            </p>
          </div>
          <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / miniGameQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-surface-container-high border-2 border-primary rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <p className="text-xs text-primary font-bold uppercase">Question</p>
          </div>

          <h4 className="font-headline-sm text-lg text-primary mb-6">
            {currentQuestion.question}
          </h4>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map(option => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.answer;
              const showCorrect = isAnswered && isCorrect;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 min-h-[56px] flex flex-col justify-center rounded-xl border-2 font-label-md transition-all ${
                    showCorrect
                      ? 'bg-success/20 border-success text-on-surface'
                      : showIncorrect
                      ? 'bg-error/20 border-error text-on-surface'
                      : isSelected
                      ? 'bg-primary/20 border-primary text-on-surface'
                      : 'bg-surface border-outline-variant hover:border-primary'
                  } ${isAnswered ? 'cursor-default' : 'cursor-pointer hover:bg-primary/10 active:scale-[0.98]'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && (
                      <span className="material-symbols-outlined text-success">check_circle</span>
                    )}
                    {showIncorrect && (
                      <span className="material-symbols-outlined text-error">cancel</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RESULT STATE
  if (gameState === 'result') {
    const totalXp = correctAnswers * 10;
    const totalGold = correctAnswers * 5;
    const passedGame = correctAnswers >= Math.ceil(miniGameQuestions.length / 2);

    return (
      <ResultScreen 
        passedGame={passedGame}
        correctAnswers={correctAnswers}
        totalQuestions={miniGameQuestions.length}
        lessonTitle={lessonTitle}
        totalXp={totalXp}
        totalGold={totalGold}
        onPlayAgain={() => setGameState('start')}
      />
    );
  }

  return null;
}

function ResultScreen({ passedGame, correctAnswers, totalQuestions, lessonTitle, totalXp, totalGold, onPlayAgain }: any) {
  const { addXp, addGold } = useGameStore();

  useEffect(() => {
    if (totalXp > 0 || totalGold > 0) {
      addXp(totalXp);
      addGold(totalGold);
    }
  }, [totalXp, totalGold, addXp, addGold]);

    return (
      <div className="space-y-4">
        {/* Celebration Card */}
        <div
          className={`relative rounded-2xl p-8 text-center overflow-hidden border-2 ${
            passedGame
              ? 'bg-success/20 border-success'
              : 'bg-warning/20 border-warning'
          }`}
        >
          {/* Celebration Particles */}
          {passedGame && (
            <>
              <div className="absolute top-2 left-4 text-3xl animate-pulse">✨</div>
              <div className="absolute top-4 right-6 text-3xl animate-pulse">⭐</div>
              <div className="absolute bottom-6 left-8 text-3xl animate-pulse">🎉</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-pulse">✨</div>
            </>
          )}

          <div className="relative z-10">
            <p className="text-4xl mb-3">
              {passedGame ? '🎉' : '💪'}
            </p>
            <h3 className="font-headline-md text-2xl font-bold mb-2">
              {passedGame ? `Excellent at ${lessonTitle}!` : 'Good Effort!'}
            </h3>
            <p className="text-on-surface-variant mb-6">
              {correctAnswers}/{totalQuestions} questions correct
            </p>

            {/* Rewards */}
            <div className="bg-surface rounded-xl p-4 mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="font-bold text-primary">+{totalXp} XP</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">💰</span>
                <span className="font-bold text-primary">+{totalGold} Gold</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🔥</span>
                <span className="font-bold text-primary">Streak +1 Day</span>
              </div>
            </div>

            <button
              onClick={onPlayAgain}
              className="w-full bg-primary text-on-primary px-6 min-h-[56px] flex items-center justify-center rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 active:brightness-90 transition-all"
            >
              Play Again
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant uppercase font-bold mb-3">Performance</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{correctAnswers}</p>
              <p className="text-xs text-on-surface-variant">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{totalQuestions - correctAnswers}</p>
              <p className="text-xs text-on-surface-variant">Missed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {Math.round((correctAnswers / totalQuestions) * 100)}%
              </p>
              <p className="text-xs text-on-surface-variant">Score</p>
            </div>
          </div>
        </div>
      </div>
    );
}

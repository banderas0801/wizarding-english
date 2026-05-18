import { useState, useEffect, useMemo } from 'react';
import type { MappedLesson } from '../../types/curriculum';

interface MatchGameProps {
  lesson: MappedLesson;
  onComplete: (passed: boolean, rewards: { xp: number; gold: number; streak: number }) => void;
}

export function MatchGame({ lesson, onComplete }: MatchGameProps) {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);

  // Create pairs from vocabulary + definitions
  const vocabulary = lesson.content.vocabulary && lesson.content.vocabulary.length > 0
    ? lesson.content.vocabulary.slice(0, 4)
    : ['word', 'meaning', 'reading', 'story'];

  // Comprehensive definition database
  const definitionDatabase: Record<string, string> = {
    'ant': 'A small insect that lives in colonies',
    'apple': 'A round fruit that grows on trees',
    'cat': 'A furry animal often kept as a pet',
    'dog': 'A loyal animal often kept as a pet',
    'run': 'To move quickly on foot',
    'jump': 'To leap into the air',
    'happy': 'Feeling joy or pleasure',
    'sad': 'Feeling sorrow or unhappiness',
    'word': 'A single unit of language with meaning',
    'meaning': 'The sense or significance of something',
    'reading': 'The act of looking at and understanding written words',
    'story': 'A narrative or tale about events',
    'book': 'A written work with pages bound together',
    'teacher': 'A person who educates students',
    'student': 'A person who learns in school',
    'school': 'A place where learning happens',
    'learn': 'To gain knowledge or skills',
    'know': 'To have information about',
    'think': 'To use your mind to consider something',
    'feel': 'To experience an emotion or sensation',
    'question': 'A sentence that asks for information',
    'answer': 'A response to a question',
    'letter': 'A symbol representing a sound in language',
    'number': 'A symbol representing a quantity',
  };

  // Get definitions for vocabulary, with fallback
  const getDefinition = (word: string): string => {
    return definitionDatabase[word.toLowerCase()] || `The meaning of the word "${word}"`;
  };

  // Create pairs with real definitions
  const pairs = vocabulary.map((word) => ({
    word,
    definition: getDefinition(word),
  }));

  // Shuffle definitions for display
  const shuffledDefs = useMemo(() => [...pairs].sort((a, b) => a.word.localeCompare(b.word)).reverse(), [pairs]);

  const handleStartGame = () => {
    setGamePhase('playing');
  };

  const handleMatch = (word: string, definition: string) => {
    if (matched.has(word)) return;

    if (selected === null) {
      setSelected(word);
    } else if (selected === word) {
      setSelected(null);
    } else {
      // Check if match is correct
      const selectedPair = pairs.find((p) => p.word === selected);
      const currentPair = pairs.find((p) => p.word === word);

      if (selectedPair && currentPair && selectedPair.definition === definition) {
        setMatched((prev) => new Set([...prev, selected, word]));
        setSelected(null);
      } else {
        setSelected(null);
      }
    }
  };

  const matchPercentage = Math.round((matched.size / (pairs.length * 2)) * 100);
  const allMatched = matched.size === pairs.length * 2;

  useEffect(() => {
    if (matched.size > 0 && allMatched) {
      setTimeout(() => {
        setGamePhase('result');
        onComplete(true, { xp: 75, gold: 25, streak: 1 });
      }, 1500);
    }
  }, [matched.size, allMatched, onComplete]);

  if (gamePhase === 'intro') {
    return (
      <div className="w-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 p-6 rounded-xl border-2 border-cyan-500">
        <div className="text-center mb-4">
          <span className="material-symbols-outlined text-5xl text-cyan-600 block mb-3">
            link
          </span>
          <h3 className="font-headline-md text-xl text-cyan-600 mb-2">Match Pairs</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Match each word with its correct definition!
          </p>
        </div>
        <button
          onClick={handleStartGame}
          className="w-full bg-cyan-600 text-white px-6 py-3 rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 transition-all"
        >
          Start Matching
        </button>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="w-full space-y-4">
        {/* Progress */}
        <div className="bg-surface-container rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase">
              Matched: {matched.size / 2} / {pairs.length}
            </span>
            <span className="text-xs font-bold text-cyan-600">{matchPercentage}%</span>
          </div>
          <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-600 transition-all duration-300"
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Match Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left: Words */}
          <div className="space-y-2">
            {pairs.map((pair) => (
              <button
                key={pair.word}
                onClick={() => handleMatch(pair.word, pair.definition)}
                disabled={matched.has(pair.word)}
                className={`w-full p-3 rounded-lg border-2 text-center font-label-md transition-all ${
                  matched.has(pair.word)
                    ? 'bg-success/20 border-success text-success'
                    : selected === pair.word
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600'
                    : 'bg-surface border-outline-variant hover:border-cyan-500'
                } ${matched.has(pair.word) ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="text-sm font-bold">{pair.word}</span>
                {matched.has(pair.word) && (
                  <span className="material-symbols-outlined text-xs mt-1">check</span>
                )}
              </button>
            ))}
          </div>

          {/* Right: Definitions */}
          <div className="space-y-2">
            {shuffledDefs.map((pair) => {
              const isMatched = matched.has(pair.word);

              return (
                <button
                  key={`def-${pair.word}`}
                  onClick={() => handleMatch(pair.word, pair.definition)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-lg border-2 text-left text-xs font-label-md transition-all line-clamp-2 ${
                    isMatched
                      ? 'bg-success/20 border-success text-success'
                      : selected === pair.word
                      ? 'bg-cyan-500/20 border-cyan-500'
                      : 'bg-surface border-outline-variant hover:border-cyan-500'
                  } ${isMatched ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {pair.definition}
                  {isMatched && (
                    <span className="material-symbols-outlined text-xs">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Auto-complete when all matched */}
        {allMatched && (
          <div className="text-center py-4 text-green-600">
            <span className="material-symbols-outlined text-4xl">celebration</span>
            <p className="text-sm font-bold mt-2">All pairs matched!</p>
          </div>
        )}
      </div>
    );
  }

  if (gamePhase === 'result') {
    const passed = matchPercentage >= 75;

    return (
      <div
        className={`w-full rounded-xl p-6 text-center space-y-4 border-2 ${
          passed ? 'bg-success/20 border-success' : 'bg-warning/20 border-warning'
        }`}
      >
        <div className="text-4xl">{passed ? '🎉' : '💪'}</div>
        <h3 className="font-headline-md text-xl text-primary">
          {passed ? 'Perfect Matches!' : 'Good Effort!'}
        </h3>
        <p className="text-sm text-on-surface-variant">{matchPercentage}% matched</p>
        {passed && (
          <div className="bg-surface rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>⭐ XP Earned:</span>
              <span className="font-bold text-primary">+75</span>
            </div>
            <div className="flex justify-between">
              <span>💰 Gold Earned:</span>
              <span className="font-bold text-primary">+25</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

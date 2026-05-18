import { useState } from 'react';
import type { MappedLesson } from '../../types/curriculum';

interface StoryGameProps {
  lesson: MappedLesson;
  onComplete: (passed: boolean, rewards: { xp: number; gold: number; streak: number }) => void;
}

export function StoryGame({ lesson, onComplete }: StoryGameProps) {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [storyPhase, setStoryPhase] = useState(0); // 0, 1, 2 (3 chapters)
  const [correctChoices, setCorrectChoices] = useState(0);

  // Get story from lesson content or use fallback
  const storyText = lesson.content.story || lesson.content.passage || '';

  // Framework - 3 chapters with choices (using lesson passage + generic choices)
  const story = {
    intro: storyText || 'You are a young wizard attending Arcane Academy. A mysterious tome has gone missing from the library!',
    chapters: [
      {
        text: 'Chapter 1: ' + (storyText.substring(0, 150) || 'You begin your adventure...'),
        choices: [
          { text: 'Think carefully about the problem', correct: true },
          { text: 'Rush forward without planning', correct: false },
          { text: 'Ask for help from others', correct: false },
        ],
      },
      {
        text: 'Chapter 2: ' + (storyText.substring(150, 300) || 'The story continues as you make your next choice...'),
        choices: [
          { text: 'Use your knowledge wisely', correct: true },
          { text: 'Act on impulse', correct: false },
          { text: 'Avoid the situation', correct: false },
        ],
      },
      {
        text: 'Chapter 3: ' + (storyText.substring(300, 450) || 'Finally, you reach the climax of the story...'),
        choices: [
          { text: 'Choose the responsible path', correct: true },
          { text: 'Take the selfish route', correct: false },
          { text: 'Give up on the challenge', correct: false },
        ],
      },
    ],
  };

  const currentChapter = story.chapters[storyPhase];

  const handleStartStory = () => {
    setGamePhase('playing');
  };

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectChoices((prev) => prev + 1);
    }

    if (storyPhase < 2) {
      // Next chapter
      setTimeout(() => {
        setStoryPhase((prev) => prev + 1);
      }, 800);
    } else {
      // End story
      setTimeout(() => {
        setGamePhase('result');
        const passed = correctChoices + (isCorrect ? 1 : 0) >= 2;
        onComplete(passed, {
          xp: passed ? 120 : 0,
          gold: passed ? 40 : 0,
          streak: passed ? 1 : 0,
        });
      }, 800);
    }
  };

  if (gamePhase === 'intro') {
    return (
      <div className="w-full bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 p-6 rounded-xl border-2 border-indigo-500">
        <div className="text-center mb-4">
          <span className="material-symbols-outlined text-5xl text-indigo-600 block mb-3">
            auto_stories
          </span>
          <h3 className="font-headline-md text-xl text-indigo-600 mb-2">Story Challenge</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Make wise choices to guide the story to a good ending!
          </p>
        </div>
        <button
          onClick={handleStartStory}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 transition-all"
        >
          Begin Story
        </button>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="w-full space-y-4">
        {/* Progress */}
        <div className="bg-surface-container rounded-xl p-3">
          <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">
            Chapter {storyPhase + 1} / 3
          </p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < storyPhase ? 'bg-indigo-600' : i === storyPhase ? 'bg-indigo-400' : 'bg-surface-variant'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Story Text */}
        <div className="bg-surface-container-high border-2 border-indigo-500/30 rounded-xl p-6">
          <p className="text-sm text-on-surface mb-6 leading-relaxed italic">
            {currentChapter.text}
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {currentChapter.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.correct)}
                className="w-full text-left p-4 rounded-lg border-2 border-indigo-500/30 bg-surface hover:bg-indigo-500/10 hover:border-indigo-500 transition-all font-label-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-600">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm">{choice.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'result') {
    const passed = correctChoices >= 2;

    return (
      <div
        className={`w-full rounded-xl p-6 text-center space-y-4 border-2 ${
          passed ? 'bg-success/20 border-success' : 'bg-warning/20 border-warning'
        }`}
      >
        <div className="text-4xl">{passed ? '📖✨' : '📖'}</div>
        <h3 className="font-headline-md text-xl text-primary">
          {passed ? 'Story Complete! Good Ending!' : 'Story Complete...'}
        </h3>
        <p className="text-sm text-on-surface-variant">
          You made {correctChoices} wise decision{correctChoices !== 1 ? 's' : ''}
        </p>
        {passed && (
          <div className="bg-surface rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>⭐ XP Earned:</span>
              <span className="font-bold text-primary">+120</span>
            </div>
            <div className="flex justify-between">
              <span>💰 Gold Earned:</span>
              <span className="font-bold text-primary">+40</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

/**
 * LessonEvan Enhanced - Styled version with improved UX
 * Includes animations, better visual hierarchy, and responsive design
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';

export default function LessonEvanEnhanced() {
  const navigate = useNavigate();
  const { currentLesson, loading, error, goToLesson, goToNextLesson, goToPreviousLesson, getCurrentProgressionLevel } = useCurriculum();
  const [activeTab, setActiveTab] = useState<'theory' | 'vocab' | 'practice'>('theory');
  const [selectedExercise, setSelectedExercise] = useState<number>(0);
  const [showExerciseFeedback, setShowExerciseFeedback] = useState<boolean>(false);
  const [expandedVocab, setExpandedVocab] = useState<number | null>(null);

  useEffect(() => {
    if (!currentLesson) {
      goToLesson('k-reading-1-1');
    }
  }, [currentLesson, goToLesson]);

  const progressionLevel = useMemo(() => getCurrentProgressionLevel(), [getCurrentProgressionLevel]);
  const progressPercentage = useMemo(() => (progressionLevel / 40) * 100, [progressionLevel]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-surface to-surface-container text-on-background min-h-screen flex items-center justify-center max-w-[390px] mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-on-surface-variant font-headline-sm">Loading magical lesson...</p>
            <p className="text-xs text-on-surface-variant/60">Preparing your curriculum adventure</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="bg-gradient-to-br from-surface to-surface-container text-on-background min-h-screen flex items-center justify-center max-w-[390px] mx-auto">
        <div className="text-center p-8 space-y-6 bg-error-container/10 rounded-3xl border-2 border-error/30">
          <span className="material-symbols-outlined text-5xl text-error block">sentiment_very_dissatisfied</span>
          <div className="space-y-2">
            <p className="text-error font-headline-md text-lg">{error || 'Lesson not found'}</p>
            <p className="text-error/70 text-sm">Something went wrong retrieving your lesson</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-primary to-primary/80 text-on-primary px-6 py-3 rounded-full font-label-md font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Return to Hogwarts Map
          </button>
        </div>
      </div>
    );
  }

  const lesson = currentLesson;

  return (
    <div className="bg-gradient-to-br from-surface via-surface-container-low to-surface-container text-on-background min-h-screen pb-32 max-w-[390px] mx-auto relative overflow-x-hidden" style={{
      backgroundImage: 'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 70%, #D4AF37 0%, transparent 50%)',
      backgroundSize: '100% 100%, 100% 100%',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated background particles */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)',
        backgroundSize: '50px 50px',
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* TopAppBar - Enhanced */}
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-gradient-to-b from-surface-container-low to-surface shadow-[0_8px_32px_rgba(212,175,55,0.15)] flex justify-between items-center px-6 py-4 backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all" onClick={() => navigate('/portal')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN2VepHkEz6hdq6_BI8DCiGU02T-UzzbcMMAKz8Hb4BTYlZqO55Qz5xmUDLzpwjpoT_7ZutcgbKT1NbWsSRM79sbH_XfUuWnj_a1e2vhs7qRA-HyCl6r1sI5Nze9YM9t0yr209x5noR-Uo6dXQg94ltw0AKlCFrk5RN3XlHF0imT9mcgzhBPRuSbVzan_9NBvBRp_2EUGltNw23bsaXj9oPzEquDnsTduvpxHRm5l9Vk7R3G2_zZw8fEh80iZqm79i8n39gHVhVHU" alt="Avatar" />
          </div>
          <div className="flex-1">
            <h1 className="font-display-lg-mobile text-2xl font-bold text-primary tracking-widest leading-none">Arcane</h1>
            <p className="text-xs text-on-surface-variant font-label-md">Magical Learning Path</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="transform -rotate-90 w-12 h-12" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-outline-variant/30" />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2"
                strokeDasharray={`${(progressPercentage / 100) * 125.66} 125.66`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#F4E4A6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-label-md text-xs font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-headline-sm text-sm font-bold text-primary">{progressionLevel}</p>
            <p className="text-xs text-on-surface-variant">/40 Levels</p>
          </div>
        </div>
      </header>

      <main className="pt-24 px-5 flex flex-col gap-8">
        {/* Lesson Header - Enhanced */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/30">
            <span className="material-symbols-outlined text-sm text-primary animate-spin-slow">auto_fix_high</span>
            <p className="font-label-md text-xs text-primary font-bold uppercase tracking-widest">{lesson.spellName}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display-md text-2xl font-bold text-primary">{lesson.title}</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto rounded-full"></div>
          </div>

          {/* Lesson Metadata - Enhanced Cards */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl block mb-1">school</span>
              <p className="text-xs font-label-md text-on-surface-variant">Grade</p>
              <p className="font-headline-sm text-primary font-bold">{['K', '1', '2', '3', '4', '5', '6'][lesson.grade]}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl block mb-1">menu_book</span>
              <p className="text-xs font-label-md text-on-surface-variant">Subject</p>
              <p className="font-headline-sm text-primary font-bold text-sm truncate">{lesson.subject}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl block mb-1">star</span>
              <p className="text-xs font-label-md text-on-surface-variant">Reward</p>
              <p className="font-headline-sm text-primary font-bold">{lesson.xpTotal} XP</p>
            </div>
          </div>
        </section>

        {/* Content Tabs - Enhanced */}
        <nav className="flex justify-around border-b-2 border-outline-variant/20 bg-gradient-to-r from-primary/5 to-transparent rounded-t-2xl -mx-5 px-5 py-1">
          {(['theory', 'vocab', 'practice'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const labels = { theory: 'Content', vocab: `Vocabulary (${lesson.content.vocabulary.length})`, practice: `Exercises (${lesson.exercises.length})` };
            return (
              <button
                key={tab}
                className={`relative py-3 px-4 font-label-md text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {labels[tab as keyof typeof labels]}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 to-primary rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Content Tab */}
        {activeTab === 'theory' && (
          <section className="p-6 rounded-3xl border-2 border-primary/20 shadow-xl bg-gradient-to-br from-surface-container-low to-surface-container/50 mb-12 space-y-6 animate-fade-in">
            <div className="space-y-6 text-on-surface-variant">
              {lesson.content.passage && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest">📖 Reading Passage</h4>
                  </div>
                  <p className="font-body-lg text-[17px] leading-relaxed border-l-4 border-primary/40 pl-6 py-3 italic bg-primary/5 rounded-r-xl">
                    {lesson.content.passage}
                  </p>
                </div>
              )}

              {lesson.content.story && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest">✨ Story</h4>
                  </div>
                  <p className="font-body-lg text-[17px] leading-relaxed border-l-4 border-primary/40 pl-6 py-3 italic bg-primary/5 rounded-r-xl">
                    {lesson.content.story}
                  </p>
                </div>
              )}

              {lesson.content.grammarPoint && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest">Grammar Point</h4>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-l-4 border-primary/50">
                    <p className="font-body-md text-on-background">{lesson.content.grammarPoint}</p>
                  </div>
                </div>
              )}

              {lesson.content.example && (
                <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                    <span className="font-headline-sm text-primary font-bold">Example</span>
                  </div>
                  <p className="text-body-md">{lesson.content.example}</p>
                </div>
              )}

              {lesson.content.instructions && (
                <div className="p-5 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    <span className="font-headline-sm text-secondary font-bold">Instructions</span>
                  </div>
                  <p className="text-body-md">{lesson.content.instructions}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Vocabulary Tab */}
        {activeTab === 'vocab' && (
          <section className="mb-12 space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">abc</span>
              <h3 className="font-headline-sm text-xl font-bold text-primary">Vocabulary Words</h3>
            </div>

            {lesson.content.vocabulary.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-outline-variant/30 text-center">
                <span className="material-symbols-outlined text-3xl text-outline-variant/30 block mb-3">dashboard_customize</span>
                <p className="text-on-surface-variant font-body-md">No vocabulary words for this lesson</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {lesson.content.vocabulary.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExpandedVocab(expandedVocab === idx ? null : idx)}
                    className={`text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                      expandedVocab === idx
                        ? 'border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg'
                        : 'border-outline-variant/40 bg-gradient-to-br from-surface-container-low to-surface-container hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    <div className="p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-headline-sm text-lg font-bold text-primary">{word}</p>
                        <p className="font-label-md text-xs text-on-surface-variant mt-1">Word {idx + 1} of {lesson.content.vocabulary.length}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:bg-primary/10 p-2 rounded-full hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">volume_up</span>
                        </button>
                        <span className={`material-symbols-outlined text-primary transition-transform ${expandedVocab === idx ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </div>
                    </div>

                    {expandedVocab === idx && (
                      <div className="border-t border-primary/20 p-4 bg-primary/5 space-y-3 animate-fade-in">
                        <div>
                          <p className="text-xs font-label-md text-on-surface-variant mb-1">DEFINITION</p>
                          <p className="font-body-md text-on-background">Word definition and meaning would appear here.</p>
                        </div>
                        <div>
                          <p className="text-xs font-label-md text-on-surface-variant mb-1">EXAMPLE</p>
                          <p className="font-body-sm text-on-background italic">Example sentence using "{word}" would appear here.</p>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <section className="mb-24 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">edit</span>
                <h3 className="font-headline-sm text-xl font-bold text-primary">Practice Exercises</h3>
              </div>
              <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                <span className="text-label-md text-xs font-bold text-primary">{selectedExercise + 1}/{lesson.exercises.length}</span>
              </div>
            </div>

            {lesson.exercises.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-outline-variant/30 text-center">
                <span className="material-symbols-outlined text-3xl text-outline-variant/30 block mb-3">assignment_turned_in</span>
                <p className="text-on-surface-variant font-body-md">No exercises available for this lesson</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lesson.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedExercise(idx);
                      setShowExerciseFeedback(false);
                    }}
                    className={`rounded-2xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden ${
                      selectedExercise === idx
                        ? 'border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-xl'
                        : 'border-outline-variant/40 bg-gradient-to-br from-surface-container-low to-surface-container hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">
                            {exercise.type === 'multiple_choice' && <span className="material-symbols-outlined text-primary">radio_button_checked</span>}
                            {exercise.type === 'fill_blank' && <span className="material-symbols-outlined text-primary">edit</span>}
                            {exercise.type === 'short_answer' && <span className="material-symbols-outlined text-primary">description</span>}
                            {exercise.type === 'matching' && <span className="material-symbols-outlined text-primary">link</span>}
                          </div>
                          <div className="flex-1">
                            <p className="font-label-md text-xs text-primary font-bold uppercase tracking-widest">{exercise.type.replace(/_/g, ' ')}</p>
                            <p className="font-headline-sm text-lg font-bold text-primary mt-1">{exercise.question}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full mb-1">
                            <span className="material-symbols-outlined text-primary text-sm">star</span>
                            <span className="font-label-md text-xs text-primary font-bold">{exercise.xpReward}</span>
                          </div>
                          <p className="text-label-md text-xs text-on-surface-variant capitalize">{exercise.difficulty}</p>
                        </div>
                      </div>

                      {selectedExercise === idx && (
                        <div className="space-y-4 border-t border-outline-variant/30 pt-4 animate-fade-in">
                          {exercise.type === 'multiple_choice' && exercise.options && (
                            <div className="space-y-2">
                              {exercise.options.map((option, optIdx) => (
                                <button
                                  key={optIdx}
                                  className="w-full text-left p-4 rounded-xl border-2 border-outline-variant/40 hover:border-primary/60 hover:bg-primary/5 transition-all active:scale-95"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowExerciseFeedback(true);
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-outline-variant group-hover:border-primary"></div>
                                    <span className="font-body-md">{option}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {exercise.type === 'fill_blank' && (
                            <input
                              type="text"
                              placeholder="Type your answer here..."
                              className="w-full p-4 rounded-xl border-2 border-outline-variant/40 bg-surface-container text-on-background placeholder-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}

                          {exercise.type === 'short_answer' && (
                            <textarea
                              placeholder="Type your answer here..."
                              rows={4}
                              className="w-full p-4 rounded-xl border-2 border-outline-variant/40 bg-surface-container text-on-background placeholder-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}

                          {exercise.hints && exercise.hints.length > 0 && (
                            <div className="p-4 bg-secondary/10 rounded-xl border-l-4 border-secondary space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">lightbulb</span>
                                <p className="font-label-md text-xs text-secondary font-bold">HINTS</p>
                              </div>
                              <ul className="space-y-1">
                                {exercise.hints.map((hint, hIdx) => (
                                  <li key={hIdx} className="text-sm text-on-surface-variant flex items-start gap-2">
                                    <span className="text-secondary mt-1">→</span>
                                    {hint}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {showExerciseFeedback && (
                            <div className="p-4 bg-tertiary/10 rounded-xl border-2 border-tertiary/30 space-y-2 animate-fade-in">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                                <p className="font-label-md text-sm text-tertiary font-bold">Great attempt!</p>
                              </div>
                              <p className="text-sm text-on-surface-variant">You've earned {exercise.xpReward} XP for this exercise!</p>
                            </div>
                          )}

                          <button
                            className="w-full bg-gradient-to-r from-primary to-primary/80 text-on-primary px-6 py-4 rounded-2xl font-headline-sm text-base font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowExerciseFeedback(true);
                            }}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined">check</span>
                              Submit Answer
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="fixed bottom-20 left-0 right-0 max-w-[390px] mx-auto px-5 py-4 border-t border-outline-variant/20 bg-gradient-to-t from-surface-container to-surface backdrop-blur-sm">
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={() => goToPreviousLesson()}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-label-md font-bold text-primary hover:bg-primary/10 active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              <span>Previous</span>
            </button>

            <div className="flex flex-col items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
              <p className="font-label-md text-xs text-on-surface-variant">Progress</p>
              <p className="font-headline-sm text-primary font-bold">{progressionLevel + 1}/40</p>
            </div>

            <button
              onClick={() => goToNextLesson()}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-label-md font-bold text-on-primary bg-gradient-to-r from-primary to-primary/80 hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              <span>Next</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

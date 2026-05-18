/**
 * LessonEvan - Updated to use CurriculumContext
 * Loads real lessons from Evan-Moor curriculum
 *
 * Usage: Replace src/pages/LessonEvan.tsx with this file
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';

export default function LessonEvan() {
  const navigate = useNavigate();
  const { currentLesson, loading, error, goToLesson, goToNextLesson, goToPreviousLesson, getCurrentProgressionLevel } = useCurriculum();
  const [activeTab, setActiveTab] = useState<'theory' | 'vocab' | 'practice'>('theory');
  const [selectedExercise, setSelectedExercise] = useState<number>(0);

  // Load first lesson on mount
  useEffect(() => {
    if (!currentLesson) {
      goToLesson('k-reading-1-1');
    }
  }, [currentLesson, goToLesson]);

  if (loading) {
    return (
      <div className="bg-surface text-on-background min-h-screen flex items-center justify-center max-w-[390px] mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="bg-surface text-on-background min-h-screen flex items-center justify-center max-w-[390px] mx-auto">
        <div className="text-center p-6">
          <span className="material-symbols-outlined text-4xl text-error mb-4">error_outline</span>
          <p className="text-error font-headline-sm mb-4">{error || 'Lesson not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md"
          >
            Return to Map
          </button>
        </div>
      </div>
    );
  }

  const lesson = currentLesson;
  const progressionLevel = getCurrentProgressionLevel();

  return (
    <div className="bg-surface text-on-background min-h-screen pb-32 max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface-container-low border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm cursor-pointer" onClick={() => navigate('/portal')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN2VepHkEz6hdq6_BI8DCiGU02T-UzzbcMMAKz8Hb4BTYlZqO55Qz5xmUDLzpwjpoT_7ZutcgbKT1NbWsSRM79sbH_XfUuWnj_a1e2vhs7qRA-HyCl6r1sI5Nze9YM9t0yr209x5noR-Uo6dXQg94ltw0AKlCFrk5RN3XlHF0imT9mcgzhBPRuSbVzan_9NBvBRp_2EUGltNw23bsaXj9oPzEquDnsTduvpxHRm5l9Vk7R3G2_zZw8fEh80iZqm79i8n39gHVhVHU"/>
          </div>
          <h1 className="font-display-lg-mobile text-[32px] font-bold text-primary tracking-widest leading-none mt-1">Arcane</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">flag</span>
            <span className="font-label-md text-sm text-primary font-bold">{progressionLevel}/40</span>
          </div>
        </div>
      </header>

      <main className="pt-24 px-5 flex flex-col gap-8">
        {/* Lesson Header */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary-container/20 rounded-full">
            <span className="material-symbols-outlined text-sm text-primary">auto_fix_high</span>
            <p className="font-label-md text-xs text-primary font-bold uppercase tracking-widest">{lesson.spellName}</p>
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-primary mb-2">{lesson.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto opacity-30"></div>

          {/* Lesson Metadata */}
          <div className="flex justify-center gap-6 mt-4 text-xs text-on-surface-variant">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>{['K', '1', '2', '3', '4', '5', '6'][lesson.grade]} Grade</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>{lesson.subject}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">star</span>
              <span>{lesson.xpTotal} XP</span>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <nav className="flex justify-around border-b border-outline-variant/50">
          <button
            className={`pb-2 px-4 font-label-md text-sm font-semibold transition-all ${activeTab === 'theory' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('theory')}
          >
            Content
          </button>
          <button
            className={`pb-2 px-4 font-label-md text-sm font-semibold transition-all ${activeTab === 'vocab' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('vocab')}
          >
            Vocabulary ({lesson.content.vocabulary.length})
          </button>
          <button
            className={`pb-2 px-4 font-label-md text-sm font-semibold transition-all ${activeTab === 'practice' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('practice')}
          >
            Exercises ({lesson.exercises.length})
          </button>
        </nav>

        {/* Dynamic Tab Content */}
        {activeTab === 'theory' && (
          <section className="p-6 rounded-xl border border-outline-variant shadow-sm deckle-edge mb-12 relative overflow-hidden bg-gradient-to-br from-surface-container-low to-surface-container">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAv8YgJjbx55m2u2llrVYj0AIkk_exkOO0ryg9RU7Q1-bL-FYclnZpzICwF5PW5wl3YmW81RgRvaIVa_Ck_MrvhLcFAtArrE2QRCP0-rpcRg0NEvQEZpEBL6jnvPf-duizdUpO-1IpO1W7s4qSs6ISfCPPPN3tYED2Jmib5hB6ctqo26OdYYJT6thGuJDOuUdnav7VUD-ZcsuuAQMvcKxFKeB7MDQpQP08g6AfeU1IiA0R2r-bUQ7FjnOGT3UYfvtZrhWkDUSc9ktc)' }}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="font-headline-sm text-xl font-bold text-primary">{lesson.title}</h3>
                <p className="text-sm font-normal italic opacity-80 mt-1">{lesson.subject}</p>
              </div>
              <div className="text-right">
                <span className="material-symbols-outlined text-outline">{['menu_book', 'edit', 'calculate', 'science', 'abc', 'spellcheck', 'hearing'][['reading', 'writing', 'math', 'science', 'vocabulary', 'grammar', 'phonics'].indexOf(lesson.subject.toLowerCase().split(/\s/)[0])]}</span>
              </div>
            </div>
            <div className="space-y-6 text-on-surface-variant relative z-10">
              {/* Lesson Content */}
              {lesson.content.passage && (
                <div>
                  <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest mb-3">Reading Passage</h4>
                  <p className="font-body-lg text-[18px] italic border-l-4 border-primary/20 pl-4 leading-relaxed">
                    "{lesson.content.passage}"
                  </p>
                </div>
              )}

              {lesson.content.story && (
                <div>
                  <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest mb-3">Story</h4>
                  <p className="font-body-lg text-[18px] italic border-l-4 border-primary/20 pl-4 leading-relaxed">
                    "{lesson.content.story}"
                  </p>
                </div>
              )}

              {lesson.content.grammarPoint && (
                <div>
                  <h4 className="font-label-md text-sm font-bold text-primary uppercase tracking-widest mb-3">Grammar Point</h4>
                  <p className="font-body-md">{lesson.content.grammarPoint}</p>
                </div>
              )}

              {lesson.content.example && (
                <div className="p-4 bg-primary-container/10 rounded-lg border border-primary/10">
                  <span className="font-headline-sm text-primary block mb-2 font-bold">Example</span>
                  <p className="text-caption text-sm">{lesson.content.example}</p>
                </div>
              )}

              {lesson.content.instructions && (
                <div className="p-4 bg-primary-container/10 rounded-lg border border-primary/10">
                  <span className="font-headline-sm text-primary block mb-2 font-bold">Instructions</span>
                  <p className="text-caption text-sm">{lesson.content.instructions}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'vocab' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-sm text-xl font-bold text-primary">Vocabulary</h3>
              <span className="text-label-md text-sm text-primary-container font-bold bg-primary/10 px-3 py-1 rounded-full">{lesson.content.vocabulary.length} words</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {lesson.content.vocabulary.map((word, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-outline-variant text-left shadow-sm bg-gradient-to-br from-surface-container-low to-surface-container hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-headline-sm text-lg font-bold text-primary">{word}</p>
                      <p className="font-label-md text-xs text-on-surface-variant italic mt-1">Word {idx + 1}</p>
                    </div>
                    <button className="text-primary hover:text-surface-tint">
                      <span className="material-symbols-outlined text-xl">volume_up</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'practice' && (
          <section className="mb-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-sm text-xl font-bold text-primary">Exercises</h3>
              <span className="text-label-md text-sm text-primary-container font-bold bg-primary/10 px-3 py-1 rounded-full">{selectedExercise + 1} of {lesson.exercises.length}</span>
            </div>

            {lesson.exercises.length > 0 && (
              <div className="space-y-6">
                {/* Exercise Cards */}
                {lesson.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedExercise === idx
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-surface-container'
                        : 'border-outline-variant/50 opacity-60 hover:opacity-100 hover:border-outline-variant'
                    }`}
                    onClick={() => setSelectedExercise(idx)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">{exercise.type === 'multiple_choice' ? 'radio_button_checked' : 'check_circle'}</span>
                        <span className="font-label-md text-sm text-primary font-bold uppercase tracking-widest">{exercise.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-headline-sm text-sm font-bold text-primary">{exercise.xpReward} XP</p>
                        <p className="text-label-md text-xs text-on-surface-variant capitalize">{exercise.difficulty}</p>
                      </div>
                    </div>

                    <h4 className="font-headline-sm text-lg font-bold text-primary mb-4">{exercise.question}</h4>

                    {selectedExercise === idx && (
                      <div className="space-y-3 border-t border-outline-variant/30 pt-4">
                        {exercise.type === 'multiple_choice' && exercise.options && (
                          <div className="space-y-2">
                            {exercise.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                className="w-full text-left p-3 rounded-lg border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all"
                              >
                                <span className="font-body-md">{option}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {exercise.type === 'fill_blank' && (
                          <input
                            type="text"
                            placeholder="Type your answer..."
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container text-on-background placeholder-on-surface-variant/50 focus:border-primary outline-none"
                          />
                        )}

                        {exercise.type === 'short_answer' && (
                          <textarea
                            placeholder="Type your answer..."
                            rows={3}
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container text-on-background placeholder-on-surface-variant/50 focus:border-primary outline-none"
                          />
                        )}

                        {exercise.hints && exercise.hints.length > 0 && (
                          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="font-label-md text-xs text-primary font-bold mb-2">💡 Hints</p>
                            <ul className="space-y-1">
                              {exercise.hints.map((hint, hIdx) => (
                                <li key={hIdx} className="text-sm text-on-surface-variant">• {hint}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className="w-full bg-primary text-on-primary px-6 py-3 rounded-full font-headline-sm text-lg font-bold shadow-[0_0_15px_#D4AF37] hover:brightness-110 active:scale-95 transition-all mt-4"
                        >
                          Submit Answer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {lesson.exercises.length === 0 && (
              <div className="p-6 rounded-2xl border-2 border-dashed border-primary/30 text-center">
                <span className="material-symbols-outlined text-3xl text-primary/30 block mb-2">edit</span>
                <p className="text-on-surface-variant">No exercises available for this lesson</p>
              </div>
            )}
          </section>
        )}

        {/* Footer Pagination */}
        <footer className="flex justify-between items-center py-4 mb-4 border-t border-outline-variant/30 mt-4">
          <button
            onClick={() => goToPreviousLesson()}
            className="flex items-center gap-1 text-primary font-label-md text-sm font-bold hover:bg-primary/5 px-3 py-2 rounded-full transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
            Previous
          </button>
          <div className="text-xs text-on-surface-variant font-label-md">
            Level {progressionLevel + 1} / 40
          </div>
          <button
            onClick={() => goToNextLesson()}
            className="flex items-center gap-1 bg-primary text-on-primary px-5 py-2 rounded-full font-label-md text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Next
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </footer>
      </main>

      {/* FAB Content Overlay */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_0_15px_#D4AF37] active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">auto_awesome</span>
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full max-w-[390px] z-50 flex justify-around items-center px-4 py-2 bg-surface rounded-t-xl shadow-[0_-4px_15px_rgba(60,47,47,0.1)] border-t border-outline-variant/30">
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5 font-bold">Lessons</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5 font-bold">Map</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/curriculum')}>
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5 font-bold">Library</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/inventory')}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5 font-bold">Bag</span>
        </div>
      </nav>
    </div>
  );
}

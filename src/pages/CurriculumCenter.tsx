import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useCurriculum } from '../contexts/CurriculumContext';
import type { MappedLesson } from '../types/curriculum';

const gradeLabel = (level: number) => (level === 0 ? 'K' : `Grade ${level}`);

const CurriculumCenter: React.FC = () => {
  const navigate = useNavigate();
  const { curriculum, loading, error, getTotalLessons, getTotalXp } = useCurriculum();
  const [searchQuery, setSearchQuery] = useState('');

  // Search through all lessons
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !curriculum) return null;

    const query = searchQuery.toLowerCase();
    const results: MappedLesson[] = [];

    curriculum.levels.forEach(level => {
      level.subjects.forEach(subject => {
        subject.units.forEach(unit => {
          unit.lessons.forEach(lesson => {
            if (
              lesson.title.toLowerCase().includes(query) ||
              lesson.spellName.toLowerCase().includes(query) ||
              lesson.subject.toLowerCase().includes(query) ||
              lesson.content.vocabulary.some(word => word.toLowerCase().includes(query))
            ) {
              results.push(lesson);
            }
          });
        });
      });
    });

    return results.sort((a, b) => a.progressionLevel - b.progressionLevel);
  }, [searchQuery, curriculum]);

  return (
    <div className="bg-background text-on-surface font-body-md parchment-texture min-h-screen pb-32 max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden">
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface shadow-sm parchment-texture flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-primary" onClick={() => navigate('/')}>arrow_back</button>
          <div>
            <h1 className="font-headline-md text-xl text-primary">Curriculum</h1>
            <p className="text-xs text-on-surface-variant">K-6 magical learning path</p>
          </div>
        </div>
        <button className="material-symbols-outlined text-primary" onClick={() => navigate('/portal')}>auto_fix_high</button>
      </header>

      <main className="pt-24 pb-32 px-6 mx-auto">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search lessons, subjects, spells..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-outline bg-surface p-4 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant hover:text-primary"
            >
              close
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <section className="mb-6 rounded-xl border border-primary bg-primary/5 p-5">
            <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest">Search Results</p>
            <p className="font-headline-sm text-lg text-primary mt-1">{searchResults.length} lessons found</p>
            <div className="mt-4 space-y-2">
              {searchResults.map(lesson => (
                <button
                  key={lesson.lessonId}
                  onClick={() => navigate(`/lesson/evan?id=${encodeURIComponent(lesson.lessonId)}`)}
                  className="w-full text-left rounded-lg border border-primary/30 bg-surface p-3 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-primary">{lesson.title}</p>
                      <p className="text-xs text-on-surface-variant">{gradeLabel(lesson.grade)} • {lesson.subject}</p>
                    </div>
                    <div className="text-right text-xs text-on-surface-variant shrink-0">
                      <p>{lesson.completionXp} XP</p>
                      <p>{lesson.spellName}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {searchQuery && searchResults && searchResults.length === 0 && (
          <section className="mb-6 rounded-xl border border-outline-variant bg-surface-container-low p-5 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
            <p className="font-headline-sm text-lg text-on-surface mt-2">No lessons found</p>
            <p className="text-sm text-on-surface-variant mt-1">Try searching for a different term</p>
          </section>
        )}

        {/* Curriculum Overview (hidden when searching) */}
        {!searchQuery && (
          <section className="mb-6 rounded-xl border-2 border-[#D4AF37] bg-surface-container-high p-5 shadow-sm">
            <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest">Progression Overview</p>
            <h2 className="font-display-lg-mobile text-3xl text-primary mt-1">7 Levels: K-6</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-surface p-3 border border-outline-variant">
                <p className="text-on-surface-variant">Lessons</p>
                <p className="font-headline-sm text-xl text-primary">{getTotalLessons()}</p>
              </div>
              <div className="rounded-lg bg-surface p-3 border border-outline-variant">
                <p className="text-on-surface-variant">Total XP</p>
                <p className="font-headline-sm text-xl text-primary">{getTotalXp()}</p>
              </div>
            </div>
          </section>
        )}

        {loading && <p className="rounded-xl bg-surface p-5 text-center shadow-sm">Loading curriculum...</p>}
        {error && <p className="rounded-xl bg-error-container p-5 text-on-error-container">{error}</p>}
        {!loading && !error && curriculum?.totalLessons === 0 && (
          <div className="rounded-xl border border-outline-variant bg-surface p-5 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary">menu_book</span>
            <h3 className="font-headline-sm text-xl text-primary mt-2">No lessons loaded</h3>
            <p className="text-sm text-on-surface-variant mt-2">Run the Evan-Moor extraction and rebuild the lessons manifest to populate this curriculum.</p>
          </div>
        )}

        {/* Curriculum List (hidden when searching) */}
        {!searchQuery && (
          <div className="space-y-5">
          {curriculum?.levels.map(level => (
            <section key={level.level} className="rounded-xl border border-outline-variant bg-surface p-5 shadow-sm deckle-edge">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest">{gradeLabel(level.level)} • Year {level.year}</p>
                  <h3 className="font-headline-sm text-xl text-primary">{level.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{level.description}</p>
                </div>
                <div className="text-right text-sm shrink-0">
                  <p className="font-bold text-primary">{level.totalLessons}</p>
                  <p className="text-on-surface-variant">lessons</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {level.subjects.length === 0 && <p className="text-sm text-on-surface-variant italic">No subjects available yet.</p>}
                {level.subjects.map(subject => (
                  <div key={subject.id} className="rounded-lg bg-surface-container-low p-3 border border-outline-variant/60">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">{subject.icon}</span>
                        <div>
                          <h4 className="font-bold text-primary">{subject.name}</h4>
                          <p className="text-xs text-on-surface-variant">{subject.totalLessons} lessons • {subject.totalXp} XP</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {subject.units.map(unit => (
                        <details key={unit.id} className="rounded-lg bg-surface px-3 py-2 border border-outline-variant/40">
                          <summary className="cursor-pointer text-sm font-semibold text-on-surface">{unit.title} ({unit.totalLessons})</summary>
                          <div className="mt-2 space-y-2">
                            {unit.lessons.map(lesson => (
                              <button
                                key={lesson.lessonId}
                                className="w-full text-left rounded-lg border border-outline-variant/40 p-3 hover:border-primary hover:bg-primary/5 transition-colors"
                                onClick={() => navigate(`/lesson/evan?id=${encodeURIComponent(lesson.lessonId)}`)}
                              >
                                <p className="font-semibold text-primary">{lesson.title}</p>
                                <p className="text-xs text-on-surface-variant">{lesson.spellName} • {lesson.completionXp} XP</p>
                              </button>
                            ))}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
};

export default CurriculumCenter;

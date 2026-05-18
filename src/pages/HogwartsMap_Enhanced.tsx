/**
 * HogwartsMap Enhanced - Styled with improved location cards and animations
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useCurriculum } from '../contexts/CurriculumContext';
import type { MappedLesson } from '../types/curriculum';

const locationNames: Record<string, string> = {
  library: '📚 Thư Viện Hogwarts',
  potions_classroom: '🧪 Lớp Học Độc Dược',
  arithmancy_classroom: '🔢 Lớp Học Số Học',
  herbology_greenhouse: '🌿 Nhà Kính Thảo Dược',
  great_hall: '🍗 Đại Sảnh Đường',
};

const locationDescriptions: Record<string, string> = {
  library: 'Reading & Comprehension spells',
  potions_classroom: 'Writing & Creative spells',
  arithmancy_classroom: 'Math & Calculation spells',
  herbology_greenhouse: 'Science & Nature spells',
  great_hall: 'Vocabulary & Communication spells',
};

const locationIcons: Record<string, string> = {
  library: 'menu_book',
  potions_classroom: 'science',
  arithmancy_classroom: 'calculate',
  herbology_greenhouse: 'local_florist',
  great_hall: 'castle',
};

const locationColors: Record<string, string> = {
  library: 'from-blue-400 to-blue-600',
  potions_classroom: 'from-purple-400 to-purple-600',
  arithmancy_classroom: 'from-amber-400 to-amber-600',
  herbology_greenhouse: 'from-green-400 to-green-600',
  great_hall: 'from-red-400 to-red-600',
};

export default function HogwartsMapEnhanced() {
  const navigate = useNavigate();
  const { curriculum, loading, error } = useCurriculum();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const lessonsByLocation = useMemo(() => {
    const groups = new Map<string, MappedLesson[]>();

    curriculum?.levels.forEach(level => {
      level.subjects.forEach(subject => {
        subject.units.forEach(unit => {
          unit.lessons.forEach(lesson => {
            const location = lesson.location || 'library';
            groups.set(location, [...(groups.get(location) ?? []), lesson]);
          });
        });
      });
    });

    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [curriculum]);

  const selectedLessons = selectedLocation
    ? lessonsByLocation.find(([location]) => location === selectedLocation)?.[1] ?? []
    : [];

  const totalLessonsAtLocation = selectedLocation
    ? lessonsByLocation.find(([location]) => location === selectedLocation)?.[1].length ?? 0
    : 0;

  return (
    <div className="bg-gradient-to-br from-[#1a0f14] via-[#2d1b2e] to-[#1a0f14] text-on-surface font-body-md min-h-[100dvh] overflow-y-auto pb-[34px] w-full mx-auto relative shadow-2xl overflow-x-hidden selection:bg-primary selection:text-on-primary" style={{
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,175,55,0.1) 0%, transparent 50%)',
      backgroundSize: '100% 100%, 100% 100%',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#dfbfbc 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'float 30s ease-in-out infinite'
      }}></div>

      {/* Header with Safe Area */}
      <header className="fixed top-0 w-full z-50 bg-[#1a0f14]/80 shadow-[0_8px_32px_rgba(212,175,55,0.15)] flex justify-between items-center px-[24px] pt-[44px] pb-4 backdrop-blur-md border-b border-[#d4af37]/20">
        <div className="flex items-center gap-4">
          <button className="min-w-[48px] min-h-[48px] flex items-center justify-center material-symbols-outlined text-[#d4af37] text-3xl hover:scale-110 transition-transform active:scale-95 active:brightness-90 rounded-full" onClick={() => navigate('/profile')}>account_circle</button>
          <div>
            <h1 className="font-headline-md text-2xl text-[#d4af37] font-bold tracking-wider" style={{ fontFamily: '"Cinzel", serif' }}>HOGWARTS MAP</h1>
            <p className="text-sm text-[#d4af37]/70 font-label-md">Lessons by magical location</p>
          </div>
        </div>
        <button className="min-w-[48px] min-h-[48px] flex items-center justify-center material-symbols-outlined text-[#d4af37] text-3xl hover:scale-110 transition-transform active:scale-95 active:brightness-90 bg-[#2d1b2e] rounded-full border border-[#d4af37]/30" onClick={() => navigate('/curriculum')}>menu_book</button>
      </header>

      <main className="pt-[120px] px-[24px] mx-auto max-w-6xl space-y-[32px] pb-[140px]">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6">
          <div className="space-y-2">
            <h2 className="font-display-md text-4xl text-[#f1d382] font-bold" style={{ fontFamily: '"Cinzel", serif', textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>Choose a Location</h2>
            <p className="font-body-md text-[#d4af37]/80 text-lg">Open a place to see available curriculum lessons</p>
          </div>
          <div className="flex justify-center">
            <div className="h-1.5 w-48 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-surface-container rounded-2xl border border-outline-variant/30 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl bg-error-container/20 border-2 border-error/30 p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-2xl">error_outline</span>
              <div>
                <p className="font-headline-sm text-error font-bold">{error}</p>
                <p className="text-sm text-on-surface-variant mt-1">Unable to load magical locations</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && lessonsByLocation.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-outline-variant/40 bg-surface-container/30 p-8 text-center space-y-4">
            <span className="material-symbols-outlined text-4xl text-primary/40 block">castle</span>
            <div>
              <h3 className="font-headline-sm text-xl text-primary font-bold">No locations available</h3>
              <p className="text-sm text-on-surface-variant mt-2">The lessons manifest is empty. Run extraction and rebuild the manifest to populate map locations.</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 min-h-[56px] rounded-full font-label-md font-bold hover:brightness-110 active:scale-95 active:brightness-90 transition-all justify-center"
            >
              <span>Return Home</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Location Cards */}
        {!loading && !error && lessonsByLocation.length > 0 && (
          <section className="space-y-4">
            {lessonsByLocation.map(([location, lessons], index) => {
              const isSelected = selectedLocation === location;
              return (
                <button
                  key={location}
                  className={`w-full group relative rounded-2xl overflow-hidden shadow-lg text-left transition-all duration-300 border-2 ${
                    isSelected
                      ? 'border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-[0_8px_32px_rgba(212,175,55,0.3)]'
                      : 'border-outline-variant/40 bg-gradient-to-br from-surface-container-low to-surface-container hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(212,175,55,0.1)]'
                  }`}
                  onClick={() => setSelectedLocation(isSelected ? null : location)}
                  onMouseEnter={() => setHoveredLocation(location)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${locationColors[location] || 'from-primary/40 to-primary/20'} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>

                  <div className="relative p-5 flex items-center justify-between gap-4 z-10">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${locationColors[location] || 'from-primary/40 to-primary/20'} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all ${hoveredLocation === location ? 'scale-110' : ''}`}>
                        <span className="material-symbols-outlined text-white text-4xl">{locationIcons[location] ?? 'auto_stories'}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className={`font-label-md text-[11px] uppercase tracking-widest font-bold ${isSelected ? 'text-[#d4af37]/80' : 'text-on-surface-variant'}`}>Location {index + 1}</span>
                          <span className={`text-xs ${isSelected ? 'text-[#d4af37]/60' : 'text-on-surface-variant/60'}`}>({lessons.length})</span>
                        </div>
                        <h4 className={`font-headline-md text-lg font-bold ${isSelected ? 'text-[#d4af37]' : 'text-primary'}`}>{locationNames[location] ?? location.replaceAll('_', ' ')}</h4>
                        <p className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>{locationDescriptions[location] ?? ''}</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isSelected ? 'rotate-180 text-[#d4af37]' : 'text-primary'}`}>
                        {isSelected ? 'unfold_less' : 'unfold_more'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>
        )}

        {/* Selected Location Details */}
        {selectedLocation && !loading && !error && (
          <section className="space-y-4 py-4 animate-fade-in">
            <div className="space-y-2 px-2">
              <h3 className="font-headline-sm text-lg text-on-surface-variant font-bold border-l-4 border-primary pl-4">
                {locationNames[selectedLocation] ?? selectedLocation.replaceAll('_', ' ')}
              </h3>
              <p className="text-sm text-on-surface-variant pl-4">
                {totalLessonsAtLocation} lesson{totalLessonsAtLocation === 1 ? '' : 's'} available in this location
              </p>
            </div>

            <div className="space-y-3">
              {selectedLessons.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-xl border border-dashed border-outline-variant/30 bg-surface-container/20">
                  <span className="material-symbols-outlined text-3xl text-outline-variant/30 block mb-2">school</span>
                  <p className="text-on-surface-variant text-sm">No lessons available at this location yet</p>
                </div>
              ) : (
                selectedLessons.map(lesson => (
                  <button
                    key={lesson.lessonId}
                    className="w-full rounded-xl border-2 border-outline-variant/40 bg-gradient-to-br from-surface-container-low to-surface-container p-4 text-left shadow-sm hover:border-primary hover:bg-primary/5 transition-all active:scale-95 group"
                    onClick={() => navigate(`/lesson/evan?id=${encodeURIComponent(lesson.lessonId)}`)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <p className="font-headline-sm text-base text-primary font-bold group-hover:brightness-110">{lesson.title}</p>
                        <p className="text-sm text-on-surface-variant">
                          <span className="inline-block">✨ {lesson.spellName}</span>
                        </p>
                        <p className="text-xs text-on-surface-variant/70 mt-2">
                          Grade {['K', '1', '2', '3', '4', '5', '6'][lesson.grade]} • {lesson.subject}
                        </p>
                      </div>

                      <div className="flex-shrink-0 text-right space-y-1">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-on-primary bg-gradient-to-r from-primary to-primary/80 px-3 py-1 rounded-full">
                          <span className="material-symbols-outlined text-sm">star</span>
                          <span>{lesson.completionXp} XP</span>
                        </div>
                        <p className="text-xs text-on-surface-variant/70 capitalize">{lesson.difficulty || 'Normal'}</p>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-3 w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/60 w-0 group-hover:w-1/3 transition-all"></div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>
        )}
      </main>

      <BottomNavBar />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }

        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

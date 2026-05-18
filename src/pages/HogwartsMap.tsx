import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useCurriculum } from '../contexts/CurriculumContext';
import type { MappedLesson } from '../types/curriculum';

const locationNames: Record<string, string> = {
  library: 'Library',
  potions_classroom: 'Potions Classroom',
  arithmancy_classroom: 'Arithmancy Classroom',
  herbology_greenhouse: 'Herbology Greenhouse',
  great_hall: 'Great Hall',
};

const locationIcons: Record<string, string> = {
  library: 'menu_book',
  potions_classroom: 'science',
  arithmancy_classroom: 'calculate',
  herbology_greenhouse: 'local_florist',
  great_hall: 'castle',
};

export default function HogwartsMap() {
  const navigate = useNavigate();
  const { curriculum, loading, error } = useCurriculum();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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

  return (
    <div className="parchment-bg text-on-surface font-body-md min-h-screen pb-24 max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden selection:bg-primary-fixed-dim selection:text-primary">
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface shadow-sm flex justify-between items-center px-6 py-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm active:scale-95 transition-transform" onClick={() => navigate('/profile')}>
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-1YrKTos5EEULd0DwOkfPB-niiRdg5fPfqSuaZo5YLKftHfwQ2Skz_XNqRiGp4WYMCyKrMiuicFrtXtttzZrLyiPoZIowjq4UJCLfBzTPVh7ED6VQIBIjZAnBgAeoE0aHXrv7eMQ_aSaPrQsUaqv2h8VF27TPRqXLXiF1joTuyRxKnVVIQLjB4Gjoz_tB8kiOLNxj7Fs0vgKq5wgU5hRetIfCj-6qz7bYj6C3BXVAqJCHBBZXZkTK3M3T8HhBDuEgg98CX_W9l0c"/>
          </button>
          <div>
            <h1 className="font-headline-md text-xl text-primary">Hogwarts Map</h1>
            <p className="text-xs text-on-surface-variant">Lessons by magical location</p>
          </div>
        </div>
        <button className="material-symbols-outlined text-primary" onClick={() => navigate('/curriculum')}>menu_book</button>
      </header>

      <main className="pt-24 px-6 mx-auto">
        <section className="text-center mb-8">
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">Choose a Location</h2>
          <p className="font-body-md text-on-surface-variant italic">Open a place to see available curriculum lessons.</p>
          <div className="mt-6 flex justify-center">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
          </div>
        </section>

        {loading && <p className="rounded-xl bg-surface p-5 text-center shadow-sm">Loading map lessons...</p>}
        {error && <p className="rounded-xl bg-error-container p-5 text-on-error-container">{error}</p>}
        {!loading && !error && lessonsByLocation.length === 0 && (
          <div className="rounded-xl border border-outline-variant bg-surface p-5 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary">map</span>
            <h3 className="font-headline-sm text-xl text-primary mt-2">No map lessons yet</h3>
            <p className="text-sm text-on-surface-variant mt-2">The lessons manifest is empty. Run extraction and rebuild the manifest to populate map locations.</p>
          </div>
        )}

        <section className="space-y-4 mb-8">
          {lessonsByLocation.map(([location, lessons], index) => {
            const isSelected = selectedLocation === location;
            return (
              <button
                key={location}
                className={`w-full group relative rounded-xl overflow-hidden shadow-lg text-left transition-transform active:scale-95 border ${isSelected ? 'border-primary bg-primary-container' : 'border-outline-variant bg-surface'}`}
                onClick={() => setSelectedLocation(isSelected ? null : location)}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary-fixed p-3 rounded-xl">{locationIcons[location] ?? 'auto_stories'}</span>
                    <div>
                      <span className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest">Location {index + 1}</span>
                      <h4 className="font-headline-md text-xl text-primary">{locationNames[location] ?? location.replaceAll('_', ' ')}</h4>
                      <p className="text-sm text-on-surface-variant">{lessons.length} available lesson{lessons.length === 1 ? '' : 's'}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary">{isSelected ? 'expand_less' : 'expand_more'}</span>
                </div>
              </button>
            );
          })}
        </section>

        {selectedLocation && (
          <section className="mb-12">
            <h3 className="font-headline-sm text-headline-sm text-on-surface-variant mb-4 px-2 border-l-4 border-primary">
              {locationNames[selectedLocation] ?? selectedLocation.replaceAll('_', ' ')} Lessons
            </h3>
            <div className="space-y-3">
              {selectedLessons.map(lesson => (
                <button
                  key={lesson.lessonId}
                  className="w-full rounded-xl border border-outline-variant bg-surface p-4 text-left shadow-sm hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => navigate(`/lesson/evan?id=${encodeURIComponent(lesson.lessonId)}`)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-headline-sm text-lg text-primary">{lesson.title}</p>
                      <p className="text-sm text-on-surface-variant mt-1">{lesson.spellName}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full">{lesson.completionXp} XP</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}

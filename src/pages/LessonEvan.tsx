import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { GameTab } from '../components/lesson/GameTab';

export default function LessonEvan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('id');
  const { currentLesson, loading, error, goToLesson, goToNextLesson, goToPreviousLesson, getCurrentProgressionLevel } = useCurriculum();
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
    if (lessonId && currentLesson?.lessonId !== lessonId) {
      void goToLesson(lessonId);
    }
  }, [currentLesson?.lessonId, goToLesson, lessonId]);

  const lesson = currentLesson;

  return (
    <div
      className="bg-surface text-on-background min-h-screen pb-[34px] max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden"
      style={{ backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
    >
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface-container-low border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center px-[24px] pt-[44px] pb-4">
        <div className="flex items-center gap-3">
          <button
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full material-symbols-outlined text-primary hover:bg-surface-container active:scale-95 active:brightness-90 transition-all"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </button>
          <div>
            <h1 className="font-display-lg-mobile text-[24px] font-bold text-primary tracking-widest leading-none truncate max-w-[180px]">
              {lesson?.title ?? 'Bài Học'}
            </h1>
            <p className="text-xs text-on-surface-variant">
              {lesson ? `${lesson.subject} • Lớp ${lesson.grade === 0 ? 'K' : lesson.grade}` : 'Đang tải...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary px-2">
          <span className="material-symbols-outlined text-lg">flag</span>
          <span className="font-label-md text-sm font-bold">{getCurrentProgressionLevel()}/40</span>
        </div>
      </header>

      <main className="pt-[100px] px-[24px] flex flex-col gap-6 pb-[80px]">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse">auto_fix_high</span>
            <p className="text-on-surface-variant">Đang tải thử thách...</p>
          </div>
        )}
        {error && <p className="rounded-xl bg-error-container p-5 text-on-error-container">{error}</p>}

        {!loading && !error && !lesson && (
          <section className="p-6 rounded-xl border border-outline-variant shadow-sm bg-surface-container-low text-center mt-8">
            <span className="material-symbols-outlined text-4xl text-primary">auto_stories</span>
            <h2 className="font-headline-md text-xl font-bold text-primary mt-3">Không tìm thấy bài học</h2>
            <button
              className="mt-5 bg-primary text-on-primary px-6 min-h-[56px] rounded-full font-label-md active:scale-95 transition-all"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
          </section>
        )}

        {lesson && (
          <>
            {/* Spell badge */}
            <div className="flex items-center justify-center gap-2 py-2">
              <span className="material-symbols-outlined text-sm text-primary">auto_fix_high</span>
              <p className="font-label-md text-xs text-primary font-bold uppercase tracking-widest">{lesson.spellName}</p>
              <span className="text-xs text-on-surface-variant">• {lesson.completionXp} XP</span>
            </div>

            {/* Grammar hint — short, if exists */}
            {lesson.content.grammarPoint && (
              <div className="px-4 py-3 bg-primary/10 rounded-xl border border-primary/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">lightbulb</span>
                <p className="text-sm text-on-surface leading-relaxed">{lesson.content.grammarPoint}</p>
              </div>
            )}

            {/* ⚡ Main game — straight to challenges */}
            <section className="mb-4">
              <GameTab
                exercises={lesson.exercises}
                lessonId={lesson.lessonId}
                lessonTitle={lesson.title}
              />
            </section>

            {/* Vocab recap chips — AFTER playing */}
            {lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
              <section className="mt-2">
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-3">
                  Từ vựng trong bài
                </p>
                <div className="flex flex-wrap gap-2">
                  {lesson.content.vocabulary.map(word => (
                    <button
                      key={word}
                      onClick={() => { setSelectedWord(word); setShowVocabModal(true); }}
                      className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container text-sm font-bold text-primary hover:border-primary hover:bg-primary/10 transition-all active:scale-95"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Nav footer */}
            <footer className="flex justify-between items-center py-4 border-t border-outline-variant/30 mt-4">
              <button
                onClick={() => void goToPreviousLesson()}
                className="flex items-center gap-1 text-primary font-label-md text-sm font-bold hover:bg-primary/5 min-h-[48px] px-4 rounded-full transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
                Bài Trước
              </button>
              <button
                onClick={() => void goToNextLesson()}
                className="flex items-center gap-1 bg-primary text-on-primary min-h-[48px] px-6 rounded-full font-label-md text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Bài Tiếp
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </footer>
          </>
        )}
      </main>

      {/* Vocabulary Modal */}
      {showVocabModal && selectedWord && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 max-w-[390px] mx-auto">
          <div className="w-full bg-surface rounded-t-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline-md text-2xl font-bold text-primary">{selectedWord}</h3>
              <button
                onClick={() => setShowVocabModal(false)}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary"
              >
                close
              </button>
            </div>
            <div className="bg-primary-container/20 rounded-xl p-4 mb-6">
              <p className="text-on-surface text-lg leading-relaxed">A key vocabulary word from this lesson.</p>
            </div>
            <button
              onClick={() => setShowVocabModal(false)}
              className="w-full bg-primary text-on-primary min-h-[56px] px-6 rounded-full font-label-md font-bold active:scale-95 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

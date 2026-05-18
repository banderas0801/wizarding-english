/**
 * StageSession — Duolingo-style lesson loop
 *
 * Mô hình tham chiếu Duolingo:
 * • Bite-sized: 10 exercises/session (không quá tải)
 * • Hearts: 3 mistakes → session ends (pressure + engagement)
 * • Varied types xoay vòng theo tỉ lệ: 60% MCQ / 20% Duel / 20% True-False
 * • Progress bar đầu trang (không số — giống Duo)
 * • Correct/wrong feedback bar ở cuối (không auto-advance)
 * • XP per question + bonus streak
 * • Result screen: stars (0-3) + XP earned
 */

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { useGameStore } from '../store/useGameStore';
import type { Exercise } from '../types/curriculum';

// ─── Config (Duolingo-inspired) ───────────────────────────────────────────────
const SESSION_SIZE = 10;   // questions per session
const MAX_HEARTS   = 3;    // mistakes before game over

// ─── Game type distribution: 6 MCQ, 2 Duel, 2 TF ────────────────────────────
type GameMode = 'mcq' | 'duel' | 'true_false';
const MODE_SEQUENCE: GameMode[] = ['mcq','mcq','duel','mcq','true_false','mcq','mcq','duel','mcq','true_false'];

// ─── Fix encoding artifacts ───────────────────────────────────────────────────
function fixText(s: string): string {
  return (s ?? '')
    .replace(/â€œ/g, '"').replace(/â€/g, '"').replace(/â€™/g, "'")
    .replace(/â€˜/g, "'").replace(/Â©/g, '©').replace(/â€¦/g, '…')
    .replace(/\s+/g, ' ').trim();
}

// ─── Prepare exercises ────────────────────────────────────────────────────────
function prepareExercises(all: Exercise[]): Exercise[] {
  const seen = new Set<string>();
  return all
    .filter(e => {
      if (!e.options || e.options.length < 3) return false;
      if (!e.answer) return false;
      const key = fixText(e.question).slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, SESSION_SIZE);
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function getStars(correct: number, hearts: number): 0 | 1 | 2 | 3 {
  const pct = correct / SESSION_SIZE;
  if (pct === 1 && hearts === MAX_HEARTS) return 3;
  if (pct >= 0.8) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

// ─── Hearts display ───────────────────────────────────────────────────────────
function Hearts({ current, max }: { current: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-lg transition-all ${i < current ? 'opacity-100' : 'opacity-20 grayscale'}`}>❤️</span>
      ))}
    </div>
  );
}

// ─── MCQ (Multiple Choice Question) ──────────────────────────────────────────
function MCQ({ ex, onContinue }: { ex: Exercise; onContinue: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const correct = chosen === ex.answer;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">✨ Chọn câu trả lời đúng</p>
      <h2 className="text-base font-bold text-on-surface leading-snug">{fixText(ex.question)}</h2>
      <div className="flex flex-col gap-2 mt-1">
        {(ex.options ?? []).map(opt => {
          const isChosen = chosen === opt;
          const isRight  = opt === ex.answer;
          const showResult = !!chosen;
          return (
            <button
              key={opt}
              onClick={() => { if (!chosen) setChosen(opt); }}
              disabled={!!chosen}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all active:scale-[0.98] ${
                showResult && isRight  ? 'border-green-500 bg-green-50 text-green-800' :
                isChosen && !isRight   ? 'border-red-400 bg-red-50 text-red-800' :
                'border-outline-variant bg-surface hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{fixText(opt)}</span>
                {showResult && isRight  && <span>✅</span>}
                {isChosen  && !isRight  && <span>❌</span>}
              </div>
            </button>
          );
        })}
      </div>
      {/* Duolingo-style bottom feedback bar */}
      {chosen && (
        <div className={`-mx-5 px-5 py-4 rounded-2xl mt-2 flex items-center justify-between ${correct ? 'bg-green-100' : 'bg-red-50'}`}>
          <div>
            <p className={`font-bold text-sm ${correct ? 'text-green-700' : 'text-red-700'}`}>
              {correct ? '🎉 Chính xác!' : '❌ Sai rồi'}
            </p>
            {!correct && <p className="text-xs text-red-600 mt-0.5">Đáp án: {fixText(ex.answer as string)}</p>}
          </div>
          <button
            onClick={() => onContinue(correct)}
            className={`px-6 py-2 rounded-full font-bold text-sm ${correct ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}
          >
            Tiếp →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Duel (2-choice dramatic) ─────────────────────────────────────────────────
function Duel({ ex, onContinue }: { ex: Exercise; onContinue: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const opts = useMemo(() => {
    const all = ex.options ?? [];
    const right = ex.answer as string;
    const wrong = all.filter(o => o !== right)[Math.floor(Math.random() * (all.length - 1))];
    return Math.random() > 0.5 ? [right, wrong] : [wrong, right];
  }, [ex]);
  const correct = chosen === ex.answer;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">⚡ Đấu pháp sư — Chọn phe!</p>
      <h2 className="text-base font-bold text-on-surface leading-snug">{fixText(ex.question)}</h2>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {opts.map((opt, i) => {
          const isChosen = chosen === opt;
          const isRight  = opt === ex.answer;
          const showResult = !!chosen;
          return (
            <button
              key={opt}
              onClick={() => { if (!chosen) setChosen(opt); }}
              disabled={!!chosen}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 font-semibold text-xs transition-all active:scale-95 min-h-[130px] gap-2 ${
                showResult && isRight  ? 'border-green-500 bg-green-50' :
                isChosen && !isRight   ? 'border-red-400 bg-red-50' :
                'border-outline-variant bg-surface hover:border-primary'
              }`}
            >
              <span className="text-4xl">{i === 0 ? '🧙‍♂️' : '🧙‍♀️'}</span>
              <span className="text-center leading-snug">{fixText(opt)}</span>
              {showResult && isRight  && <span>✅</span>}
              {isChosen && !isRight   && <span>❌</span>}
            </button>
          );
        })}
      </div>
      {chosen && (
        <div className={`-mx-5 px-5 py-4 rounded-2xl flex items-center justify-between ${correct ? 'bg-green-100' : 'bg-red-50'}`}>
          <div>
            <p className={`font-bold text-sm ${correct ? 'text-green-700' : 'text-red-700'}`}>
              {correct ? '⚡ Chiến thắng!' : '💀 Thua rồi!'}
            </p>
            {!correct && <p className="text-xs text-red-600 mt-0.5">Đáp án: {fixText(ex.answer as string)}</p>}
          </div>
          <button onClick={() => onContinue(correct)} className={`px-6 py-2 rounded-full font-bold text-sm ${correct ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
            Tiếp →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── True/False ───────────────────────────────────────────────────────────────
function TrueFalse({ ex, onContinue }: { ex: Exercise; onContinue: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<boolean | null>(null);
  const stableIdxRef = useRef(Math.floor(Math.random() * Math.min(2, (ex.options ?? []).length)));
  const statement = fixText((ex.options ?? [])[stableIdxRef.current] ?? ex.answer as string);
  const isStatementTrue = statement === fixText(ex.answer as string);
  const correct = chosen !== null && chosen === isStatementTrue;

  const pick = (val: boolean) => { if (chosen === null) setChosen(val); };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">⚖️ Đúng hay Sai?</p>
      <h2 className="text-sm text-on-surface-variant leading-snug">{fixText(ex.question)}</h2>
      <div className="p-4 bg-primary/10 rounded-2xl border-2 border-primary/30 text-center">
        <p className="font-bold text-primary">"{statement}"</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map(val => {
          const showResult = chosen !== null;
          const isCorrectChoice = val === isStatementTrue;
          return (
            <button
              key={String(val)}
              onClick={() => pick(val)}
              disabled={chosen !== null}
              className={`flex flex-col items-center justify-center py-5 rounded-2xl border-2 font-bold transition-all active:scale-95 ${
                showResult && isCorrectChoice       ? 'border-green-500 bg-green-50' :
                chosen === val && !isCorrectChoice  ? 'border-red-400 bg-red-50' :
                'border-outline-variant bg-surface hover:border-primary'
              }`}
            >
              <span className="text-4xl">{val ? '✅' : '❌'}</span>
              <span className="mt-2 text-sm">{val ? 'ĐÚNG' : 'SAI'}</span>
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div className={`-mx-5 px-5 py-4 rounded-2xl flex items-center justify-between ${correct ? 'bg-green-100' : 'bg-red-50'}`}>
          <div>
            <p className={`font-bold text-sm ${correct ? 'text-green-700' : 'text-red-700'}`}>
              {correct ? '🎉 Chính xác!' : '❌ Sai rồi'}
            </p>
            {!correct && <p className="text-xs text-red-600 mt-0.5">Câu đó là {isStatementTrue ? 'ĐÚNG' : 'SAI'}</p>}
          </div>
          <button onClick={() => onContinue(correct)} className={`px-6 py-2 rounded-full font-bold text-sm ${correct ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
            Tiếp →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ correct, hearts, onRetry, onMap }: {
  correct: number; hearts: number; onRetry: () => void; onMap: () => void;
}) {
  const stars = getStars(correct, hearts);
  const xp = correct * 10 + (stars === 3 ? 20 : stars === 2 ? 10 : 0);
  const starEmojis = ['⭐','⭐','⭐'];
  const isGameOver = hearts === 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-6 text-center max-w-[430px] mx-auto">
      <div className="text-7xl animate-bounce">{isGameOver ? '💔' : stars === 3 ? '🏆' : stars === 2 ? '🎉' : stars === 1 ? '💪' : '😢'}</div>
      <div>
        <h1 className="text-2xl font-black text-primary">{isGameOver ? 'Hết tim!' : stars >= 2 ? 'Xuất sắc!' : stars === 1 ? 'Cố lên!' : 'Thử lại nhé!'}</h1>
        <div className="flex justify-center gap-1 mt-2">
          {starEmojis.map((s, i) => (
            <span key={i} className={`text-2xl transition-all ${i < stars ? 'opacity-100' : 'opacity-20 grayscale'}`}>{s}</span>
          ))}
        </div>
      </div>
      <div className="bg-primary/10 rounded-2xl p-5 w-full max-w-sm space-y-3">
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Câu đúng</span><span className="font-bold text-primary">{correct}/{SESSION_SIZE}</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">XP nhận được</span><span className="font-black text-lg text-primary">+{xp} ⭐</span></div>
        <div className="w-full h-2 bg-outline-variant/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all" style={{ width: `${(correct / SESSION_SIZE) * 100}%` }} />
        </div>
      </div>
      <div className="flex gap-3 w-full max-w-sm">
        <button onClick={onRetry} className="flex-1 border-2 border-primary text-primary py-3 rounded-full font-bold active:scale-95 transition-all">🔄 Thử lại</button>
        <button onClick={onMap} className="flex-1 bg-primary text-on-primary py-3 rounded-full font-bold shadow-lg active:scale-95 transition-all">🗺️ Bản đồ</button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StageSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const unitId = searchParams.get('unitId');
  const { curriculum, loading } = useCurriculum();
  const { addXp, addGold, recordUnitCompletion } = useGameStore();

  // Find unit
  const unitData = useMemo(() => {
    if (!curriculum || !unitId) return null;
    for (const level of curriculum.levels)
      for (const subject of level.subjects)
        for (const unit of subject.units)
          if (unit.id === unitId) return { unit, subject, level };
    return null;
  }, [curriculum, unitId]);

  // Prepare exercises
  const exercises = useMemo(() => {
    if (!unitData) return [];
    return prepareExercises(unitData.unit.lessons.flatMap(l => l.exercises));
  }, [unitData]);

  // Game state
  const [phase, setPhase]       = useState<'intro' | 'playing' | 'done'>('intro');
  const [index, setIndex]       = useState(0);
  const [correct, setCorrect]   = useState(0);
  const [hearts, setHearts]     = useState(MAX_HEARTS);
  const rewardedRef             = useRef(false);

  // Award XP on done
  useEffect(() => {
    if (phase === 'done' && !rewardedRef.current) {
      rewardedRef.current = true;
      const stars = getStars(correct, hearts);
      const xp = correct * 10 + (stars === 3 ? 20 : stars === 2 ? 10 : 0);
      addXp(xp);
      addGold(correct * 5);
      if (unitId) {
        const pctScore = Math.round((correct / SESSION_SIZE) * 100);
        recordUnitCompletion(unitId, pctScore, stars);
      }
    }
  }, [phase, correct, hearts, addXp, addGold, recordUnitCompletion, unitId]);

  const handleContinue = useCallback((wasCorrect: boolean) => {
    if (!wasCorrect) {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts === 0) { setPhase('done'); return; }
    } else {
      setCorrect(c => c + 1);
    }
    if (index + 1 >= exercises.length) {
      setPhase('done');
    } else {
      setIndex(i => i + 1);
    }
  }, [hearts, index, exercises.length]);

  const resetSession = () => {
    rewardedRef.current = false;
    setIndex(0); setCorrect(0); setHearts(MAX_HEARTS); setPhase('intro');
  };

  // ── STATES ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <span className="material-symbols-outlined text-5xl text-primary animate-pulse block">auto_fix_high</span>
    </div>
  );

  if (!unitData || exercises.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-4 text-center">
      <span className="text-5xl">😢</span>
      <p className="text-on-surface-variant">Chưa có câu hỏi cho stage này</p>
      <button onClick={() => navigate('/')} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold">Bản đồ</button>
    </div>
  );

  // INTRO
  if (phase === 'intro') return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-6 text-center max-w-[430px] mx-auto">
      <div className="text-6xl animate-bounce">⚡</div>
      <div>
        <h1 className="text-2xl font-black text-primary">{unitData.unit.title}</h1>
        <p className="text-on-surface-variant text-sm mt-1">{unitData.subject.name} • {unitData.level.title}</p>
      </div>
      <div className="bg-surface-container rounded-2xl p-5 w-full max-w-sm space-y-3 text-left">
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Số câu</span><span className="font-bold text-primary">{exercises.length}</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Tim</span><span className="font-bold"><Hearts current={MAX_HEARTS} max={MAX_HEARTS}/></span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Dạng bài</span><span className="font-bold text-primary">Quiz · Duel · Đúng/Sai</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">XP tối đa</span><span className="font-bold text-primary">⭐ {exercises.length * 10 + 20}</span></div>
      </div>
      <button onClick={() => setPhase('playing')} className="bg-primary text-on-primary px-10 py-4 rounded-full font-black text-lg shadow-lg active:scale-95 transition-all w-full max-w-sm">
        ⚡ Bắt Đầu!
      </button>
      <button onClick={() => navigate(-1)} className="text-on-surface-variant text-sm">← Bản đồ</button>
    </div>
  );

  // DONE
  if (phase === 'done') return (
    <ResultScreen correct={correct} hearts={hearts} onRetry={resetSession} onMap={() => navigate('/')} />
  );

  // PLAYING
  const ex = exercises[index];
  const mode = MODE_SEQUENCE[index % MODE_SEQUENCE.length];
  const progress = index / exercises.length;

  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-surface">
      {/* Header — Duolingo style progress bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur px-4 pt-10 pb-3 max-w-[430px] mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-on-surface-variant material-symbols-outlined text-2xl">close</button>
          {/* Progress bar (no numbers — like Duolingo) */}
          <div className="flex-1 h-4 bg-outline-variant/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#58cc02] to-[#89e219] rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <Hearts current={hearts} max={MAX_HEARTS} />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 px-5 pt-[90px] pb-6">
        <div className="bg-white rounded-3xl shadow-sm border border-outline-variant/20 p-5 mt-2">
          {mode === 'mcq'        && <MCQ       key={index} ex={ex} onContinue={handleContinue} />}
          {mode === 'duel'       && <Duel      key={index} ex={ex} onContinue={handleContinue} />}
          {mode === 'true_false' && <TrueFalse key={index} ex={ex} onContinue={handleContinue} />}
        </div>

        {/* Streak stars */}
        {correct > 0 && (
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: Math.min(correct, 10) }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm animate-pulse">⭐</span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

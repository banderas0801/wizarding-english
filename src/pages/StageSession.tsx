import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { useGameStore } from '../store/useGameStore';
import type { Exercise } from '../types/curriculum';

// ─── Mini-game type rotates every question ───────────────────────────────────
type GameMode = 'tap_answer' | 'true_false' | 'witch_duel' | 'potion_pick';

const GAME_MODES: GameMode[] = ['tap_answer', 'witch_duel', 'potion_pick', 'true_false'];

const GAME_META: Record<GameMode, { title: string; icon: string; color: string }> = {
  tap_answer:  { title: 'Câu thần chú',  icon: '✨', color: '#6c5ce7' },
  true_false:  { title: 'Phán xét ma thuật', icon: '⚖️', color: '#e17055' },
  witch_duel:  { title: 'Đấu pháp sư',   icon: '⚡', color: '#d4af37' },
  potion_pick: { title: 'Chọn bình thuốc', icon: '🧪', color: '#00b894' },
};

// ─── Dedup + shuffle exercises ────────────────────────────────────────────────
function prepareExercises(exercises: Exercise[]): Exercise[] {
  const seen = new Set<string>();
  return exercises
    .filter(e => {
      if (!e.options || e.options.length < 2) return false;
      const key = e.question.trim().slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 20); // max 20 per stage for pace
}

// ─── Fix encoding artifacts ───────────────────────────────────────────────────
function fixText(s: string): string {
  return s
    .replace(/â€œ/g, '"').replace(/â€/g, '"').replace(/â€™/g, "'")
    .replace(/â€˜/g, "'").replace(/Â©/g, '©').replace(/â€¦/g, '…')
    .replace(/\s+/g, ' ').trim();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TapAnswer({ ex, onAnswer }: { ex: Exercise; onAnswer: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const opts = ex.options ?? [];

  const pick = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    const correct = opt === ex.answer;
    setTimeout(() => onAnswer(correct), 900);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-primary leading-snug">{fixText(ex.question)}</h2>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {opts.map(opt => {
          const isChosen = chosen === opt;
          const isRight = opt === ex.answer;
          const showGreen = chosen && isRight;
          const showRed = isChosen && !isRight;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!chosen}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold text-sm transition-all active:scale-95 ${
                showGreen ? 'border-green-500 bg-green-100 text-green-800' :
                showRed   ? 'border-red-400 bg-red-100 text-red-800' :
                isChosen  ? 'border-primary bg-primary/10' :
                'border-outline-variant bg-surface hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{fixText(opt)}</span>
                {showGreen && <span>✅</span>}
                {showRed   && <span>❌</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WitchDuel({ ex, onAnswer }: { ex: Exercise; onAnswer: (correct: boolean) => void }) {
  // 2-column duel style — pick 1 of 2 opponents (answer vs distractor)
  const [chosen, setChosen] = useState<string | null>(null);
  const opts = (ex.options ?? []).slice(0, 2); // only 2 choices for dramatic effect

  const pick = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    setTimeout(() => onAnswer(opt === ex.answer), 900);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">⚡ Đấu Pháp Sư!</p>
      <h2 className="text-base font-bold text-on-surface leading-snug">{fixText(ex.question)}</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {opts.map((opt, i) => {
          const isChosen = chosen === opt;
          const isRight = opt === ex.answer;
          const showResult = !!chosen;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!chosen}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-3 font-bold text-sm transition-all active:scale-95 min-h-[120px] gap-3 ${
                showResult && isRight ? 'border-green-500 bg-green-100' :
                isChosen && !isRight  ? 'border-red-400 bg-red-100' :
                'border-outline-variant bg-surface hover:border-primary hover:bg-primary/5'
              }`}
              style={{ borderWidth: '3px' }}
            >
              <span className="text-4xl">{i === 0 ? '🧙‍♂️' : '🧙‍♀️'}</span>
              <span className="text-center leading-tight text-xs">{fixText(opt)}</span>
              {showResult && isRight   && <span>✅</span>}
              {isChosen && !isRight    && <span>❌</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PotionPick({ ex, onAnswer }: { ex: Exercise; onAnswer: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const opts = ex.options ?? [];
  const potionEmojis = ['🔴', '🔵', '🟢', '🟡'];

  const pick = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    setTimeout(() => onAnswer(opt === ex.answer), 900);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">🧪 Chọn bình thuốc đúng!</p>
      <h2 className="text-base font-bold text-on-surface leading-snug">{fixText(ex.question)}</h2>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {opts.map((opt, i) => {
          const isChosen = chosen === opt;
          const isRight = opt === ex.answer;
          const showResult = !!chosen;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!chosen}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                showResult && isRight ? 'border-green-500 bg-green-100' :
                isChosen && !isRight  ? 'border-red-400 bg-red-100' :
                'border-outline-variant bg-surface hover:border-primary'
              }`}
            >
              <span className="text-3xl mb-2">{potionEmojis[i] ?? '🧪'}</span>
              <span className="text-xs font-semibold text-center leading-tight">{fixText(opt)}</span>
              {showResult && isRight   && <span className="mt-1">✅</span>}
              {isChosen && !isRight    && <span className="mt-1">❌</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrueFalse({ ex, onAnswer }: { ex: Exercise; onAnswer: (correct: boolean) => void }) {
  // Pick 1 option and ask "is this right?" — stable ref so Math.random() only runs once
  const [chosen, setChosen] = useState<boolean | null>(null);
  const stableIdx = useRef(Math.floor(Math.random() * 2));
  const statement = fixText(ex.options?.[stableIdx.current] ?? ex.answer as string);
  const isStatementCorrect = statement === fixText(ex.answer as string);

  const pick = (userSaysTrue: boolean) => {
    if (chosen !== null) return;
    setChosen(userSaysTrue);
    const correct = userSaysTrue === isStatementCorrect;
    setTimeout(() => onAnswer(correct), 900);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-primary uppercase tracking-widest">⚖️ Đúng hay Sai?</p>
      <h2 className="text-sm font-bold text-on-surface-variant leading-snug">{fixText(ex.question)}</h2>
      <div className="p-4 bg-primary/10 rounded-2xl border-2 border-primary/30 text-center">
        <p className="font-bold text-primary text-base">"{statement}"</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {([true, false] as const).map(val => {
          const showResult = chosen !== null;
          const isCorrectChoice = val === isStatementCorrect;
          return (
            <button
              key={String(val)}
              onClick={() => pick(val)}
              disabled={chosen !== null}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 font-bold transition-all active:scale-95 ${
                showResult && isCorrectChoice      ? 'border-green-500 bg-green-100' :
                chosen === val && !isCorrectChoice ? 'border-red-400 bg-red-100' :
                'border-outline-variant bg-surface hover:border-primary'
              }`}
            >
              <span className="text-4xl">{val ? '✅' : '❌'}</span>
              <span className="mt-2">{val ? 'ĐÚNG' : 'SAI'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Stage Session ───────────────────────────────────────────────────────
export default function StageSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const unitId = searchParams.get('unitId');
  const { curriculum, loading } = useCurriculum();
  const { addXp, addGold } = useGameStore();

  const unitData = useMemo(() => {
    if (!curriculum || !unitId) return null;
    for (const level of curriculum.levels) {
      for (const subject of level.subjects) {
        for (const unit of subject.units) {
          if (unit.id === unitId) return { unit, subject, level };
        }
      }
    }
    return null;
  }, [curriculum, unitId]);

  const exercises = useMemo(() => {
    if (!unitData) return [];
    return prepareExercises(unitData.unit.lessons.flatMap(l => l.exercises));
  }, [unitData]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const current = exercises[index];
  const mode: GameMode = GAME_MODES[index % GAME_MODES.length];
  const meta = GAME_META[mode];
  const progress = exercises.length > 0 ? (index / exercises.length) : 0;

  const handleAnswer = useCallback((correct: boolean) => {
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= exercises.length) {
        setPhase('done');
      } else {
        setIndex(i => i + 1);
      }
    }, 500);
  }, [index, exercises.length]);

  // ── LOADING ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <span className="material-symbols-outlined text-5xl text-primary animate-pulse block">auto_fix_high</span>
        <p className="text-on-surface-variant mt-3">Đang tải thử thách...</p>
      </div>
    </div>
  );

  // ── NO EXERCISES ──
  if (!unitData || exercises.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-6">
      <span className="text-6xl">😢</span>
      <p className="text-on-surface-variant text-center">Chưa có câu hỏi cho stage này</p>
      <button onClick={() => navigate(-1)} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold">
        Quay lại bản đồ
      </button>
    </div>
  );

  // ── INTRO ──
  if (phase === 'intro') return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-6 text-center">
      <div className="text-6xl animate-bounce">{meta.icon}</div>
      <div>
        <h1 className="text-2xl font-black text-primary">{unitData.unit.title}</h1>
        <p className="text-on-surface-variant mt-1">{unitData.subject.name} • {unitData.level.title}</p>
      </div>
      <div className="bg-primary/10 rounded-2xl p-5 w-full max-w-sm space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-on-surface-variant">Số câu thử thách</span>
          <span className="font-bold text-primary">{exercises.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-on-surface-variant">Phần thưởng tối đa</span>
          <span className="font-bold text-primary">⭐ {exercises.length * 10} XP</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-on-surface-variant">Game đa dạng</span>
          <span className="font-bold text-primary">4 kiểu</span>
        </div>
      </div>
      <button
        onClick={() => setPhase('playing')}
        className="bg-primary text-on-primary px-10 py-4 rounded-full font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
      >
        ⚡ Bắt Đầu!
      </button>
      <button onClick={() => navigate(-1)} className="text-on-surface-variant text-sm">← Bản đồ</button>
    </div>
  );

  // ── DONE — reward via effect, never in render ──
  const rewardedRef = useRef(false);
  useEffect(() => {
    if (phase === 'done' && !rewardedRef.current) {
      rewardedRef.current = true;
      addXp(score * 10);
      addGold(score * 5);
    }
  }, [phase, score, addXp, addGold]);

  if (phase === 'done') {
    const earnedXp = score * 10;
    const earnedGold = score * 5;
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-6 text-center">
        <div className="text-6xl">{pct >= 70 ? '🎉' : '💪'}</div>
        <div>
          <h1 className="text-2xl font-black text-primary">{pct >= 70 ? 'Xuất sắc!' : 'Cố lên!'}</h1>
          <p className="text-on-surface-variant mt-1">{score}/{exercises.length} câu đúng</p>
        </div>
        <div className="bg-primary/10 rounded-2xl p-5 w-full max-w-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">XP nhận được</span>
            <span className="font-black text-xl text-primary">+{earnedXp} ⭐</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">Vàng nhận được</span>
            <span className="font-black text-xl text-primary">+{earnedGold} 💰</span>
          </div>
          <div className="w-full h-3 bg-outline-variant/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm font-bold text-primary">{pct}% chính xác</p>
        </div>
        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={() => { setIndex(0); setScore(0); setPhase('intro'); }}
            className="flex-1 border-2 border-primary text-primary px-4 py-3 rounded-full font-bold hover:bg-primary/10 transition-all"
          >
            🔄 Thử lại
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-primary text-on-primary px-4 py-3 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            🗺️ Bản đồ
          </button>
        </div>
      </div>
    );
  }

  // ── PLAYING ──
  return (
    <div
      className="min-h-screen flex flex-col max-w-[430px] mx-auto"
      style={{
        backgroundColor: '#fff8f7',
        backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur px-5 pt-11 pb-3 max-w-[430px] mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-on-surface-variant">close</button>
          {/* Progress bar */}
          <div className="flex-1 h-3 bg-outline-variant/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary">{index + 1}/{exercises.length}</span>
        </div>
        {/* Game mode badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold"
          style={{ backgroundColor: meta.color }}
        >
          <span>{meta.icon}</span>
          <span>{meta.title}</span>
        </div>
      </header>

      {/* Question area */}
      <main className="flex-1 pt-[120px] px-5 pb-10">
        {/* Feedback overlay */}
        {feedback && (
          <div className={`fixed inset-0 pointer-events-none z-40 flex items-center justify-center ${
            feedback === 'correct' ? 'bg-green-400/20' : 'bg-red-400/20'
          }`}>
            <span className="text-8xl animate-bounce">
              {feedback === 'correct' ? '✅' : '❌'}
            </span>
          </div>
        )}

        <div className="bg-surface rounded-2xl shadow-md border border-outline-variant/30 p-5 mt-2">
          {current && mode === 'tap_answer'  && <TapAnswer  ex={current} onAnswer={handleAnswer} key={index} />}
          {current && mode === 'witch_duel'  && <WitchDuel  ex={current} onAnswer={handleAnswer} key={index} />}
          {current && mode === 'potion_pick' && <PotionPick ex={current} onAnswer={handleAnswer} key={index} />}
          {current && mode === 'true_false'  && <TrueFalse  ex={current} onAnswer={handleAnswer} key={index} />}
        </div>

        {/* Score streak */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: Math.min(score, 10) }).map((_, i) => (
            <span key={i} className="text-yellow-500 text-sm">⭐</span>
          ))}
        </div>
      </main>
    </div>
  );
}

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { useGameStore } from '../store/useGameStore';
import { CurriculumBuilder } from '../services/CurriculumBuilder';

// Map each subject to a Hogwarts location icon & color
const SUBJECT_STYLE: Record<string, { icon: string; emoji: string; color: string }> = {
  reading:            { icon: 'menu_book',    emoji: '📚', color: '#4a90d9' },
  'reading comprehension': { icon: 'menu_book', emoji: '📖', color: '#4a90d9' },
  writing:            { icon: 'edit',         emoji: '✍️', color: '#9b59b6' },
  math:               { icon: 'calculate',    emoji: '🔢', color: '#e67e22' },
  science:            { icon: 'science',      emoji: '🔬', color: '#27ae60' },
  vocabulary:         { icon: 'abc',          emoji: '💬', color: '#c0392b' },
  grammar:            { icon: 'spellcheck',   emoji: '📝', color: '#16a085' },
  spelling:           { icon: 'text_fields',  emoji: '🔤', color: '#8e44ad' },
  'critical thinking':{ icon: 'psychology',   emoji: '🧠', color: '#2980b9' },
  general:            { icon: 'auto_awesome', emoji: '⭐', color: '#d4af37' },
  geography:          { icon: 'public',       emoji: '🌍', color: '#1abc9c' },
};

const GRADE_NAMES = ['Năm Nhập Học', 'Năm Nhất', 'Năm Hai', 'Năm Ba', 'Năm Bốn', 'Năm Năm', 'Năm Sáu'];
const GRADE_EMOJIS = ['🎒', '🦉', '🧙', '🔮', '🐉', '⚡', '🌟'];

export default function WorldMap() {
  const navigate = useNavigate();
  const { curriculum, loading } = useCurriculum();
  const { xp, completedUnits, bestScores, isUnitUnlocked } = useGameStore();
  const [selectedGrade, setSelectedGrade] = useState(1);

  // Build flat list of nodes for the selected grade
  const nodes = useMemo(() => {
    if (!curriculum) return [];
    const grade = curriculum.levels.find(l => l.level === selectedGrade);
    if (!grade) return [];

    return grade.subjects.flatMap((subject, si) =>
      subject.units.map((unit, ui) => {
        const exerciseCount = unit.lessons.flatMap(l => l.exercises).length;
        return {
          id: unit.id,
          title: unit.title,
          subject: subject.name,
          subjectKey: subject.id,
          exerciseCount,
          xpReward: exerciseCount * 10,
          unitIndex: si * 100 + ui,
          prerequisiteId: curriculum
            ? CurriculumBuilder.getPrerequisiteUnitId(curriculum, unit.id)
            : null,
          isFirstInGrade: curriculum
            ? CurriculumBuilder.isFirstUnitOfGrade(curriculum, unit.id)
            : false,
        };
      })
    ).filter(n => n.exerciseCount > 0); // only nodes with real challenges
  }, [curriculum, selectedGrade]);

  const getNodeState = useCallback((node: { id: string; isFirstInGrade: boolean; prerequisiteId: string | null }): 'locked' | 'unlocked' | 'current' | 'completed' | 'mastered' => {
    const best = bestScores[node.id] ?? 0;
    const completed = Boolean(completedUnits[node.id]);
    if (best >= 90) return 'mastered';
    if (best >= 70 || completed) return 'completed';
    const unlocked = node.isFirstInGrade || isUnitUnlocked(node.id, node.prerequisiteId);
    if (!unlocked) return 'locked';
    return 'unlocked';
  }, [bestScores, completedUnits, isUnitUnlocked]);

  const currentNodeId = useMemo(() => {
    for (const node of nodes) {
      if (getNodeState(node) === 'unlocked') return node.id;
    }
    return null;
  }, [nodes, getNodeState]);

  return (
    <div
      className="min-h-screen flex flex-col max-w-[430px] mx-auto relative overflow-x-hidden"
      style={{
        backgroundColor: '#fff8f7',
        backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur border-b border-outline-variant/30 shadow-sm max-w-[430px] mx-auto">
        <div className="flex items-center justify-between px-5 pt-11 pb-3">
          <div>
            <h1 className="font-bold text-xl text-primary tracking-wide">🏰 Hogwarts</h1>
            <p className="text-xs text-on-surface-variant">Chọn thử thách để học</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <span className="text-sm">⭐</span>
            <span className="font-bold text-sm text-primary">{xp.toLocaleString()} XP</span>
          </div>
        </div>

        {/* Grade tabs — horizontal scroll */}
        <div className="flex overflow-x-auto px-4 pb-3 gap-2 no-scrollbar">
          {(curriculum?.levels ?? []).map(level => (
            <button
              key={level.level}
              onClick={() => setSelectedGrade(level.level)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedGrade === level.level
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
              }`}
            >
              <span>{GRADE_EMOJIS[level.level]}</span>
              <span>{GRADE_NAMES[level.level]}</span>
              <span className="opacity-70">({level.totalLessons})</span>
            </button>
          ))}
        </div>
      </header>

      {/* Map Content */}
      <main className="pt-[148px] pb-28 px-5">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse">auto_fix_high</span>
            <p className="text-on-surface-variant text-sm">Đang tải bản đồ...</p>
          </div>
        )}

        {!loading && nodes.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl">🔒</span>
            <p className="text-on-surface-variant mt-4">Chưa có thử thách cho cấp độ này</p>
          </div>
        )}

        {!loading && nodes.length > 0 && (
          <div className="relative">
            {/* Winding path SVG */}
            <svg
              className="absolute left-1/2 top-0 pointer-events-none -translate-x-1/2"
              width="60" height={nodes.length * 140 + 60}
              viewBox={`0 0 60 ${nodes.length * 140 + 60}`}
              fill="none"
            >
              <path
                d={`M30 0 ${Array.from({ length: nodes.length }, (_, i) => `L30 ${(i + 1) * 140}`).join(' ')}`}
                stroke="#D4C5A1"
                strokeWidth="6"
                strokeDasharray="10 8"
                strokeLinecap="round"
              />
            </svg>

            {/* Nodes */}
            <div className="flex flex-col items-center gap-10">
              {nodes.map((node, index) => {
                const rawState = getNodeState(node);
                const state = rawState === 'unlocked' && currentNodeId === node.id ? 'current' : rawState;
                const style = SUBJECT_STYLE[node.subjectKey] ?? SUBJECT_STYLE['general'];
                const isLeft = index % 2 === 0;
                const best = bestScores[node.id] ?? 0;
                const stars = CurriculumBuilder.getStarFromScore(best);

                return (
                  <div
                    key={node.id}
                    className={`relative flex flex-col items-center w-full ${isLeft ? 'pl-12 pr-32' : 'pl-32 pr-12'}`}
                    style={{ alignItems: isLeft ? 'flex-start' : 'flex-end' }}
                  >
                    {/* Node button */}
                    <button
                      disabled={state === 'locked'}
                      onClick={() => navigate(`/stage?unitId=${encodeURIComponent(node.id)}`)}
                      className={`relative flex flex-col items-center gap-2 transition-all active:scale-95 ${
                        state === 'locked' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
                      }`}
                    >
                      {/* Node circle */}
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 ${
                          state === 'current'
                            ? 'border-primary shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse'
                            : state === 'mastered'
                            ? 'border-yellow-300 shadow-[0_0_18px_rgba(212,175,55,0.55)]'
                            : state === 'completed'
                            ? 'border-green-400'
                            : state === 'unlocked'
                            ? 'border-white/80'
                            : 'border-gray-300'
                        }`}
                        style={{
                          background: state === 'locked'
                            ? '#ccc'
                            : `linear-gradient(135deg, ${style.color}dd, ${style.color}99)`,
                        }}
                      >
                        {state === 'locked' ? '🔒' : style.emoji}
                      </div>

                      {/* Label */}
                      <div className="text-center max-w-[120px]">
                        <p className="text-xs font-bold text-primary leading-tight">{node.subject}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">
                          {node.exerciseCount} thử thách • {node.xpReward} XP
                        </p>
                        {state === 'locked' && (
                          <p className="text-[10px] text-on-surface-variant/80 mt-0.5">🔒 Cần đạt 70% node trước</p>
                        )}
                        {(state === 'completed' || state === 'mastered') && (
                          <p className="text-[10px] text-on-surface-variant mt-0.5">
                            {'⭐'.repeat(stars)} {best}% best
                          </p>
                        )}
                      </div>

                      {/* "START" badge on current node */}
                      {state === 'current' && (
                        <div className="bg-primary text-on-primary text-xs font-black px-4 py-1 rounded-full shadow-md tracking-widest">
                          BẮT ĐẦU!
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}

              {/* End of chapter */}
              <div className="flex flex-col items-center gap-2 py-6 opacity-50">
                <span className="text-4xl">✨</span>
                <p className="text-xs text-on-surface-variant">Hết chương — tiếp tục ở năm sau!</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

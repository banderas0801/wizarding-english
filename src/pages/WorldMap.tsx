import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { useGameStore } from '../store/useGameStore';
import { CurriculumBuilder } from '../services/CurriculumBuilder';

const SESSION_SIZE = 10;

type NodeState = 'locked' | 'current' | 'completed' | 'mastered';

type MapNode = {
  unitId: string;
  chapterId: string;
  chapterTitle: string;
  chapterOrder: number;
  nodeOrder: number;
  nodeLabel: string;
  challengeCount: number;
  xpReward: number;
  prerequisiteNodeId: string | null;
};

const SUBJECT_STYLE: Record<string, { emoji: string; color: string }> = {
  reading: { emoji: '📘', color: '#4a90d9' },
  writing: { emoji: '✍️', color: '#8e44ad' },
  vocabulary: { emoji: '💬', color: '#c0392b' },
  grammar: { emoji: '🪄', color: '#16a085' },
  phonics: { emoji: '🔤', color: '#d35400' },
  math: { emoji: '🔢', color: '#e67e22' },
  science: { emoji: '🔬', color: '#27ae60' },
  general: { emoji: '⭐', color: '#d4af37' },
};

function getNodeProgressKey(node: MapNode): string {
  return `${node.unitId}::node-${node.nodeOrder}`;
}

export default function WorldMap() {
  const navigate = useNavigate();
  const { curriculum, loading } = useCurriculum();
  const { xp, bestScores } = useGameStore();

  const nodes = useMemo(() => {
    if (!curriculum) return [] as MapNode[];

    const out: MapNode[] = [];
    let chapterOrder = 0;

    for (const level of curriculum.levels) {
      for (const subject of level.subjects) {
        for (const unit of subject.units) {
          const exerciseCount = unit.lessons.flatMap((l) => l.exercises).length;
          if (exerciseCount <= 0) continue;

          chapterOrder += 1;
          const nodeCount = Math.max(1, Math.ceil(exerciseCount / SESSION_SIZE));
          const chapterId = unit.id;
          const chapterTitle = `${level.title} • ${subject.name}`;

          for (let nodeOrder = 1; nodeOrder <= nodeCount; nodeOrder += 1) {
            const isFirstNode = nodeOrder === 1;
            const prerequisiteNodeId = isFirstNode
              ? CurriculumBuilder.getPrerequisiteUnitId(curriculum, unit.id)
              : `${unit.id}::node-${nodeOrder - 1}`;

            out.push({
              unitId: unit.id,
              chapterId,
              chapterTitle,
              chapterOrder,
              nodeOrder,
              nodeLabel: `Node ${nodeOrder}`,
              challengeCount: SESSION_SIZE,
              xpReward: SESSION_SIZE * 10,
              prerequisiteNodeId,
            });
          }
        }
      }
    }

    return out;
  }, [curriculum]);

  const chapters = useMemo(() => {
    const byChapter = new Map<string, MapNode[]>();
    for (const node of nodes) {
      if (!byChapter.has(node.chapterId)) byChapter.set(node.chapterId, []);
      byChapter.get(node.chapterId)!.push(node);
    }
    return Array.from(byChapter.values());
  }, [nodes]);

  const nodeState = (node: MapNode): NodeState => {
    const key = getNodeProgressKey(node);
    const score = bestScores[key] ?? 0;
    if (score >= 90) return 'mastered';
    if (score >= 70) return 'completed';
    if (!node.prerequisiteNodeId) return 'current';
    const reqScore = bestScores[node.prerequisiteNodeId] ?? 0;
    return reqScore >= 70 ? 'current' : 'locked';
  };

  const firstCurrentKey = useMemo(() => {
    for (const node of nodes) {
      if (nodeState(node) === 'current') return getNodeProgressKey(node);
    }
    return null;
  }, [nodes, bestScores]);

  return (
    <div
      className="min-h-screen flex flex-col max-w-[430px] mx-auto relative overflow-x-hidden pb-24"
      style={{
        backgroundColor: '#fff8f7',
        backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)',
        backgroundSize: '20px 20px',
      }}
    >
      <header className="sticky top-0 z-40 bg-surface-container-low/95 backdrop-blur border-b border-outline-variant/30 max-w-[430px] mx-auto">
        <div className="flex items-center justify-between px-5 pt-10 pb-3">
          <div>
            <h1 className="font-bold text-xl text-primary tracking-wide">Hogwarts Map</h1>
            <p className="text-xs text-on-surface-variant">Follow the node path, 10 challenges per node</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <span className="text-sm">⭐</span>
            <span className="font-bold text-sm text-primary">{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </header>

      <main className="px-5 pt-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse">auto_fix_high</span>
            <p className="text-on-surface-variant text-sm">Loading map...</p>
          </div>
        )}

        {!loading && chapters.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl">🔒</span>
            <p className="text-on-surface-variant mt-4">No chapters available yet</p>
          </div>
        )}

        {!loading && chapters.length > 0 && (
          <div className="space-y-8 pb-8">
            {chapters.map((chapterNodes) => {
              const chapter = chapterNodes[0];
              const subjectKey = chapter.unitId.split('_')[0] || 'general';
              const style = SUBJECT_STYLE[subjectKey] ?? SUBJECT_STYLE.general;

              return (
                <section key={chapter.chapterId} className="rounded-2xl border border-outline-variant/40 bg-surface-container-low/80 p-4">
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Chapter {chapter.chapterOrder}</p>
                    <h2 className="font-bold text-sm text-primary">{chapter.chapterTitle}</h2>
                  </div>

                  <div className="relative">
                    <div className="absolute left-6 top-8 bottom-8 w-1 rounded-full bg-outline-variant/40" />
                    <div className="space-y-4">
                      {chapterNodes.map((node) => {
                        const key = getNodeProgressKey(node);
                        const state = nodeState(node);
                        const isPrimaryCurrent = state === 'current' && firstCurrentKey === key;
                        const best = bestScores[key] ?? 0;

                        return (
                          <div key={key} className="relative flex items-start gap-3">
                            <button
                              disabled={state === 'locked'}
                              onClick={() =>
                                navigate(
                                  `/stage?unitId=${encodeURIComponent(node.unitId)}&node=${node.nodeOrder}`
                                )
                              }
                              className={`w-12 h-12 mt-1 rounded-full border-4 flex items-center justify-center text-xl shadow-md transition-all ${
                                state === 'locked'
                                  ? 'bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed'
                                  : state === 'mastered'
                                  ? 'border-yellow-300 shadow-[0_0_16px_rgba(212,175,55,0.55)]'
                                  : state === 'completed'
                                  ? 'border-green-400'
                                  : isPrimaryCurrent
                                  ? 'border-primary animate-pulse shadow-[0_0_14px_rgba(116,16,16,0.45)]'
                                  : 'border-white/80'
                              }`}
                              style={{
                                background:
                                  state === 'locked'
                                    ? '#d7d7d7'
                                    : `linear-gradient(135deg, ${style.color}dd, ${style.color}99)`,
                              }}
                            >
                              {state === 'locked' ? '🔒' : style.emoji}
                            </button>

                            <div className="flex-1 rounded-xl bg-white/70 border border-outline-variant/40 p-3">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-sm text-on-surface">{node.nodeLabel}</p>
                                <p className="text-[11px] text-on-surface-variant">
                                  {node.challengeCount} challenges • {node.xpReward} XP
                                </p>
                              </div>
                              <p className="text-[11px] text-on-surface-variant mt-1">
                                {state === 'locked' && 'Locked: complete previous node with >= 70%'}
                                {state === 'current' && 'Ready: start this node now'}
                                {state === 'completed' && `Completed: ${best}%`}
                                {state === 'mastered' && `Mastered: ${best}%`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}


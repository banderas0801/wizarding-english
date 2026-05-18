/**
 * LocationDetail — P0 fix
 * - Load real curriculum units from CurriculumContext based on location slug
 * - Slug mapping: both English (library) and Vietnamese (thu-vien) keys
 * - Each unit card navigates to /stage?unitId=<unit.id> (real challenges)
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useCurriculum } from '../contexts/CurriculumContext'

// ── Unified location metadata (English slug → display info) ─────────────────
// HogwartsMap uses English keys; also accept Vietnamese aliases
const LOCATION_META: Record<string, { title: string; icon: string; desc: string; color: string; subjects: string[] }> = {
  library: {
    title: 'Thư Viện Hogwarts',
    icon: 'menu_book',
    desc: 'Nơi luyện kỹ năng đọc hiểu và ngữ pháp.',
    color: '#162147',
    subjects: ['reading', 'reading comprehension'],
  },
  'thu-vien': {
    title: 'Thư Viện Hogwarts',
    icon: 'menu_book',
    desc: 'Nơi luyện kỹ năng đọc hiểu và ngữ pháp.',
    color: '#162147',
    subjects: ['reading', 'reading comprehension'],
  },
  potions_classroom: {
    title: 'Phòng Thí Nghiệm',
    icon: 'science',
    desc: 'Pha chế ngôn từ — luyện từ vựng và viết.',
    color: '#234f32',
    subjects: ['writing', 'vocabulary'],
  },
  'rung-cam': {
    title: 'Rừng Cấm',
    icon: 'park',
    desc: 'Từ vựng nâng cao ẩn trong rừng huyền bí.',
    color: '#234f32',
    subjects: ['writing', 'vocabulary'],
  },
  great_hall: {
    title: 'Đại Sảnh Đường',
    icon: 'celebration',
    desc: 'Luyện ngữ pháp và hội thoại hàng ngày.',
    color: '#741010',
    subjects: ['grammar', 'speaking'],
  },
  'dai-sanh-duong': {
    title: 'Đại Sảnh Đường',
    icon: 'celebration',
    desc: 'Luyện ngữ pháp và hội thoại hàng ngày.',
    color: '#741010',
    subjects: ['grammar', 'speaking'],
  },
  astronomy_tower: {
    title: 'Tháp Thiên Văn',
    icon: 'nights_stay',
    desc: 'Khám phá ngôn ngữ qua những bài thơ và câu đố.',
    color: '#1a1040',
    subjects: ['poetry', 'riddle', 'language arts'],
  },
  'than-chu': {
    title: 'Phòng Thần Chú',
    icon: 'wand_stars',
    desc: 'Luyện phát âm và nghe nói qua câu thần chú.',
    color: '#510003',
    subjects: ['phonics', 'listening'],
  },
  hospital_wing: {
    title: 'Phòng Y Tế',
    icon: 'local_hospital',
    desc: 'Ôn tập và phục hồi kiến thức.',
    color: '#2d5016',
    subjects: ['review', 'practice'],
  },
}

// Difficulty badge
function DiffBadge({ count }: { count: number }) {
  const stars = count >= 10 ? 3 : count >= 5 ? 2 : 1
  return (
    <span className="text-yellow-400 text-xs">{'⭐'.repeat(stars)}</span>
  )
}

export default function LocationDetail() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { curriculum, loading } = useCurriculum()

  const slug = name ?? ''
  const meta = LOCATION_META[slug]

  // Find real units matching this location's subjects
  const units = (() => {
    if (!curriculum || !meta) return []
    const found: { id: string; title: string; levelTitle: string; exerciseCount: number }[] = []
    for (const level of curriculum.levels) {
      for (const subject of level.subjects) {
        const subjectName = subject.name.toLowerCase()
        const matches = meta.subjects.some(s => subjectName.includes(s))
        if (!matches) continue
        for (const unit of subject.units) {
          const exerciseCount = unit.lessons.reduce((acc, l) => acc + l.exercises.length, 0)
          if (exerciseCount < 3) continue // skip near-empty units
          found.push({ id: unit.id, title: unit.title, levelTitle: level.title, exerciseCount })
        }
      }
    }
    return found.slice(0, 20) // cap at 20 for perf
  })()

  // ── Fallback for unknown slugs ─────────────────────────────────────────────
  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0f14] px-6 gap-4 text-center">
        <span className="text-5xl">🔮</span>
        <p className="text-white/60">Địa điểm không tìm thấy: <code className="text-yellow-400">{slug}</code></p>
        <button onClick={() => navigate(-1)} className="text-primary text-sm">← Quay lại</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #1a0f14 0%, #0d0d1a 100%)' }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 max-w-[430px] mx-auto px-4 flex items-center gap-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 12px)', paddingBottom: '12px', background: 'rgba(26,15,20,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-white/70 text-2xl">arrow_back</button>
        <h1 className="text-white font-bold text-base flex-1">{meta.title}</h1>
        <span className="material-symbols-outlined text-2xl" style={{ color: '#d4af37' }}>{meta.icon}</span>
      </header>

      {/* Hero */}
      <div className="pt-[80px] px-4 pb-4">
        <div className="rounded-2xl overflow-hidden shadow-xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${meta.color}dd, ${meta.color}66)`, border: '1px solid rgba(212,175,55,0.2)' }}>
          <span className="material-symbols-outlined text-6xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>{meta.icon}</span>
          <p className="text-white/80 text-sm mt-3 leading-relaxed">{meta.desc}</p>
        </div>
      </div>

      {/* Units list */}
      <main className="flex-1 px-4 pb-28 space-y-3">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest px-1">
          {loading ? 'Đang tải...' : `${units.length} thử thách`}
        </p>

        {loading && (
          <div className="flex justify-center py-10">
            <span className="material-symbols-outlined text-4xl text-primary animate-pulse">auto_fix_high</span>
          </div>
        )}

        {!loading && units.length === 0 && (
          <div className="text-center py-10 text-white/40">
            <span className="text-4xl">📚</span>
            <p className="mt-2 text-sm">Chưa có bài học cho khu vực này</p>
          </div>
        )}

        {units.map((unit, i) => (
          <button
            key={unit.id}
            onClick={() => navigate(`/stage?unitId=${unit.id}`)}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
          >
            {/* Node number */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${meta.color}, #d4af37)` }}>
              <span className="text-white">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{unit.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <DiffBadge count={unit.exerciseCount} />
                <span className="text-white/40 text-xs">{unit.exerciseCount} câu • {unit.levelTitle}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/30 text-xl">chevron_right</span>
          </button>
        ))}
      </main>
    </div>
  )
}

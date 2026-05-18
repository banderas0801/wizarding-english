/**
 * LocationDetail â€” P0 fix
 * - Load real curriculum units from CurriculumContext based on location slug
 * - Slug mapping: both English (library) and Vietnamese (thu-vien) keys
 * - Each unit card navigates to /stage?unitId=<unit.id> (real challenges)
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useCurriculum } from '../contexts/CurriculumContext'

// â”€â”€ Unified location metadata (English slug â†’ display info) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HogwartsMap uses English keys; also accept Vietnamese aliases
const LOCATION_META: Record<string, { title: string; icon: string; desc: string; color: string; subjects: string[] }> = {
  library: {
    title: 'ThÆ° Viá»‡n Hogwarts',
    icon: 'menu_book',
    desc: 'NÆ¡i luyá»‡n ká»¹ nÄƒng Ä‘á»c hiá»ƒu vÃ  ngá»¯ phÃ¡p.',
    color: '#162147',
    subjects: ['reading', 'reading comprehension'],
  },
  'thu-vien': {
    title: 'ThÆ° Viá»‡n Hogwarts',
    icon: 'menu_book',
    desc: 'NÆ¡i luyá»‡n ká»¹ nÄƒng Ä‘á»c hiá»ƒu vÃ  ngá»¯ phÃ¡p.',
    color: '#162147',
    subjects: ['reading', 'reading comprehension'],
  },
  potions_classroom: {
    title: 'PhÃ²ng ThÃ­ Nghiá»‡m',
    icon: 'science',
    desc: 'Pha cháº¿ ngÃ´n tá»« â€” luyá»‡n tá»« vá»±ng vÃ  viáº¿t.',
    color: '#234f32',
    subjects: ['writing', 'vocabulary'],
  },
  'rung-cam': {
    title: 'Rá»«ng Cáº¥m',
    icon: 'park',
    desc: 'Tá»« vá»±ng nÃ¢ng cao áº©n trong rá»«ng huyá»n bÃ­.',
    color: '#234f32',
    subjects: ['writing', 'vocabulary'],
  },
  great_hall: {
    title: 'Äáº¡i Sáº£nh ÄÆ°á»ng',
    icon: 'celebration',
    desc: 'Luyá»‡n ngá»¯ phÃ¡p vÃ  há»™i thoáº¡i hÃ ng ngÃ y.',
    color: '#741010',
    subjects: ['grammar', 'speaking'],
  },
  'dai-sanh-duong': {
    title: 'Äáº¡i Sáº£nh ÄÆ°á»ng',
    icon: 'celebration',
    desc: 'Luyá»‡n ngá»¯ phÃ¡p vÃ  há»™i thoáº¡i hÃ ng ngÃ y.',
    color: '#741010',
    subjects: ['grammar', 'speaking'],
  },
  astronomy_tower: {
    title: 'ThÃ¡p ThiÃªn VÄƒn',
    icon: 'nights_stay',
    desc: 'KhÃ¡m phÃ¡ ngÃ´n ngá»¯ qua nhá»¯ng bÃ i thÆ¡ vÃ  cÃ¢u Ä‘á»‘.',
    color: '#1a1040',
    subjects: ['poetry', 'riddle', 'language arts'],
  },
  'than-chu': {
    title: 'PhÃ²ng Tháº§n ChÃº',
    icon: 'wand_stars',
    desc: 'Luyá»‡n phÃ¡t Ã¢m vÃ  nghe nÃ³i qua cÃ¢u tháº§n chÃº.',
    color: '#510003',
    subjects: ['phonics', 'listening'],
  },
  hospital_wing: {
    title: 'Phòng Y T?',
    icon: 'local_hospital',
    desc: 'Ôn t?p và ph?c h?i ki?n th?c.',
    color: '#2d5016',
    subjects: ['review', 'practice'],
  },
  hospital: {
    title: 'Phòng Y T?',
    icon: 'local_hospital',
    desc: 'Ôn t?p và ph?c h?i ki?n th?c.',
    color: '#2d5016',
    subjects: ['review', 'practice'],
  },
  'ruong-do': {
    title: 'Ruong Ð?',
    icon: 'inventory_2',
    desc: 'Kho ôn t?p v?i nhi?m v? t?ng h?p.',
    color: '#5f4b32',
    subjects: ['review', 'practice', 'vocabulary', 'grammar'],
  },
}

// Difficulty badge
function DiffBadge({ count }: { count: number }) {
  const stars = count >= 10 ? 3 : count >= 5 ? 2 : 1
  return (
    <span className="text-yellow-400 text-xs">{'â­'.repeat(stars)}</span>
  )
}

export default function LocationDetail() {
  const { locationKey } = useParams<{ locationKey: string }>()
  const navigate = useNavigate()
  const { curriculum, loading } = useCurriculum()

  const slug = locationKey ?? ''
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

  // â”€â”€ Fallback for unknown slugs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0f14] px-6 gap-4 text-center">
        <span className="text-5xl">ðŸ”®</span>
        <p className="text-white/60">Äá»‹a Ä‘iá»ƒm khÃ´ng tÃ¬m tháº¥y: <code className="text-yellow-400">{slug}</code></p>
        <button onClick={() => navigate(-1)} className="text-primary text-sm">â† Quay láº¡i</button>
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
          {loading ? 'Äang táº£i...' : `${units.length} thá»­ thÃ¡ch`}
        </p>

        {loading && (
          <div className="flex justify-center py-10">
            <span className="material-symbols-outlined text-4xl text-primary animate-pulse">auto_fix_high</span>
          </div>
        )}

        {!loading && units.length === 0 && (
          <div className="text-center py-10 text-white/40">
            <span className="text-4xl">ðŸ“š</span>
            <p className="mt-2 text-sm">ChÆ°a cÃ³ bÃ i há»c cho khu vá»±c nÃ y</p>
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
                <span className="text-white/40 text-xs">{unit.exerciseCount} cÃ¢u â€¢ {unit.levelTitle}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/30 text-xl">chevron_right</span>
          </button>
        ))}
      </main>
    </div>
  )
}



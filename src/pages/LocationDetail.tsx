import { useNavigate, useParams } from 'react-router-dom'
import { TopAppBar } from '../components/common/TopAppBar'

const locations: Record<string, { title: string; icon: string; desc: string; color: string }> = {
  'dai-sanh-duong': { title: 'Đại Sảnh Đường', icon: 'restaurant', desc: 'Nơi học sinh Hogwarts dùng bữa và học từ vựng về ẩm thực ma thuật.', color: '#741010' },
  'thu-vien': { title: 'Thư Viện', icon: 'menu_book', desc: 'Kho tàng tri thức vô tận — nơi học ngữ pháp và cấu trúc câu.', color: '#162147' },
  'rung-cam': { title: 'Rừng Cấm', icon: 'park', desc: 'Vùng đất huyền bí ẩn chứa sinh vật ma thuật và từ vựng nâng cao.', color: '#234f32' },
  'than-chu': { title: 'Thần Chú', icon: 'wand_stars', desc: 'Luyện tập phát âm và kỹ năng nghe nói qua các câu thần chú.', color: '#510003' },
  'ruong-do': { title: 'Rương Đồ', icon: 'inventory_2', desc: 'Kho trang bị của bạn — xem lại các bài đã học và huy hiệu đã đạt.', color: '#3b6848' },
}

export default function LocationDetail() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const loc = locations[name ?? ''] ?? { title: name, icon: 'place', desc: 'Đang tải...', color: '#510003' }

  return (
    <div className="relative w-full h-full bg-background text-on-surface overflow-hidden flex flex-col">

      <TopAppBar title={loc.title} showBack onBackPress={() => navigate(-1)} />

      {/* Content */}
      <main className="flex-1 parchment-texture overflow-y-auto p-6 flex flex-col gap-4 pt-20">

        {/* Hero Card */}
        <div className="rounded-2xl overflow-hidden shadow-xl"
          style={{ background: `linear-gradient(135deg, ${loc.color}ee, ${loc.color}99)` }}>
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1", fontSize: '64px' }}>
              {loc.icon}
            </span>
            <h2 className="text-white text-2xl font-bold italic">{loc.title}</h2>
            <p className="text-white/80 text-sm leading-relaxed">{loc.desc}</p>
          </div>
        </div>

        {/* Lessons List - MVP Data */}
        {['Bài 1: Từ vựng cơ bản', 'Bài 2: Câu ghép đơn giản', 'Bài 3: Thực hành hội thoại'].map((lesson, i) => (
          <button
            key={i}
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl p-4 shadow-md flex items-center gap-4 active:scale-95 transition-transform duration-100 touch-manipulation text-left cursor-pointer"
            onTouchStart={() => {}}
            onClick={() => navigate(`/quest/1-daily-warm-ups-reading-grade-1-p100`)}
          >
            <div className="w-10 h-10 rounded-full bg-primary wax-seal flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="font-label-md text-label-md text-primary font-semibold">{lesson}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-[#d4af37]" style={{ width: `${(3 - i) * 33}%` }}></div>
                </div>
                <span className="text-xs text-on-surface-variant">{(3 - i) * 33}%</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary">chevron_right</span>
          </button>
        ))}
      </main>
    </div>
  )
}

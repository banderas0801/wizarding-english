import { useNavigate } from 'react-router-dom'
import { useCurriculum } from '../contexts/CurriculumContext'

export default function Portal() {
  const navigate = useNavigate()
  const { getTotalLessons, getTotalXp, getCurrentProgressionLevel } = useCurriculum()

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden parchment-texture min-h-[100dvh] pb-[120px]">
      {/* Top AppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[24px] pt-[44px] pb-4 bg-surface dark:bg-inverse-surface border-b border-outline-variant/30 shadow-[0_2px_10px_rgba(60,47,47,0.1)]">
        <div className="flex items-center gap-4">
          <button className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full material-symbols-outlined text-primary cursor-pointer active:scale-95 active:brightness-90 touch-manipulation hover:bg-surface-container">menu</button>
          <h1 className="font-headline-md text-xl italic tracking-tight text-primary">Từ Điển Huyền Bí</h1>
        </div>
        <button className="w-[48px] h-[48px] rounded-full bg-surface-variant overflow-hidden border-2 border-primary/20 hover:border-primary active:scale-95 active:brightness-90 transition-all cursor-pointer">
          <img alt="Ancient Grimoire Profile Icon" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2wRNNfea2WbxRgqCtkdsbOoeYY7KEV1IY8VgUR3t1z3MVKAyBBoK3mRkvMGm_g0hDmRsHsb1kn_IT_rS8T1Y4FKf5gJ7wr5GzVs3NhU3VjMGM_ueIfZDZ0E-pqfDn5K-Z9WLKdgYBTD3_GaaGGVb9PnxqLhcjG-DP1bxuvJyi0QNgObE8Vu2rZJiv3f7EhY2B2r41Qft6CKkQkcVgXgLK-y_KE8yD4jo7j0RUN8TPlFkXaig-xb1XUIqL_5UirLvA24a75YCOrY4"/>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full mx-auto pt-[120px] px-[24px] relative z-10">
        {/* Header & Instructions */}
        <div className="text-center mb-8 space-y-4">
          <h2 className="font-display-lg-mobile text-primary gold-foil-text drop-shadow-sm text-3xl font-bold">Tổng Kho Giao Diện Phù Thủy</h2>
          <div className="max-w-2xl mx-auto p-6 bg-surface-container-low border border-outline-variant/50 rounded-xl relative mt-8">
            <span className="material-symbols-outlined absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary p-2 rounded-full wax-seal">auto_awesome</span>
            <p className="font-body-lg text-on-surface-variant italic pt-4">
              "Chào mừng Hiệu trưởng đến với kho lưu trữ vạn năng của Arcane Lexicon. Hãy chạm vào các biểu tượng ấn chương bên dưới để du hành qua từng ngóc ngách của học viện phép thuật."
            </p>
          </div>
        </div>

        {/* Progress Dashboard */}
        <section className="mb-12 grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-4 text-center">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Progress</p>
            <p className="text-2xl font-bold text-primary mt-1">{getCurrentProgressionLevel()}</p>
            <p className="text-xs text-on-surface-variant">Level / 40</p>
          </div>
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Lessons</p>
            <p className="text-2xl font-bold text-secondary mt-1">{getTotalLessons()}</p>
            <p className="text-xs text-on-surface-variant">Available</p>
          </div>
          <div className="bg-gradient-to-br from-tertiary/20 to-tertiary/10 border border-tertiary/30 rounded-xl p-4 text-center">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Total XP</p>
            <p className="text-2xl font-bold text-tertiary mt-1">{getTotalXp()}</p>
            <p className="text-xs text-on-surface-variant">Points</p>
          </div>
        </section>

        {/* Bento Grid Layout for Categories */}
        <div className="flex flex-col gap-12 pb-16">

          {/* 1. Lớp Nền tảng (Core Shell) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary text-3xl">castle</span>
              <h3 className="font-headline-md text-primary font-bold">Core Shell (Lớp Nền tảng)</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div onClick={() => navigate('/select-language')} className="group bg-surface-container border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all deckle-edge magical-glow cursor-pointer touch-manipulation active:scale-95">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary-container text-4xl">language</span>
                  <span className="text-caption font-label-md text-on-surface-variant bg-outline-variant/20 px-2 py-1 rounded">ID: CORE-01</span>
                </div>
                <h4 className="font-headline-sm text-primary mb-2 font-bold">Language Selection</h4>
                <p className="font-body-md text-on-surface-variant">Chọn ngôn ngữ để đánh thức sức mạnh cổ xưa của văn tự.</p>
              </div>
              <button onClick={() => navigate('/sorting')} className="group w-full text-left bg-surface-container border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all deckle-edge magical-glow cursor-pointer touch-manipulation active:scale-95">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                  <span className="text-caption font-label-md text-on-surface-variant bg-outline-variant/20 px-2 py-1 rounded">ID: CORE-02</span>
                </div>
                <h4 className="font-headline-sm text-primary mb-2 font-bold">Sorting Ceremony</h4>
                <p className="font-body-md text-on-surface-variant">Chiếc nón phân loại sẽ định đoạt số mệnh và nhà của bạn.</p>
              </button>
              <div onClick={() => navigate('/')} className="group bg-surface-container border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all deckle-edge magical-glow cursor-pointer touch-manipulation active:scale-95">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary-container text-4xl">map</span>
                  <span className="text-caption font-label-md text-on-surface-variant bg-outline-variant/20 px-2 py-1 rounded">ID: CORE-03</span>
                </div>
                <h4 className="font-headline-sm text-primary mb-2 font-bold">Hogwarts Map</h4>
                <p className="font-body-md text-on-surface-variant">Bản đồ tương tác dẫn lối qua các hành lang bí ẩn của học viện.</p>
              </div>
            </div>
          </section>

          {/* 2. Lớp Học tập (Learning Path) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
              <h3 className="font-headline-md text-primary font-bold">Learning Path (Lớp Học tập)</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div onClick={() => navigate('/curriculum')} className="bg-surface-container-high border-2 border-primary/10 p-6 rounded-xl shadow-sm deckle-edge group cursor-pointer hover:bg-surface-container transition-colors touch-manipulation active:scale-95">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center wax-seal shrink-0">
                    <span className="material-symbols-outlined text-on-primary text-3xl">school</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-primary font-bold">Curriculum Center</h4>
                    <p className="font-caption text-on-surface-variant mt-1">Lộ trình tu luyện từ tập sự đến đại pháp sư.</p>
                  </div>
                </div>
              </div>
              <div onClick={() => navigate('/location/thu-vien')} className="bg-surface-container-high border-2 border-primary/10 p-6 rounded-xl shadow-sm deckle-edge group cursor-pointer hover:bg-surface-container transition-colors touch-manipulation active:scale-95">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center wax-seal shrink-0">
                    <span className="material-symbols-outlined text-on-primary text-3xl">local_library</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-primary font-bold">The Library</h4>
                    <p className="font-caption text-on-surface-variant mt-1">Nơi lưu giữ hàng ngàn bí thư và phép thuật cổ.</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 relative overflow-hidden group touch-manipulation">
                <div className="relative z-10">
                  <h4 className="font-headline-md text-primary mb-4 font-bold">Specialized Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-xs border border-secondary/20 shadow-sm">🧪 Potions</span>
                    <span className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-xs border border-secondary/20 shadow-sm">🛡️ D.A.D.A</span>
                    <span className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-xs border border-secondary/20 shadow-sm">🌿 Herbology</span>
                    <span onClick={() => navigate('/location/than-chu')} className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-xs border border-secondary/20 shadow-sm active:scale-95 cursor-pointer">✨ Charms</span>
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[100px]">history_edu</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Lớp Trò chơi (Interactive Games) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary text-3xl">swords</span>
              <h3 className="font-headline-md text-primary font-bold">Interactive Games</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div onClick={() => navigate('/quest/1-daily-warm-ups-reading-grade-1-p100')} className="bg-primary-container text-on-primary-container p-6 rounded-xl border-l-8 border-primary shadow-lg hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden touch-manipulation active:scale-95">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-headline-sm font-bold">Spell Duel</span>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div className="mt-2 text-on-primary-container/80 text-caption italic">Thách đấu cùng phù thủy khác.</div>
              </div>
              <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant/40 shadow-sm hover:translate-x-2 transition-transform cursor-pointer flex items-center justify-between touch-manipulation active:scale-95">
                <span className="font-headline-sm text-primary font-bold">Quidditch Cup</span>
                <span className="material-symbols-outlined text-primary">sports_handball</span>
              </div>
              <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant/40 shadow-sm hover:translate-x-2 transition-transform cursor-pointer flex items-center justify-between touch-manipulation active:scale-95">
                <span className="font-headline-sm text-primary font-bold">Triwizard Tourney</span>
                <span className="material-symbols-outlined text-primary">trophy</span>
              </div>
            </div>
          </section>

          {/* 4. Lớp Thành tựu (Gamification) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary text-3xl">military_tech</span>
              <h3 className="font-headline-md text-primary font-bold">Gamification (Thành tựu)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm group touch-manipulation active:scale-95">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center wax-seal group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">storefront</span>
                </div>
                <span className="font-label-md text-center px-2">Diagon Alley</span>
              </div>
              <div onClick={() => navigate('/location/ruong-do')} className="aspect-square bg-surface border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm group touch-manipulation active:scale-95">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center wax-seal group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">luggage</span>
                </div>
                <span className="font-label-md text-center px-2">Personal Trunk</span>
              </div>
              <div className="aspect-square bg-surface border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm group touch-manipulation active:scale-95">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center wax-seal group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                </div>
                <span className="font-label-md text-center px-2">Daily Quests</span>
              </div>
              <div onClick={() => navigate('/victory')} className="aspect-square bg-surface border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-sm group touch-manipulation active:scale-95">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center wax-seal group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <span className="font-label-md text-center px-2">Victory Hub</span>
              </div>
            </div>
          </section>

          {/* 5. Lớp Bổ trợ (Technical & Support) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary text-3xl">settings</span>
              <h3 className="font-headline-md text-primary font-bold">Technical & Support</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center p-4 bg-surface-variant/30 border border-outline/20 rounded-lg hover:bg-surface-variant transition-colors cursor-pointer touch-manipulation active:scale-95">
                <span className="material-symbols-outlined text-primary mr-4">terminal</span>
                <div>
                  <p className="font-label-md text-primary font-bold">Technical Spec</p>
                  <p className="text-caption text-on-surface-variant">Chi tiết cấu trúc hệ thống.</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-surface-variant/30 border border-outline/20 rounded-lg hover:bg-surface-variant transition-colors cursor-pointer touch-manipulation active:scale-95">
                <span className="material-symbols-outlined text-primary mr-4">schema</span>
                <div>
                  <p className="font-label-md text-primary font-bold">JSON Schema</p>
                  <p className="text-caption text-on-surface-variant">Bản thảo mã nguồn các thực thể.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface/95 dark:bg-inverse-surface/95 backdrop-blur-md pb-[34px] pt-3 border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(60,47,47,0.08)] rounded-t-xl">
        <button onClick={() => navigate('/location/thu-vien')} className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-on-surface-variant opacity-70 hover:opacity-100 transition-all cursor-pointer touch-manipulation active:scale-95 active:brightness-90">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-md text-xs mt-1">Curriculum</span>
        </button>
        <button onClick={() => navigate('/location/than-chu')} className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-on-surface-variant opacity-70 hover:opacity-100 transition-all cursor-pointer touch-manipulation active:scale-95 active:brightness-90">
          <span className="material-symbols-outlined">sports_esports</span>
          <span className="font-label-md text-xs mt-1">Games</span>
        </button>
        {/* Active: Sitemap (Project Hub) */}
        <button className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-primary font-bold scale-110 transition-all cursor-pointer touch-manipulation">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
          <span className="font-label-md text-xs mt-1">Sitemap</span>
        </button>
        <button onClick={() => navigate('/victory')} className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] text-on-surface-variant opacity-70 hover:opacity-100 transition-all cursor-pointer touch-manipulation active:scale-95 active:brightness-90">
          <span className="material-symbols-outlined">military_tech</span>
          <span className="font-label-md text-xs mt-1">Rewards</span>
        </button>
      </nav>

      {/* Floating Action Button */}
      <button onClick={() => navigate('/')} className="fixed bottom-[100px] right-[24px] w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg wax-seal flex items-center justify-center active:scale-95 active:brightness-90 group touch-manipulation z-50">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">map</span>
      </button>
    </div>
  )
}

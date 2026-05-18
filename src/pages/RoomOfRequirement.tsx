import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'

export default function RoomOfRequirement() {
  const navigate = useNavigate()
  const { addXp } = useGameStore()
  const [text, setText] = useState('')

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length

  const handleSubmit = () => {
    if (wordCount < 10) return; // Prevent empty submission
    addXp(400)
    navigate('/victory')
  }

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed h-[100dvh] overflow-y-auto overflow-x-hidden relative pb-32">
      <style>{`
        .parchment-texture {
            background-image: radial-gradient(circle at 50% 50%, rgba(255, 248, 247, 0.5) 0%, rgba(234, 213, 213, 0.3) 100%);
            position: relative;
        }
        .deckle-edge {
            clip-path: polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 95% 98%, 92% 100%, 88% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%);
        }
        .gold-foil {
            background: linear-gradient(135deg, #D4AF37 0%, #F1D382 50%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .magical-glow {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }
        .moving-shadows {
            animation: shadowShift 10s infinite alternate ease-in-out;
        }
        @keyframes shadowShift {
            from { text-shadow: 10px 10px 20px rgba(60, 47, 47, 0.1); }
            to { text-shadow: -10px 10px 30px rgba(60, 47, 47, 0.2); }
        }
        .wax-seal {
            box-shadow: inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2), 0 4px 8px rgba(65, 0, 2, 0.4);
        }
      `}</style>

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full max-w-[390px] z-50 flex justify-between items-center px-6 h-16 bg-surface dark:bg-inverse-surface border-b border-outline-variant/30 dark:border-outline/20 shadow-[0_2px_10px_rgba(60,47,47,0.1)]">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-primary dark:text-primary-fixed active:scale-95 transition-transform duration-200" data-icon="arrow_back">arrow_back</button>
        </div>
        <h1 className="font-headline-md text-xl text-primary dark:text-primary-fixed italic tracking-tight">Tử Điển Huyền Bí</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-high">
          <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn-RFJFzaLVJAi7C8matSyqW6HSxMq0mRDTfrrB231jcXVE2WppkzbaySVNg9iJugMgJrN0iPJ6pR0v4zIeA7OfDim-r35hRwgzT9FeFFIYwBOsfZx4vNDAeNaThWvUQIt3NtmpysHadMeS8tvgIqgSMg2kdGdSk7pE1WkGUPhFFU5ydvMfUibC0kleC4I2B87kRdqQS4NBELpKLnUYmoiOeVI7Z6y8ewCmWxoNBNJaewZIw8_kmDfalSOogjZHOWeK11di9s5wMI"/>
        </div>
      </header>

      <main className="pt-24 pb-8 px-6 max-w-[390px] mx-auto">
        {/* Room of Requirement Header Section */}
        <section className="mb-4 text-center relative overflow-hidden py-10">
          <div className="absolute inset-0 moving-shadows pointer-events-none opacity-30">
            <span className="material-symbols-outlined text-[120px] absolute -top-10 -left-10 text-outline">auto_awesome</span>
            <span className="material-symbols-outlined text-[150px] absolute -bottom-10 -right-10 text-outline">castle</span>
          </div>
          <h2 className="font-display-lg-mobile text-3xl text-primary mb-2">Phòng Cần Thiết</h2>
          <p className="font-body-lg text-lg text-on-surface-variant">Nơi không gian uốn mình theo ý chí của kẻ tìm kiếm. Hôm nay, căn phòng mời gọi sự suy ngẫm sâu sắc.</p>
        </section>

        <div className="flex flex-col gap-6 items-start">
          {/* Left Side: Professor's Prompt */}
          <aside className="w-full space-y-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 relative shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <div>
                  <p className="font-label-md text-sm text-primary">Giáo Sư Flitwick</p>
                  <p className="font-caption text-xs text-on-surface-variant">Bậc Thầy Bùa Chú</p>
                </div>
              </div>
              <div className="relative italic font-body-md text-base text-on-surface py-2 border-l-2 border-primary-container pl-4">
                "Lựa chọn một câu thần chú không chỉ là về sức mạnh, mà là về sự phù hợp hoàn cảnh. Tại sao một pháp sư khôn ngoan lại chọn Wingardium Leviosa thay vì Accio khi đối mặt với một hòm gỗ nặng nề?"
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-xs rounded-full font-label-md">Tư Duy Phản Biện</span>
                <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs rounded-full font-label-md">+50 Mana</span>
              </div>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 shadow-sm">
              <h3 className="font-headline-sm text-lg text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>
                Ghi Chép Gần Đây
              </h3>
              <ul className="space-y-2">
                <li className="p-2 border-b border-outline-variant/20 flex justify-between items-center">
                  <span className="font-body-md text-on-surface-variant">Lưỡng Tính của Ánh Sáng</span>
                  <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                </li>
                <li className="p-2 border-b border-outline-variant/20 flex justify-between items-center">
                  <span className="font-body-md text-on-surface-variant">Đạo đức trong Độc Dược</span>
                  <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Center: The Writing Canvas */}
          <section className="w-full">
            <div className="parchment-texture deckle-edge bg-surface p-6 shadow-xl border border-outline-variant/40 min-h-[500px] flex flex-col">
              <div className="flex justify-center mb-6 relative">
                <div className="relative z-10 animate-bounce">
                  <span className="material-symbols-outlined text-5xl gold-foil" style={{ fontVariationSettings: "'FILL' 0" }}>edit_note</span>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-on-surface-variant/20 blur-md rounded-full"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="mb-4">
                  <h2 className="font-headline-sm text-xl text-primary text-center mb-2">Báo Cáo Thần Chú: Trọng Lực & Di Chuyển</h2>
                  <div className="h-px w-16 bg-primary/30 mx-auto mb-4"></div>
                </div>
                <div className="relative flex-grow">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full min-h-[250px] bg-transparent border-none outline-none focus:ring-0 font-body-lg text-lg leading-loose resize-none text-on-surface placeholder:text-on-surface-variant/40"
                    placeholder="Viết những suy luận của bạn tại đây (ít nhất 10 từ)..."
                  ></textarea>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </div>
                
                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-on-surface-variant italic font-body-md">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>ink_highlighter</span>
                    <span>Mực đang chảy... {wordCount} từ</span>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className={`wax-seal px-8 py-3 w-full rounded-full font-headline-sm flex justify-center items-center gap-2 transition-all group ${wordCount >= 10 ? 'bg-primary text-on-primary hover:scale-105 active:scale-95' : 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed'}`}
                  >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_fix_high</span>
                    Niêm Phong & Gửi
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-40 shadow-[0_0_8px_#D4AF37]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-60 shadow-[0_0_6px_#D4AF37]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] opacity-30 shadow-[0_0_10px_#D4AF37]"></div>
            </div>
          </section>
        </div>
      </main>

      {/* Visual Polish: Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(60,47,47,0.05)] z-[100]"></div>
    </div>
  )
}

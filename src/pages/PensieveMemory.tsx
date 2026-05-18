import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'

export default function PensieveMemory() {
  const navigate = useNavigate()
  const { addXp, addGold } = useGameStore()
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(75)

  const handleRecord = () => {
    if (isRecording) return
    setIsRecording(true)
    
    // Simulate recording progress and success
    let currentProgress = 75
    const interval = setInterval(() => {
      currentProgress += 5
      if (currentProgress >= 100) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          addXp(300)
          addGold(100)
          navigate('/victory')
        }, 1500)
      } else {
        setProgress(currentProgress)
      }
    }, 200)
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      <style>{`
        .pensieve-gradient {
            background: radial-gradient(circle at center, #dce1ff 0%, #bac5f4 40%, #162147 100%);
        }
        .glass-morphism {
            backdrop-filter: blur(12px);
            background: rgba(255, 248, 247, 0.7);
        }
        .shimmer-gold {
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
            background-size: 200% 100%;
        }
        .waveform-bar {
            animation: pulse-height 1.5s ease-in-out infinite;
        }
        @keyframes pulse-height {
            0%, 100% { height: 20%; }
            50% { height: 80%; }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-surface dark:bg-inverse-surface border-b border-outline-variant/30 shadow-[0_2px_10px_rgba(60,47,47,0.1)]">
        <button onClick={() => navigate('/')} className="text-primary active:scale-95 transition-transform duration-200">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-xl md:text-2xl text-primary italic tracking-tight">Từ Điển Huyền Bí</h1>
        <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-outline-variant">
          <img alt="Ancient Grimoire Profile Icon" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGJiIshOXFjer7vtIKqginp_Tl48SBJ8h5RnUpZ1jO3myqclpE4wAp9EYzQrj7P1S2j2ijK3vDMnOjEM29N-I4bUqFzXGFB-etP1DCJIlhEi3PqyfaO48EkWeORVWBTl__yIPH8qDIYv0rPewschBitai93YbxNa3-TfmTBPW5sze10c0MlFo_3Q4FgSCARiLz95ElGrURxvNcWjH4xc44_7WGktjFpT9h0MYbydZj39oXKvOzES3SOV_-7TjcApfgnu0CqPNdGHE"/>
        </div>
      </header>
      
      <main className="pt-20 px-6 max-w-4xl mx-auto space-y-4">
        {/* The Pensieve Section */}
        <section className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[21/9] shadow-xl border border-outline-variant/20">
          <div className="absolute inset-0 pensieve-gradient"></div>
          {/* Swirling silver memory effect overlay */}
          <div className={`absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent ${isRecording ? 'animate-pulse' : ''}`}></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
            <span className="material-symbols-outlined text-primary-fixed-dim text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h2 className="font-headline-md text-white mb-4 drop-shadow-md">Ký Ức Pensieve</h2>
            {/* Floating Memory Bubbles */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Bubble 1 */}
              <button className="group relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/50 overflow-hidden glass-morphism hover:scale-110 hover:border-white transition-all duration-300 shadow-lg">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Memory" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Zqookt1s7sc1XjfWK7rKpdSRsuzv28iHe4fhj22Lnth3ZZmkwwLW5QaimiaaKelbKvq_UFKxyMwwW5MVBlzCmMOvctGiTAkNVYalYpYm9DPkClJR07aiPzdGTNmIAYEVveYYvCsG9KjFdjgpZjtgvzb8KZFB7MFWSV_o4Skia9gyzGAwGPEYkcr7EpLDnD-_Y1OiEX7YrsFI-rFwUxlMz-Mepg103h9qdk9qgMbpYGuTql3VNnQvaYCsQaK_qenTBuW2-LXfmKA"/>
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <p className="mt-2 font-label-md text-white text-caption drop-shadow">The Sorting Hat</p>
              </button>
              {/* Bubble 2 (Active) */}
              <button className="group relative">
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary-fixed overflow-hidden ring-4 ring-primary-fixed/30 shadow-[0_0_20px_rgba(212,175,55,0.6)] ${isRecording ? 'scale-110' : ''} transition-all`}>
                  <img className="w-full h-full object-cover" alt="Memory" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Z6aXwPk3taIwi2RmizedRIIqmH_Aly7T7jG7cHx-ClgbmUR3_bTP8bY0JxbEQAtz7nLJlt1PZqVX5JL0-inhjDu5NkJYFiZtpBTOSp1xVrroyev_9EMJaR9gqhc-OlSwO5YQ-QJviyVeSsEP4ztnsIU4pQMQ-Ff_84mSw0v0ddguerqICjnaoouzICOCxDwTspaDTCRcJqYxUTqODdlzrI5bYmE5seGEuk1yM3qP4_KneOO6djI-rrQPSwv5wiFTvgbHZj_y0Wc"/>
                  <div className="absolute inset-0 bg-primary/10"></div>
                </div>
                <p className="mt-2 font-label-md text-white font-bold drop-shadow">Meeting Hagrid</p>
                <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1 border border-white">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                </div>
              </button>
              {/* Bubble 3 */}
              <button className="group relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/50 overflow-hidden glass-morphism hover:scale-110 hover:border-white transition-all duration-300 shadow-lg">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Memory" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCDSB7dqDtXWV3pK-UtfLh9UO5eFN32qC9hOlIGNSjG368aHbzn1svIWqFo6Zn6Zcur8UIqsr5X7LwMYF7d37yxpG1ZLENjj1f1PuA3KrorwESMJzuXvRrUzWMzggIsWjxKOqmOp9ZAyhVYflnqLVkGNIyT6MzLTHRw0IC_t0vOLzewigiXODVTfqEe8FOpWGTEpeBZftvvjpgaqEanWPnO0pf11k862GnnBAe_HkOABGwWmBrN4oPQGizHlwGsSHW6PI0seU7mbI"/>
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <p className="mt-2 font-label-md text-white text-caption drop-shadow">The First Spell</p>
              </button>
            </div>
          </div>
        </section>
        
        {/* Dialogue & Listening Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transcription Card */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 deckle-edge shadow-sm relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">record_voice_over</span>
              <h3 className="font-headline-sm text-primary">Rubeus Hagrid</h3>
            </div>
            <p className="font-body-lg text-on-surface italic leading-relaxed">
              "Yer a wizard, Harry. And a thumpin' good'un, I'd wager, once yer been trained up a bit."
            </p>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface text-primary rounded-full border border-primary/20 hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-sm">translate</span>
                <span className="font-label-md">Xem dịch</span>
              </button>
            </div>
          </div>
          
          {/* Voice Match / Waveform Section */}
          <div className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-on-surface mb-2">Khớp Giọng Nói</h3>
              <p className="text-on-surface-variant font-label-md">{isRecording ? 'Đang phân tích ký ức...' : 'Nhấn vào con dấu để bắt đầu ghi âm ký ức của bạn.'}</p>
            </div>
            {/* Waveform Visualization */}
            <div className="h-16 flex items-center justify-center gap-1 my-4">
              <div className="w-1 bg-primary/30 rounded-full h-1/4"></div>
              <div className="w-1 bg-primary/40 rounded-full h-1/2"></div>
              <div className="w-1 bg-primary/60 rounded-full h-3/4"></div>
              <div className={`w-1 bg-primary rounded-full h-full ${isRecording ? 'waveform-bar' : ''}`}></div>
              <div className="w-1 bg-primary-container rounded-full h-5/6"></div>
              <div className={`w-1 bg-primary rounded-full h-2/3 ${isRecording ? 'waveform-bar' : ''}`}></div>
              <div className="w-1 bg-primary/60 rounded-full h-1/2"></div>
              <div className="w-1 bg-primary/40 rounded-full h-1/3"></div>
              <div className="w-1 bg-primary/30 rounded-full h-1/4"></div>
            </div>
            {/* Record Button (Wax Seal Style) */}
            <div className="flex justify-center">
              <button onClick={handleRecord} className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(81,0,3,0.4)] active:scale-95 active:shadow-inner transition-all group overflow-hidden ${isRecording ? 'bg-secondary' : 'bg-primary'}`}>
                <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                <span className="material-symbols-outlined text-white text-3xl z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRecording ? 'graphic_eq' : 'mic'}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress Tracking */}
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" fill="transparent" r="28" stroke="#dfbfbc" strokeWidth="4"></circle>
              <circle cx="32" cy="32" fill="transparent" r="28" stroke={progress === 100 ? "#3b6848" : "#a83730"} strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * progress) / 100} strokeWidth="4" className="transition-all duration-300"></circle>
            </svg>
            <div className="absolute font-headline-sm text-primary">{progress}%</div>
          </div>
          <div>
            <h4 className="font-headline-sm text-on-surface">Độ Chính Xác</h4>
            <p className="text-on-surface-variant font-label-md">
              {progress >= 100 ? 'Hoàn hảo! Ký ức đã hoàn toàn rõ nét.' : 'Ký ức này đang trở nên rõ nét hơn. Tiếp tục luyện tập!'}
            </p>
          </div>
          <div className="ml-auto hidden md:block">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container border border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-sm">verified</span>
              </div>
              {progress === 100 && (
                <div className="w-8 h-8 rounded-full bg-tertiary-container border border-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">stars</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

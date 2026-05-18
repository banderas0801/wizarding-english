import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'

/**
 * LanguageSelection
 * Verbatim from .stitch/designs/language_selection.html
 */
export default function LanguageSelection() {
  const navigate = useNavigate()
  const { setLanguage } = useGameStore()

  const handleSelectLanguage = (lang: 'en' | 'vi') => {
    setLanguage(lang)
    navigate('/sorting')
  }

  return (
    <div className="relative w-full h-full flex flex-col font-body-md overflow-hidden bg-background">

      {/* Top App Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center h-16 px-6 bg-surface shadow-[0_4px_10px_rgba(60,47,47,0.1)] rounded-b-xl">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="font-headline-md italic font-bold text-primary">Arcane Lexicon</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img alt="Wizard Portrait"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuADS5GSodKlAVd8BhuiuF8tC5ixUuIhVMGllHaePNK5qMXn6kORwUCZHxPUM19Op1Zd-cSNRCZLiUugRCJDqAf7MEGIhUQMkQiVjf-P0OTQs5mO3-lg75B4gcYVDiUSaP70aHBTh39J-apPyrm4Zv6LAj_DLWdPGHppxnExWd26QdY_qGzQJ3XbWMwX58nkKgEiB52U5E9oFeuf9BY-u48aqDnu91lTq1XvVuuEUwG4kS1FlVxs-GoUoWachIMtUystj3kqzXx1ies"
            className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-6">

        {/* Dark Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxoYSAlfkQPj86KZns356pMI0ZQQUwUEECzqvG1pvOBKfrqobGuK8bcsD8wavwy1SxIM9_0V7UeIoC8vBByMEvI2P486UUW3mFi3Y224wVY_0SV_dtK11iUgPT2IMefx2ysMFGSy3gsB6aEnphet2xSmpM5y6ggXEeh1-Jk-OTG6nZL35dH6aoDwqpAk-vldrVQPZG5NBYFD0sOABG_xf3MArVxxSwA6jGkRoE_m22fDd6HF03DQAB4m5MrSca4Vy-VTKQFF_9fGY"
            alt="Ancient Library" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full text-center flex flex-col items-center">
          {/* Header */}
          <div className="mb-10 space-y-3">
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-white drop-shadow-md">
              Choose your language of magic
            </h2>
            <h3 className="font-headline-sm text-headline-sm italic text-secondary-fixed opacity-90">
              Chọn ngôn ngữ pháp thuật của bạn
            </h3>
          </div>

          {/* Language Cards */}
          <div className="flex flex-col gap-6 w-full">

            {/* English Card */}
            <button
              className="group relative flex flex-col items-center p-6 pt-10 pb-10 bg-surface-container-low parchment-texture rounded-xl border border-outline-variant/30 transition-all duration-300 overflow-hidden deckle-edge active:scale-95 touch-manipulation cursor-pointer"
              onTouchStart={() => {}}
              onClick={() => handleSelectLanguage('en')}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-container to-primary"></div>
              <div className="absolute top-4 left-4 text-primary opacity-20">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <div className="absolute top-4 right-4 text-primary opacity-20">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <div className="mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border-2 border-[#D4AF37]">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h4 className="font-headline-md text-headline-md text-primary mb-1">English</h4>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Ancient Texts &amp; Lore</p>
              <div className="mt-6 flex items-center gap-2 text-primary font-bold">
                <span className="font-body-lg">Begin Journey</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </button>

            {/* Vietnamese Card */}
            <button
              className="group relative flex flex-col items-center p-6 pt-10 pb-10 bg-surface-container-low parchment-texture rounded-xl border border-outline-variant/30 transition-all duration-300 overflow-hidden deckle-edge active:scale-95 touch-manipulation cursor-pointer"
              onTouchStart={() => {}}
              onClick={() => handleSelectLanguage('vi')}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-secondary-container to-secondary"></div>
              <div className="absolute top-4 left-4 text-secondary opacity-20">
                <span className="material-symbols-outlined text-4xl">auto_stories</span>
              </div>
              <div className="absolute top-4 right-4 text-secondary opacity-20">
                <span className="material-symbols-outlined text-4xl">auto_stories</span>
              </div>
              <div className="mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] border-2 border-[#D4AF37]">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
              </div>
              <h4 className="font-headline-md text-headline-md text-primary mb-1">Tiếng Việt</h4>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Cổ Thư &amp; Bí Thuật</p>
              <div className="mt-6 flex items-center gap-2 text-primary font-bold">
                <span className="font-body-lg">Bắt Đầu Hành Trình</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center gap-3 text-white/80 font-body-md text-sm">
            <span className="material-symbols-outlined text-secondary-fixed">verified</span>
            <span>Your choice will attune the lexicon to your soul.</span>
          </div>
        </div>
      </main>

      {/* Magic Particles */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-container opacity-10 blur-3xl rounded-full"></div>
      </div>
    </div>
  )
}

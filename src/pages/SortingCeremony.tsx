import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'

export default function SortingCeremony() {
  const navigate = useNavigate()
  const { completeOnboarding } = useGameStore()

  const handleChoice = () => {
    // Navigate to Map after sorting
    completeOnboarding()
    navigate('/')
  }

  return (
    <div className="bg-inverse-surface text-on-surface-variant min-h-screen relative overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-surface shadow-[0_4px_10px_rgba(60,47,47,0.1)] z-50 rounded-b-xl">
        <div className="flex items-center gap-4">
          <button
            className="material-symbols-outlined text-primary cursor-pointer active:scale-95 touch-manipulation"
            onTouchStart={() => {}}
            onClick={() => navigate('/portal')}
          >
            close
          </button>
        </div>
        <h1 className="font-headline-md text-xl italic font-bold text-primary">Arcane Lexicon</h1>
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm">
          <img alt="Wizard Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1fWPQxsIjm4trLhSzmcL83TZBr8gNMbE2Z22w_kDm4NNGNflD-Ze-v6fnl9q92z0MrgxD_4e5XvaHJ71BxR3TdFbE8_Q9ACRWt-Wlz3MfN4JWql1-0VKl7pk2Ppz6OV-k4Y52n9yl-QZEV1FzIpySSOwhBZFkCDAJ2znT_wmxkFz9ixj-jKpNzVos3WV0m4mmefsN4EPxkQ7DxtJ_GMArPc6YQXYK-r3TL6XLNnsOMgzqAANPM0UfJr7KzWPK5MUXNuRJSiFuu9A"/>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-8 relative overflow-hidden max-w-[390px] mx-auto w-full">
        {/* Atmospheric Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-gradient-radial from-primary/10 to-transparent blur-3xl opacity-50"></div>
        </div>
        
        {/* Sorting Hat Image */}
        <div className="relative z-10 w-full max-w-sm mb-10 group">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 relative">
            <img alt="The Sorting Hat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/ADBb0uga3v_X6PLtD-xjtjq8s2HKF8qFApfGQyPcN4PUyVDxXvEwgwEe5UvMi4sWh6_2FcnW1nqWO-8_xSTtxiGF4pSLSyWzzGTBezEPtCI52TymCWxNfFL_rlAPIgNiFoSCFk6OxgFnsUV0mklCcJFx60uoKUXw83pEHljMRPi4X80pwgVXa1D1cTiTVp4Ee3IU3Y30teSDH9wIqQX2YJKzFx_PUAbOf1TCtGjaxRePV3Ny-6dzWI4MxvS-Vg"/>
            {/* Light Beam Effect Overlay */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Question Content */}
        <section className="relative z-20 w-full max-w-lg bg-surface/90 backdrop-blur-sm parchment-texture deckle-edge p-8 shadow-2xl border border-outline-variant/30 flex flex-col items-center">
          <div className="text-center mb-8">
            <span className="font-label-md text-primary tracking-widest uppercase mb-3 block opacity-80">The First Inquiry</span>
            <h2 className="font-display-lg-mobile text-on-surface leading-tight text-3xl font-bold">
              In the face of an ancient mystery, how would your soul choose to proceed?
            </h2>
          </div>

          {/* Choice Grid */}
          <div className="w-full space-y-4">
            {/* Option: Brave */}
            <button onClick={handleChoice} className="w-full group relative flex items-center gap-5 p-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 magic-glow-red active:scale-[0.98] cursor-pointer">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#871F1C] flex items-center justify-center shadow-lg group-hover:shadow-[#871F1C]/40">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
              </div>
              <div className="text-left">
                <span className="block font-label-md text-[#871F1C] mb-1">Brave</span>
                <p className="font-body-md text-on-surface-variant leading-snug">Step forward to confront the unknown directly.</p>
              </div>
            </button>

            {/* Option: Ambitious */}
            <button onClick={handleChoice} className="w-full group relative flex items-center gap-5 p-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 magic-glow-green active:scale-[0.98] cursor-pointer">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#234F32] flex items-center justify-center shadow-lg group-hover:shadow-[#234F32]/40">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <div className="text-left">
                <span className="block font-label-md text-[#234F32] mb-1">Ambitious</span>
                <p className="font-body-md text-on-surface-variant leading-snug">Harness the power within the mystery for greatness.</p>
              </div>
            </button>

            {/* Option: Wise */}
            <button onClick={handleChoice} className="w-full group relative flex items-center gap-5 p-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 magic-glow-blue active:scale-[0.98] cursor-pointer">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#3A456D] flex items-center justify-center shadow-lg group-hover:shadow-[#3A456D]/40">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
              </div>
              <div className="text-left">
                <span className="block font-label-md text-[#3A456D] mb-1">Wise</span>
                <p className="font-body-md text-on-surface-variant leading-snug">Analyze the symbols and seek the hidden truth.</p>
              </div>
            </button>

            {/* Option: Loyal */}
            <button onClick={handleChoice} className="w-full group relative flex items-center gap-5 p-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 magic-glow-yellow active:scale-[0.98] cursor-pointer">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg group-hover:shadow-[#D4AF37]/40">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <div className="text-left">
                <span className="block font-label-md text-[#510003] mb-1">Loyal</span>
                <p className="font-body-md text-on-surface-variant leading-snug">Gather your allies to face the path together.</p>
              </div>
            </button>
          </div>
        </section>

        {/* Progress Indicator */}
        <div className="mt-auto pt-10 flex flex-col items-center gap-3 w-full max-w-xs z-20 pb-8">
          <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
            <div className="w-[8.33%] h-full bg-primary relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <span className="font-label-md text-surface-container-highest tracking-wide">Question 1 of 12</span>
        </div>
      </main>
    </div>
  )
}

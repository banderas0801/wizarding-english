import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function SeekerChallenge() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-[max(884px,100dvh)] flex flex-col overflow-hidden pb-32">
      {/* Top App Bar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 max-w-[390px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-outline-variant overflow-hidden">
            <img alt="Student Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHZ21JMJsCsGYsakbq-fPxSa8oOBjnTldCLBTj-ByY-4CASskACliLshNSAiGdtmMDAbAyeUPob_OgBhI6DGg5sBcLOUcAeXnb0UWv-Rt-Risokxu4Frm9GNzS3ABvMTiKHVuljTizNyCd7xa6dALZnJgJgDPkw5FuWghcFTh2ef2sBzJJXxbzzngOcuSop3bc7Jq8oUcPWSYjVjnwGT_sPglb1esZqStxDCSVLC3WP49HhqY2xzP730aBy8-J0QmPPCQa2qMbSNM"/>
          </div>
          <h1 className="font-display-lg-mobile text-xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-surface-tint">storm</span>
        </button>
      </header>

      {/* Game Canvas */}
      <main className="flex-1 relative flex flex-col items-center justify-center overflow-hidden w-full mx-auto" style={{ maxWidth: '390px' }}>
        {/* Background Image (Pitch) */}
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE8ljtCKpVGUMD9ib1Hak4ZXWm8kK5N5L6II_59ahCGM-toV3UKGEkreHwD4kzZvpAF1pU4K6zEOvACA9iDExmgFf6gwR0oyc-rGcx06Wmkb_tXsch1wmvGN44_2PzCzDC7a-39yH_ItFElja6YatOyHlYhJcCFP3qVpryC_zfwta9QtIA-Vy5VXrAcZCbIkQAgWW0MuqQC3qrI1zoUOPFO_A5X8uI7J496YvW_2b_FxA8M_jE2JhpgnbH8itP_Q9tz2bKVKj8bjU"/>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(255, 248, 247, 0.4) 80%, rgba(255, 248, 247, 0.8) 100%)', pointerEvents: 'none' }}></div>
        </div>

        {/* Instruction Overlay */}
        <div className="z-20 w-full px-6 mb-auto pt-10">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md p-6 rounded-xl border border-outline-variant shadow-lg text-center" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 98%, 95% 94%, 92% 99%, 88% 95%, 85% 97%, 80% 94%, 75% 98%, 70% 95%, 65% 97%, 60% 94%, 55% 98%, 50% 95%, 45% 97%, 40% 94%, 35% 98%, 30% 95%, 25% 97%, 20% 94%, 15% 98%, 10% 95%, 5% 97%, 0% 95%)' }}>
            <p className="font-label-md text-xs text-on-surface-variant mb-1 uppercase tracking-widest font-bold">Seeker's Challenge</p>
            <h2 className="font-headline-md text-xl font-bold text-on-surface">Catch the Synonym of <span className="text-surface-tint underline decoration-wavy underline-offset-4">VALIANT</span></h2>
          </div>
        </div>

        {/* Floating Words (Snitches) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Target Snitch (Correct) */}
          <button 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto group active:scale-90 transition-transform"
            onClick={() => navigate('/victory')}
          >
            <div className="relative flex flex-col items-center" style={{ boxShadow: '0 0 15px 2px rgba(212, 175, 55, 0.4)', borderRadius: '50%' }}>
              <div className="flex gap-1 animate-pulse">
                <span className="material-symbols-outlined text-[#D4AF37] scale-x-[-1] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCF6BA] via-[#D4AF37] to-[#AA771C] border-2 border-[#D4AF37] flex items-center justify-center shadow-xl">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                </div>
                <span className="material-symbols-outlined text-[#D4AF37] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
              </div>
              <div className="mt-4 bg-surface-container-lowest/95 border border-outline-variant py-1 px-4 rounded-full shadow-sm">
                <span className="font-label-md text-sm text-on-surface font-bold">COURAGEOUS</span>
              </div>
            </div>
          </button>

          {/* Distractor 1 */}
          <button className="absolute top-1/3 right-4 transform pointer-events-auto group opacity-90 scale-90">
            <div className="relative flex flex-col items-center">
              <div className="flex gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] scale-x-[-1] text-3xl opacity-60">air</span>
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] border border-[#AA771C] flex items-center justify-center"></div>
                <span className="material-symbols-outlined text-[#D4AF37] text-3xl opacity-60">air</span>
              </div>
              <div className="mt-2 bg-surface-container-lowest/80 border border-outline-variant py-1 px-4 rounded-full">
                <span className="font-label-md text-xs text-on-surface-variant font-bold">TIMID</span>
              </div>
            </div>
          </button>

          {/* Distractor 2 */}
          <button className="absolute bottom-1/4 left-4 transform pointer-events-auto group opacity-80 scale-75">
            <div className="relative flex flex-col items-center">
              <div className="flex gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] scale-x-[-1] text-3xl opacity-60">air</span>
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] border border-[#AA771C] flex items-center justify-center"></div>
                <span className="material-symbols-outlined text-[#D4AF37] text-3xl opacity-60">air</span>
              </div>
              <div className="mt-2 bg-surface-container-lowest/80 border border-outline-variant py-1 px-4 rounded-full">
                <span className="font-label-md text-xs text-on-surface-variant font-bold">FRAGILE</span>
              </div>
            </div>
          </button>
        </div>

        {/* Broomstick Tip (First Person Effect) */}
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-30 w-64 h-96 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#3A2D2D] to-transparent rounded-t-full opacity-40 blur-xl"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[400px] bg-gradient-to-t from-[#241919] via-[#3A2D2D] to-transparent rounded-full shadow-2xl rotate-2"></div>
        </div>

        {/* HUD Elements */}
        <div className="absolute bottom-32 right-6 z-40 flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-surface-container-lowest/90 backdrop-blur shadow-lg p-3 rounded-xl border border-outline-variant">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary-container" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.4), 2px 2px 5px rgba(0,0,0,0.3)' }}>
              <span className="material-symbols-outlined text-[#FCF6BA] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div>
              <p className="font-caption text-[10px] text-on-surface-variant">Score</p>
              <p className="font-headline-sm text-lg font-bold" style={{ background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1,250</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-surface-container-lowest/90 backdrop-blur shadow-lg p-3 rounded-xl border border-outline-variant">
            <div className="w-12 h-2 rounded-full bg-surface-container-highest overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-surface-tint to-[#D4AF37] w-3/4"></div>
            </div>
            <p className="font-label-md text-xs font-bold text-surface-tint">30s</p>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

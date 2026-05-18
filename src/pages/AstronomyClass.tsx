import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function AstronomyClass() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(60); // 3/5 is 60%
  const { addXp, addGold } = useGameStore();

  const handleFinish = () => {
    setProgress(100);
    addXp(300);
    addGold(100);
    alert("Khám phá hoàn tất! +300 XP, +100 Gold");
    navigate('/victory');
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] mx-auto left-0 right-0 z-50 flex justify-between items-center px-6 py-2 shadow-sm bg-surface dark:bg-surface-dim">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm shrink-0">
            <img alt="Student Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv0YMg2z5s-UugpyJ5nDhV2PBz_f7tw3BMQuW5zaUT5WZ18wto8OZe7dFBAtJsgug1ix2ivAxzevBd9DnARfR4GnggkyifWRKOAB7kdmBolAjA7-Uqc88tPGKNBfxKAbMbnnZgW8iX4vWTNNoQ9Zf3Ufn-CTKwKyAm6f0xq0psqfY1P3eReWgUFZV1shJZUjzvyVjwVGnrQNpKUOH-puQ572qZfU2ZAk42wK5Xtu19f6sORMUGXiv30tXba3DV_6BXR38zPeFj8L0"/>
          </div>
          <span className="font-headline-md text-xl font-bold text-primary dark:text-on-primary-container leading-tight">Mystic Academy</span>
        </div>
        <div className="px-3 py-1 rounded-full border border-primary bg-primary-container/10">
          <span className="font-label-md text-[10px] font-bold text-primary whitespace-nowrap">Year 1</span>
        </div>
      </header>

      <main className="flex-1 pt-16 pb-32 max-w-[390px] mx-auto w-full relative">
        {/* Astronomy Sky Viewport (Simulated AR) */}
        <section className="relative w-full aspect-[9/16] overflow-hidden flex flex-col items-center justify-center" style={{ background: 'radial-gradient(circle at center, #1a2a44 0%, #0a0e1a 100%)' }}>
          {/* Background Stars */}
          <div className="absolute bg-white rounded-full opacity-80 shadow-[0_0_4px_#fff] w-1 h-1 top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute bg-white rounded-full opacity-80 shadow-[0_0_4px_#fff] w-1.5 h-1.5 top-1/3 left-2/3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bg-white rounded-full opacity-80 shadow-[0_0_4px_#fff] w-1 h-1 top-3/4 left-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bg-white rounded-full opacity-80 shadow-[0_0_4px_#fff] w-0.5 h-0.5 top-1/5 left-4/5 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bg-white rounded-full opacity-80 shadow-[0_0_4px_#fff] w-1 h-1 top-2/3 left-1/6 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* AR Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-dashed border-[#D4AF37]/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="w-12 h-12 border border-[#D4AF37] rounded-full opacity-50 flex items-center justify-center">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* The Phoenix Constellation (Active Task) */}
          <div className="relative z-10 text-center">
            <svg className="mx-auto" height="200" viewBox="0 0 300 300" width="200">
              {/* Lines */}
              <line x1="150" x2="220" y1="50" y2="120" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="4"></line>
              <line x1="220" x2="180" y1="120" y2="200" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="4"></line>
              <line x1="180" x2="120" y1="200" y2="200" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="4"></line>
              <line x1="120" x2="80" y1="200" y2="120" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="4"></line>
              <line x1="80" x2="150" y1="120" y2="50" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="4"></line>
              {/* Stars */}
              <circle className="animate-pulse shadow-[0_0_10px_#D4AF37]" cx="150" cy="50" fill="#D4AF37" r="4"></circle>
              <circle cx="220" cy="120" fill="#fff" r="3"></circle>
              <circle cx="180" cy="200" fill="#fff" r="3"></circle>
              <circle cx="120" cy="200" fill="#fff" r="3"></circle>
              <circle cx="80" cy="120" fill="#fff" r="3"></circle>
            </svg>
            <p className="mt-2 font-headline-sm text-lg font-bold text-white drop-shadow-lg" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F1D18A 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Phoenix</p>
            <p className="font-label-md text-xs font-bold text-white/60 italic">Align the telescope to identify Mars</p>
          </div>
          
          {/* Foreground: Stone Balcony & Telescope */}
          <div className="absolute bottom-0 w-full">
            <div className="relative h-24 w-full bg-[#241919] border-t-4 border-[#3a2d2d] shadow-2xl">
              <div className="absolute -top-32 right-10 w-24 h-56 bg-gradient-to-b from-[#8b716e] to-[#241919] rounded-t-full origin-bottom rotate-[-15deg] border-x-4 border-[#57413f]">
                {/* Brass Details */}
                <div className="w-full h-4 bg-[#D4AF37]/40 mt-8"></div>
                <div className="w-full h-4 bg-[#D4AF37]/40 mt-16"></div>
              </div>
            </div>
          </div>
          
          {/* Instruction Overlay */}
          <div className="absolute top-4 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#D4AF37]">explore</span>
              <p className="font-body-md text-[11px] text-white leading-tight">Move your device to scan the southern quadrant for the red glow of Mars.</p>
            </div>
          </div>
        </section>

        {/* Lesson Info Sheet */}
        <section className="px-6 -mt-16 relative z-20">
          <div className="p-5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-outline-variant bg-[#fcf5e5]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3azmph_VROWMtXtuZzKjgRjmJgamNfeKaQORZFE4-EKFL2yJLegz_ZWk0PzOtGlC_d6u_LXYtjwEPUfUjlEARk0joGd0LvcqgWv3c26vUfte6NcyK9K3JdA2pvCcFdwR3NJdKlZl0VALvN0V31hw3ejLYMOuUOYgX-9QAnVHoP0TSwK9LYaCSqqC2__P39WUuU5ze-Ld7yYB6HOX8QOLdq6ubxmWrj9eIamy65gjiM9lEnQWKoa1Jfigw-VT3AXYg6TPyE82SEhU")', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 97%, 82% 94%, 78% 98%, 75% 95%, 72% 97%, 68% 94%, 65% 98%, 62% 95%, 58% 97%, 55% 94%, 52% 98%, 48% 95%, 45% 97%, 42% 94%, 38% 98%, 35% 95%, 32% 97%, 28% 94%, 25% 98%, 22% 95%, 18% 97%, 15% 94%, 12% 98%, 8% 95%, 5% 97%, 2% 94%, 0% 100%)' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="font-headline-md text-lg font-bold text-primary leading-tight">Stargazing Lesson IV</h2>
                <p className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Astronomy Tower</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white scale-110 shadow-lg" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.3)' }}>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="font-body-md text-xs text-on-surface leading-relaxed">
                Centuries ago, Headmaster Alaric mapped the movement of the celestial bodies from this very balcony. To unlock the <span className="text-primary-fixed-dim font-bold drop-shadow-sm">Library Vault</span>, you must align the constellations with the current planetary positions.
              </p>
              
              {/* Progress Info */}
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-md text-[10px] font-bold text-primary">Discovery Progress</span>
                  <span className="font-label-md text-[10px] font-bold text-primary">3 / 5</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-primary to-[#D4AF37] relative" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button 
                  onClick={handleFinish}
                  className="flex flex-col items-center justify-center p-3 bg-surface-container rounded-xl border border-primary/20 hover:bg-primary/5 active:scale-95 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-primary mb-1">menu_book</span>
                  <span className="font-label-md text-[10px] font-bold text-primary">Star Chart</span>
                </button>
                <button 
                  onClick={handleFinish}
                  className="flex flex-col items-center justify-center p-3 bg-surface-container rounded-xl border border-primary/20 hover:bg-primary/5 active:scale-95 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-primary mb-1">history_edu</span>
                  <span className="font-label-md text-[10px] font-bold text-primary">Notes</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAB (Contextual for Home/Map view) */}
      <button 
        onClick={handleFinish}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 max-w-[390px]"
        style={{ left: 'calc(50% + 125px)' }}
      >
        <span className="material-symbols-outlined text-xl">flare</span>
      </button>

      <BottomNavBar />
    </div>
  );
}

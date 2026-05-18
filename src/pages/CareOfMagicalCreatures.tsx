import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function CareOfMagicalCreatures() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();
  const [activeAnatomy, setActiveAnatomy] = useState<string | null>(null);

  const handleFinish = () => {
    addXp(200);
    addGold(30);
    alert("Nghiên cứu sinh vật hoàn tất! +200 XP, +30 Gold");
    navigate('/victory');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24 flex flex-col" style={{ backgroundColor: '#fff8f7', backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAH6Y7xzMDjOZn3tAKPZHNw-cRHEmJgyB0mA4uQFFfiph7xy93KZ9n6_AQcfxF1WTo8twYrJrbY-6m7raNfuVOPN-CFuOhN0hSGo-0UePGrxlYoZzC_Y60FWwjIwftwI4ZZQEmayziSwIOaUVtPpaEUTF3T-1tX_QTRhJAY4uW-LYFqoCWYpltnIOIUuEZBk_0E9paN-Fstp2pnQSIgdlqM_nGgdw7F9Sfx20Lt0oPf6W5YiKOpx7xVScFOoXMtKIduNzRqliP_0KE")' }}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] mx-auto left-0 right-0 z-50 shadow-sm bg-surface dark:bg-surface-dim flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-outline shrink-0">
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATJkDgF_EZ3KK1L3Pij3N8oz_vuidKCLlrFwH6oWgsqSG3ebGBAVj8vjXNWND4_pJgVp0-QkDld5Kxa2RXBm3WLEwttnFlG5pwfpTqI-yUdpwdi1pLcTGob65oFUOLBoRSLgUOAn2e4FKIzsKtcR7tQdeHG19gdiELE23mnffEzdZzjERnkOb8W5mjAICPNLAyyKrVwwumWO1aQrVw9796tdiG80cb-hzOiTNLEeAexwSLgbwTI3NT4Vur7APnUwrdMcLxD4xrKYM"/>
          </div>
          <h1 className="font-headline-md text-xl font-bold text-primary dark:text-on-primary-container leading-tight tracking-tight">Mystic Academy</h1>
        </div>
        <span className="font-label-md text-[10px] font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full whitespace-nowrap">Year 1</span>
      </header>

      <main className="flex-1 pt-20 px-6 max-w-[390px] mx-auto w-full space-y-6">
        {/* Hero Section / Lesson Intro */}
        <section className="relative rounded-xl overflow-hidden shadow-lg aspect-[16/9]">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQesex8281DHL_Fr9yzxZDhJLp3g3iUwxjFbv7OCt0RZ43cRJvOkHBSdLitYIjH7VfCXCthWylugmYoS6WDE0gwMXfy15gqe0pGekwul7Kg_hzjOuNyb9sk27SBn1vNrdam4w7TnfPuMmeiMukI4rJnK1Mlqv8n3R2V49VqgnodRkn5_cC6x_iNxFOK47hIujtkhduiAlb1Bbr7p-l0OtVw7WybnW7Ca2RuyreG6VgEZBoqw9-eSPoYTwttk39JzmHnV9Tat6t3hA"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
            <h2 className="font-display-lg-mobile text-2xl font-bold text-white leading-tight">Care of Magical Creatures</h2>
            <p className="font-body-md text-xs text-white/90 italic mt-1">"Remember, the first thing you do is bow." — R. Hagrid</p>
          </div>
        </section>

        {/* Interactive Anatomy Canvas */}
        <section className="bg-surface-container-low rounded-xl p-4 border border-outline-variant shadow-sm space-y-4">
          <div className="text-center">
            <h3 className="font-headline-sm text-lg font-bold text-primary">Anatomy of a Hippogriff</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Tap the icons to explore biological functions.</p>
          </div>
          
          <div className="relative w-full aspect-square flex items-center justify-center bg-surface-container-highest rounded-lg overflow-hidden border border-outline-variant/50">
            {/* Main Creature Illustration */}
            <div className="relative group w-full h-full flex items-center justify-center p-2">
              <img className="max-w-full max-h-full object-contain drop-shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDslebAUUFnkpoQAbtHtEKfumF8YljrZ0tdkauAxwwap6T3aN4Jg4bw6XBr4IBWAZZVL49JSqmHlfasrkO3kFWHJDxIV8IoUfaR0XUyE-ewhp7Oe0bOi_szm9NuwLI9WM40v9Sog1EKYhD6E0vaQc-7d3hf5N9RxpmJSzKtrljiqHZkxcMkaGIB0UF6sfvrVQWxR-2qeoZ4moh3jXyPU_YWDb8SGHbiCHC4ar-lJTL8yGp2h6iOt8Y_-fDctMZn2qumitHBXL5jH3E"/>
              
              {/* Interactive Hotspots (Wax Seals) */}
              <button 
                onClick={() => setActiveAnatomy('head')}
                className={`absolute top-[25%] left-[25%] w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeAnatomy === 'head' ? 'scale-110 shadow-[0_0_20px_rgba(212,175,55,0.6)]' : 'hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)]'}`}
                style={{ background: 'radial-gradient(circle at 30% 30%, #871f1c, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(60,47,47,0.3)' }}
              >
                <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </button>
              
              <button 
                onClick={() => setActiveAnatomy('wings')}
                className={`absolute top-[35%] left-[50%] w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeAnatomy === 'wings' ? 'scale-110 shadow-[0_0_20px_rgba(212,175,55,0.6)]' : 'hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)]'}`}
                style={{ background: 'radial-gradient(circle at 30% 30%, #871f1c, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(60,47,47,0.3)' }}
              >
                <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
              </button>
              
              <button 
                onClick={() => setActiveAnatomy('hind')}
                className={`absolute bottom-[30%] right-[25%] w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeAnatomy === 'hind' ? 'scale-110 shadow-[0_0_20px_rgba(212,175,55,0.6)]' : 'hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)]'}`}
                style={{ background: 'radial-gradient(circle at 30% 30%, #871f1c, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(60,47,47,0.3)' }}
              >
                <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </button>
            </div>
          </div>

          {/* Bento-style Feature Breakdown */}
          <div className="grid grid-cols-1 gap-3 mt-4">
            <div className={`bg-surface-container p-3 rounded-lg border-l-4 border-primary transition-opacity ${activeAnatomy === null || activeAnatomy === 'head' ? 'opacity-100' : 'opacity-40'}`}>
              <h4 className="font-label-md text-xs font-bold text-primary uppercase mb-1">Eagle Head / Đầu Đại Bàng</h4>
              <p className="font-caption text-[11px] text-on-surface-variant leading-tight">Sharp beak for tearing food and keen eyesight for hunting from heights.</p>
            </div>
            <div className={`bg-surface-container p-3 rounded-lg border-l-4 border-secondary transition-opacity ${activeAnatomy === null || activeAnatomy === 'wings' ? 'opacity-100' : 'opacity-40'}`}>
              <h4 className="font-label-md text-xs font-bold text-secondary uppercase mb-1">Wings / Đôi Cánh</h4>
              <p className="font-caption text-[11px] text-on-surface-variant leading-tight">Powerful muscles allow for rapid take-off and long-distance flight.</p>
            </div>
            <div className={`bg-surface-container p-3 rounded-lg border-l-4 border-tertiary transition-opacity ${activeAnatomy === null || activeAnatomy === 'hind' ? 'opacity-100' : 'opacity-40'}`}>
              <h4 className="font-label-md text-xs font-bold text-tertiary-container uppercase mb-1">Horse Hind / Thân Ngựa</h4>
              <p className="font-caption text-[11px] text-on-surface-variant leading-tight">Strong hind legs for galloping across rough terrain and stable landings.</p>
            </div>
          </div>
        </section>

        {/* Professor's Tip (The Scrap Card) */}
        <section className="relative bg-surface-container-highest p-5 shadow-md border-t border-outline-variant" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 94%, 75% 98%, 70% 95%, 65% 99%, 60% 94%, 55% 98%, 50% 95%, 45% 99%, 40% 94%, 35% 98%, 30% 95%, 25% 99%, 20% 94%, 15% 98%, 10% 95%, 5% 99%, 0% 95%)' }}>
          <div className="flex items-start gap-3">
            <div className="bg-primary-container text-on-primary-container p-2 rounded-full shrink-0">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-primary mb-1">Professor's Tip</h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                "Anatomy isn't just about looks, kids! It's about behavior. A Hippogriff's eagle eyes mean they are proud and observant. Never blink too much and always wait for them to make the first move. If you don't show respect, those eagle talons are more than just for show!"
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px] mr-1">history_edu</span> Etiquette
                </span>
                <span className="inline-flex items-center px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px] mr-1">science</span> Biology
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between px-6 pb-6">
          <div className="flex items-center gap-3 bg-surface-container py-2 px-4 rounded-full border border-outline-variant shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl animate-pulse">hourglass_bottom</span>
            <span className="font-label-md text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tiến độ bài học: 50%</span>
          </div>
          <button onClick={handleFinish} className="bg-primary text-on-primary font-label-md text-sm font-bold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),2px_2px_6px_rgba(60,47,47,0.3)]">
            Hoàn thành
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function QuidditchFinal() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();

  const handleAnswer = (answer: string) => {
    if (answer === 'fast') {
      addXp(200);
      addGold(50);
      alert("Tuyệt vời! 'Fast' vừa là tính từ vừa là trạng từ. Bạn đã bắt được Snitch! +200 XP, +50 Gold");
      navigate('/victory');
    } else {
      alert("Chưa chính xác! Nhớ rằng 'fastly' không tồn tại, còn 'quick' và 'speedy' là tính từ (Adjective) cần thêm 'ly' để thành trạng từ.");
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 max-w-[390px] mx-auto shadow-2xl relative">
      {/* TopAppBar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-tint">
            <img alt="Wizard Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFR_dAyMycxiwCWo41H7-fZqagNzamebc0bXg_gM1ekHgmEkT632KY7fESizAQuFZAvfv4hcFnckUJ0TBSZgmAAuk4rAlu-o5YyHHMKZQjwXI0hy4jlGzha_tv0S2fx3k-Lkc4qOdwMcuX1DbIiGO_lG9HJ2VA_BKTdUgy4QguZjnvAVzOqCBkR_gkwFAU0X88EW6pDX8BV80shzAOili_IphaQuo0jFjzthQQBJhinDyUj3tgIbd_G7Rwjm8aA4L4M1e7XKrOhS4"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
        </div>
        <button onClick={() => navigate('/')} className="material-symbols-outlined text-surface-tint p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95">refresh</button>
      </header>

      <main className="px-5 mt-8 space-y-8">
        {/* Cinematic Game View */}
        <section className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-4 ring-outline-variant">
          <img alt="Quidditch Pitch" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdDmK2o0yPKZxbOBPJT5V2sqRQ0fmex9Ys1rZlVT_F3Rh7FkfCHu6nRlNqEgPvwVubJT7meQoZbhinjD6w2GV1E0RKw02H2J9LwB-qTiNvWzXmSFNe2REsYxUSYlQOUyK_Gn4BhwNh9eVQPoaCMz49nyISlGFPvex9juft2XDFp9AMSbj0hGfx4G6SVsXDh1iYycHpfOAqoaIWlPGUAiJd6gLt_vFLuiyhUUdWNHOgcUXgupyjNe_mtFoAXeOHpxVQKIbnL9DoUt0"/>
          
          {/* Overlay UI: Scoring and Progress */}
          <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex flex-col gap-1">
              <span className="text-white font-label-md text-xs font-bold bg-primary/80 px-3 py-1 rounded-full backdrop-blur-md">MATCH SCORE</span>
              <div className="flex items-center gap-2 px-1">
                <span className="font-display-lg text-2xl font-bold text-white drop-shadow-lg">140</span>
                <span className="text-white/70 font-headline-sm">-</span>
                <span className="font-display-lg text-2xl font-bold text-white drop-shadow-lg">110</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 w-1/2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                <span className="text-white font-label-md text-[10px] uppercase tracking-widest">Snitch Proximity</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                <div className="h-full bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 w-3/4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Broomstick Control Visual */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 items-center">
            <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-md bg-white/10 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-white">keyboard_arrow_left</span>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-yellow-400/80 flex items-center justify-center backdrop-blur-md bg-white/20 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              <span className="material-symbols-outlined text-white text-3xl">navigation</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-md bg-white/10 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-white">keyboard_arrow_right</span>
            </div>
          </div>
        </section>

        {/* Learning Task Canvas */}
        <section className="p-6 rounded-xl shadow-sm border border-outline-variant relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 94%, 75% 98%, 70% 95%, 65% 99%, 60% 94%, 55% 98%, 50% 95%, 45% 99%, 40% 94%, 35% 98%, 30% 95%, 25% 99%, 20% 94%, 15% 98%, 10% 95%, 5% 99%, 0% 95%)' }}>
          <div className="text-center mb-6">
            <h2 className="font-headline-md text-xl font-bold text-primary mb-2">Catch the Golden Snitch!</h2>
            <p className="font-body-lg text-sm text-on-surface-variant">
              The Snitch is moving <span className="font-bold border-b-2 border-surface-tint px-2">_______</span>. Choose the correct adverb to accelerate your broomstick!
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
            {/* Option A */}
            <button onClick={() => handleAnswer('fastly')} className="group relative flex items-center justify-between p-3 bg-surface-container-highest border border-outline-variant rounded-xl hover:bg-surface-variant transition-all hover:translate-y-[-2px]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant font-bold text-sm">A</span>
                <span className="font-headline-sm text-base text-on-surface-variant font-bold">fastly</span>
              </div>
              <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">flare</span>
            </button>
            
            {/* Option B */}
            <button onClick={() => handleAnswer('fast')} className="group relative flex items-center justify-between p-3 bg-surface-container-highest border border-outline-variant rounded-xl hover:bg-surface-variant transition-all hover:translate-y-[-2px]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant font-bold text-sm">B</span>
                <span className="font-headline-sm text-base text-on-surface-variant font-bold">fast</span>
              </div>
              <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">flare</span>
            </button>
            
            {/* Option C */}
            <button onClick={() => handleAnswer('quick')} className="group relative flex items-center justify-between p-3 bg-surface-container-highest border border-outline-variant rounded-xl hover:bg-surface-variant transition-all hover:translate-y-[-2px]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant font-bold text-sm">C</span>
                <span className="font-headline-sm text-base text-on-surface-variant font-bold">quick</span>
              </div>
              <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">flare</span>
            </button>
            
            {/* Option D */}
            <button onClick={() => handleAnswer('speedy')} className="group relative flex items-center justify-between p-3 bg-surface-container-highest border border-outline-variant rounded-xl hover:bg-surface-variant transition-all hover:translate-y-[-2px]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant font-bold text-sm">D</span>
                <span className="font-headline-sm text-base text-on-surface-variant font-bold">speedy</span>
              </div>
              <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">flare</span>
            </button>
          </div>
        </section>

        {/* Stats & Achievements (Bento Style) */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-primary">Mastery Progress</h3>
                <p className="font-caption text-xs text-on-surface-variant mt-1">Adjectives vs. Adverbs</p>
              </div>
              <span className="material-symbols-outlined text-surface-tint text-2xl">military_tech</span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-secondary-fixed-variant">80% Accuracy</span>
                  <span className="text-on-surface-variant">Level 12 Seeker</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary text-on-primary p-5 rounded-xl shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1", background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>stars</span>
              </div>
              <div>
                <p className="font-label-md text-xs uppercase opacity-80 font-bold">House Points</p>
                <p className="font-display-lg text-2xl font-bold">250</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Wax Seal) */}
      <div className="fixed bottom-24 right-6 z-40">
        <button className="w-14 h-14 rounded-full flex items-center justify-center text-white active:scale-90 transition-all shadow-xl group" style={{ background: 'linear-gradient(145deg, #741010, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 6px rgba(60,47,47,0.4)' }}>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1", background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>bolt</span>
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
}

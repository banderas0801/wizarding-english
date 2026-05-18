import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function DragonQuest() {
  const navigate = useNavigate();
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);

  const handleCastSpell = () => {
    if (q1 === 'spikes' && q2 === 'fire') {
      navigate('/victory');
    } else {
      alert('Phép thuật không chính xác! Đáp án đúng: spikes, fire');
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen pb-32 max-w-[390px] mx-auto relative shadow-2xl">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface shadow-sm parchment-texture flex justify-between items-center px-6 py-2 h-16 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-headline-md cursor-pointer" onClick={() => navigate('/')}>arrow_back</span>
          <h1 className="font-headline-md text-headline-md-mobile text-primary">Vòng 1: Đối đầu Rồng</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary hover:glow-gold transition-all cursor-pointer">auto_fix_high</span>
          <div className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden cursor-pointer" onClick={() => navigate('/portal')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDigzoQFhxdGD0uxri-1cyH-h2qKwDnjpDyVmWq1wehb60C5rDHmTcF3I4vnbwtXG3BpFcpeecWb9VNd6ot1dg76QPpKNNQ1__GnkrZZsdXxS7OZcDl8Zg7HUpPLXDqWloGxI8YYnPq0GoFPJoDFGgk64Tum-H6Cl0erWvSZKANYx7x2zX42-See7ZpVvH9n0jN3HziDEkXCZKf6FB5tc2lQPzAWcXtyxx3mquGFhyBBr7FqodcJkkUbeIVIhgdfEACZSS15u35GVE"/>
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-4xl mx-auto space-y-4">
        {/* Timer Bar: Burning Fuse */}
        <div className="relative w-full h-4 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant shadow-inner">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-on-primary-container w-3/4 rounded-r-full flex items-center justify-end pr-1">
            <span className="material-symbols-outlined text-on-primary text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-primary text-lg">flare</span>
          </div>
        </div>

        {/* Dragon Illustration Card */}
        <div className="relative w-full bg-surface-container rounded-xl overflow-hidden border border-outline-variant shadow-sm deckle-edge group">
          <div className="aspect-video w-full relative">
            <img className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjiuNPe20Nueb6rAp0B2dY31IckiMqJ3RT63_xNfp2Y5XjlxgixU49TfurIZpz3YCnT8JN20hEWufy9BchT06j8RfT9CoJGOzcwVaqxSYG6GFmsymxBjBgWRVvVZyWvqzpFWOF0YcGBkPTFOWzWkJOrSXBaNllcZUEnULAKIsMhbNo0xA9k-S_VH_tU1tV472SV8JW6UjYJQyuQLl9kduAPxmnbtNL_c9hHvlQoucOKWJTlb4-Fi-T9scw1KS8T0g7taBjPX2Y2lE"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-on-tertiary">
              <p className="font-headline-sm text-lg">Rồng Đuôi Gai Hungary</p>
              <p className="font-caption text-caption opacity-90">Level 1: The Distraction Spell</p>
            </div>
          </div>
        </div>

        {/* Task Instruction */}
        <div className="parchment-texture p-4 border border-outline-variant rounded-lg shadow-sm">
          <h2 className="font-headline-sm text-primary mb-2">Nhiệm vụ: Giải vây</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Rồng đang chuẩn bị phun lửa! Hãy hoàn thành các câu thần chú bằng tiếng Anh dưới đây để tạo ra những đám mây màu sắc đánh lạc hướng nó.
          </p>
        </div>

        {/* Interaction Area: Fill in the Blank / Matching */}
        <div className="space-y-3">
          {/* Question 1 */}
          <div className="bg-surface border border-outline-variant p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-sm border border-primary">
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="flex-1">
                <p className="font-body-lg mb-3 leading-tight">The dragon has sharp <span className="inline-block border-b-2 border-primary px-2 min-w-[60px] text-center font-bold text-primary italic">{q1 || '_____'}</span> on its tail.</p>
                <div className="flex flex-wrap gap-2">
                  {['scales', 'spikes', 'wings'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setQ1(opt)}
                      className={`px-4 py-1.5 rounded-full font-label-md transition-all active:scale-95 ${q1 === opt ? 'bg-primary-container border-primary text-on-primary-container shadow-sm' : 'bg-surface-container-high border-outline-variant text-primary hover:glow-gold'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-surface border border-outline-variant p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-sm border border-primary">
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <div className="flex-1">
                <p className="font-body-lg mb-3 leading-tight">Watch out! The beast is breathing <span className="inline-block border-b-2 border-primary px-2 min-w-[60px] text-center font-bold text-primary italic">{q2 || '_____'}</span>!</p>
                <div className="flex flex-wrap gap-2">
                  {['smoke', 'fire', 'ice'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setQ2(opt)}
                      className={`px-4 py-1.5 rounded-full font-label-md transition-all active:scale-95 ${q2 === opt ? 'bg-primary-container border-primary text-on-primary-container shadow-sm' : 'bg-surface-container-high border-outline-variant text-primary hover:glow-gold'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center pt-4 space-y-2 z-40 relative">
          <button 
            disabled={!q1 || !q2}
            onClick={handleCastSpell}
            className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center group transition-all duration-300 ${q1 && q2 ? 'bg-primary-container border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)] active:scale-90 cursor-pointer' : 'bg-surface-variant border-outline-variant opacity-50 grayscale cursor-not-allowed'}`}
          >
            <span className={`material-symbols-outlined text-3xl ${q1 && q2 ? 'text-on-primary-container group-hover:animate-spin' : 'text-on-surface-variant'}`}>flare</span>
          </button>
          <p className="font-label-md text-primary tracking-widest uppercase">CAST SPELL</p>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNavBar />
    </div>
  );
}

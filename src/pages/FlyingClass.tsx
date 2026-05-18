import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function FlyingClass() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();

  const handleCatchSnitch = (direction: string) => {
    if (direction === 'North') {
      addXp(180);
      addGold(60);
      alert("Tuyệt cú mèo! Bạn đã bắt được Snitch Hướng Bắc! +180 XP, +60 Gold");
      navigate('/victory');
    } else {
      alert("Ôi không, sai hướng rồi! Hãy cẩn thận!");
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen pb-32 max-w-[390px] mx-auto shadow-2xl relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] sticky top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-surface-tint overflow-hidden bg-surface-container-highest">
              <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtrUPmZDlfu6i_cF6-r1-N_wwVdSbO7Cl_c-sXZ6OB3Eq99xHnkiHq5Lz9eFp15o7iFwfYTrKYnoADWzigGVxjd8Hp2f9_E21nuz72TMVIUJ2fZereXK8Tljtv9DI_aklW1nwrVCavrG3mUkdBKhrAL0jUsKCN-PV4yO1-jibBm5DE-Bi2LKA6_QTzMGnggHsNDcTbmfpPLcGNAXzuiGQU_V5EkSZXNlxUKnJ06JbrI1RjLF7krZj5eTzDPX0ueLDLmERU1HxSTfo"/>
            </div>
            <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
          </div>
          <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center rounded-full text-surface-tint hover:bg-surface-container-high transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </header>

      <main className="mt-8 px-5 space-y-8">
        {/* Lesson Header */}
        <section className="text-center space-y-2">
          <div className="inline-block px-4 py-1 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-sm font-bold uppercase tracking-widest mb-2">
            Madam Hooch's Class
          </div>
          <h2 className="font-headline-md text-3xl font-bold text-primary">Lớp Bay: Quỹ đạo Thần kỳ</h2>
          <p className="font-body-md text-base text-on-surface-variant max-w-md mx-auto">
            Làm chủ hướng bay và vận tốc để thu thập các từ vựng Snitch theo đúng thứ tự.
          </p>
        </section>

        {/* Bento Grid Interaction Canvas */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Flight Canvas (Asymmetric Layout) */}
          <div className="relative bg-surface-container-lowest rounded-xl p-4 border border-outline-variant overflow-hidden h-[400px]" style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApx8_vHkj4gIIsMSuNDNJHk54fkeFe6_9c3N_efYUB24txaavWkwS3qpK3vfKUAytZ_eEDQu1MqBK-UYg40QIZEbPfQiI-DweiMkQvcVHCU6rqcM2yRumUYmHKjvItG9d9NVYGWfX6KxVLZRxrV4nRsXHedyrZ6SsdyyctvwzDxU8cx4XVlVTBDFj8Oxr34fDjIdVPTuPq08oEpRRO8JesmhNYv9sc0RVO3UhxsHdDoIbYg30z1MNvWahTmd5aySVMz0sCZy6mtsk" alt="Quidditch pitch"/>
            </div>

            {/* Interaction Overlays */}
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-surface-container-highest/90 backdrop-blur-md px-4 py-2 rounded-lg border border-surface-tint shadow-sm">
                  <span className="font-label-md text-xs font-bold text-surface-tint">VẬN TỐC (Velocity)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-24 bg-outline-variant rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-surface-tint to-primary"></div>
                    </div>
                    <span className="font-body-md text-sm font-bold">42m/s</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white border-2 border-[#D4AF37]" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.3)' }}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                </div>
              </div>

              {/* Floating Snitch Bubbles (The Interaction) */}
              <div onClick={() => handleCatchSnitch('North')} className="absolute top-1/4 left-1/4 flex flex-col items-center group cursor-pointer active:scale-95 transition-transform">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center animate-pulse" style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
                  <span className="material-symbols-outlined text-[#D4AF37] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <span className="mt-2 px-3 py-1 bg-surface-container-high rounded text-primary font-bold shadow-sm text-sm">Bắc (North)</span>
              </div>
              
              <div onClick={() => handleCatchSnitch('South')} className="absolute bottom-1/4 right-8 flex flex-col items-center group opacity-60 cursor-pointer active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-full bg-surface-variant border-2 border-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline text-2xl">stars</span>
                </div>
                <span className="mt-2 px-3 py-1 bg-surface-container-high rounded text-on-surface-variant font-bold shadow-sm text-xs">Nam (South)</span>
              </div>

              {/* Broomstick UI Element (Bottom Center) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="h-12 bg-surface-container-highest/80 backdrop-blur-sm rounded-full border border-surface-tint/30 flex items-center justify-center gap-4 px-6 shadow-md">
                  <span className="material-symbols-outlined text-surface-tint">arrow_back</span>
                  <span className="font-label-md text-sm font-bold text-primary whitespace-nowrap">NGHIÊNG ĐỂ LÁI</span>
                  <span className="material-symbols-outlined text-surface-tint">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats/Concept Card */}
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant flex flex-col gap-6" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 98%, 95% 94%, 92% 99%, 88% 93%, 85% 97%, 80% 92%, 75% 98%, 70% 91%, 65% 96%, 60% 92%, 55% 99%, 50% 93%, 45% 97%, 40% 91%, 35% 98%, 30% 92%, 25% 96%, 20% 91%, 15% 99%, 10% 92%, 5% 97%, 0% 93%)' }}>
            <div>
              <h3 className="font-headline-sm text-xl font-bold text-primary mb-4">Evan's Physics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-lg border-l-4 border-secondary-fixed shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-sm">navigation</span>
                    <p className="font-label-md text-sm font-bold text-secondary">HƯỚNG (Direction)</p>
                  </div>
                  <p className="font-body-md text-sm italic text-on-surface-variant">Góc bay so với phương Bắc từ điển.</p>
                </div>
                <div className="p-4 bg-surface rounded-lg border-l-4 border-surface-tint shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-surface-tint text-sm">speed</span>
                    <p className="font-label-md text-sm font-bold text-surface-tint">VẬN TỐC (Velocity)</p>
                  </div>
                  <p className="font-body-md text-sm italic text-on-surface-variant">Quãng đường đi được mỗi giây phép thuật.</p>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <button className="w-full py-4 rounded-xl text-white font-headline-sm flex items-center justify-center gap-3 active:scale-95 transition-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.3)' }}>
                <span className="font-bold text-lg" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F1D382 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BẮT ĐẦU</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Objective / Vocabulary Ribbon */}
        <section className="bg-surface-container p-6 rounded-2xl border-2 border-outline-variant/30">
          <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-surface-tint">menu_book</span>
            Nhiệm vụ Thần chú
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full border border-surface-tint">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="font-label-md text-sm font-bold text-on-surface">1. Bắc (North)</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant opacity-60">
              <div className="w-2 h-2 rounded-full bg-outline"></div>
              <span className="font-label-md text-sm font-bold text-on-surface">2. Nam (South)</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant opacity-60">
              <div className="w-2 h-2 rounded-full bg-outline"></div>
              <span className="font-label-md text-sm font-bold text-on-surface">3. Đông (East)</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant opacity-60">
              <div className="w-2 h-2 rounded-full bg-outline"></div>
              <span className="font-label-md text-sm font-bold text-on-surface">4. Tây (West)</span>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

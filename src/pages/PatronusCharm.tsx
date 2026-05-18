import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';

export default function PatronusCharm() {
  const navigate = useNavigate();
  const [filledWord, setFilledWord] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOrbClick = (word: string) => {
    setFilledWord(word);
    if (word === 'VUI VẺ') {
      setIsAnimating(true);
      setTimeout(() => navigate('/victory'), 1500);
    } else {
      setTimeout(() => setFilledWord(null), 800);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-[max(884px,100dvh)]">
      <header className="bg-surface-container dark:bg-surface-container-high shadow-[0_4px_10px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 h-16 fixed top-0 z-50 max-w-[390px] mx-auto left-0 right-0">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary dark:text-inverse-primary cursor-pointer active:scale-95 duration-150 transition-transform">menu</span>
          <h1 className="font-display-lg-mobile text-xl font-bold text-primary dark:text-inverse-primary drop-shadow-sm leading-tight">Mystic Academy</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-md text-xs text-on-surface-variant">Year 7</span>
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm shrink-0">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbQsukQRbS9j_2BcIdd196H5fGmwrPPDIz1Ewo6mUN04b09N-Rueec7l3oFixJb86wmVRoP5xkx55l0G-r-21HITau-gyoTioso2FOMvUynvfBNABkYaCPCP0lfOf6IaroJNYQFUAEoFsHF--ozzvMISPKCsIpDYy21ux1fSIILQeDW_6ynWR9zOlyxqGvQZ_axCKdXh5YU4AVtjuafr34dE-7codwQR3bon2PBHcZn4IqdrxED1rj2i_FRejGq_uksxwj0_3BLW8"/>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[390px] mx-auto min-h-screen pt-16 pb-24 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <img alt="Forbidden Forest" className="w-full h-full object-cover brightness-50 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWMNXTBaq1QqdPdv2L8NdwiAjE9LGFy7-_vFxWbakMVFmyY1lZdnIXXSz33CmNU-IjZsjIB6dcbMPQr8Vt7cvaRGCKTojPAa_eJ9xJE56T5Gn_s6l40GAhrgC1v6rHvzylNfLwu9iBQgfKDB4BaaEqwKzXBFGFpQKTcc-0vy8KFxPx2aBjudOUYQXFWKareHYWWGed-MqI1tZRpF7gQjbD2CGa_8P9nc3RT5-SSxCP85hokyglWc5WjXZrc0s7s8HpF7MxN-Y-Rgo"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#162147] via-transparent to-transparent"></div>
          {isAnimating && (
            <div className="absolute inset-0 bg-blue-300/30 animate-pulse z-20 mix-blend-overlay"></div>
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 mt-8 flex-1">
          <div className="mb-8 flex flex-col items-center text-center w-full">
            <h2 className="font-display-lg text-3xl font-bold text-surface-bright mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">Thần Hộ Mệnh</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3"></div>
            <p className="font-body-md text-sm text-surface-container-low italic">Xua đuổi Giám ngục bằng cách tập trung vào những ký ức đẹp đẽ nhất của bạn.</p>
          </div>

          <div className="w-full bg-[#fff8f7] p-6 shadow-2xl relative mb-10 border-l-4 border-primary rounded-xl" style={{ backgroundImage: 'radial-gradient(circle at center, #fff8f7 0%, #ead5d5 100%)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 97%, 80% 94%, 75% 98%, 70% 95%, 65% 97%, 60% 94%, 55% 98%, 50% 95%, 45% 97%, 40% 94%, 35% 98%, 30% 95%, 25% 97%, 20% 94%, 15% 98%, 10% 95%, 5% 97%, 0% 94%)' }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#D4AF37] z-20" style={{ background: 'linear-gradient(135deg, #741010 0%, #510003 100%)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' }}>
              <span className="material-symbols-outlined text-[#D4AF37] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="font-headline-md text-xl font-bold text-primary mb-4">Câu chú (Incantation)</h3>
              <div className="py-6 px-2 border-y border-outline-variant border-dashed">
                <p className="font-headline-sm text-base text-on-surface-variant leading-relaxed font-bold">
                  "Để thực hiện phép thuật, bạn phải nghĩ về một ký ức <span className={`inline-flex items-center justify-center min-w-[80px] px-2 h-8 border-b-2 ${filledWord === 'VUI VẺ' ? 'border-[#D4AF37] text-primary' : filledWord ? 'border-error text-error' : 'border-primary border-dotted'} mx-1 translate-y-1 transition-colors font-black`}>{filledWord}</span> thật sự."
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full px-2 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div 
                onClick={() => handleOrbClick('BUỒN')}
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:scale-110 group border border-white/20"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', backdropFilter: 'blur(4px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 group-hover:opacity-40 blur-md"></div>
                <span className="font-label-md text-surface-bright tracking-widest text-sm drop-shadow-md font-bold z-10">BUỒN</span>
              </div>
              <span className="font-caption text-[10px] text-surface-variant uppercase tracking-tighter opacity-70">SAD</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 -mt-4">
              <div 
                onClick={() => handleOrbClick('VUI VẺ')}
                className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:scale-110 group border-2 ${isAnimating ? 'border-blue-400 shadow-[0_0_25px_rgba(96,165,250,0.8)]' : 'border-[#D4AF37] shadow-[0_0_15px_2px_rgba(212,175,55,0.4)]'}`}
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)', backdropFilter: 'blur(4px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 group-hover:opacity-40 blur-md transition-opacity"></div>
                <span className="font-label-md text-surface-bright tracking-widest text-base drop-shadow-md font-bold z-10">VUI VẺ</span>
              </div>
              <span className="font-caption text-[10px] text-[#D4AF37] font-bold uppercase tracking-tighter">HAPPY</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div 
                onClick={() => handleOrbClick('GIẬN')}
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:scale-110 group border border-white/20"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', backdropFilter: 'blur(4px)' }}
              >
                <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 group-hover:opacity-40 blur-md"></div>
                <span className="font-label-md text-surface-bright tracking-widest text-sm drop-shadow-md font-bold z-10">GIẬN</span>
              </div>
              <span className="font-caption text-[10px] text-surface-variant uppercase tracking-tighter opacity-70">ANGRY</span>
            </div>
          </div>

          <div className="mt-auto mb-4 flex items-center justify-center gap-2 bg-tertiary-container/80 backdrop-blur px-4 py-2 rounded-full border border-outline/30 w-full max-w-[320px]">
            <span className="material-symbols-outlined text-[#D4AF37] text-sm">info</span>
            <p className="font-label-md text-xs text-on-tertiary-container">Chạm vào quả cầu cảm xúc đúng</p>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

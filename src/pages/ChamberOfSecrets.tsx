import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function ChamberOfSecrets() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    const answer = inputText.trim().toLowerCase();
    if (answer === 'serpent') {
      addXp(300);
      addGold(100);
      alert("Xuất sắc! Cánh cửa Phòng chứa Bí mật đã mở! +300 XP, +100 Gold");
      navigate('/victory');
    } else if (answer === '') {
      alert("Bạn chưa nhập mật ngữ. Hãy đọc kỹ phần tường đá sáng lên.");
    } else {
      alert("Sai rồi... Câu chú không linh nghiệm. Gợi ý: Hãy chú ý từ được gạch chân và liên quan đến 'Sibilant Sounds'!");
    }
  };

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen pb-24 max-w-[390px] mx-auto shadow-2xl relative">
      {/* TopAppBar Shell */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-surface-tint overflow-hidden bg-surface-variant">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdGqPGN3Et4868iGPDfLbrSRCZEpuf8oufvp08PbpTm18PLOJmFWQYfPxxZjuJvUHh4QyJPDcXLgB7_uupWelVmzCTxbhr03LnC7M0-Rec3TaV7cr34TvssuSF6cRU06Hq3DWIDvhWQ7YLry0Gc-5MnsJAhV9TDL8rL_sVuit7WGSVEAELckItjBDWcIvlsTfjH-fqDy-6Sd3H_u4xirY5UVmxI2ncyKDT9286rq6xtrt7R0qTHE78c3y4Qo0kHZynq_vjTTPb0lg"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
        </div>
        <button onClick={() => navigate('/')} className="material-symbols-outlined text-surface-tint p-2 hover:bg-surface-container-high rounded-full transition-colors">refresh</button>
      </header>

      <main className="px-5 pt-8 space-y-6">
        {/* Challenge Header & Progress */}
        <section className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-label-md text-xs font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">castle</span>
              Level 4: The Deep Vaults
            </div>
            <h2 className="font-display-lg-mobile text-3xl font-bold text-on-surface">Chamber of Secrets</h2>
            <p className="text-sm text-on-surface-variant">Use the Lumos charm to reveal the hidden curriculum text etched into the ancient stone walls.</p>
          </div>
          
          {/* Hourglass Progress Indicator */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 shadow-sm w-full">
            <div className="relative w-8 h-12 flex flex-col justify-between items-center py-1">
              <div className="absolute inset-0 border-2 border-surface-tint rounded-lg opacity-20"></div>
              <span className="material-symbols-outlined text-surface-tint text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
              <div className="w-full h-1/2 bg-surface-tint/10 absolute bottom-0 rounded-b-lg"></div>
              <div className="absolute bottom-1 w-2 h-1/3 bg-surface-tint rounded-full opacity-60"></div>
            </div>
            <div>
              <div className="font-label-md text-xs font-bold text-on-surface-variant">DECODING PROGRESS</div>
              <div className="text-xl font-bold text-surface-tint">64%</div>
            </div>
          </div>
        </section>

        {/* The Chamber Canvas */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Carving Wall */}
          <div className="relative bg-stone-900 rounded-2xl overflow-hidden min-h-[300px] border-4 border-surface-dim shadow-lg">
            <img className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQoR0D0OrMVi-gCvObKS2SY4p0ynzA6_5nCEkPULfgy2Vvad45Azd04T9ApgKBKa9KXYjis5LUGSjM7tArmgtUD-7EgLwOAH7h3Wi3d_tgz1WUS3WrrB3kOP_eANGXq57LfvcKKfhjAuEbJJCAWL9tjE_VFJSFDSFzxHJfVqV1AyRi82VdDyA67kt93mfAy1VBgDziSgWpqMMA7avAQtywIPEQ8FHA15cSMyEpDAHU8BGZ8tygWOgLOlTxddHHwKIQHIPDfeSfvUc" alt="Cavern Wall"/>
            
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Active Discovery Area 1 */}
            <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" style={{ boxShadow: '0 0 40px 20px rgba(212, 175, 55, 0.15)' }}></div>
            <div className="absolute top-8 left-8 p-4 z-10">
              <p className="text-[#fff8f7] font-bold text-lg leading-relaxed opacity-90 drop-shadow-md">
                "The <span className="text-secondary font-bold underline decoration-wavy">serpent</span> speaks only to those who listen with the heart..."
              </p>
            </div>
            
            {/* Active Discovery Area 2 */}
            <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-surface-tint/5 blur-3xl" style={{ boxShadow: '0 0 40px 20px rgba(212, 175, 55, 0.15)' }}></div>
            <div className="absolute bottom-8 right-4 p-4 z-10 text-right max-w-[200px]">
              <p className="text-[#fff8f7] text-sm italic opacity-40 hover:opacity-100 transition-opacity duration-500">
                ...the ancient text continues here in faint scratches...
              </p>
            </div>
            
            {/* Floating Particle Sparks */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-20 w-1 h-1 bg-surface-tint rounded-full animate-pulse shadow-[0_0_8px_#a83730]"></div>
              <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-surface-tint rounded-full opacity-40 shadow-[0_0_10px_#a83730]"></div>
            </div>
            
            {/* Interactive Instruction Overlay */}
            <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-xs">touch_app</span>
              <span className="text-white text-[10px] font-bold uppercase tracking-tighter">Tap the shadows to cast Lumos</span>
            </div>
          </div>

          {/* Sidebar Context Elements */}
          <div className="flex flex-col gap-4">
            {/* Clue Scrap */}
            <div className="p-5 border border-outline-variant shadow-sm rotate-1" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 94%, 75% 98%, 70% 95%, 65% 99%, 60% 94%, 55% 98%, 50% 95%, 45% 99%, 40% 94%, 35% 98%, 30% 95%, 25% 99%, 20% 94%, 15% 98%, 10% 95%, 5% 99%, 0% 95%)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-surface-tint">description</span>
                <h3 className="text-lg font-bold text-on-surface">Curriculum Note</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Evan's Guide to Ancient Runes suggests that <span className="bg-primary-container/10 px-1 rounded font-bold">Sibilant Sounds</span> are key to unlocking the chamber's primary seals.
              </p>
              <div className="mt-4 pt-4 border-t border-dashed border-outline-variant flex flex-wrap gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold">Sibilance</span>
                <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold">Unlocking</span>
              </div>
            </div>

            {/* Fawkes Call to Action */}
            <div className="bg-surface-container-highest rounded-2xl p-5 flex items-center justify-between gap-4 border border-surface-tint/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center relative shadow-inner">
                  <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>raven</span>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-surface-container-highest">!</div>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Stuck in the dark?</h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Consult Fawkes.</p>
                </div>
              </div>
              <button className="material-symbols-outlined bg-primary text-white p-2 rounded-full hover:bg-surface-tint transition-colors">
                help
              </button>
            </div>
          </div>
        </div>

        {/* Input Section (Decoding Area) */}
        <section className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant shadow-sm mt-4">
          <div className="space-y-4">
            <h3 className="text-center font-bold text-xl text-on-surface">Decrypt the Message</h3>
            <div className="relative">
              <input 
                className="w-full bg-transparent border-b-2 border-outline focus:border-surface-tint transition-colors py-3 px-2 text-lg font-bold text-center text-on-surface placeholder:text-outline-variant outline-none" 
                placeholder="Type the revealed phrase..." 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={handleSubmit} className="w-full py-3 rounded-full bg-secondary text-on-secondary font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
                SUBMIT DECODING
              </button>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

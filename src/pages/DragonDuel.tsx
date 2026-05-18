import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';

export default function DragonDuel() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'Amazing') {
      setTimeout(() => navigate('/victory'), 1000);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden pb-32" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#ead5d5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* Top AppBar */}
      <header className="bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 max-w-[390px] mx-auto">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="font-display-lg-mobile text-xl font-bold text-primary drop-shadow-sm leading-tight">Mystic Academy</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-label-md text-sm text-on-surface">Year 7</p>
            <p className="font-caption text-xs text-secondary">Student Wizard</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-high flex items-center justify-center overflow-hidden shrink-0">
            <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvyESdevA1ixT1aspFDVZfVxnVDJwS-q89cDCU-Q1ZDL3JgxIM8rR2YrD0t7QwrYSesy69GrDaIZHHW3avu6q8NdY16h8AdR8fhiKk9dNUsj9CCzaYxbPo43uGwgLxG-bS7TUfzkU2ZNhFGi9pGYAjh9EJew_JYydS9lw4wnO-W1p8EXI0JSPjDW8Ore6qqQ4NjMK2ebRS8KCiQJF8Sf_pAGzEjmx400douwI9W-3xZ-D3Y0DT-Efc_h7WeTz0CKQSnhq3Ss27EYY"/>
          </div>
        </div>
      </header>

      <main className="max-w-[390px] mx-auto px-6 py-6">
        {/* Game Stage Heading */}
        <div className="mb-6 text-center">
          <h2 className="font-headline-md text-xl font-bold text-primary mb-2 leading-tight">Vòng 1: Đối đầu Rồng Đuôi Gai</h2>
          <div className="flex justify-center items-center gap-3">
            <div className="h-[2px] w-8 bg-outline-variant"></div>
            <p className="font-label-md text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Thử thách từ vựng</p>
            <div className="h-[2px] w-8 bg-outline-variant"></div>
          </div>
        </div>

        {/* Cinematic Mini-Game Canvas */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-[#D4C5A1] mb-8 bg-surface-dim">
          {/* Background Image */}
          <img className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCakH5Mbhc_U8GibA-NIrnTZMwfMyG7EnZZT10KA4WTjbURHFGSe9DYot_NL06b0xptcJzUsmRo4LXByNZA76uDYu1fdOMfUdUAPa5Disj8RiU8HN8-cvqLBez4S3pH-yrUGIBVdaImgCL1WfHLCYfxMGh-db97PI_UkDmgAXYB0fHjbvPzYk6QmGKaSNULeKknSmEYxQsgMH6VeLhIvbWDxtMl4AQt5lrYqAMVQsCnPfLOZXTC4chaeS2lhtyaDxL2VhTGnZ9RbP8"/>
          
          {/* Progress Overlay: The Hourglass Style */}
          <div className="absolute top-4 right-4 flex flex-col items-center">
            <div className="w-8 h-16 bg-surface-container/40 backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-end p-1">
              <div className="w-full h-[60%] rounded-full shadow-[0_0_15px_#D4AF37]" style={{ background: 'linear-gradient(to top, #D4AF37, #F1D592)' }}></div>
            </div>
            <span className="font-caption text-[9px] text-white mt-1 drop-shadow-md font-bold">Tiến độ</span>
          </div>

          {/* The Word Shield */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-primary/90 p-4 rounded-full border-4 border-[#D4AF37] flex flex-col items-center justify-center w-48 h-48" style={{ boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}>
              <span className="font-label-md text-[10px] text-on-primary-container font-bold uppercase tracking-widest mb-1 text-center">Tìm từ đồng nghĩa</span>
              <h3 className="font-display-lg text-2xl font-bold text-center leading-tight drop-shadow-md" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F1D592 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>STUPENDOUS</h3>
              <div className="mt-2 flex gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[#D4AF37] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[#D4AF37] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Options: Magical Bubbles */}
        <div className="grid grid-cols-2 gap-4 px-2">
          {['Ordinary', 'Amazing', 'Simple', 'Boring'].map((option, index) => {
            const letters = ['A', 'B', 'C', 'D'];
            const isSelected = selectedAnswer === option;
            const isCorrect = option === 'Amazing';
            
            let btnClasses = "group relative flex flex-col items-center justify-center py-4 px-2 bg-surface-container rounded-full border-2 transition-all duration-300 active:scale-95";
            let fillWidth = "w-0";
            
            if (isSelected) {
              if (isCorrect) {
                btnClasses += " border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]";
                fillWidth = "w-full";
              } else {
                btnClasses += " border-error bg-error-container";
              }
            } else {
              btnClasses += " border-outline-variant hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]";
            }

            return (
              <button 
                key={option} 
                onClick={() => handleAnswer(option)}
                className={btnClasses}
              >
                <div className="absolute -top-1 -left-1 bg-secondary text-on-secondary rounded-full w-6 h-6 flex items-center justify-center font-bold text-[10px] border border-white/30">{letters[index]}</div>
                <span className={`font-headline-sm text-sm font-bold ${isSelected && isCorrect ? 'text-primary' : 'text-on-surface'} group-hover:text-primary transition-colors`}>{option}</span>
                {isSelected && isCorrect && (
                  <div className="absolute -inset-1 border border-dashed border-[#D4AF37]/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
                )}
                <div className="w-16 h-1 bg-outline-variant/30 mt-1 rounded-full overflow-hidden">
                  <div className={`${fillWidth} group-hover:w-full h-full bg-[#D4AF37] transition-all duration-500`}></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Hint Card */}
        {showHint ? (
          <div className="mt-8 bg-surface-container-high border border-outline-variant p-4 rounded-xl shadow-sm flex items-start gap-4 animate-fade-in" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 96%, 77% 98%, 73% 94%, 70% 97%, 65% 95%, 60% 99%, 55% 96%, 50% 98%, 45% 95%, 40% 99%, 35% 96%, 30% 98%, 25% 95%, 22% 99%, 18% 96%, 15% 98%, 10% 94%, 5% 97%, 0% 95%)' }}>
            <div className="w-12 h-12 shrink-0 bg-primary-container rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[#D4AF37] text-2xl">auto_fix_high</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-primary mb-1 leading-tight">Gợi ý của Giáo sư</h4>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">"Stupendous" mô tả điều gì đó phi thường hoặc tuyệt vời đến mức đáng ngạc nhiên. Hãy nghĩ đến cảnh tượng khi một chú rồng phun lửa xanh!</p>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
             <button 
              onClick={() => setShowHint(true)}
              className="text-primary text-sm font-bold flex items-center gap-1 opacity-70 hover:opacity-100"
             >
               <span className="material-symbols-outlined text-sm">help</span> Xem gợi ý
             </button>
          </div>
        )}
      </main>

      <BottomNavBar />

      {/* Contextual FAB */}
      <button 
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center text-[#D4AF37] border-2 border-[#D4AF37] hover:scale-110 active:scale-95 transition-transform z-40"
        style={{ boxShadow: '0 10px 25px rgba(81,0,3,0.5)' }}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
      </button>
    </div>
  );
}

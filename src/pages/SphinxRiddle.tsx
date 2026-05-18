import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';

export default function SphinxRiddle() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'A Spider') {
      setTimeout(() => navigate('/victory'), 1000);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-[max(884px,100dvh)] flex flex-col overflow-hidden pb-32">
      {/* TopAppBar Section */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 max-w-[390px] mx-auto left-0 right-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-outline-variant shrink-0">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb7WPnuHHDgv3ZdXKTvfSUHexvnwxm9g1bpbxBePfGnmUw9DNYn7RLSwmvsYYuH7atsEp3ihpBbEMLtYZi0aOw7fBy24AI06KWeOg3a_RTFmvnQT5XwZcY6uTB895nFNWZGIlrmEWLzFpxhpfN6ZOXNVPQuz8olTvjJMJhQFy4ixKo_UzKdsZPmBiikh4NUFbIBkcQkysecZLMxtGrjoM6s2yTaofb3M2Rc3DULfxGaXGsG4QnomAHxaqeGNUlpSThN2TDLDuNMso"/>
          </div>
          <h1 className="font-display-lg-mobile text-xl font-bold text-surface-tint tracking-tight leading-tight">Mystic Academy</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-surface-tint hover:bg-surface-container-high transition-colors active:scale-95 duration-150 shrink-0">
          <span className="material-symbols-outlined">storm</span>
        </button>
      </header>

      {/* Game Canvas */}
      <main className="flex-1 pt-24 pb-12 flex flex-col items-center relative overflow-hidden px-6 w-full max-w-[390px] mx-auto">
        {/* Background Environment (Hedge Walls) */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1a2e] to-[#0d1b11]">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img alt="Third Task Maze" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATvOXDFWE9iQNbq9eh7Zio3mU7dP1NqXj-K54sb2eNkTgXBNMcfLwnzrf7PvgBtMilb0Y6_Svo9-sUI3R_gezUnkByG_2JtvBkEFB6CNvRnsRVYYMsFZCnr7m4HkfdesReSg-M_JuppcPR-ZlDPHKZyqJTfxJhDN_HKlOjbkcjc7Arw2-2ygB1K7dnUxzd0fAzT05PaSpFY4GykOmsJU2NRXrDijUlJAvaqfZMEtrx5yN4I908Z-659e63ORlSfWo6lQ_D563N6xg"/>
          </div>
          {/* Glowing Particle Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#D4AF37] rounded-full blur-[1.5px] opacity-60"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"></div>
          </div>
        </div>

        {/* The Sphinx Section */}
        <section className="flex-grow w-full flex flex-col items-center justify-center gap-8 pt-4">
          {/* Distance Goal: The Triwizard Cup */}
          <div className="relative mb-2">
            <div className="w-24 h-24 bg-surface-tint/20 rounded-full blur-3xl absolute -inset-4 animate-pulse"></div>
            <img alt="Triwizard Cup" className="w-16 h-16 drop-shadow-[0_0_15px_#D4AF37]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_-YBWzFuyU_o1GoG1CmP1Q_2YCSgbfNiRwJh4_Io4UmTk24Jd7XgD2ys3dw46pllQfOKKzbhHbQgHwVmY8B6uR79EpM5SbA1s2tfxtFXdQ2PmVQP3JPqT9823Re9HrOQ6DzKiXOIVMNPdXvKDtShOv6QjQIEc0rzqmg2DgkbF3MGlxxoInNfl5g80zvOnHB_pbYNpTj3LgH4pl8snSmFjzzXD504GqfEoL3yiHWrC0ofzEPk-D0xYF0B7_8rFjV07B2_MwoCYEYY"/>
          </div>

          {/* Majestic Sphinx Interaction */}
          <div className="relative w-full flex flex-col items-center">
            {/* Riddle Bubble (Parchment Scrap) */}
            <div className="relative p-6 rounded-xl shadow-lg w-full border border-outline-variant mb-6" style={{ backgroundColor: '#fff8f7', backgroundImage: 'linear-gradient(to bottom right, #fff8f7, #fff0f0)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 96%, 77% 98%, 73% 94%, 70% 97%, 65% 95%, 60% 99%, 55% 96%, 50% 98%, 45% 95%, 40% 99%, 35% 96%, 30% 98%, 25% 95%, 22% 99%, 18% 96%, 15% 98%, 10% 94%, 5% 97%, 0% 95%)' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-[#D4AF37] shadow-lg">
                <span className="material-symbols-outlined text-[#D4AF37] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
              </div>
              <p className="font-headline-sm text-base text-on-surface-variant text-center italic mt-2 font-bold leading-relaxed">
                "First think of the person who lives in disguise...<br/>Then tell me what's the creature?"
              </p>
            </div>

            {/* Multiple Choice Answers */}
            <div className="w-full flex flex-col gap-3">
              {['A Spy', 'A Spider', 'A Boggart', 'A Dementor'].map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === 'A Spider';
                let btnStyle = "bg-surface-container-highest/80 text-on-surface";
                if (isSelected) {
                  btnStyle = isCorrect ? "bg-secondary text-white border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "bg-error text-white";
                }

                return (
                  <button 
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-3 px-6 rounded-full font-label-md text-sm font-bold tracking-wider uppercase backdrop-blur-sm border border-outline-variant/30 active:scale-95 transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

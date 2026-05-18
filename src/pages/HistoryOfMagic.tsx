import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function HistoryOfMagic() {
  const navigate = useNavigate();
  const { wisdom, addWisdom, addXp } = useGameStore();
  const [progress, setProgress] = useState(35);
  const [milestone1Solved, setMilestone1Solved] = useState(false);

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      addWisdom(50);
      addXp(200);
      setProgress(50);
      setMilestone1Solved(true);
      alert("Lựa chọn xuất sắc! +50 Wisdom, +200 XP");
    } else {
      alert("Quyết định này có thể gây ra chiến tranh! Hãy suy nghĩ lại con đường hòa bình hơn.");
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col pb-24" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 197, 161, 0.1) 0%, transparent 100%)' }}>
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full max-w-[390px] mx-auto left-0 right-0 z-50 flex justify-between items-center px-6 py-2 bg-surface dark:bg-surface-dim shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant border-2 border-primary/20 shrink-0">
            <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANYqd6QKyzSnZxRH3MIrUnE69lQDOxWRDpISInPmjK6qhx2tNb2R2osjhC1RVj78v8sL4KR7fawFHLLgNuJgSMx44axVNZ7n9E--MO0Er4jg7K0U1NCfehyuUNBydxBrLd7hX8kpXAOCio0jgh66iBHDOzYZpByoWIlm-WbkSIZCIvL0oal8XvnA5saM1-d0veRY3RKh1geIZib46kQaiGPqZ1e0epVnHgXesUgZQsLvO_uZu3GGz8b3o9Hp09TSprnaBNjPmVWyk"/>
          </div>
          <h1 className="font-headline-md text-xl font-bold text-primary dark:text-on-primary-container leading-tight">Mystic Academy</h1>
        </div>
        <div className="flex items-center">
          <span className="font-headline-md text-xs font-bold text-primary dark:text-primary-container px-3 py-1 rounded-full bg-surface-container whitespace-nowrap">Year 1</span>
        </div>
      </nav>

      <main className="flex-1 pt-20 px-6 max-w-[390px] mx-auto w-full relative">
        {/* Hero Section: Professor Binns */}
        <section className="relative mb-6 mt-2">
          <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant bg-surface-container-low aspect-video relative">
            <img alt="Magical Classroom" className="w-full h-full object-cover opacity-60 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzzKVs4x1qU-njFnui7Ah6afsYao-zZn65akjVzAuePGee2gT20y1tiSFYR6wzwicUtfLaZ6c-bFK9mN2gxc51H7qS7TaHbEngRkeIT5pPtPkAruHrtJAg6aUla3pmevtEkSeIWznAhdBLepKNgiwwIz3OlEBBmnNpiAfcRCOY8X8rFRJq3eENksvBAqvztPe-6QmW24EvHCxQ021ZU96HYLdqTjFfEoFFOIsI5U5V_7xfuuei6ENOGJ2kM6IfylNeoDdFWE5bJYw"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h2 className="font-display-lg-mobile text-2xl font-bold text-primary mb-1 leading-tight">History of Magic</h2>
              <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed">"Why did the Great Goblin Rebellion truly begin?"</p>
            </div>
          </div>
        </section>

        {/* Wisdom Points Counter */}
        <div className="flex justify-center mb-6">
          <div className="bg-tertiary-container px-6 py-2 rounded-full border border-tertiary shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="font-label-md text-xs font-bold text-on-tertiary-container uppercase tracking-widest whitespace-nowrap">Wisdom: {wisdom}</span>
          </div>
        </div>

        {/* The Decision Timeline */}
        <div className="relative space-y-6">
          {/* Timeline Path */}
          <div className="absolute left-[14px] top-0 bottom-0 w-1 bg-outline-variant/30 rounded-full"></div>
          
          {/* Milestone 1 */}
          <div className="relative pl-10">
            <div className="absolute left-[-2px] top-2 w-5 h-5 rounded-full bg-secondary shadow-md border-4 border-surface z-10"></div>
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm" style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}>
              <span className="font-label-md text-[10px] font-bold text-secondary mb-1 block">1612: The Hogsmeade Dispute</span>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-3 leading-tight">A goblin merchant demands entrance to the Three Broomsticks. What is the most 'peaceful' action?</h3>
              
              {/* Interactive Decision Scrolls */}
              {!milestone1Solved ? (
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <button onClick={() => handleChoice(true)} className="flex items-center text-left p-3 rounded-lg border border-outline-variant hover:bg-secondary-container/30 hover:border-secondary transition-all active:scale-95 group">
                    <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary mr-3 group-hover:scale-110 transition-transform shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),3px_3px_8px_rgba(60,47,47,0.2)]">
                      <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                    </span>
                    <div>
                      <p className="font-body-md text-xs text-on-surface leading-tight">Offer a dedicated trade zone outside the pub.</p>
                      <p className="font-caption text-[10px] text-on-surface-variant italic mt-1">+50 Wisdom</p>
                    </div>
                  </button>
                  <button onClick={() => handleChoice(false)} className="flex items-center text-left p-3 rounded-lg border border-outline-variant hover:bg-secondary-container/30 hover:border-secondary transition-all active:scale-95 group">
                    <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary mr-3 group-hover:scale-110 transition-transform shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),3px_3px_8px_rgba(60,47,47,0.2)]">
                      <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                    </span>
                    <div>
                      <p className="font-body-md text-xs text-on-surface leading-tight">Ignore the request and send more Aurors.</p>
                      <p className="font-caption text-[10px] text-on-surface-variant italic mt-1">+0 Wisdom (Risk of War)</p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-secondary-container text-on-secondary-container rounded-lg border border-secondary text-sm font-bold text-center">
                  Solved! Wisdom Awarded.
                </div>
              )}
            </div>
          </div>
          
          {/* Milestone 2 */}
          <div className={`relative pl-10 transition-opacity duration-500 ${milestone1Solved ? 'opacity-100' : 'opacity-60'}`}>
            <div className={`absolute left-[-2px] top-2 w-5 h-5 rounded-full shadow-sm border-4 border-surface z-10 ${milestone1Solved ? 'bg-secondary' : 'bg-outline-variant'}`}></div>
            <div className="bg-surface-container p-4 rounded-xl border border-dashed border-outline-variant">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface-variant">The Wand Ban of 1631</h3>
                <span className="material-symbols-outlined text-on-surface-variant">{milestone1Solved ? 'lock_open' : 'lock'}</span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mt-2">
                {milestone1Solved ? "Explore the consequences of the Wand Ban..." : "Solve the previous dilemma to unlock this history scroll."}
              </p>
              {milestone1Solved && (
                <button 
                  onClick={() => navigate('/victory')}
                  className="mt-3 w-full bg-primary text-white py-2 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  Enter Milestone
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Component: Scroll of Progress */}
        <div className="mt-8 p-4 bg-surface-container-high rounded-xl border-t-2 border-primary/10 relative overflow-hidden">
          <div className="flex justify-between items-end">
            <div>
              <h4 className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase mb-1">Lesson Progress</h4>
              <p className="font-headline-sm text-sm font-bold text-primary">Chapter: Early Rebellions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-12 relative bg-surface-variant rounded-full overflow-hidden border border-outline shadow-[inset_0_2px_4px_rgba(60,47,47,0.15)]">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#D4AF37] to-[#FCF6BA] transition-all duration-1000" style={{ height: `${progress}%` }}></div>
              </div>
              <span className="font-caption text-[10px] text-on-surface-variant mt-1">{progress}%</span>
            </div>
          </div>
          {/* Enchantment effect */}
          <div className="absolute top-0 right-0 p-4">
            <span className="material-symbols-outlined text-primary/20 scale-150 animate-pulse">auto_fix_high</span>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

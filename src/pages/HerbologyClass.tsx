import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function HerbologyClass() {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const { addXp, addGold, greenThumbLevel } = useGameStore();

  const handleHarvest = () => {
    if (selectedPart === 'roots') {
      addXp(120);
      addGold(50);
      alert("Thu hoạch thành công! +120 XP, +50 Gold");
      navigate('/victory');
    } else if (selectedPart) {
      alert("Bạn cần nhổ Rễ (Roots) mới đúng!");
    } else {
      alert("Hãy chọn một bộ phận để tương tác trước.");
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24 flex flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container dark:bg-surface-container-high shadow-sm flex justify-between items-center w-full max-w-[390px] mx-auto left-0 right-0 px-6 h-16 fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm shrink-0">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnYZtB8XkbtEeFEpEVN25x0teI3tMBf522ifrx8bqJkNYgn_FEh5y8_cfovIpWD6gZG1MzGoFAJPKVvOXmvgXor8xOHFpIaHBB6Vzn-ZwHf-5Ktey4yed4NdCvAEWm8NLN0FigGze6bBPAkhfdbb6Cy4WMP5UsS_RU38L48aKmz4OkDP_gzt_Qg5I7XmN_yqmxFCv7DKIgIhP90tzZa1bYRk17uRT4CH0LuQxEIDr2awAnGmBxhFTTq372bSwRS8iTu1-SQA25G4o"/>
          </div>
          <h1 className="font-headline-md text-xl font-bold text-primary drop-shadow-sm leading-tight">Mystic Academy</h1>
        </div>
        <div className="px-3 py-1 rounded-full border border-primary bg-primary-container/10">
          <span className="font-label-md text-[10px] font-bold text-primary whitespace-nowrap">Year 2</span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[390px] mx-auto px-6 pt-20">
        {/* Professor Sprout & Greenhouse Section */}
        <section className="relative rounded-xl overflow-hidden bg-surface-container-high shadow-sm mb-6">
          <div className="h-48 relative">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3xIuFNqYMBjHhHEq-1vYCpYxDiTDb5d4lvLU0eguSRYcP3VIEMFjDpv3rJG1uiGBpCxmu1GBdytpqTYr-CqfI6daUU-9EdHicXORZRrCDHS8_YOmjRLke9wq9l9wTPmXP3Y9LRAazvzx0ekP2aNKxduTgUmrhopy0ASZdscdkFQQw6U0qzb2vKhD3qyAagveePXSavriOPhWaqnIjnqiW1gH8ATi61hh4sODLxAjUbnLIqW2IAyXo0GorWLYyZ3XdJNBuk9Ga0A"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-headline-md text-2xl font-bold text-white leading-tight drop-shadow-md">Herbology Class</h2>
              <p className="font-body-md text-sm text-white/90">Greenhouse Three</p>
            </div>
          </div>
          <div className="p-4 bg-surface-container-high" style={{ maskImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 100 10\' preserveAspectRatio=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M0 10 L5 8 L10 10 L15 7 L20 10 L25 9 L30 10 L35 7 L40 10 L45 8 L50 10 L55 9 L60 10 L65 7 L70 10 L75 8 L80 10 L85 9 L90 10 L95 7 L100 10 Z\' fill=\'black\'/></svg>")', maskPosition: 'bottom', maskRepeat: 'no-repeat', maskSize: '100% 12px', paddingBottom: '24px' }}>
            <p className="font-body-md text-xs italic text-on-surface-variant leading-relaxed">
              "Welcome, students! Today we are re-potting Mandrakes. Careful now, ensure your earmuffs are tight. A Mandrake's cry can be fatal!"
            </p>
          </div>
        </section>

        {/* Progress Bar: Green Thumb Level */}
        <section className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-md text-xs font-bold text-secondary uppercase tracking-widest">Green Thumb</span>
            <span className="font-headline-sm text-sm font-bold text-primary">Level {greenThumbLevel}</span>
          </div>
          <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden p-0.5 border border-outline-variant shadow-inner">
            <div className="h-full rounded-full relative overflow-hidden transition-all duration-1000" style={{ width: '65%', background: 'linear-gradient(90deg, #D4AF37 0%, #FFF8E1 50%, #D4AF37 100%)', backgroundSize: '200% auto' }}>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:8px_8px]"></div>
            </div>
          </div>
          <p className="text-caption text-[10px] text-on-surface-variant mt-1">120 XP to next mastery</p>
        </section>

        {/* Main Game Area: Bento Grid Layout */}
        <section className="space-y-4 mb-6">
          {/* Game Title Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychiatry</span>
              <h3 className="font-headline-md text-lg font-bold text-primary">Mandrake Re-potting</h3>
            </div>
            <p className="font-body-md text-xs text-on-surface mb-4 leading-relaxed">
              Match the magical plant parts to their correct names and properties to successfully re-pot the Mandrake.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Part Matcher Cards */}
              <button 
                onClick={() => setSelectedPart('roots')}
                className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${selectedPart === 'roots' ? 'border-secondary bg-secondary-container text-secondary shadow-md' : 'border-dashed border-outline-variant bg-surface-container hover:bg-surface-variant text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined text-3xl mb-1">potted_plant</span>
                <span className="font-label-md text-xs font-bold">Rễ (Roots)</span>
              </button>
              <button 
                onClick={() => setSelectedPart('leaves')}
                className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${selectedPart === 'leaves' ? 'border-secondary bg-secondary-container text-secondary shadow-md' : 'border-dashed border-outline-variant bg-surface-container hover:bg-surface-variant text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined text-3xl mb-1">eco</span>
                <span className="font-label-md text-xs font-bold">Lá (Leaves)</span>
              </button>
            </div>
          </div>

          {/* Screaming Meter Card */}
          <div className="bg-primary-container text-on-primary rounded-xl p-4 shadow-md flex flex-col justify-between">
            <div className="mb-3">
              <h4 className="font-label-md text-[10px] font-bold uppercase tracking-wider mb-2 opacity-80">Screaming Level</h4>
              <div className="flex gap-1">
                <span className="material-symbols-outlined text-on-primary">volume_up</span>
                <span className="material-symbols-outlined text-on-primary">volume_up</span>
                <span className="material-symbols-outlined text-on-primary animate-pulse text-red-300">volume_up</span>
                <span className="material-symbols-outlined text-on-primary/30">volume_up</span>
                <span className="material-symbols-outlined text-on-primary/30">volume_up</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
              <p className="font-label-md text-xs font-bold text-center">Tiếng thét chết người</p>
              <p className="text-caption text-[10px] text-center opacity-70 italic">(Fatal Scream)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center py-2">
            <button className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-on-primary hover:scale-105 active:scale-95 transition-transform" style={{ background: 'linear-gradient(135deg, #741010 0%, #510003 100%)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), 2px 4px 8px rgba(60,47,47,0.3)' }}>
              <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
              <span className="font-label-md text-[10px] font-bold uppercase">Water</span>
            </button>
            <button 
              onClick={handleHarvest}
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-on-primary hover:scale-105 active:scale-95 transition-transform bg-primary" 
              style={{ background: 'linear-gradient(135deg, #741010 0%, #510003 100%)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), 2px 4px 8px rgba(60,47,47,0.3)' }}
            >
              <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
              <span className="font-label-md text-[10px] font-bold uppercase">Harvest</span>
            </button>
          </div>
        </section>

        {/* Details / Lore Section */}
        <section className="bg-surface-container-low p-5 rounded-xl border border-outline-variant relative overflow-hidden mb-8 shadow-sm">
          <div className="absolute -top-4 -right-4 opacity-5">
            <span className="material-symbols-outlined text-9xl">menu_book</span>
          </div>
          <h3 className="font-headline-sm text-sm font-bold text-secondary mb-3">Herbology Notebook</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-outline-variant/50 pb-2">
              <span className="font-label-md text-[11px] font-bold text-primary w-20">Botanical:</span>
              <span className="font-body-md text-xs">Mandragora</span>
            </div>
            <div className="flex items-center gap-2 border-b border-outline-variant/50 pb-2">
              <span className="font-label-md text-[11px] font-bold text-primary w-20">Appearance:</span>
              <span className="font-body-md text-xs">Small, baby-like root</span>
            </div>
            <div className="flex items-center gap-2 border-b border-outline-variant/50 pb-2">
              <span className="font-label-md text-[11px] font-bold text-primary w-20">Medicinal:</span>
              <span className="font-body-md text-xs">Restorative Draught</span>
            </div>
            <div className="flex items-center gap-2 border-outline-variant/50">
              <span className="font-label-md text-[11px] font-bold text-primary w-20">Caution:</span>
              <span className="font-body-md text-xs font-bold text-error">Wear Earmuffs</span>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

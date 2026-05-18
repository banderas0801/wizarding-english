import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function Transfiguration() {
  const navigate = useNavigate();
  const [selectedCreature, setSelectedCreature] = useState<string | null>(null);
  const { addXp, addGold } = useGameStore();

  const handleCastSpell = () => {
    if (selectedCreature !== null) {
      addXp(150);
      addGold(40);
      alert("Biến hình thành công! +150 XP, +40 Gold");
      navigate('/victory');
    } else {
      alert("Hãy chọn một vật thể để biến hình trước!");
    }
  };

  const creatures = [
    { name: 'Con Rùa', icon: 'Circle' },
    { name: 'Chuột Cống', icon: 'pet_supplies' },
    { name: 'Sóc Nhỏ', icon: 'pest_control_rodent' },
    { name: 'Quạ Đen', icon: 'raven' }
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pb-32" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* Top Navigation Anchor */}
      <header className="bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] h-16 flex justify-between items-center w-full px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">menu</span>
          <h1 className="font-display-lg-mobile text-xl font-bold text-primary drop-shadow-sm leading-tight">Lớp Biến Hình</h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm shrink-0">
          <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnOHN1KGIp2jLyLpxXCWTpygK_rXws8o0zk-3PPsvSwESmK_LHO-41Gu7ioNO39gAbj08M5IBFNywNekLVZ3MG2x37SwQuJtt6fgo2AREQd9xeJ3UdSbSSosiJqwAan7kHeZ7G1p2_W16ewiertDcayK7fcLXdoPqjzADXIIEVlcj_9iyrMlUyKUYqGPs9rkKPdTbiaO3ym3lOLW9ZIJOopSKnYIXbeBrEb2oz0RZqcmI4yMiOrn8QV1HfFAThSaI8mV6vZNnZ5og"/>
        </div>
      </header>

      <main className="flex-grow px-6 py-6 flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Classroom Context */}
        <section className="w-full max-w-2xl mb-8 relative">
          <div className="bg-surface-container-low p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-6 items-center" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 98%, 95% 94%, 92% 99%, 88% 94%, 85% 97%, 80% 95%, 75% 99%, 70% 94%, 65% 98%, 60% 95%, 55% 97%, 50% 94%, 45% 99%, 40% 95%, 35% 97%, 30% 94%, 25% 99%, 20% 95%, 15% 97%, 10% 94%, 5% 99%, 0% 95%)' }}>
            <div className="w-24 h-24 flex-shrink-0 bg-surface rounded-full border-4 border-secondary p-1 overflow-hidden shadow-inner">
              <img alt="Professor McGonagall" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn_3-Zkwl0JfX_fQ_z0qAF88ym4oe0utHQcXJtnOj5EthVCbM3YekvREOIFdFZzuzrAgnsiIEdQU8cWicJ4FsT_lMR0Ns-Z0Z3ibVesl6ZKc9p7g_rlaZdayvx13kACKJeQHpVGJ7mgvkyuQoaxuYVqg-igZWi8GUdcmwKnnx2noroBi1Epc5K4K-PsGCX3DPk-42vElhI8Db15ArtRah_faFLctUUy-yX4etla7OJQqbRJ_3ac667de3xVIyeWxChFzV4MOadhJw"/>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="font-headline-md text-xl font-bold text-primary mb-1 leading-tight">Giáo sư McGonagall</h2>
              <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed">"Hãy tập trung, các trò. Một cái bẫy tinh vi của từ ngữ có thể biến ấm trà này thành một sinh vật kỳ diệu!"</p>
            </div>
          </div>
        </section>

        {/* Main Game Canvas */}
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side: Source Object */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {/* Magical Aura Effect */}
              <div className="absolute -inset-4 bg-tertiary-fixed opacity-20 blur-2xl rounded-full"></div>
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-surface-container-highest rounded-full flex items-center justify-center border-4 border-primary-container shadow-2xl">
                <span className="material-symbols-outlined text-[80px] sm:text-[120px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>skillet</span>
                {/* Label Ribbon */}
                <div className="absolute -bottom-4 bg-secondary text-on-secondary px-6 py-2 rounded-full font-label-md text-xs sm:text-sm font-bold shadow-md border-2 border-secondary-fixed tracking-widest whitespace-nowrap">
                  ẤM PHA TRÀ
                </div>
              </div>
            </div>
            <div className="text-center pt-2">
              <p className="font-label-md text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Vật thể hiện tại</p>
              <h3 className="font-headline-sm text-lg font-bold text-primary">Ấm Pha Trà</h3>
            </div>
          </div>

          {/* Right Side: Interaction / Options */}
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="bg-surface-container-high p-6 rounded-xl shadow-lg border border-outline-variant relative">
              {/* Progress Hourglass */}
              <div className="absolute -right-3 -top-3 w-10 h-16 bg-surface-container-lowest rounded-full border-2 border-outline-variant flex flex-col justify-end p-1 shadow-md">
                <div className="bg-gradient-to-t from-tertiary to-tertiary-container w-full h-1/2 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:4px_4px]"></div>
                </div>
              </div>

              <h4 className="font-headline-sm text-base font-bold text-on-surface mb-4 text-center">Biến thành sinh vật nào?</h4>
              
              {/* Asymmetric Selection Grid */}
              <div className="grid grid-cols-2 gap-3">
                {creatures.map((creature) => {
                  const isSelected = selectedCreature === creature.name;
                  
                  return (
                    <button 
                      key={creature.name}
                      onClick={() => setSelectedCreature(creature.name)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all group ${isSelected ? 'bg-primary-container text-on-primary-container border-primary shadow-md ring-2 ring-tertiary-fixed' : 'bg-surface border-outline-variant hover:border-primary hover:bg-surface-container-highest text-on-surface'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform ${isSelected ? 'bg-primary text-on-primary shadow-inner group-hover:rotate-12' : 'bg-surface-container-low text-secondary group-hover:scale-110'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}>{creature.icon}</span>
                      </div>
                      <span className="font-label-md text-xs font-bold">{creature.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spell Casting Button (Wax Seal) */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleCastSpell}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-transform cursor-pointer relative shadow-xl border-4 border-transparent hover:scale-105 active:scale-95 ${selectedCreature ? 'opacity-100' : 'opacity-50 grayscale'}`}
                style={{ background: 'radial-gradient(circle at 30% 30%, #871f1c, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.2)' }}
                disabled={!selectedCreature}
              >
                <div className="absolute inset-2 border-2 border-dashed border-on-primary opacity-30 rounded-full"></div>
                <span className="material-symbols-outlined text-5xl text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                <div className="absolute -bottom-8 whitespace-nowrap font-display-lg-mobile text-lg font-bold uppercase drop-shadow-md" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F9E272 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Hô Biến!
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />

      {/* Enchantment Particles Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-40 z-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-[#D4AF37] rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-[#D4AF37] rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-1/3 left-3/4 w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px] animate-pulse"></div>
      </div>
    </div>
  );
}

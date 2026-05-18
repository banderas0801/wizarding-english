import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Inventory() {
  const navigate = useNavigate();
  const { inventory } = useGameStore();

  const getItemDetails = (id: string) => {
    switch(id) {
      case 'oak_wand': return { icon: 'auto_fix_normal', name: 'Oak Staff', color: 'text-secondary' };
      case 'robe_tier1': return { icon: 'checkroom', name: 'Silk Robe', color: 'text-tertiary' };
      case 'mana_potion': return { icon: 'liquor', name: 'Mana Elixir', color: 'text-on-tertiary-fixed-variant' };
      default: return { icon: 'star', name: 'Item', color: 'text-primary' };
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-28 font-body-md overflow-x-hidden max-w-[390px] mx-auto shadow-2xl relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#fcf5e5 15%, transparent 16%), radial-gradient(#fcf5e5 15%, transparent 16%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}>
      
      {/* TopAppBar */}
      <header className="bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] h-16 flex justify-between items-center w-full px-5 sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95" onClick={() => navigate(-1)}>arrow_back</span>
          <h1 className="font-display-lg-mobile text-lg text-primary drop-shadow-sm font-bold">Arcane Lexicon</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-md text-xs text-primary font-bold tracking-wide uppercase">Trunk</span>
          <button className="w-9 h-9 rounded-full border-2 border-primary overflow-hidden shadow-sm active:scale-95 transition-transform" onClick={() => navigate('/profile')}>
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRVzWzJXC40AKs1lAobVLPvx91KGn3ZBW1oBpB9xlVH7lyxjuYdr7IQ-kyVMeEaDiMdXPTf_71mdUke2U7ZXr0h2Dzr3LuKkEYe3y0zeEdeutumruwl5O3vpwQ4QsqJ_77eX-O1rmZNftWuBpCESn8kk08ieI4vZdzW_c2BCOcavj24k4W4EeGG58XmyIifwNkj-4GuegqV4AMFGjMQBmfo_hQAm9MuvXsouxS4YHbbaqkyJ21a-f-JiS0a2lymCm0DjJEPtZFmac"/>
          </button>
        </div>
      </header>

      <main className="pt-6 px-5 w-full flex flex-col gap-6 relative">
        {/* Character Display Section */}
        <section className="relative flex justify-center gap-3 w-full">
          {/* Equipment Slots Left */}
          <div className="flex flex-col justify-center gap-4 z-10 -mr-4">
            <div className="group relative">
              <div className="w-12 h-12 rounded-lg border border-outline-variant bg-surface-container-high flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)] shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>comedy_mask</span>
              </div>
              <span className="absolute -top-2 -right-1 bg-primary text-on-primary text-[8px] px-1.5 rounded-full font-bold border border-tertiary-fixed">Đầu</span>
            </div>
            <div className="group relative">
              <div className="w-12 h-12 rounded-lg border border-outline-variant bg-surface-container-high flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)]">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>checkroom</span>
              </div>
              <span className="absolute -top-2 -right-1 bg-primary text-on-primary text-[8px] px-1.5 rounded-full font-bold border border-tertiary-fixed">Thân</span>
            </div>
          </div>

          {/* Character Portrait */}
          <div className="relative z-0 w-40 h-56 shrink-0">
            <div className="w-full h-full bg-surface-container-highest rounded-t-full rounded-b-3xl border-[3px] border-outline shadow-xl overflow-hidden relative shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA45ScEOr2BvdijE9A0yEM7O3-tGi0TyDI_ABVqm9Xt0ea8NjBYXYVn4h5EOP2uMJAQ7j_EfDltFXF6SfCg4YyjBiucbrrF8qKyfVF70MJ6vFEErKsc3397dv5HUTB1fYHHNVXSr22CPjM5-VaK3-lyl-TqOm1p97Zizi4ITM0vgwLczALoml3dmKodm3tqmsWs6fi2QT9QXFXHGuVE6yo2BGJsI5pMjgNmhzvLX7EVl10nXnpgxmYyziFknfpUKpeBV1IeipkhUMI" alt="Apprentice Orion"/>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary/90 to-transparent p-3 text-center">
                <h2 className="font-headline-sm text-sm font-bold text-on-primary tracking-wide">Orion</h2>
              </div>
            </div>
            {/* Magical Particles */}
            <div className="absolute top-4 -left-2 w-3 h-3 bg-tertiary-fixed-dim rounded-full animate-pulse blur-[1px]"></div>
            <div className="absolute top-1/3 -right-2 w-2 h-2 bg-secondary-fixed rounded-full animate-bounce blur-[1px]"></div>
          </div>

          {/* Equipment Slots Right */}
          <div className="flex flex-col justify-center gap-4 z-10 -ml-4">
            <div className="group relative">
              <div className="w-12 h-12 rounded-lg border border-outline-variant bg-surface-container-high flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)]">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>pan_tool</span>
              </div>
              <span className="absolute -top-2 -left-1 bg-primary text-on-primary text-[8px] px-1.5 rounded-full font-bold border border-tertiary-fixed z-20">Tay</span>
            </div>
            <div className="group relative">
              <div className="w-12 h-12 rounded-lg border border-outline-variant bg-primary-container flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.1)] shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <span className="material-symbols-outlined text-on-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>wand_stars</span>
              </div>
              <span className="absolute -top-2 -left-1 bg-primary text-on-primary text-[8px] px-1.5 rounded-full font-bold border border-tertiary-fixed z-20">Đũa</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-surface-container border border-outline-variant/60 rounded-xl p-4 deckle-edge shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            {/* Power */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                <span className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Power</span>
              </div>
              <div className="relative w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[75%] bg-primary shadow-[0_0_8px_#D4AF37]"></div>
              </div>
              <span className="font-headline-sm text-sm font-bold text-primary">1,240</span>
            </div>
            {/* Defense */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-sm">shield</span>
                <span className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Defense</span>
              </div>
              <div className="relative w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[60%] bg-secondary shadow-[0_0_8px_#bdefc6]"></div>
              </div>
              <span className="font-headline-sm text-sm font-bold text-secondary">850</span>
            </div>
            {/* Mana */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-tertiary text-sm">auto_awesome</span>
                <span className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Mana</span>
              </div>
              <div className="relative w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[90%] bg-tertiary shadow-[0_0_8px_#bac5f4]"></div>
              </div>
              <span className="font-headline-sm text-sm font-bold text-tertiary">2,100</span>
            </div>
            {/* Speed */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-on-primary-container text-sm">speed</span>
                <span className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Speed</span>
              </div>
              <div className="relative w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[45%] bg-on-primary-container shadow-[0_0_8px_#ffdad6]"></div>
              </div>
              <span className="font-headline-sm text-sm font-bold text-on-primary-container">320</span>
            </div>
          </div>
        </section>

        {/* Inventory List */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-md text-base font-bold text-primary">Rương đồ ({inventory.length + 3}/50)</h3>
            <div className="flex gap-1.5">
              <button className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full border border-primary/20 font-label-md text-[10px] font-bold">All</button>
              <button className="bg-surface-container px-3 py-1 rounded-full border border-outline-variant font-label-md text-[10px] hover:bg-primary-fixed/50 transition-colors">Gear</button>
              <button className="bg-surface-container px-3 py-1 rounded-full border border-outline-variant font-label-md text-[10px] hover:bg-primary-fixed/50 transition-colors">Potions</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 shadow-inner">
            {/* Default Items */}
            <div className="aspect-square bg-surface-container rounded-lg border-2 border-primary-container p-1 flex flex-col items-center justify-center relative shadow-[0_0_10px_rgba(212,175,55,0.3)]" onClick={() => navigate('/equipment/wand')}>
              <span className="material-symbols-outlined text-primary text-2xl">wand_stars</span>
              <span className="text-[8px] mt-0.5 font-bold text-primary text-center leading-none">Elder Wand</span>
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary rounded-full border border-tertiary-fixed"></div>
            </div>
            <div className="aspect-square bg-surface-container rounded-lg border border-outline-variant p-1 flex flex-col items-center justify-center relative active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-primary text-2xl">potted_plant</span>
              <span className="text-[8px] mt-0.5 font-bold text-on-surface-variant text-center leading-none">Mandrake</span>
            </div>
            <div className="aspect-square bg-surface-container rounded-lg border border-outline-variant p-1 flex flex-col items-center justify-center relative active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-outline text-2xl">menu_book</span>
              <span className="text-[8px] mt-0.5 font-bold text-on-surface-variant text-center leading-none">Spellbook</span>
            </div>

            {/* Purchased Items */}
            {inventory.map((itemId, idx) => {
              const details = getItemDetails(itemId);
              return (
                <div key={idx} className="aspect-square bg-[#fdf3e7] rounded-lg border border-[#D4C5A1] p-1 flex flex-col items-center justify-center relative active:scale-95 transition-transform shadow-sm">
                  <span className={`material-symbols-outlined text-2xl ${details.color}`}>{details.icon}</span>
                  <span className="text-[8px] mt-0.5 font-bold text-primary text-center leading-none">{details.name}</span>
                </div>
              );
            })}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 8 - (3 + inventory.length)) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square bg-surface-container/30 rounded-lg border border-dashed border-outline-variant flex items-center justify-center opacity-50">
                <span className="material-symbols-outlined text-outline text-xl">add</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-center mt-2 pb-8">
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-xs font-bold flex items-center gap-2 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),2px_2px_4px_rgba(0,0,0,0.2)] active:scale-95 transition-transform tracking-wide" onClick={() => navigate('/shop')}>
            <span className="material-symbols-outlined text-sm">save</span>
            XÁC NHẬN TRANG BỊ
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function EquipmentDetail() {
  const navigate = useNavigate();
  const { gold, addGold, addToInventory } = useGameStore();

  const handlePurchase = () => {
    const cost = 5000;
    if (gold >= cost) {
      addGold(-cost);
      addToInventory('nimbus_2000');
      alert(`Đã mua thành công: Nimbus 2000!`);
    } else {
      alert("Bạn không đủ Vàng để mua món đồ này!");
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-[100dvh] pb-[34px] overflow-x-hidden">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-container-padding-mobile h-16 shadow-[0_4px_10px_rgba(60,47,47,0.1)] bg-surface-container sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-primary text-2xl cursor-pointer hover:scale-95 transition-transform active:scale-90">arrow_back</button>
          <h1 className="font-headline-sm-mobile text-headline-sm-mobile text-primary font-bold">Item Inspection</h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm cursor-pointer" onClick={() => navigate('/portal')}>
          <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKDkFXG7rMyM4I7HoisfGnjtyz8fEkj33LApni4oqdwPb7q01RbXuzGeCbnNTddCstj5uJoyjiIxdZdVTXi-K6hUDDYYtm4nKiuCHeFz4C-iZwGBmf7Y71wUw60N-M6HAbY9f_Ugs1H1OGJUV3EIKBo3kwI7sl8AMvZz89IKcS4oZZ-NKG6kzxauSst4u0BOcJyJ71C080vTrEgXPI6Sg5yoPyaU-3x56ldUsUWp2kEVMyVVKQYfStQ0FtG-3aBlGRk53E7TO1p8w"/>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-container-padding-mobile pt-8 space-y-8 pb-24">
        {/* Hero Section: Item Visual & Rarity */}
        <div className="relative bg-surface-container-low rounded-xl p-8 overflow-hidden shadow-sm border border-outline-variant flex flex-col items-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuArzuZrQkPCevMfF4tX6S-WLrlAjI9qauQTrkNPZFqPafcmwxvoAhcs3uoVRvOHCCqUSM7mWku3YWFYg0Igj_lstcmhix86UQjJbg2dEM8XDLdT6yz7DHt4ySAxaDrGzF7fcSrw2VoZhNJnr2CDbrFlsP1MW9LkFV7onlj3PQm4XlaGLz0_GyphHlzXvKIBt7FHe6iRV9ueYgXLRdhTGWwiq8rMa7QAe4r2hE6JpkTCT00cNRycPVysNPOFL4wxiTK52EeFWlKz230)' }}>
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-md-mobile text-label-md-mobile ring-1 ring-tertiary">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              LEGENDARY
            </span>
          </div>
          <div className="w-64 h-64 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <img alt="Nimbus 2000" className="z-10 object-contain w-full h-full drop-shadow-[0_20px_30px_rgba(81,0,3,0.3)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATxjeelW-2wi2eTE7roxSqnlPNa6uy3sBS3YsD6ewVQl77OqZXfy70jtRpYaWYj6vKYp03dSNG_S1aFP7vtSTJbZznp46q4fMnjMB9WZdDpLaMY6nxaEaZEY4Uft75WvyTpqG2cGdG2fU50Omia4YyiScJsCZ38uKvfUIOdtwzHhxOu2qmznAnANvnqN3AASz9nZoatQxY_QCRdTtLznj1BlguRGveiUKuhBRiPLfoH2WyoUO39MYiDRaaR7t_RZyZf57g79YDfN4"/>
          </div>
          <div className="text-center mt-6">
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold tracking-tight">Nimbus 2000</h2>
            <p className="font-label-md-mobile text-label-md-mobile text-on-surface-variant mt-1 italic">The legendary racing broomstick</p>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Magic Power */}
          <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant flex flex-col items-center justify-center space-y-2">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            <p className="font-label-md-mobile text-label-md-mobile text-on-surface-variant">Flight Speed</p>
            <h3 className="font-headline-md text-headline-md text-primary">+25%</h3>
            <p className="font-caption text-caption text-primary/70">In Quidditch Games</p>
          </div>
          {/* XP Buff */}
          <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant flex flex-col items-center justify-center space-y-2">
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            <p className="font-label-md-mobile text-label-md-mobile text-on-surface-variant">Vocabulary XP</p>
            <h3 className="font-headline-md text-headline-md text-secondary">+10%</h3>
            <p className="font-caption text-caption text-secondary/70">Scholarly Passive</p>
          </div>
          {/* Focus Multiplier */}
          <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-container rotate-45 opacity-10"></div>
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <p className="font-label-md-mobile text-label-md-mobile text-on-surface-variant">Focus Gain</p>
            <h3 className="font-headline-md text-headline-md text-tertiary">2.5x</h3>
            <p className="font-caption text-caption text-tertiary/70">During Midnight Quests</p>
          </div>
        </div>

        {/* Lore Section (The Scrap) */}
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant relative shadow-sm" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuArzuZrQkPCevMfF4tX6S-WLrlAjI9qauQTrkNPZFqPafcmwxvoAhcs3uoVRvOHCCqUSM7mWku3YWFYg0Igj_lstcmhix86UQjJbg2dEM8XDLdT6yz7DHt4ySAxaDrGzF7fcSrw2VoZhNJnr2CDbrFlsP1MW9LkFV7onlj3PQm4XlaGLz0_GyphHlzXvKIBt7FHe6iRV9ueYgXLRdhTGWwiq8rMa7QAe4r2hE6JpkTCT00cNRycPVysNPOFL4wxiTK52EeFWlKz230)' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/10" style={{ WebkitMaskImage: 'radial-gradient(circle at 50% 100%, transparent 4px, black 5px)', WebkitMaskSize: '12px 100%', maskImage: 'radial-gradient(circle at 50% 100%, transparent 4px, black 5px)', maskSize: '12px 100%' }}></div>
          <h3 className="font-headline-sm-mobile text-headline-sm-mobile text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">history_edu</span> History of the Nimbus Series
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2">
            The fastest broom of its time, used by Harry Potter in his first year. Perfectly balanced and incredibly responsive.
          </p>
        </div>

        {/* Interaction Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-surface-container rounded-xl border border-outline-variant">
          {/* Equip Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-label-md-mobile text-label-md-mobile text-on-surface">Equip Item</span>
              <span className="font-caption text-caption text-on-surface-variant">Active in your Trunk</span>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="relative w-14 h-8 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {/* Purchase/Action Button */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">Price</p>
              <p className="font-headline-sm text-headline-sm text-primary flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span> 5,000
              </p>
            </div>
            <button onClick={handlePurchase} className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary active:scale-90 transition-all hover:brightness-110 group shadow-[inset_0_-4px_6px_rgba(0,0,0,0.3),0_4px_10px_rgba(81,0,3,0.4)]">
              <span className="material-symbols-outlined text-4xl text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              <div className="absolute -bottom-2 bg-primary px-3 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter border border-[#D4AF37]">Purchase</div>
              <div className="absolute inset-0 border-2 border-[#D4AF37]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            </button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

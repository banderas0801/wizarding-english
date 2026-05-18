import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Shop() {
  const navigate = useNavigate();
  const { gold, addGold, addToInventory } = useGameStore();

  const handlePurchase = (item: string, cost: number) => {
    if (gold >= cost) {
      addGold(-cost);
      addToInventory(item);
      alert(`Đã mua thành công: ${item}!`);
    } else {
      alert("Bạn không đủ Vàng để mua món đồ này!");
    }
  };

  return (
    <div className="bg-background text-on-background parchment-texture min-h-[100dvh] pb-[34px] overflow-x-hidden font-body-md" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] h-16 flex justify-between items-center w-full px-container-padding-mobile">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">arrow_back</button>
          <h1 className="font-display-lg-mobile text-xl text-primary drop-shadow-sm font-bold tracking-wider">Mystic Academy</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Currency Display */}
          <div className="bg-primary-container px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner border border-outline-variant relative overflow-hidden">
            <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            <span className="font-label-md text-sm text-[#f9e3e3] font-bold tracking-wider z-10">{gold} Vàng</span>
            <div className="absolute inset-0 rounded-full opacity-10 pointer-events-none" style={{ background: 'linear-gradient(45deg, #D4AF37 25%, #FBF5B7 50%, #D4AF37 75%)', backgroundSize: '200% auto' }}></div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/portal')}>
            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl4fianjtR58oJRTtCJdIU-mOQSx839FLxKlSU2i4Yz_xm9C4UG7i1_Lxv1Cn9ZSe9f6Jbk35_NqxesELe2qbAIphzfEqbEJK1qQrbWUFIGVzNSYHHfkeKtwTm-UmW-Sp0QWf5IALZ0vkjwrDaKDDc56P4YEu9o74Zfvu24anITRln846HFTsBORzG1liywg6X_d8n9BSMv_yAWOTT7L78__bdphpH4tu7pDPI8Y1tklYaIVynaJC3PdcfFsNHUB9VLgsTXqDoFek"/>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-container-padding-mobile pt-8 pb-32">
        {/* Hero Banner */}
        <section className="relative rounded-xl overflow-hidden mb-8 min-h-[300px] flex items-end p-8 border-4 border-primary group">
          <img className="absolute inset-0 w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-110" alt="Phoenix" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyQLKEEnmfaJqpBCejbICp0BVjZYtdntfqYriZlQ73rpbk-Ymvdleu-n7sruzThnu_A84K3IqAfwBNjsleYW1TiIzOmlfgkr8kP19uyxI8Hya6ALPNexLoWocZnJ903FG1CvSa_rWUhZ4-rO1TswRHp5CJcNH6vvEJ8nvwYJg2cjMRp8vbHWeuBZePmRSYCmgVn9a3PrYbJ7owHxfSz-GdGl70a6zTxcX8kA0v5cf_N3j_xi2f-5qWIsbAULn67XXWQ8ajcNLCD0"/>
          <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded font-bold text-xs uppercase tracking-widest">Sản phẩm nổi bật</div>
          <div className="relative z-10 max-w-lg">
            <h2 className="font-display-lg text-4xl font-bold text-white mb-2 leading-tight">Phượng hoàng lửa Fawkes</h2>
            <p className="font-body-md text-base text-surface-variant italic mb-6">Được thuần hóa từ tro tàn, tăng khả năng hồi phục tinh thần vĩnh viễn.</p>
            <button 
              onClick={() => handlePurchase('fawkes', 5000)}
              className="bg-[#D4AF37] text-primary px-6 py-2 rounded font-bold hover:brightness-110 transition-all flex items-center gap-2 active:scale-95">
              <span className="material-symbols-outlined">shopping_basket</span>
              Sở hữu ngay - 5,000 Vàng
            </button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex-shrink-0 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 shadow-md ring-2 ring-tertiary-fixed transition-transform active:scale-95">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            Trang bị
          </button>
          <button className="flex-shrink-0 bg-surface-variant text-on-surface-variant px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 hover:bg-surface-container-high transition-colors active:scale-95">
            <span className="material-symbols-outlined text-sm">science</span>
            Dược thảo
          </button>
          <button className="flex-shrink-0 bg-surface-variant text-on-surface-variant px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 hover:bg-surface-container-high transition-colors active:scale-95">
            <span className="material-symbols-outlined text-sm">history_edu</span>
            Vật phẩm cổ xưa
          </button>
        </nav>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <article className="bg-[#fdf3e7] border border-[#D4C5A1] rounded-lg p-6 shadow-[0_4px_10px_rgba(60,47,47,0.08)] flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest shadow-sm">Huyền thoại</span>
            </div>
            <div className="w-full h-40 bg-[#e8dac1] rounded-md mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" alt="Nimbus 2000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATxjeelW-2wi2eTE7roxSqnlPNa6uy3sBS3YsD6ewVQl77OqZXfy70jtRpYaWYj6vKYp03dSNG_S1aFP7vtSTJbZznp46q4fMnjMB9WZdDpLaMY6nxaEaZEY4Uft75WvyTpqG2cGdG2fU50Omia4YyiScJsCZ38uKvfUIOdtwzHhxOu2qmznAnANvnqN3AASz9nZoatQxY_QCRdTtLznj1BlguRGveiUKuhBRiPLfoH2WyoUO39MYiDRaaR7t_RZyZf57g79YDfN4"/>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">Chổi Nimbus 2000</h3>
            <p className="font-caption text-[13px] text-on-surface-variant mb-4">Tốc độ cực cao, hỗ trợ đắc lực trong các trò chơi từ vựng Quidditch.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container-high text-on-primary-fixed-variant text-[11px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border border-outline-variant">
                <span className="material-symbols-outlined text-xs">speed</span> Tốc độ vượt trội
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <span className="font-headline-sm text-lg font-bold text-primary">2500</span>
              </div>
              <button onClick={() => handlePurchase('nimbus_2000', 2500)} className="wax-seal bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_6px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>
          </article>

          <article className="bg-[#fdf3e7] border border-[#D4C5A1] rounded-lg p-6 shadow-[0_4px_10px_rgba(60,47,47,0.08)] flex flex-col relative group">
            <div className="absolute top-0 right-0 p-2 z-10">
              <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest shadow-sm">Cổ vật</span>
            </div>
            <div className="w-full h-40 bg-[#e8dac1] rounded-md mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" alt="Invisibility Cloak" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyLn9u2ACCtk4O8nypBQ2bIO-QgmtxYMsMQOWqt7Wr7iDXHZEsqoPJdf04wzQ1OMXUE8mO4a8N1SzV14mM3YL2c8XUgcLx7fJt2jadQTJuuAgeXl9EGT0nd00Bo_0IZsjA6TsU2PhMgvaRHuYXsjLD4KLcN-pav7onoDbxpEnHvPUpP5BMZuptL8OGmzyI9n45VdHd4ePMazNJ31vCAC5e0zXLP6cg8fdq4SzXLXpdbDf3YaCJn17RWgrk4HWDXILcI-P4QH6fGJw"/>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">Áo choàng Tàng hình</h3>
            <p className="font-caption text-[13px] text-on-surface-variant mb-4">Giúp 'né' các câu hỏi khó trong các trận đấu tay đôi pháp thuật.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container-high text-on-primary-fixed-variant text-[11px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border border-outline-variant">
                <span className="material-symbols-outlined text-xs">visibility_off</span> Tàng hình
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <span className="font-headline-sm text-lg font-bold text-primary">4000</span>
              </div>
              <button onClick={() => handlePurchase('invisibility_cloak', 4000)} className="wax-seal bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_6px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>
          </article>

          <article className="bg-[#fdf3e7] border border-[#D4C5A1] rounded-lg p-6 shadow-[0_4px_10px_rgba(60,47,47,0.08)] flex flex-col relative group">
            <div className="w-full h-40 bg-[#e8dac1] rounded-md mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" alt="Marauder's Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATxjeelW-2wi2eTE7roxSqnlPNa6uy3sBS3YsD6ewVQl77OqZXfy70jtRpYaWYj6vKYp03dSNG_S1aFP7vtSTJbZznp46q4fMnjMB9WZdDpLaMY6nxaEaZEY4Uft75WvyTpqG2cGdG2fU50Omia4YyiScJsCZ38uKvfUIOdtwzHhxOu2qmznAnANvnqN3AASz9nZoatQxY_QCRdTtLznj1BlguRGveiUKuhBRiPLfoH2WyoUO39MYiDRaaR7t_RZyZf57g79YDfN4"/>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">Bản đồ Đạo tặc</h3>
            <p className="font-caption text-[13px] text-on-surface-variant mb-4">Mở khóa các thử thách từ vựng bí mật trên bản đồ trường học.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container-high text-on-primary-fixed-variant text-[11px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border border-outline-variant">
                <span className="material-symbols-outlined text-xs">explore</span> Khám phá bí mật
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <span className="font-headline-sm text-lg font-bold text-primary">1200</span>
              </div>
              <button onClick={() => handlePurchase('marauders_map', 1200)} className="wax-seal bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_6px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>
          </article>

          <article className="bg-[#fdf3e7] border border-[#D4C5A1] rounded-lg p-6 shadow-[0_4px_10px_rgba(60,47,47,0.08)] flex flex-col relative group">
            <div className="w-full h-40 bg-[#e8dac1] rounded-md mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" alt="Alihotsy Potion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyK_MhRYJvpYzpsmueX3ku93qx0Gey77hW0M__mwMCO3rMFhD7gBZPE5PixQQHnDRSnkP5yqL1721_amcyav6ScnztjwTRLSeiI5WqPVegfgi8Q0NNavyTdNXkiCVT7eKI5upeWu_tpPNGCH4VK4ahBSZ4VBBAxeowlGIspTJ_NMtItfzI4AkkTk8GlKmCEOL8flQI868Kzu2VpnfA4OE_e3we45lx0anj5oaxBZwUwXS3jflqsVppqYwvgE-_RiYhDzqitRD8IP0"/>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">Dược thảo Alihotsy</h3>
            <p className="font-caption text-[13px] text-on-surface-variant mb-4">Tăng cường khả năng tập trung cho các bài đọc hiểu phức tạp.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container-high text-on-primary-fixed-variant text-[11px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border border-outline-variant">
                <span className="material-symbols-outlined text-xs">psychology</span> Tăng tập trung
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <span className="font-headline-sm text-lg font-bold text-primary">350</span>
              </div>
              <button onClick={() => handlePurchase('alihotsy', 350)} className="wax-seal bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_6px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>
          </article>

          <article className="bg-[#fdf3e7] border border-[#D4C5A1] rounded-lg p-6 shadow-[0_4px_10px_rgba(60,47,47,0.08)] flex flex-col relative group">
            <div className="w-full h-40 bg-[#e8dac1] rounded-md mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform" alt="Phoenix Feather" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyQLKEEnmfaJqpBCejbICp0BVjZYtdntfqYriZlQ73rpbk-Ymvdleu-n7sruzThnu_A84K3IqAfwBNjsleYW1TiIzOmlfgkr8kP19uyxI8Hya6ALPNexLoWocZnJ903FG1CvSa_rWUhZ4-rO1TswRHp5CJcNH6vvEJ8nvwYJg2cjMRp8vbHWeuBZePmRSYCmgVn9a3PrYbJ7owHxfSz-GdGl70a6zTxcX8kA0v5cf_N3j_xi2f-5qWIsbAULn67XXWQ8ajcNLCD0"/>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-primary mb-1">Lông vũ Phượng hoàng</h3>
            <p className="font-caption text-[13px] text-on-surface-variant mb-4">Nâng cao sức mạnh phép thuật trong các trận đấu đánh vần.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container-high text-on-primary-fixed-variant text-[11px] px-2 py-1 rounded-full font-bold flex items-center gap-1 border border-outline-variant">
                <span className="material-symbols-outlined text-xs">bolt</span> +20 Công phép
              </span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <span className="font-headline-sm text-lg font-bold text-primary">900</span>
              </div>
              <button onClick={() => handlePurchase('phoenix_feather', 900)} className="wax-seal bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_6px_rgba(0,0,0,0.3)]">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>
          </article>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

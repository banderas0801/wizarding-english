import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export default function PotionBrewing() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientClick = (type: string) => {
    if (selectedIngredients.length < 3) {
      setSelectedIngredients([...selectedIngredients, type]);
    }
  };

  const handleBrew = () => {
    if (selectedIngredients.length === 0) {
      alert("Bạn chưa chọn nguyên liệu nào!");
      return;
    }
    
    // Formula: Noun + Verb + Adverb (Con rồng + Bay + Nhanh)
    const isCorrect = 
      selectedIngredients[0] === 'noun' && 
      selectedIngredients[1] === 'verb' && 
      selectedIngredients[2] === 'adverb';

    if (isCorrect) {
      addXp(180);
      addGold(60);
      alert("Pha chế thành công! +180 XP, +60 Gold");
      navigate('/victory');
    } else {
      alert("Công thức sai rồi! Vạc thuốc bốc khói đen thui... Hãy thử lại: Chủ ngữ + Động từ + Trạng từ.");
      setSelectedIngredients([]);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen pb-32" style={{ backgroundColor: '#fff8f7', backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBV6v0FiAkLqLaSnVbqJ4SCV7VrEoIhPnSaJxP5VCV32vGU7qkYE18LJghguFuR550fvVs8U9Ch4KRpWZApfz6Hy5yOiUjbx3UDXkwNUTdUu56Q6ALYe15GbbUINJ82qgiZLwGL8P3qxT2eDTjBPbb6Xyv-DMcY8t1KM-PVqeso_bIcElam6838piDpSgeAgLhaa4JCVtjVN8hDqYQzme49CDEduuL6E3pQYUmEqukYn9_IOKZOgnmLIPkprXystxz2Ocmy9DyxmCQ)' }}>
      {/* Top Navigation Bar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDmVspu2GBYHhx1kgwwW_3fGNnDdA2l9IvHwD828MQCJBvUy1RRVbaQZina2Rc50Ajqo4Khd31KCD23iJby5c8HyqnZycxAc5ify4_Lhgp-4nzEEyMYzfDpb1xukOIkkuIXB4AFT1zkavE9GXI18bZB91-SWVl_Occ2n9FoR-6OMFCChl-hk3o9ZcoKqmHFTHgpok6g3Imbr3HA0IMUjsq9hhN5-x7eju8PlTza-CMPJRtwglLzKHdscwoITHpzaaOwajTm0sG47I"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
        </div>
        <button onClick={() => setSelectedIngredients([])} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
          <span className="material-symbols-outlined text-surface-tint">refresh</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
        {/* Lesson Header */}
        <section className="text-center space-y-2">
          <div className="inline-block px-4 py-1 bg-tertiary-container text-white rounded-full font-label-md text-sm mb-2 font-bold tracking-wide">
            Cấp độ: Bậc thầy Cú pháp
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-primary">Lớp Độc dược: Pha chế Cú pháp</h2>
          <p className="text-on-surface-variant italic">"Hãy cẩn thận, một danh từ sai chỗ có thể làm nổ tung cả vạc thuốc!" — Giáo sư Snape</p>
        </section>

        {/* Dungeon Environment / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ingredient Shelf */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant shadow-sm" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 94%, 75% 97%, 70% 95%, 65% 98%, 60% 94%, 55% 97%, 50% 95%, 45% 98%, 40% 94%, 35% 97%, 30% 95%, 25% 98%, 20% 94%, 15% 97%, 10% 95%, 5% 98%, 0% 95%)' }}>
              <h3 className="font-headline-sm text-lg font-bold text-surface-tint border-b border-outline-variant pb-2 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">inventory_2</span> Tủ nguyên liệu
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => handleIngredientClick('noun')} className="p-3 bg-surface border border-outline-variant rounded-lg cursor-pointer hover:shadow-md transition-all active:scale-95 group">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">eco</span>
                    <p className="font-label-md text-sm font-bold mt-1">Con rồng</p>
                    <span className="text-[10px] uppercase tracking-wider text-outline">Danh từ</span>
                  </div>
                </div>
                <div onClick={() => handleIngredientClick('verb')} className="p-3 bg-surface border border-outline-variant rounded-lg cursor-pointer hover:shadow-md transition-all active:scale-95 group">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">flare</span>
                    <p className="font-label-md text-sm font-bold mt-1">Bay</p>
                    <span className="text-[10px] uppercase tracking-wider text-outline">Động từ</span>
                  </div>
                </div>
                <div onClick={() => handleIngredientClick('adverb')} className="p-3 bg-surface border border-outline-variant rounded-lg cursor-pointer hover:shadow-md transition-all active:scale-95 group">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-tertiary text-3xl group-hover:scale-110 transition-transform">dark_mode</span>
                    <p className="font-label-md text-sm font-bold mt-1">Nhanh</p>
                    <span className="text-[10px] uppercase tracking-wider text-outline">Trạng từ</span>
                  </div>
                </div>
                <div onClick={() => handleIngredientClick('adj')} className="p-3 bg-surface border border-outline-variant rounded-lg cursor-pointer hover:shadow-md transition-all active:scale-95 group">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-on-secondary-fixed-variant text-3xl group-hover:scale-110 transition-transform">water_drop</span>
                    <p className="font-label-md text-sm font-bold mt-1">Xanh</p>
                    <span className="text-[10px] uppercase tracking-wider text-outline">Tính từ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hints/Notes */}
            <div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20 space-y-2">
              <p className="font-label-md text-sm font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lightbulb</span> Công thức hôm nay:
              </p>
              <p className="text-body-md italic text-on-surface-variant font-bold">"Chủ ngữ + Động từ + Trạng từ"</p>
            </div>
          </div>

          {/* The Cauldron Area */}
          <div className="md:col-span-2 relative flex flex-col items-center justify-center bg-[#3a2d2d] rounded-2xl p-8 overflow-hidden min-h-[400px]">
            {/* Background Dungeon Assets */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALuubue8jd18Vecig76Oux67A9taG-i6WSGHJg0wr0OtSJWQjlFJvo0jZDjaNRYji_VS2s55YVzHueTteXsYQErGjMR-HZpojkyFH5MW7UZ9RvFOApT3vveH4lZ54EQDNSQDAVCjg7YS8cdyQjpio-VNUpdqRclLQ4Or7-LaGl1sjZxn2bcXs8CeXHlUzWrHX2U5UXkj4AFxiNj3T4JZygcliwWqMXnmJ3Lb-VK5wTdxOQwxYL6b0GVYUV7b25kuW5Goqz-Fm1GDU" alt="Dungeon background"/>
            </div>

            {/* Bubbling Cauldron */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-neutral-900 border-4 border-neutral-800 flex items-center justify-center relative" style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)' }}>
                {/* Liquid Surface */}
                <div className={`absolute inset-2 rounded-full ${selectedIngredients.length > 0 ? 'bg-gradient-to-tr from-secondary to-primary-container opacity-80 animate-pulse blur-sm' : 'bg-neutral-800'}`}></div>
                <span className="material-symbols-outlined text-6xl text-white/40 z-10">bubbles</span>
              </div>

              {/* Drag Target Area */}
              <div className="mt-8 w-full max-w-sm flex gap-2 justify-center">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="w-24 h-12 border-2 border-dashed border-outline-variant rounded-lg bg-surface/5 flex items-center justify-center text-white font-label-md font-bold text-sm">
                    {selectedIngredients[index] === 'noun' && 'Con rồng'}
                    {selectedIngredients[index] === 'verb' && 'Bay'}
                    {selectedIngredients[index] === 'adverb' && 'Nhanh'}
                    {selectedIngredients[index] === 'adj' && 'Xanh'}
                    {!selectedIngredients[index] && (index + 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress / Action Section */}
        <section className="flex flex-col md:flex-row items-center justify-between bg-surface-container rounded-2xl p-6 gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-outline-variant" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                <circle cx="32" cy="32" fill="transparent" r="28" stroke="#D4AF37" strokeDasharray="175" strokeDashoffset="40" strokeWidth="4" style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.8))' }}></circle>
              </svg>
              <span className="absolute font-headline-sm text-lg font-bold text-surface-tint">3/5</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-lg font-bold text-primary">Tiến trình Độc dược</h4>
              <p className="text-body-md text-on-surface-variant">Hoàn thành thêm 2 công thức để nhận Huy chương Vàng.</p>
            </div>
          </div>

          {/* Primary Action Button */}
          <button onClick={handleBrew} className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white transition-all active:scale-90 hover:brightness-110 shadow-[2px_2px_5px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(0,0,0,0.5)]" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)' }}>
            <span className="material-symbols-outlined text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Úm ba la</span>
          </button>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

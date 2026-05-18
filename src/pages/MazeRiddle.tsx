import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function MazeRiddle() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (choice: 'left' | 'right') => {
    if (choice === 'right') {
      addXp(150);
      addGold(40);
      alert("Xuất sắc! Lối bên trái LUÔN nguy hiểm, nên dù bên phải CÓ THỂ nguy hiểm, đó vẫn là lựa chọn duy nhất có khả năng an toàn. +150 XP, +40 Gold");
      navigate('/victory');
    } else {
      alert("Ôi không! Con Nhân sư đã nói lối bên trái LUÔN dẫn đến nguy hiểm mà. Hãy suy nghĩ lại!");
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24 max-w-[390px] mx-auto shadow-2xl relative selection:bg-primary-fixed-dim" style={{ backgroundColor: '#fff8f7' }}>
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface shadow-sm" style={{ backgroundImage: 'radial-gradient(#d4c5a1 0.5px, transparent 0.5px)', backgroundSize: '20px 20px', maxWidth: '390px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp_Gg4Ih5hs8W3UQUC6Fk619rLnmRp_Lovrl8vlJOM1whEzbFWkjsOWB5795ywqYgoHR43aBuZgT1pO4OPqz8SStHURDsZU_3E9G-rBi-0rdqwivtxUgSftUOT-TSdv4zX-5NYoDDjGJ0JqMx-YpUpwWeA9-3wKDrJTNH4jwyAvwIyKmwp_yCZbaVyMEs5ktViNYrvXljMthnqbORLmCkxaVvkIfdsXO1L0XWsWlMSJ-UHz1h_ZwbYW4fd3oGM_dz7lgHPoyu3fks"/>
          </div>
          <h1 className="font-headline-md text-xl font-bold text-primary">Tử Điển Huyền Bí</h1>
        </div>
        <button onClick={() => navigate('/')} className="text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-transform active:scale-95 duration-300">
          <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
        </button>
      </header>

      <main className="pt-24 pb-8 px-5 space-y-6">
        {/* Maze Visual Area */}
        <section className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-secondary/20">
          <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGv832jB4FdVKVy-okgZNFH5wKaQnaQh-ksFdquGpFGMYcazm44BNCrpXvb1d3nI-D6ZY7m90bydoj3tCigFytq24CFAeKCxw-7UI8WtaowxgAdLt3BC1mk9KmUUBR7r_5aOKAYObLryzULLXbvbzFf41_gOWP9mUC2BZxuc8CbJ3GLC9ouWIUOKI_VPbVn_jBnQ4HXTuC0I0gw0DlZKqJdtaivZ2nNOadlJdNilqNR9LJqsw03vIt8J0C_tdb3aaW8sA-HAwsrA0" alt="Hedge Maze"/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(59, 104, 72, 0.2), rgba(59, 104, 72, 0.5))' }}></div>
          
          {/* Floating Game Stats */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="font-label-md text-xs font-bold text-secondary">Vòng 3: Mê Cung</span>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-1 rounded-full border border-primary-fixed flex items-center gap-2 shadow-lg">
            <span className="material-symbols-outlined text-primary-fixed-dim text-sm">hourglass_empty</span>
            <span className="font-label-md text-xs font-bold text-white">08:45</span>
          </div>

          {/* Interaction Overlay (Center) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="bg-surface/80 backdrop-blur-md p-6 rounded-xl border-2 border-secondary shadow-[0_0_15px_rgba(212,175,55,0.4)] max-w-xs space-y-2">
              <span className="material-symbols-outlined text-secondary text-4xl">psychology</span>
              <h2 className="font-headline-sm text-xl font-bold text-primary">Lối Thoát Logic</h2>
              <p className="font-body-md text-sm text-on-surface-variant italic">"Cẩn thận, Harry! Mỗi ngã rẽ đều là một câu đố của giáo trình Evan."</p>
            </div>
          </div>
        </section>

        {/* Question Card */}
        <section className="p-5 rounded-xl border border-outline-variant shadow-md space-y-4 relative overflow-hidden" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#d4c5a1 0.5px, transparent 0.5px)', backgroundSize: '20px 20px', clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 89% 95%, 86% 99%, 83% 94%, 80% 97%, 77% 95%, 74% 98%, 71% 94%, 68% 96%, 65% 94%, 62% 98%, 59% 95%, 56% 97%, 53% 94%, 50% 98%, 47% 95%, 44% 97%, 41% 94%, 38% 98%, 35% 95%, 32% 97%, 29% 94%, 26% 98%, 23% 95%, 20% 97%, 17% 94%, 14% 98%, 11% 95%, 8% 97%, 5% 94%, 2% 98%, 0% 95%)' }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm">1</span>
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-secondary">Thử thách Tư duy Phản biện</span>
          </div>
          <h3 className="font-headline-md text-lg font-bold text-on-surface leading-tight">
            Nếu con Nhân sư bảo rằng: "Lối đi bên trái luôn dẫn đến nguy hiểm, nhưng lối đi bên phải đôi khi cũng vậy", và con biết chắc chắn rằng chỉ có MỘT lối đi an toàn duy nhất ngay lúc này. Con nên tin vào điều gì?
          </h3>
          
          {/* Progress Indicator (Hourglass Concept) */}
          <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden mt-4">
            <div className="h-full bg-gradient-to-r from-secondary to-primary-container w-2/3 shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
          </div>
        </section>

        {/* Action Choices */}
        <section className="grid grid-cols-1 gap-4">
          {/* Choice A */}
          <button onClick={() => handleAnswer('left')} className="group relative bg-surface border-2 border-outline-variant p-5 rounded-xl text-left transition-all hover:border-secondary hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">turn_left</span>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">A</div>
                <span className="font-label-md text-sm text-secondary uppercase font-bold">Rẽ Trái</span>
              </div>
              <p className="font-body-lg text-base text-on-surface">Lối bên trái là an toàn nhất vì con Nhân sư muốn đánh lạc hướng con khỏi sự thật đơn giản.</p>
            </div>
          </button>

          {/* Choice B */}
          <button onClick={() => handleAnswer('right')} className="group relative bg-surface border-2 border-outline-variant p-5 rounded-xl text-left transition-all hover:border-secondary hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">turn_right</span>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center font-bold text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">B</div>
                <span className="font-label-md text-sm text-secondary uppercase font-bold">Rẽ Phải</span>
              </div>
              <p className="font-body-lg text-base text-on-surface">Con cần kiểm tra thêm giả thuyết, nhưng dựa trên logic loại trừ, lối bên phải có xác xuất an toàn cao hơn.</p>
            </div>
          </button>
        </section>

        {/* Inventory/Obstacles Mini Section */}
        <section className="flex flex-wrap gap-3 justify-center pt-4 border-t border-outline-variant/30">
          <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg border border-outline/20">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            <span className="font-label-md text-xs font-bold text-on-surface-variant">Áo choàng bảo vệ</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg border border-outline/20">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <span className="font-label-md text-xs font-bold text-on-surface-variant">Lumos (2/3)</span>
          </div>
        </section>
      </main>

      {/* Contextual FAB: Hint Magic */}
      <button 
        onClick={() => setShowHint(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-primary-fixed z-50" style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
        <span className="material-symbols-outlined text-2xl">flare</span>
      </button>

      {showHint && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowHint(false)}>
          <div className="bg-surface p-6 rounded-xl border-2 border-secondary max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-headline-sm text-primary font-bold mb-2">Gợi ý từ Evan</h3>
            <p className="text-on-surface mb-4">Nếu A LUÔN sai, thì đáp án đúng chỉ có thể là B, dù B không phải lúc nào cũng đúng (nhưng trong trường hợp CỤ THỂ này, nó là lối thoát duy nhất).</p>
            <button onClick={() => setShowHint(false)} className="w-full py-2 bg-secondary text-white rounded-lg font-bold">Đã hiểu</button>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}

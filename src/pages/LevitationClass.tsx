import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function LevitationClass() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();

  const completeLesson = () => {
    addXp(150);
    addGold(30);
    alert("Wingardium Leviosa! Bạn đã nâng thành công chiếc lông vũ. +150 XP, +30 Gold");
    navigate('/victory');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24 max-w-[390px] mx-auto shadow-2xl relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#ead5d5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] sticky top-0 z-50 flex justify-between items-center w-full px-6 h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-primary text-2xl cursor-pointer active:scale-95 duration-150 transition-transform">refresh</button>
          <h1 className="font-display-lg-mobile text-2xl font-bold text-primary drop-shadow-sm leading-none">Mystic Academy</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-outline-variant flex items-center justify-center overflow-hidden">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr8IyU7h8NMYHx8Tf4sFq14kYIVQLB2T71ous0-7BFNia28R-p7SxklvP1GC7iWl_3hgDJulILuO7UUDtFeMlVh4hpR8Nv-dy8BKiAZwyd476RQaqA8M5xVzSJv0os1sTdZThCn5-tulRmZ1a4GGM1RoWp9Rl6oGVrtc-ehoZ4sWXqJTwBzP-af8Nxf06uNDF9VTb4EHyaqVcjoHw7Pvi5-VBx4YlVvIhJOFuII3OinDmxKVdPApiKVFVJI2tlJup-O2kCLDxxzCQ"/>
          </div>
        </div>
      </header>

      <main className="px-5 pt-6 flex flex-col gap-6">
        {/* Header Section */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-xs font-bold uppercase tracking-wider">Học trình Evan</span>
            <span className="text-on-surface-variant font-label-md text-xs font-bold">Bài 04: Lực & Ma thuật</span>
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-primary">Bùa chú Lơ lửng <br/><span className="italic text-on-surface-variant text-lg">Wingardium Leviosa</span></h2>
          <p className="font-body-md text-sm text-on-surface-variant">Khám phá bí mật đằng sau việc chế ngự trọng lực thông qua sức mạnh tập trung và chuyển động cổ tay chuẩn xác.</p>
        </section>

        {/* Mastery Progress */}
        <section className="bg-surface-container-low p-5 rounded-xl border border-outline-variant shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h3 className="font-label-md text-xs font-bold text-primary uppercase">Mức độ thông thạo</h3>
              <p className="font-headline-sm text-lg font-bold text-on-surface">Phù thủy Tập sự</p>
            </div>
            <div className="text-right">
              <span className="font-display-lg text-3xl font-bold text-primary">72%</span>
            </div>
          </div>
          <div className="h-3 bg-surface-variant rounded-full overflow-hidden border border-outline-variant">
            <div className="h-full w-[72%] bg-gradient-to-r from-primary to-surface-tint relative">
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/gold-glitter.png')]"></div>
            </div>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 shrink-0 bg-surface-container-highest px-3 py-1.5 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="font-label-md text-xs font-bold text-on-surface-variant">+150 XP</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 bg-surface-container-highest px-3 py-1.5 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-sm">verified</span>
              <span className="font-label-md text-xs font-bold text-on-surface-variant">Chứng chỉ Antigravity</span>
            </div>
          </div>
        </section>

        {/* Interactive Canvas */}
        <section className="relative aspect-[4/3] w-full rounded-2xl bg-[#fdf2e9] border-2 border-outline-variant shadow-lg flex flex-col items-center justify-center p-6 overflow-hidden group/canvas">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCktHM6LkgQMHIhzFagz-rDN0GizzFJV4OcWKTZL_UtlnIlKBh5q1K1sZjy5f2bSMRPkqndy2aijfew0_eh4qeJ-0TdSzkg17R9W_crY_fugt1JwXEjyWTOGWXrshxXX9bXbWr9wqRIy9A28JjvPdrA3n1BYUwJEtj4y8pPzZ2QtWUNoP_g2yx68N4RDZQhCNYNGmh-I16zhx9v7YFamGuGiecRLNtX2Jw9HDjssp7W8k6OA4ALiUH6max2J-VfjjSVtSLp_Qsm2_M" alt="Magic Background"/>
          </div>
          
          {/* Magic Particle Effects (Simulated) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover/canvas:opacity-100 transition-opacity duration-500">
            <div className="w-48 h-48 rounded-full border border-dashed border-primary/30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-64 h-64 rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>
          
          {/* The Object */}
          <div className="relative z-10 flex flex-col items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-700"></div>
              <img className="w-32 h-32 object-contain drop-shadow-[0_10px_20px_rgba(81,0,3,0.3)] group-hover:-translate-y-16 transition-transform duration-1000 ease-out cursor-pointer active:cursor-grabbing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa6KgS2q8aZHluUst18-tlzqr2n53dUiA8LhhalkzlEOrrqgL0GRqcAugevDW9-zBDbfJjbzJthOBxCCEGX4EVwPFYPHufYIPFH9DQMZ0c_b6gqpEPoynfdasranwUv28Q_9eUOaclICJQW1Ll0avibvTDz4UXDCpgfK01f5cUr2CuVYsSFcsYuaTfNnMzCTOQ3NvFi97IFQDe7ikfpEk5oMQbkXR955oq7kbB7ODFn3rLf5HfFB1aEF8D71J5lSc3wo4F0XtC0Ok" alt="Floating Feather" onClick={completeLesson}/>
            </div>
            <div className="flex flex-col items-center gap-1 text-center group-hover:opacity-0 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 6px rgba(0,0,0,0.3)' }}>
                <span className="material-symbols-outlined text-[#F9E29C] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
              </div>
              <p className="font-label-md text-[10px] font-bold text-primary tracking-widest uppercase mt-2">Chạm để Niệm chú</p>
            </div>
          </div>
          
          {/* Floating Physics UI */}
          <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md p-3 rounded-lg border border-white/50 shadow-sm w-32 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-500">
            <h4 className="font-label-md text-[10px] font-bold text-primary mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">monitoring</span> Lực tương tác
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[8px] text-on-surface-variant uppercase font-bold">
                  <span>Lực Nâng</span>
                  <span>9.8 N</span>
                </div>
                <div className="h-1 bg-surface-variant rounded-full mt-0.5">
                  <div className="h-full bg-secondary w-full transition-all duration-1000"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-on-surface-variant uppercase font-bold">
                  <span>Trọng lực</span>
                  <span>0 g</span>
                </div>
                <div className="h-1 bg-surface-variant rounded-full mt-0.5">
                  <div className="h-full bg-primary w-0 transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Instructions Overlay */}
          <div className="absolute bottom-4 right-4 text-right">
            <p className="font-caption text-xs text-on-surface-variant italic">"Vẫy và Gõ nhẹ cổ tay,"</p>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="flex flex-col gap-3">
          <h3 className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">menu_book</span> Hướng dẫn Thực hành
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:bg-surface-container-high transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <p className="font-body-md text-sm">Giữ ngón tay của bạn lên vật thể (chiếc lông vũ) để truyền dẫn dòng năng lượng.</p>
            </div>
            <div className="flex gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:bg-surface-container-high transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <p className="font-body-md text-sm">Chạm vào chiếc lông vũ để nâng nó lên và hoàn thành bài học lơ lửng.</p>
            </div>
          </div>
        </section>

        {/* Evan's Guide Section */}
        <section className="bg-surface-container-highest p-5 rounded-xl relative border-l-4 border-primary shadow-md" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 98%, 95% 96%, 92% 99%, 88% 95%, 85% 97%, 80% 95%, 75% 98%, 70% 94%, 65% 97%, 60% 95%, 55% 98%, 50% 94%, 45% 97%, 40% 95%, 35% 98%, 30% 94%, 25% 97%, 20% 95%, 15% 98%, 10% 94%, 5% 97%, 0% 95%)' }}>
          <h3 className="font-headline-sm text-base font-bold text-primary mb-3 italic">Cẩm nang của Evan: Khoa học Không trọng lượng</h3>
          <div className="text-on-surface-variant font-body-md text-sm leading-relaxed space-y-3">
            <p>Phép thuật <strong>Wingardium Leviosa</strong> không thực sự xóa bỏ khối lượng của vật thể. Thay vào đó, nó tạo ra một trường phản vật chất cục bộ (Antigravity field) bao quanh cấu trúc nguyên tử của vật đó.</p>
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 italic text-xs">
              "Hãy nhớ rằng: Khối lượng càng lớn, sự tập trung tinh thần cần thiết để bẻ cong không-thời gian xung quanh nó càng cao."
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2 pb-8">
          <button onClick={completeLesson} className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-md text-sm font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">bolt</span> Hoàn thành Bài học
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

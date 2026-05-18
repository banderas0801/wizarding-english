import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function ParentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff8f7] text-[#241919] font-body-md min-h-screen pb-24" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="bg-[#fff0f0] shadow-[0_4px_12px_rgba(60,47,47,0.1)] flex justify-between items-center px-6 md:px-12 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#510003]">
            <img alt="Student Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBQtTAdo1XEVZw5r3z2W2t4Ux_wswYZqNJnNnG4XZhZNdlAkiTJpwPyqbpGt5605O3-JWW8ngM4RfdPKRbVNnO6uiJwEcR2DWOCbgqB0pjoclBr1bcCoUM7uqkjBDnm9oZwK2nX9dm1tI7B-Cl8Ru_rHHkmd2IeO7rUlQwtNDixdOuBCtWq3pxF0dQxk-vaQTr_0_K-RYWrxOEKXEfwvigPq_DNddfDFnDQM_3f3umMlKhal77q3drxfVor7fWrsHRH5bhG84_mtA"/>
          </div>
          <h1 className="font-display-lg-mobile text-xl md:text-2xl font-bold text-[#741010] italic tracking-tight">Wizarding Academy</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-[#510003] text-2xl">auto_stories</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 mt-8 space-y-8">
        {/* Daily Prophet Header */}
        <div className="text-center border-b-2 border-[#510003]/20 pb-6 mb-8">
          <p className="font-label-md text-xs uppercase font-bold tracking-widest text-[#57413f] mb-2">Thứ ba, Ngày 24 Tháng 5, Năm học 2024</p>
          <h2 className="font-display-lg text-4xl md:text-5xl font-bold text-[#510003] mb-1">BẢN TIN PHỤ HUYNH</h2>
          <div className="flex justify-center items-center gap-4 text-[#57413f] italic">
            <span className="h-[1px] w-12 bg-[#8b716e]"></span>
            <span className="font-body-md text-sm">Học viện Pháp thuật Evan Curriculum</span>
            <span className="h-[1px] w-12 bg-[#8b716e]"></span>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Story: Progress Card */}
          <div className="md:col-span-8 bg-white border border-[#dfbfbc] p-6 shadow-sm relative" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 95% 98%, 92% 100%, 88% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%)' }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-md text-xl font-bold text-[#510003] mb-1">Tiến Độ Học Tập: Minh Quân</h3>
                <p className="text-[#57413f] text-sm">Năm học thứ 2 - Lớp Độc dược &amp; Cổ ngữ</p>
              </div>
              <div className="bg-[#510003]/5 px-3 py-1.5 rounded-lg border border-[#510003]/10 text-center">
                <span className="text-[#510003] font-bold text-lg leading-none block">85%</span>
                <p className="text-[10px] uppercase font-bold text-[#57413f]">Hoàn thành</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="text-center p-3 bg-[#ffe9e8] rounded-xl border border-[#dfbfbc]/30">
                <span className="material-symbols-outlined text-[#510003] mb-1">menu_book</span>
                <p className="font-label-md text-xs font-bold block mb-1">Từ vựng</p>
                <p className="font-headline-sm text-lg font-bold text-[#510003]">450+</p>
              </div>
              <div className="text-center p-3 bg-[#ffe9e8] rounded-xl border border-[#dfbfbc]/30">
                <span className="material-symbols-outlined text-[#510003] mb-1">auto_fix_high</span>
                <p className="font-label-md text-xs font-bold block mb-1">Kỹ năng</p>
                <p className="font-headline-sm text-lg font-bold text-[#510003]">12/15</p>
              </div>
              <div className="text-center p-3 bg-[#ffe9e8] rounded-xl border border-[#dfbfbc]/30">
                <span className="material-symbols-outlined text-[#510003] mb-1">military_tech</span>
                <p className="font-label-md text-xs font-bold block mb-1">Hạng</p>
                <p className="font-headline-sm text-lg font-bold text-[#510003]">Top 5</p>
              </div>
            </div>

            {/* Proficiency Chart */}
            <div className="space-y-4 pb-2">
              <h4 className="font-label-md text-xs font-bold uppercase text-[#57413f]">Năng Lực Pháp Thuật</h4>
              <div className="space-y-3">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#510003]">Ngôn ngữ học (Linguistics)</span>
                    <span className="text-xs font-bold text-[#510003]">92%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-[#ffe9e8]">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#510003] w-[92%]"></div>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#3b6848]">Thực hành (Evan Curriculum)</span>
                    <span className="text-xs font-bold text-[#3b6848]">78%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-[#ffe9e8]">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#3b6848] w-[78%]"></div>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2c375e]">Lịch sử Pháp thuật</span>
                    <span className="text-xs font-bold text-[#2c375e]">65%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-[#ffe9e8]">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#2c375e] w-[65%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Story: Achievements */}
          <div className="md:col-span-4 space-y-5">
            {/* Achievement Card */}
            <div className="bg-[#f9e3e3] p-5 border-2 border-[#dfbfbc] rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#510003]/5 rounded-full blur-2xl"></div>
              <h3 className="font-headline-sm text-lg font-bold text-[#510003] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">workspace_premium</span>
                Thành Tựu
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-[#510003]/10">
                  <div className="w-10 h-10 flex-shrink-0 bg-[#741010] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#ff7b6f] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#241919] leading-tight mb-0.5">Bậc thầy Từ vựng</p>
                    <p className="text-xs text-[#57413f]">Đạt 100 ngày học liên tiếp</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-[#510003]/10 opacity-70">
                  <div className="w-10 h-10 flex-shrink-0 bg-[#bdefc6] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#416e4d] text-sm">history_edu</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#241919] leading-tight mb-0.5">Ngòi bút Vàng</p>
                    <p className="text-xs text-[#57413f]">Hoàn thành 5 bài luận</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action: Mail Owl */}
            <div className="bg-[#510003] p-5 rounded-xl shadow-lg text-white relative group cursor-pointer active:scale-95 transition-all">
              <div className="flex flex-col items-center text-center space-y-2">
                <span className="material-symbols-outlined text-3xl">outgoing_mail</span>
                <h4 className="font-headline-sm text-lg font-bold text-white">Gửi Thư Động Viên</h4>
                <p className="text-xs opacity-80 mb-2">Gửi ngay một con Cú đưa thư mang theo lời chúc!</p>
                <button className="bg-white text-[#510003] px-5 py-2 rounded-full font-bold text-xs mt-2 w-full hover:bg-[#f9e3e3] transition-colors">GỬI THƯ NGAY</button>
              </div>
            </div>
          </div>
        </div>

        {/* Magic Proficiency Radar-Style Representation */}
        <div className="bg-white/40 backdrop-blur-sm border border-[#dfbfbc] p-6 rounded-2xl">
          <h3 className="font-headline-sm text-lg font-bold text-[#510003] mb-6 text-center italic">Phân Tích Kỹ Năng Evan</h3>
          <div className="flex flex-wrap justify-around gap-4">
            {/* Skill Bubble 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-4 border-[#741010] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#510003]/10 flex items-center justify-center relative">
                  <span className="material-symbols-outlined text-[#510003] text-2xl">auto_stories</span>
                  <div className="absolute inset-0 bg-[#510003]/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="font-label-md text-xs font-bold text-[#510003]">Đọc hiểu</p>
            </div>
            {/* Skill Bubble 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-4 border-[#bdefc6] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#3b6848]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3b6848] text-2xl">record_voice_over</span>
                </div>
              </div>
              <p className="font-label-md text-xs font-bold text-[#3b6848]">Phát âm</p>
            </div>
            {/* Skill Bubble 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-4 border-[#2c375e] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#162147]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#162147] text-2xl">edit_note</span>
                </div>
              </div>
              <p className="font-label-md text-xs font-bold text-[#162147]">Ngữ pháp</p>
            </div>
            {/* Skill Bubble 4 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-4 border-[#dfbfbc] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#f3dedd] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#57413f] text-2xl">group</span>
                </div>
              </div>
              <p className="font-label-md text-xs font-bold text-[#57413f]">Hợp tác</p>
            </div>
          </div>
        </div>

        {/* Featured Lesson/News Item */}
        <div className="bg-[#f3dedd] rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row border border-[#dfbfbc]">
          <div className="md:w-1/3 h-48 md:h-auto">
            <img alt="Magic Classroom" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCYwV8gmDsysYUBvqpNQAvWmmf8ZeDESojqoXOFuDNMnUY6Y7Vietdigr8g8SV1GUm5L0zZL9syW7c_9ov-k_XEru2e5c7k8YqsgC_TScXyt63ztM3gl6frB5PV8wgJynuwXIRt04koL27KzE6KyAYFqeVR71ka-2sFjCIfdO-iFeIkRLCy8xM7wSnJarmxgfV9IfchR22F0ZNp7fE5Gh7G4X5YCOh6pZsDCBzCjh8ZCEiv5RWi21sJj7zdYLopmIAvUhr1yv4YNc"/>
          </div>
          <div className="p-6 md:w-2/3 space-y-3">
            <span className="bg-[#510003]/10 text-[#510003] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">Tiêu điểm tháng</span>
            <h3 className="font-headline-md text-xl font-bold text-[#241919]">Hành trình khám phá Cổ ngữ Anh - Pháp</h3>
            <p className="text-[#57413f] text-sm leading-relaxed">
              Minh Quân đang bắt đầu những bài học đầu tiên về hệ thống ngôn ngữ cổ đại. Đây là nền tảng quan trọng giúp bé phát triển tư duy logic và khả năng phân tích ngôn ngữ sâu sắc hơn trong tương lai.
            </p>
            <button onClick={() => navigate('/curriculum')} className="inline-flex items-center text-[#510003] font-bold gap-1 text-sm mt-2 hover:underline">
              Xem chi tiết giáo trình
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

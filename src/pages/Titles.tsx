import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Titles() {
  const navigate = useNavigate();

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen overflow-x-hidden pb-32" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface-container-low border-b border-outline-variant shadow-sm max-w-[390px] mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <button 
            className="material-symbols-outlined text-primary p-2 hover:bg-primary-container/10 rounded-full transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </button>
          <h1 className="font-headline-md text-xl font-bold text-primary">Danh Hiệu & Uy Tín</h1>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          <span className="font-label-md text-sm font-bold text-on-surface-variant">4,200</span>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-[390px] mx-auto space-y-8">
        {/* Central Character Preview Section */}
        <section className="relative flex flex-col items-center py-4">
          <div className="absolute top-0 bg-primary-container text-on-primary-container px-6 py-1 rounded-full shadow-[0_0_12px_#D4AF37] font-label-md text-xs font-bold border border-outline-variant z-10">
            Bậc Thầy Evan
          </div>
          <div className="relative w-40 h-40 rounded-full border-4 border-outline p-2 bg-surface-container-highest shadow-xl overflow-hidden mt-3">
            <img 
              alt="Wizard Profile" 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMKMFQM3JPYYoi-YVw5Vwd0Y2hMPZM8DmiFuOvQTmFuezWUbZM9N3oqlrX5jHF9Tu-CglWKGcZb5hCql2BkwzdDpwrzamhXCHESL-OM1nVGz7ePvzolcOyJRcrr03_W7pHwnFNK9f6ejmWk9AxrgEKWMAjYT_oQKJep0Fb7Jpa3tBBnFpcGpskVIe3qE-UVHd0ZUWeNYdDYIEDDg2n2G6rfqlOc9i0MrE_Bh-7xOg-w1ZMawl5_ZbOeB6R1rsBxAVZbyt03-RIeuc" 
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="font-display-lg-mobile text-2xl font-bold text-primary">Cậu Bé Được Chọn</h2>
            <p className="font-body-md text-sm text-on-surface-variant italic mt-1">Nhà Gryphon-heart • Cấp độ 42</p>
          </div>
          
          {/* Magical Particles Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#D4AF37] rounded-full blur-[2px]"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full blur-[1px]"></div>
          </div>
        </section>

        {/* Titles Grid */}
        <section className="flex flex-col gap-4 pb-12">
          {/* Title Card: Common */}
          <div className="group relative bg-surface-container-lowest border border-outline-variant p-5 shadow-sm hover:shadow-md transition-all duration-300" style={{ clipPath: 'polygon(100% 0%, 100% 98%, 95% 100%, 90% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%, 0% 0%)' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-lg">
                  <span className="material-symbols-outlined text-on-surface-variant">edit_note</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">Tập sự Ngôn từ</h3>
                  <span className="font-caption text-[10px] text-secondary uppercase tracking-widest font-bold">Thường</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border border-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant mb-5">Đã hoàn thành 5 bài học cơ bản về ngôn ngữ.</p>
            <button className="w-full py-2 bg-surface-variant text-on-surface-variant font-label-md text-xs font-bold rounded-lg hover:bg-outline-variant transition-colors">Đang Sử Dụng</button>
          </div>

          {/* Title Card: Rare */}
          <div className="relative bg-surface-container-lowest border border-outline-variant p-5 shadow-sm hover:shadow-md transition-all duration-300" style={{ clipPath: 'polygon(100% 0%, 100% 98%, 95% 100%, 90% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%, 0% 0%)' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary-container rounded-lg">
                  <span className="material-symbols-outlined text-on-secondary-container">spellcheck</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">Phù thủy Ngữ pháp</h3>
                  <span className="font-caption text-[10px] text-on-secondary-fixed-variant uppercase tracking-widest font-bold">Hiếm</span>
                </div>
              </div>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant mb-5">Đạt được 10 chuỗi học tập liên tiếp (Streak).</p>
            <button className="w-full py-2 bg-primary text-on-primary font-label-md text-xs font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all">Sử Dụng</button>
          </div>

          {/* Title Card: Epic */}
          <div className="relative bg-surface-container-lowest border-2 border-[#D4AF37] p-5 shadow-lg overflow-hidden group" style={{ clipPath: 'polygon(100% 0%, 100% 98%, 95% 100%, 90% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%, 0% 0%)' }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F9E3E3 50%, #D4AF37 100%)', backgroundSize: '200% 200%' }}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-container rounded-lg shadow-[0_0_8px_#D4AF37]">
                  <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">Bậc thầy Evan</h3>
                  <span className="font-caption text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Sử Thi</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-[#D4AF37]" style={{ boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2), 0 4px 8px rgba(60,47,47,0.2)' }}>
                <span className="material-symbols-outlined text-[#D4AF37] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant mb-5 relative z-10">Giải mã thành công 50 cổ tự trong thư viện ẩn.</p>
            <button className="w-full py-2.5 bg-primary text-on-primary font-label-md text-xs font-bold rounded-lg shadow-lg relative z-10 flex items-center justify-center gap-2 border border-[#D4AF37]">
              Trang Bị Ngay
            </button>
          </div>

          {/* Title Card: Legendary (Locked) */}
          <div className="relative bg-surface-dim border border-outline p-5 opacity-80 grayscale" style={{ clipPath: 'polygon(100% 0%, 100% 98%, 95% 100%, 90% 97%, 85% 100%, 80% 98%, 75% 100%, 70% 97%, 65% 100%, 60% 98%, 55% 100%, 50% 97%, 45% 100%, 40% 98%, 35% 100%, 30% 97%, 25% 100%, 20% 98%, 15% 100%, 10% 97%, 5% 100%, 0% 98%, 0% 0%)' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-outline-variant rounded-lg">
                  <span className="material-symbols-outlined text-outline">history_edu</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-outline">Đại Pháp Sư Ngôn Ngữ</h3>
                  <span className="font-caption text-[10px] text-outline uppercase tracking-widest font-bold">Huyền Thoại</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">lock</span>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant mb-4">Yêu cầu: Hoàn thành tất cả các khóa học tại Học Viện (0/150).</p>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-outline h-full" style={{ width: '35%' }}></div>
            </div>
            <p className="mt-1.5 text-right font-caption text-[10px] text-outline">35% hoàn thành</p>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

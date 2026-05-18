import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function DailyQuests() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-[100dvh] overflow-y-auto overflow-x-hidden pb-[34px]">
      {/* Top AppBar with Safe Area */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] fixed top-0 w-full z-50 pt-[44px]">
        <div className="flex justify-between items-center w-full px-[24px] py-4 max-w-[390px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-tint">
              <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjFBeLCH1vwjO5LA2D8ontOikg3699jxuScTjGmgZJJb3MKI2U1dBmFziriX9kF2VdmT_JXaXYHqb3Eiz7SaNoV9eYuBT0NomOyO5VRYP5FtWPUl6qMkAE54GhwtWRZiYn_HJbq6-n-LqRjCFr4-nHPRe0OUI7F06yHfpzjLwjFv_4oU0-v2pN35hnIjoyKgfzLR4YWmeZAmzu0ufzUYPUd6Tth_q0SYOG8lLBNgdm2468UmtoDVscXTnODBKdS_vxxnO1otpQqrs"/>
            </div>
            <h1 className="font-display-lg-mobile text-[32px] text-surface-tint tracking-tight font-bold">Mystic Academy</h1>
          </div>
          <button className="min-w-[48px] min-h-[48px] material-symbols-outlined text-surface-tint text-[32px] hover:bg-surface-container-high rounded-full transition-all active:scale-95 active:brightness-90 flex items-center justify-center">
            tempest
          </button>
        </div>
      </header>
      
      <main className="pt-[120px] px-[24px] max-w-[390px] mx-auto space-y-[32px] pb-[80px]">
        {/* Hero Section with Custom Illustration */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-surface-container-highest">
          <img alt="Owl delivering letter" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0uhJ7iUtsmOpgd544t75tVahzucosNBONLuUI2S9QLZ0OCDfyFxNg-WV_fT1MrFpnhqGzX9sRfqQVyUxdXovGDVc-S82zCacGwp-S_HqJyGvSRTUlilrtkF5pfw7XaUK-IwV97vq_4gMLB9BAg8TZIjoOOW8th_v4RL03stcBmHhGBJ5aL9nCywHXzW24gsxK1zNNrnbeqonf91hsGI27ZIKPec2drnaskKrq6gH2MhpIPYQ9bUCm5V5h_A" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h2 className="font-headline-md text-xl text-white drop-shadow-md">Nhiệm vụ Hàng ngày</h2>
            <p className="text-white/90 font-label-md text-xs mt-1">Hoàn thành để nhận phần thưởng ma thuật!</p>
          </div>
        </div>
        
        {/* Quest List Container (The Scroll) */}
        <div className="parchment-texture deckle-edge p-5 rounded-sm relative border border-outline-variant/30" style={{ backgroundColor: '#fdf6e3', backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCqpfnyvrVmJ5tTN0K7k2Y8iiRihq32hV0V59RWQpUrJ4nyk7oh2pjJ1ZzD4tWS5KqzY4k92qcE5y_xQXQgafx621hz_7P3XubFT7FjUZjQvsjoi6Q9ctaILc3Xdw2Efbb45JkmjFFYbzYWt5GAVke8FoqTFfLkTX-D7CJdLqzYiohoB9l_0LmsexU1LQXNGn8c8oEm_TgUq3eHSFNJt_B7bi2u3rejrdlCbJ3SviSgHpoh0yyGFTCjLZSJ-S_pD1bY8Rm1ZIfl7gQ)', boxShadow: 'inset 0 0 100px rgba(60, 47, 47, 0.1), 0 10px 30px rgba(0, 0, 0, 0.1)' }}>
          {/* Header Ornament */}
          <div className="flex justify-center mb-6">
            <div className="h-px bg-surface-tint/30 flex-grow self-center"></div>
            <span className="material-symbols-outlined text-surface-tint mx-3" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            <div className="h-px bg-surface-tint/30 flex-grow self-center"></div>
          </div>
          
          <div className="space-y-4">
            {/* Quest Item 1 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all group border-b border-outline-variant/20 pb-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white group-active:scale-95 transition-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.2), 0 0 15px rgba(212, 175, 55, 0.4)' }}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-sm text-[16px] text-primary mb-1 font-bold">Chinh phục Ngữ pháp</h3>
                <p className="text-on-surface-variant font-body-md text-[14px] mb-2">Hoàn thành 1 bài học Lý thuyết Evan</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[12px] rounded-[8px] font-bold">Thưởng: 50 Vàng</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-tint/30"></div>
                  </div>
                </div>
              </div>
              <button 
                className="min-h-[48px] min-w-[48px] px-4 bg-primary-container text-on-primary-container rounded-[8px] font-label-md text-[14px] font-bold self-center hover:brightness-110 active:scale-95 active:brightness-90 transition-all shadow-sm flex items-center justify-center"
                onClick={() => navigate('/curriculum')}
              >
                HỌC NGAY
              </button>
            </div>
            
            {/* Quest Item 2 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all group border-b border-outline-variant/20 pb-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white group-active:scale-95 transition-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.2)' }}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-sm text-[16px] text-primary mb-1 font-bold">Nhà Thông thái</h3>
                <p className="text-on-surface-variant font-body-md text-[14px] mb-2">Học xong 10 từ vựng mới</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[12px] rounded-[8px] font-bold">Thưởng: 30 Vàng</span>
                  <div className="w-16 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="bg-surface-tint h-full w-[40%]"></div>
                  </div>
                  <span className="text-caption text-[12px] text-outline">4/10</span>
                </div>
              </div>
              <button 
                className="min-h-[48px] min-w-[48px] px-4 bg-primary-container text-on-primary-container rounded-[8px] font-label-md text-[14px] font-bold self-center hover:brightness-110 active:scale-95 active:brightness-90 transition-all shadow-sm flex items-center justify-center"
                onClick={() => navigate('/curriculum')}
              >
                LUYỆN TẬP
              </button>
            </div>
            
            {/* Quest Item 3 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all group pb-2">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white group-active:scale-95 transition-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.2)' }}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-sm text-[16px] text-primary mb-1 font-bold">Phù thủy Tập sự</h3>
                <p className="text-on-surface-variant font-body-md text-[14px] mb-2">Thực hành 5 câu chú thuật</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[12px] rounded-[8px] font-bold">Thưởng: 20 Vàng</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-tint/30"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-tint/30"></div>
                    <div className="w-2 h-2 rounded-full bg-surface-tint/30"></div>
                  </div>
                </div>
              </div>
              <button 
                className="min-h-[48px] min-w-[48px] px-4 bg-primary-container text-on-primary-container rounded-[8px] font-label-md text-[14px] font-bold self-center hover:brightness-110 active:scale-95 active:brightness-90 transition-all shadow-sm flex items-center justify-center"
                onClick={() => navigate('/curriculum')}
              >
                THỰC HÀNH
              </button>
            </div>
          </div>
          
          {/* Scroll Decoration Footer */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}></div>
              <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}></div>
              <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}></div>
            </div>
          </div>
        </div>
        
        {/* Bonus Progress Card */}
        <div className="bg-tertiary-container rounded-xl p-4 text-white shadow-lg flex items-center gap-3 border border-on-tertiary-container/30 mt-4">
          <div className="bg-surface-tint/20 p-2 rounded-lg shrink-0">
            <span className="material-symbols-outlined text-3xl text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <div className="flex-grow">
            <p className="font-label-md text-[10px] uppercase tracking-widest text-tertiary-fixed font-bold">Thưởng Toàn Diện</p>
            <h4 className="font-headline-sm text-sm font-bold">Hoàn thành cả 3 nhiệm vụ</h4>
            <div className="w-full h-1 bg-white/20 rounded-full mt-2 relative overflow-hidden">
              <div className="h-full bg-tertiary-fixed w-1/3 rounded-full"></div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-display-lg-mobile font-bold text-tertiary-fixed">1/3</span>
          </div>
        </div>
      </main>

      <BottomNavBar />

      {/* Floating Action Button Contextual (Return to Study) */}
      <button 
        className="fixed right-[24px] bottom-[100px] min-w-[56px] min-h-[56px] bg-surface-tint text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(60,47,47,0.3)] hover:scale-105 active:scale-95 active:brightness-90 transition-all z-40 border-2 border-primary-fixed"
        onClick={() => navigate('/curriculum')}
      >
        <span className="material-symbols-outlined text-[32px]">school</span>
      </button>
    </div>
  );
}

import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Leaderboard() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden pb-32" style={{ backgroundColor: '#fff8f7', backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDsyW7k_aMAS4VE9ySd6Ui3WjSZRbzjE0rfyTraMWyUS3uIBNxeeMJZ617zWTL43QEeb7xW385TP6_-owNb7lPj1-PQjfknPLBVKo4qw5oKxWUPuyApGQjoTzCQfpiA3JJj4G7CkQ7LKcPlX7mmxVhQcQM5e_8WHqkQxz0aj_o1uAag7LosR-0lyi9WNlWFcvy2_Q7Gf5Vg6UXkh_w7mK6YwxsyO6-n0ON4Fu73hg76TR_ZsAHtNhV3d9rIhPRklOXUwXtOZviDSF8)' }}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface-container-low border-b border-outline-variant shadow-sm max-w-[390px] mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <img alt="Avatar" className="w-10 h-10 rounded-full border-2 border-primary shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKeNEWR-SI3QqH4OwWg-mVpB1vE6VgsAhUDFQJ-KTZqhWCsR98ux1zluqrlGMx8bXdEiosFgpmtds1MCM_ovajftMznB6JA5R9T4YuuIsUtjizVrb7QhSiHNcGh97PDf61we7bNnHw1H82W9MMqwUWh8XWaT1SrB1XeL8VRSUX0N8KFmIlk_1cDT3X8GSbxNp62qREZ0auzYKYD9dEzFkKjlZhip-yuD4wKg83zaAZwIDbMDQ8uYvs1Hp8vxP2pt5E4w7pL_UOiE"/>
          <span className="font-display-lg-mobile text-xl font-bold text-primary">Magical Academy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-[390px] mx-auto">
        {/* House Ranking Bento Grid */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <span className="font-label-md text-[10px] text-primary-container uppercase tracking-widest bg-primary-fixed px-3 py-1 rounded-full font-bold">Bảng Xếp Hạng Nhà</span>
            <h1 className="font-display-lg text-2xl font-bold text-primary mt-3">Vinh Quang Học Viện</h1>
          </div>
          
          {/* Leading House Hero Card */}
          <div className="relative bg-primary-container p-6 rounded-xl shadow-xl overflow-hidden mb-4 border-2 border-primary transition-all duration-300 active:scale-95 group">
            <div className="absolute inset-0 opacity-20 transition-opacity" style={{ background: 'linear-gradient(45deg, #D4AF37 25%, #FFF2B2 50%, #D4AF37 75%)', backgroundSize: '200% auto' }}></div>
            <div className="relative z-10 flex flex-col items-center justify-between gap-4">
              <div className="text-center w-full relative">
                <h2 className="font-display-lg text-2xl font-bold text-on-primary-container mb-1">Nhà Sư Tử</h2>
                <p className="font-body-lg text-sm text-on-primary-container/80">Người Dẫn Đầu Hiện Tại</p>
                <div className="flex items-baseline justify-center gap-2 mt-2">
                  <span className="font-display-lg text-3xl font-bold text-on-primary-container">12,450</span>
                  <span className="font-label-md text-xs text-on-primary-container/60">Điểm Nhà</span>
                </div>
                
                <div className="absolute right-0 top-0 opacity-20">
                  <span className="material-symbols-outlined text-6xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-on-secondary shadow-lg z-20">
              <span className="font-headline-sm text-sm font-bold text-on-secondary">1</span>
            </div>
          </div>
          
          {/* Other Houses Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* House Eagle */}
            <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-2xl text-tertiary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="font-headline-sm text-[11px] font-bold text-on-surface leading-tight">Nhà Đại Bàng</h3>
              <p className="font-body-md text-xs text-on-surface-variant font-bold mt-1">11,200</p>
              <span className="mt-1 text-caption text-[9px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded">Hạng 2</span>
            </div>
            {/* House Dragon */}
            <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-2xl text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <h3 className="font-headline-sm text-[11px] font-bold text-on-surface leading-tight">Nhà Rồng</h3>
              <p className="font-body-md text-xs text-on-surface-variant font-bold mt-1">9,850</p>
              <span className="mt-1 text-caption text-[9px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded">Hạng 3</span>
            </div>
            {/* House Badger */}
            <div className="bg-surface-container-high p-3 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-2xl text-secondary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>nature</span>
              <h3 className="font-headline-sm text-[11px] font-bold text-on-surface leading-tight">Nhà Lửng</h3>
              <p className="font-body-md text-xs text-on-surface-variant font-bold mt-1">8,900</p>
              <span className="mt-1 text-caption text-[9px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded">Hạng 4</span>
            </div>
          </div>
        </section>

        {/* Top Students List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-md text-xl font-bold text-primary">Phù Thủy Xuất Sắc</h2>
            <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
          </div>
          
          <div className="space-y-3">
            {/* User Highlighted Position */}
            <div className="bg-secondary-container/30 border-2 border-secondary p-3 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(59,104,72,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
              <div className="flex items-center gap-3 pl-1">
                <div className="font-display-lg text-lg font-bold text-on-secondary-container w-6 text-center">42</div>
                <img alt="User" className="w-10 h-10 rounded-full border-2 border-secondary shadow-sm object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYwaTIEgG22bbLoV7aM594JXgV6CwlrmrbYweBFwe1gWy7MKaRAniluXFy81S3MexLEhfdHpj8lfOn8btRg1kDiTaM62em4e0iE09khW-5Fw8c91o6RUAgTw0xYLZ3zaGoMnpjaM5Qp3wJfWWYu9aNrAM85NzI92W9wK-spdhEmNtxM6KcRWUVSjE7MKXo5czJkCd9-7C-r2JiTb7k9RXtvmq_LX28PzGls4dvhcTODfmtTCn97hDGvtWNfVIS1vsMOnG46Q5sZ6M"/>
                <div>
                  <p className="font-body-lg text-sm font-bold text-on-secondary-container leading-tight">Bạn (Người Được Chọn)</p>
                  <p className="font-caption text-[10px] text-on-secondary-fixed-variant mt-0.5">Cung Thủ Ánh Sáng • Nhà Sư Tử</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-base font-bold text-on-secondary-container">2,150</span>
                <p className="font-caption text-[9px] text-on-secondary-fixed-variant">điểm góp</p>
              </div>
            </div>
            
            {/* Leaderboard Item 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-6 text-center">
                  <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <img alt="Student" className="w-10 h-10 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJmq1v2IQ8cazMnQ9xKW_aDvWAZ7YIRdsbDL7DeBVf4ueKVGz3vj5PymSStQar1yDVJVIZYmScn-3D7qL3IOsg2xCpYp8LLAAz5RE9E6FzpX5ldtabmxtc_s4sg9C7y9p3zxbPA_CZ8JuYfDWUZ51QH7u6bm4VR-84ITihKFhZlHc1mfAP_Y9FZ220MGsAhkhvPLAvrLkgK2xgLIg0RdGjLN9pO-iU4tpEEbTj_7iCuIoDRZnuDnOiQwHDhWrLYS6XXMlUxkNqrvc"/>
                <div>
                  <p className="font-body-lg text-sm font-bold text-on-surface leading-tight">Minh Anh</p>
                  <p className="font-caption text-[10px] text-on-surface-variant mt-0.5">Đại Phù Thủy • Nhà Đại Bàng</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-base font-bold text-primary">5,420</span>
                <p className="font-caption text-[9px] text-on-surface-variant">điểm góp</p>
              </div>
            </div>
            
            {/* Leaderboard Item 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="font-headline-sm text-sm font-bold text-on-surface-variant w-6 text-center">2</div>
                <img alt="Student" className="w-10 h-10 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYPc2feq2SmZCzVWUK0pJRijca_yKRExhiS6Q1wQXC9MC6Dh8r98x55y8V24Bcs1Rx8VsS7mvaZdujzsufgRD5Kiq8L8pNYHcECCUsAtOiP40llOzzTrr9ehmNcWxNRDtkYItfFB5kUPeXVbglfYCPE8tsKBLJPs44ZX9nFgYFQL48qGSfyhF4KOIUAgiR3h8GP7ty9zOK2ZJTawaBBxli2VCSWJrfD5gujxaU4OIy0Co5qtA7bWvHsuXzoLFkvYJo9XiUYuBEWEQ"/>
                <div>
                  <p className="font-body-lg text-sm font-bold text-on-surface leading-tight">Hoàng Phúc</p>
                  <p className="font-caption text-[10px] text-on-surface-variant mt-0.5">Chiến Binh Rồng • Nhà Rồng</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-base font-bold text-on-surface">4,890</span>
                <p className="font-caption text-[9px] text-on-surface-variant">điểm góp</p>
              </div>
            </div>
            
            {/* Leaderboard Item 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-xl flex items-center justify-between hover:bg-surface-container transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="font-headline-sm text-sm font-bold text-on-surface-variant w-6 text-center">3</div>
                <img alt="Student" className="w-10 h-10 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAp1XG4Avh6IP3vI6WZQta8JKnlwX5wZITQZsCmiYYjJk4MnAjPSjD9WoW_SA-vpjmhmZ0Dt4PSL3pUBml6Xr0ZFPqHPWnnhztdz52DI-atnqwG2WtX0bPwvBIM8O7PVT2Qs7RzHpq4uvUsbrjc3RCkk9Vwdox6vSLeTBY31yXLrZvc7vHDL26u29G1s4N2UcV6UHoBFBe2Ic7nxuw6KdyrS-32MG1c7U3JwPcUZDbceybixRbfAtC5ab_bxTMfuK4F0Ko2Qek4Og"/>
                <div>
                  <p className="font-body-lg text-sm font-bold text-on-surface leading-tight">Linh Nhi</p>
                  <p className="font-caption text-[10px] text-on-surface-variant mt-0.5">Bậc Thầy Dược Liệu • Nhà Lửng</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-base font-bold text-on-surface">4,120</span>
                <p className="font-caption text-[9px] text-on-surface-variant">điểm góp</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

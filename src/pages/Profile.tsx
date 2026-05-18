import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Profile() {
  const navigate = useNavigate();
  const { house, level } = useGameStore();

  const handleLogout = () => {
    // Clear localStorage and redirect
    localStorage.removeItem('wizarding-academy-storage');
    window.location.href = '/portal';
  };

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed min-h-[100dvh] pb-24 overflow-x-hidden max-w-[390px] mx-auto shadow-2xl relative">
      <style>{`
        .parchment-bg {
            background-color: #fff8f7;
            background-image: radial-gradient(#dfbfbc 0.5px, transparent 0.5px);
            background-size: 24px 24px;
        }
        .deckle-edge {
            clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 94%, 85% 97%, 80% 93%, 75% 98%, 70% 94%, 65% 97%, 60% 94%, 55% 98%, 50% 94%, 45% 98%, 40% 94%, 35% 97%, 30% 94%, 25% 98%, 20% 94%, 15% 97%, 10% 94%, 5% 98%, 0% 95%);
        }
        .magical-glow {
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        .wax-seal {
            background: linear-gradient(145deg, #871f1c, #510003);
            box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.2), 3px 3px 8px rgba(0,0,0,0.4);
            position: relative;
        }
        .wax-seal::after {
            content: '';
            position: absolute;
            inset: 4px;
            border: 1px solid rgba(212, 175, 55, 0.4);
            border-radius: 9999px;
        }
      `}</style>
      
      <div className="parchment-bg min-h-[100dvh]">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-5 h-16 shadow-[0_4px_10px_rgba(60,47,47,0.1)] bg-surface-container sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="material-symbols-outlined text-primary dark:text-inverse-primary active:scale-95 transition-transform">arrow_back</button>
            <h1 className="font-display-lg-mobile text-[24px] text-primary dark:text-inverse-primary drop-shadow-sm font-bold tracking-tight">Mystic Academy</h1>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-1YrKTos5EEULd0DwOkfPB-niiRdg5fPfqSuaZo5YLKftHfwQ2Skz_XNqRiGp4WYMCyKrMiuicFrtXtttzZrLyiPoZIowjq4UJCLfBzTPVh7ED6VQIBIjZAnBgAeoE0aHXrv7eMQ_aSaPrQsUaqv2h8VF27TPRqXLXiF1joTuyRxKnVVIQLjB4Gjoz_tB8kiOLNxj7Fs0vgKq5wgU5hRetIfCj-6qz7bYj6C3BXVAqJCHBBZXZkTK3M3T8HhBDuEgg98CX_W9l0c"/>
          </div>
        </header>

        <main className="px-5 pt-8 pb-32 space-y-8">
          {/* Profile Section */}
          <section className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {/* Magical Frame */}
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-outline to-primary-fixed magical-glow">
                <div className="w-full h-full rounded-full border-4 border-surface overflow-hidden">
                  <img alt="Student Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGpuZCC5QS5IGguhaoI6Vthjn4-u_izLx23lKunF18R5-jO4HBjYZfH6zGKL73ZNecYYbgQ0QmKFcpxSaxu7U1jDsttft6cEfk8PWXPABmewGSSvHecfSBBjIHpUHratQ-p0G0UQ3f7zhsqxA58wkkk57xZYMOQ68p0Z8HGhHGfrPLmhc2NRyXl-qYBYzFUeuFh7k0Kl-_6kyU0sYMJWToVDot4Bi39kcZ8-j0PuPYg23kpSUgGgqCOQduFFnmOCD11i25fWQim78"/>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-surface">
                <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              </div>
            </div>
            <div>
              <h2 className="font-headline-md text-2xl text-on-surface">Nguyễn Minh Quân</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-label-md text-sm border border-primary">{house ? house.charAt(0).toUpperCase() + house.slice(1) : 'Gryffindor'}</span>
                <span className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full font-label-md text-sm border border-outline-variant">Năm {level > 0 ? level : 1}</span>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section className="space-y-4">
            <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined">account_circle</span>
              Hồ sơ cá nhân
            </h3>
            <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-1 deckle-edge shadow-sm">
              <button className="w-full flex items-center justify-between p-3 hover:bg-surface-container-low transition-colors rounded-lg group active:scale-95">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">person_edit</span>
                  <span className="font-body-md text-base text-on-surface font-semibold">Hồ sơ cá nhân</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>
              <div className="h-[1px] bg-outline-variant mx-4 opacity-30"></div>
              <button className="w-full flex items-center justify-between p-3 hover:bg-surface-container-low transition-colors rounded-lg group active:scale-95">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">lock</span>
                  <span className="font-body-md text-base text-on-surface font-semibold">Đổi mật khẩu thư cú</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>
              <div className="h-[1px] bg-outline-variant mx-4 opacity-30"></div>
              <button className="w-full flex items-center justify-between p-3 hover:bg-surface-container-low transition-colors rounded-lg group active:scale-95">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">volume_up</span>
                  <span className="font-body-md text-base text-on-surface font-semibold">Cài đặt âm thanh phép thuật</span>
                </div>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </button>
            </div>
          </section>

          {/* Magical Preferences */}
          <section className="space-y-4">
            <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined">magic_button</span>
              Tùy chọn phép thuật
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between bg-surface border border-outline-variant rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">language</span>
                  </div>
                  <div>
                    <p className="font-label-md text-sm text-on-surface font-bold">Chọn ngôn ngữ</p>
                    <p className="font-caption text-xs text-on-surface-variant">Tiếng Việt (Cổ ngữ)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary">expand_more</span>
              </div>
              
              <div className="flex items-center justify-between bg-surface border border-outline-variant rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-tertiary-fixed">mark_as_unread</span>
                  </div>
                  <div>
                    <p className="font-label-md text-sm text-on-surface font-bold">Thông báo từ cú</p>
                    <p className="font-caption text-xs text-on-surface-variant">Bật nhận thư khẩn</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-surface border border-outline-variant rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-fixed">bolt</span>
                  </div>
                  <div>
                    <p className="font-label-md text-sm text-on-surface font-bold">Chế độ tiết kiệm Mana</p>
                    <p className="font-caption text-xs text-on-surface-variant">Giảm hiệu ứng phép thuật</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-outline-variant rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Logout Button */}
          <div className="flex flex-col items-center pt-4 pb-12">
            <button onClick={handleLogout} className="wax-seal w-20 h-20 rounded-full flex items-center justify-center group active:scale-90 transition-transform duration-200">
              <span className="material-symbols-outlined text-primary-fixed text-[32px] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_delete</span>
            </button>
            <p className="mt-4 font-label-md text-sm text-primary tracking-widest uppercase font-bold">Đăng xuất</p>
          </div>
        </main>

        <BottomNavBar />
      </div>
    </div>
  );
}

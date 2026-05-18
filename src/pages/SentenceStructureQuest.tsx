import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SentenceStructureQuest() {
  const navigate = useNavigate();
  const [slotS, setSlotS] = useState<string | null>(null);
  const [slotV, setSlotV] = useState<string | null>(null);
  const [slotO, setSlotO] = useState<string | null>(null);

  const availableWords = ['The Shield', 'casts', 'The Mage'];

  const handleWordClick = (word: string) => {
    if (word === slotS) {
      setSlotS(null);
      return;
    }
    if (word === slotV) {
      setSlotV(null);
      return;
    }
    if (word === slotO) {
      setSlotO(null);
      return;
    }

    if (!slotS) {
      setSlotS(word);
    } else if (!slotV) {
      setSlotV(word);
    } else if (!slotO) {
      setSlotO(word);
    }
  };

  const handleCast = () => {
    if (slotS === 'The Mage' && slotV === 'casts' && slotO === 'The Shield') {
      navigate('/victory');
    } else {
      alert('Thần chú chưa chính xác! Sắp xếp lại Chủ ngữ, Động từ và Tân ngữ nhé!');
      setSlotS(null);
      setSlotV(null);
      setSlotO(null);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-32 max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden selection:bg-primary-fixed/50" style={{ backgroundImage: 'radial-gradient(#f3dedd 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface/95 backdrop-blur-sm shadow-sm flex justify-between items-center px-6 py-4 h-16 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm cursor-pointer" onClick={() => navigate('/portal')}>
            <img alt="Student Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPfAzXHV85M3SN2_kUMrOjFOfhQQqkxh5sHshrJ2iR8Xfe5sFcfeLqTN0qs7VXvd3DjMbW3BEuSPALJh7la4-9Pd3OERak4QJN8QBYspyh32XpQRsM5OWYkVq-rvKVgGisD0oZRbuf_BoNxWzofn5U6OlxFGdssauBKis1WGtanEnLWgLHULbS17_jeG44Iq5ppZFZFHiMnfaFtj27SAzIpujDomRZY4u0J_3sgy5ZwmKclQG7vwYa2dyi1TUOY58e506nxG-2_ww"/>
          </div>
          <h1 className="font-headline-md text-headline-md-mobile text-primary tracking-tight leading-none mt-1">Từ Điển Huyền Bí</h1>
        </div>
        <button className="text-primary hover:text-surface-tint active:scale-95 transition-transform duration-300">
          <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
        </button>
      </header>

      <main className="pt-24 px-5 flex flex-col gap-8">
        {/* Lesson Header */}
        <section className="text-center space-y-2 mt-2">
          <span className="font-label-md text-[13px] text-secondary tracking-widest uppercase font-bold">Phần 1: Ngữ Pháp Căn Bản</span>
          <h2 className="font-display-lg-mobile text-[32px] font-bold text-primary leading-tight">Cấu trúc Câu</h2>
          <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full mt-4">
            <div className="h-full w-1/3 bg-on-primary-container rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          </div>
        </section>

        {/* Knowledge Scroll Area */}
        <section className="bg-surface-container border border-outline-variant p-5 rounded-xl shadow-sm relative deckle-edge">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            <h3 className="font-headline-sm text-[20px] font-bold text-primary">Cuộn Sách Tri Thức</h3>
          </div>
          <div className="space-y-4 text-on-surface-variant text-[15px] leading-relaxed">
            <p>
              Để tạo ra một <span className="font-bold text-primary italic">Thần chú Bảo hộ</span> mạnh mẽ, các pháp sư phải nắm vững trật tự của dòng chảy ma thuật. Một câu thần chú hoàn chỉnh luôn bắt đầu bằng <span className="text-secondary font-bold">Chủ ngữ (S)</span> — người thi triển, theo sau là <span className="text-secondary font-bold">Vị ngữ (V)</span> — hành động thần bí.
            </p>
            <div className="bg-surface-container-high p-4 rounded-lg border-l-4 border-primary italic shadow-inner">
              "Trong tiếng Anh, trật tự cơ bản là S + V + O. Hãy tưởng tượng O là mục tiêu mà phép thuật hướng tới."
            </div>
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span><strong>Chủ ngữ:</strong> Đại diện cho nguồn năng lượng (Ví dụ: I, You, The Wizard).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span><strong>Động từ:</strong> Hành động giải phóng phép thuật (Ví dụ: cast, protect, create).</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Quest: Protection Spell */}
        <section className="relative bg-inverse-surface rounded-2xl p-5 overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center shadow-xl border-2 border-outline-variant">
          {/* Dark Classroom Background Overlay */}
          <div className="absolute inset-0 opacity-25">
            <img alt="Dark Classroom" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPbHiBTXJuqV24Wmq_AQhAWZr1rPqPXcwZ0cTq31t43KjDPGmuCXzR-nL23E0hiyQhhgRs9aXQL2AJINcexeAGKRythqY-kwc-kpmS75Yh6Wmt8xXSHuGV5ra8kRrabRzTfjXoc94b1Boah-06fCCjpZbuwTmwlbab4Bbk7Cct9F35ZxsDHwxAeFj834F-EhxxmXYlzZKJtTalAMK-qCGTDLJ-fwfrGeqhBIv0XQPhC2-CR7dP7JLOzjeALKJE4OpSn79aQ3xHFSo"/>
          </div>

          {/* Magical UI Elements */}
          <div className="relative z-10 w-full space-y-8 mt-4">
            <div className="space-y-2">
              <h4 className="font-headline-sm text-surface-bright drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">Nhiệm Vụ: Giải Phóng Khiên Phép</h4>
              <p className="font-label-md text-[13px] text-outline-variant uppercase tracking-wider">Sắp xếp các mảnh chữ</p>
            </div>

            {/* Word Slots */}
            <div className="flex flex-wrap justify-center gap-3 min-h-[60px] border-b-2 border-dashed border-outline-variant/30 pb-4">
              {[
                { label: 'S', value: slotS, setter: setSlotS },
                { label: 'V', value: slotV, setter: setSlotV },
                { label: 'O', value: slotO, setter: setSlotO }
              ].map((slot, idx) => (
                <div key={idx} onClick={() => slot.setter(null)} className="w-[85px] h-12 rounded bg-surface/10 border border-surface/30 flex items-center justify-center cursor-pointer relative overflow-hidden group">
                  {slot.value ? (
                    <span className="text-on-primary-container font-bold text-[14px] bg-primary-container/80 w-full h-full flex items-center justify-center border border-on-primary-container/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                      {slot.value}
                    </span>
                  ) : (
                    <span className="text-surface-bright font-bold opacity-30 italic group-hover:opacity-50">{slot.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Floating Magical Words */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {availableWords.map((word) => {
                const isSelected = slotS === word || slotV === word || slotO === word;
                return (
                  <button 
                    key={word}
                    onClick={() => handleWordClick(word)}
                    disabled={isSelected}
                    className={`px-4 py-2.5 rounded-full font-bold transition-all duration-300 ${
                      isSelected 
                        ? 'bg-surface/5 border border-surface/10 text-surface/20 scale-95 opacity-50' 
                        : 'bg-surface-container-highest/20 border border-primary-fixed-dim/50 text-surface-bright shadow-[0_0_15px_rgba(255,180,171,0.2)] hover:scale-105 active:scale-95 hover:bg-primary-container/40'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            {/* Cast Button (Wax Seal Style) */}
            <div className="pt-6 flex flex-col items-center pb-4">
              <button onClick={handleCast} disabled={!slotS || !slotV || !slotO} className="relative group cursor-pointer disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed">
                <div className="absolute -inset-4 bg-primary/40 rounded-full blur-xl group-hover:bg-primary/60 transition duration-500"></div>
                <div className="relative w-20 h-20 bg-primary border-4 border-primary-fixed rounded-full flex flex-col items-center justify-center shadow-2xl active:translate-y-1 active:shadow-inner transition-all overflow-hidden">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <span className="font-label-md text-[10px] text-primary-fixed-dim uppercase tracking-widest mt-0.5">Cast</span>
                </div>
              </button>
            </div>
          </div>

          {/* Decorative Sparks */}
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-fixed-dim rounded-full blur-[1px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-on-primary-container rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-on-primary-container rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </section>

        {/* Progress Footer Information */}
        <section className="flex justify-between items-center py-5 border-t border-outline-variant/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">hourglass_empty</span>
            <span className="font-label-md text-[13px] text-on-surface-variant font-semibold">4 phút còn lại</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_5px_rgba(59,104,72,0.5)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/60"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/60"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/60"></div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full max-w-[390px] z-50 flex justify-around items-center px-4 py-2 bg-surface rounded-t-xl shadow-[0_-4px_15px_rgba(60,47,47,0.1)] border-t border-outline-variant/30">
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5">Thần chú</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5">Bản đồ</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/curriculum')}>
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5">Thư viện</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/inventory')}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-md text-[10px] tracking-wide mt-0.5">Rương đồ</span>
        </div>
      </nav>
    </div>
  );
}

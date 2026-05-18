import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MidnightDuelQuest() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleCastSpell = () => {
    if (selectedAnswer === 'Arrives') {
      navigate('/victory');
    } else if (selectedAnswer) {
      alert('Phép thuật không chính xác! Hãy cẩn thận, Malfoy sẽ phát hiện ra chúng ta!');
    } else {
      alert('Hãy chọn một đáp án trước khi phóng chú!');
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col items-center parchment-texture max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden selection:bg-primary-fixed/50">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] z-50 bg-surface dark:bg-surface-container shadow-sm flex justify-between items-center px-6 py-4 border-b border-outline-variant/30 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-sm cursor-pointer" onClick={() => navigate('/portal')}>
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH0HuVi6jSucBiO1H3ww8J5iULqgFeOUT__9lchIZWaGGckaXYG86t436HsV_5g7emOqivE0eiUW3LZYRjCRYFxYHBVBI8boPSjKGjl4ENsrwDO6ZaSruEQjlqggQ-drANGeUfFoDZMvcroi-_0of9aNKZDdJKZ0iJ81WlHWlibvNCrFEMfKeII3HQFzWEUxn4LzpwkRY0Dp9e-lW_ew3SpkTH0oSj5_TWhIl9U7urP9JYdSFAfyYoGaK4aZRJPc0FihDivcKbVY8"/>
          </div>
          <h1 className="font-headline-md text-headline-md-mobile text-primary leading-none mt-1">Từ Điển Huyền Bí</h1>
        </div>
        <button className="text-primary hover:glow-gold transition-all duration-300">
          <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full pt-20 pb-32 px-6 flex flex-col gap-6">
        {/* Challenge Title Section */}
        <section className="text-center mt-2">
          <h2 className="font-display-lg-mobile text-[24px] font-bold text-primary mb-2 leading-tight">Thử thách: Đấu tay đôi Nửa đêm</h2>
          <div className="h-1 w-24 bg-primary-container mx-auto rounded-full opacity-50"></div>
        </section>

        {/* Illustration Component */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg border-2 border-outline-variant">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtfEjgUbwfxs36OUS4e8KcXp4DsoMNlAB113oTIeiN9XAdYYl__PT0qOOJST23YbixNyxUiWZRhrX3IiMEwKAXUybJzMa3I45hlKwXgQ2_OFaBN3k5n-yyZUB4j8FeeuVUwyVc1kpLy57tl79a_b6eRgmZCiVMja5vkt9fPg6a9eLwn3tL77A_-VDBwoZu-7EYpQRM8Spw2Rnyayr8EeCoUYVDipz4VKAyTomHLqi802QUvEpu2lRxbWaQmlT55QV3496vmnsdVuA"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
            <p className="text-on-tertiary font-label-md text-[11px] tracking-wide">Hành lang Tầng Ba - 12:00 AM</p>
          </div>
        </div>

        {/* Dialogue Section (Hermione) */}
        <section className="relative bg-surface-container-low p-4 rounded-xl border-l-4 border-primary shadow-sm flex gap-3 items-start mt-2">
          <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-outline p-0.5 bg-white shadow-inner">
            <img className="rounded-full w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8l11uXvcN4Fn-4esbnoncmX0Gvl0IPT76lWm3TERHQ_fGNMG_D6_3EK_QVPN7zpKTXoKogBPDP_9npyhbp8B65SsPatRiHvn41NTNroASMcdPWO1fjd7aKXinoJ4jKBjLRBU5_a996IQfF5pMHXxChU27rnJac4y-n0jXCCKkG4ZQHDkH-ytZZWyaLtJXpRFtquZxQkxxCi9VfIL-_vMbKFNTjHWXINKTkNS-E0SmlfS4m5NshfHtRACfQQExvCJ43qSVbDUV-tg"/>
          </div>
          <div className="pt-1">
            <h3 className="font-headline-sm text-[16px] text-primary mb-1">Hermione Granger</h3>
            <p className="font-body-md text-[14px] text-on-surface-variant italic leading-snug">
              "Harry, cậu không thể đi được! Cậu sẽ bị bắt mất. Và hãy nhớ, cấu trúc câu điều kiện là chìa khóa để giải quyết bùa chú này đấy!"
            </p>
          </div>
          {/* Decorative Ribbon */}
          <div className="absolute -top-3 -right-2 bg-primary text-on-primary px-2 py-0.5 rounded shadow-md rotate-3 font-label-md text-[9px] uppercase tracking-wider">
            Gợi ý pháp thuật
          </div>
        </section>

        {/* The Grammar Challenge (Spell Selection) */}
        <section className="flex flex-col gap-4">
          <div className="bg-surface-container-highest p-5 rounded-xl border border-outline-variant deckle-edge shadow-inner">
            <p className="font-body-md text-[13px] text-on-surface-variant mb-2 text-center uppercase tracking-widest font-bold">
              Hoàn thành câu thần chú
            </p>
            <p className="font-headline-md text-xl text-center text-primary-container leading-tight">
              "If Malfoy <span className="underline decoration-outline-variant underline-offset-4 px-1">{selectedAnswer || '_______'}</span> early, we will be in trouble!"
            </p>
          </div>

          {/* Spell Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { text: 'Arrives', type: 'Hiện tại', icon: 'bolt' },
              { text: 'Arrived', type: 'Quá khứ', icon: 'history_edu' },
              { text: 'Will arrive', type: 'Tương lai', icon: 'auto_awesome' },
              { text: 'Arriving', type: 'Tiếp diễn', icon: 'cyclone' }
            ].map(opt => (
              <button 
                key={opt.text}
                onClick={() => setSelectedAnswer(opt.text)}
                className={`group p-3 rounded-xl transition-all duration-300 text-left relative overflow-hidden border-2 ${
                  selectedAnswer === opt.text
                    ? 'bg-primary-container/10 border-primary shadow-md'
                    : 'bg-white border-outline-variant hover:border-primary-fixed-dim hover:bg-surface-container-low'
                }`}
              >
                <span className={`font-headline-sm text-lg block mb-1 ${selectedAnswer === opt.text ? 'text-primary' : 'text-on-surface'}`}>
                  {opt.text}
                </span>
                <span className={`text-caption font-caption ${selectedAnswer === opt.text ? 'text-primary' : 'text-outline'}`}>
                  Bùa chú {opt.type}
                </span>
                <div className={`absolute right-1 bottom-1 transition-opacity ${selectedAnswer === opt.text ? 'opacity-30 text-primary' : 'opacity-10 text-on-surface'}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{opt.icon}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Final Action Button */}
        <div className="flex justify-center pt-2">
          <button 
            disabled={!selectedAnswer}
            onClick={handleCastSpell}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 group relative transition-all duration-300 ${
              selectedAnswer 
                ? 'bg-primary-container border-primary shadow-[0_4px_15px_rgba(116,16,16,0.6)] hover:scale-105 active:scale-95 cursor-pointer' 
                : 'bg-surface-variant border-outline-variant opacity-60 grayscale cursor-not-allowed'
            }`}
          >
            <span className={`material-symbols-outlined text-3xl ${selectedAnswer ? 'text-on-primary-container' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>flare</span>
            <div className={`absolute -bottom-6 whitespace-nowrap font-label-md text-[11px] font-bold tracking-widest ${selectedAnswer ? 'text-primary' : 'text-outline'}`}>
              PHÓNG CHÚ
            </div>
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full max-w-[390px] z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-surface-container rounded-t-xl shadow-[0_-4px_10px_rgba(60,47,47,0.1)] border-t border-outline-variant/30">
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/quest/1-daily-warm-ups-reading-grade-1-p100')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <span className="font-label-md text-[10px] mt-0.5 tracking-wide">Thần chú</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-label-md text-[10px] mt-0.5 tracking-wide">Bản đồ</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/curriculum')}>
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-md text-[10px] mt-0.5 tracking-wide">Thư viện</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/inventory')}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-md text-[10px] mt-0.5 tracking-wide">Rương đồ</span>
        </div>
      </nav>
    </div>
  );
}

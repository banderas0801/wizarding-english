import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function BoggartClass() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();

  const handleCastSpell = (isCorrect: boolean) => {
    if (isCorrect) {
      addXp(150);
      addGold(40);
      alert("Tuyệt vời! Boggart đã biến thành trò hề! +150 XP, +40 Gold");
      navigate('/victory');
    } else {
      alert("Ôi không, Thần chú không linh nghiệm. Boggart vẫn còn đáng sợ!");
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-32 max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
      {/* TopAppBar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-tint">
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBea23Rq7cxrdHTzKtBwUgoG9kV9OF4X9rVJMckOCAkWO8Gw-4VeWTyUx0qdTVIzZ_RGD648ro4HfSp0tPjLk-uretZeFqYWAZ5dnh-GWFqdEWyrXbps7EP93wuULRIVGvYdrciFIR1roRGEPiZ-KKJoNrmZiWiQA3K_V2FSaZA4FNH7-5ThOdHgWYbwWnJEosKblskCzIYN2zon-acui_E8rldWFATZXlURIVs1AO8qs-yUfZJCcyVZt5IWDs_hbIi19WGhyG4eZ8"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
        </div>
        <button onClick={() => navigate('/')} className="material-symbols-outlined text-surface-tint p-2 rounded-full hover:bg-surface-container-high transition-colors">tempest</button>
      </header>

      <main className="max-w-4xl mx-auto px-5 pt-8">
        {/* Hero Lesson Section */}
        <section className="mb-10 text-center">
          <span className="font-label-md text-sm font-bold text-secondary uppercase tracking-widest bg-secondary-container px-4 py-1 rounded-full inline-block mb-4">Lớp Phòng chống Nghệ thuật Hắc ám</span>
          <h2 className="font-display-lg-mobile text-3xl font-bold text-primary mb-4">Đối mặt Boggart: Riddikulus!</h2>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto">Giáo sư Lupin đang chờ bạn. Hãy biến nỗi sợ hãi về từ vựng thành những tiếng cười sảng khoái bằng cách chọn đúng nghĩa tích cực.</p>
        </section>

        {/* The Boggart Interaction Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* The Boggart (The Fear) */}
          <div className="bg-surface-container-highest/50 p-8 rounded-xl border border-outline-variant relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 84% 97%, 80% 94%, 75% 98%, 70% 95%, 65% 97%, 60% 94%, 55% 98%, 50% 95%, 45% 97%, 40% 94%, 35% 98%, 30% 95%, 25% 97%, 20% 94%, 15% 98%, 10% 95%, 5% 97%, 0% 94%)' }}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
            <div className="z-10 text-center">
              <div className="mb-6 relative">
                <span className="material-symbols-outlined text-[80px] text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full blur-sm opacity-50"></div>
              </div>
              <div className="mb-2">
                <span className="font-label-md text-sm font-bold text-on-primary-fixed-variant italic">Từ vựng "Đáng sợ":</span>
              </div>
              <div className="font-display-lg text-4xl font-bold text-primary tracking-widest uppercase mb-2">GLOOMY</div>
              <div className="font-caption text-xs text-on-surface-variant">/ˈɡluːmi/</div>
            </div>
            {/* Particle Effect Overlay */}
            <div className="absolute bottom-4 right-4 flex gap-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-30"></div>
            </div>
          </div>

          {/* The Counter-Spell (The Funny/Positive Translation) */}
          <div className="flex flex-col gap-4">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-[inset_1px_1px_3px_rgba(60,47,47,0.2)] h-full flex flex-col justify-between">
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-6">Chọn từ để dùng "Riddikulus":</h3>
              <div className="space-y-4">
                {/* Option 1: Incorrect/Fearful */}
                <button onClick={() => handleCastSpell(false)} className="w-full text-left p-4 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container-high transition-all flex items-center justify-between group active:scale-95">
                  <div>
                    <span className="font-headline-sm text-lg font-bold block">U ám &amp; buồn bã</span>
                    <span className="font-caption text-xs text-on-surface-variant italic">Nghĩa gốc - Sợ hãi vẫn còn!</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary">sentiment_very_dissatisfied</span>
                </button>
                {/* Option 2: Correct/Funny/Positive Transformation */}
                <button onClick={() => handleCastSpell(true)} className="w-full text-left p-4 rounded-lg border-2 border-secondary bg-secondary-container hover:bg-secondary-fixed transition-all flex items-center justify-between group active:scale-95 ring-1 ring-secondary/20">
                  <div>
                    <span className="font-headline-sm text-lg font-bold block text-on-secondary-fixed-variant">Ánh sáng rực rỡ</span>
                    <span className="font-caption text-xs text-on-secondary-container italic">Biến hóa tích cực!</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                </button>
                {/* Option 3: Irrelevant */}
                <button onClick={() => handleCastSpell(false)} className="w-full text-left p-4 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container-high transition-all flex items-center justify-between group active:scale-95">
                  <div>
                    <span className="font-headline-sm text-lg font-bold block">Con cú bay</span>
                    <span className="font-caption text-xs text-on-surface-variant italic">Không liên quan</span>
                  </div>
                  <span className="material-symbols-outlined text-outline">question_mark</span>
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <button className="w-20 h-20 rounded-full flex items-center justify-center text-secondary-fixed transition-transform active:scale-90 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),2px_2px_6px_rgba(0,0,0,0.2)]" style={{ background: 'radial-gradient(circle at 30% 30%, #a83730, #510003)' }}>
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section (The Hourglass) */}
        <section className="mt-16 bg-surface-container-low p-8 rounded-2xl border border-outline-variant relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-headline-sm text-lg font-bold text-primary">Tiến trình tiêu diệt Boggart</h4>
            <span className="font-label-md text-sm font-bold text-surface-tint">3/10 Boggarts</span>
          </div>
          <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant">
            <div className="h-full w-[30%] bg-gradient-to-r from-surface-tint to-[#D4AF37] relative">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:20px_20px] animate-[spin_3s_linear_infinite]" style={{ backgroundSize: '20px 20px' }}></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 font-caption text-xs text-on-surface-variant">
            <span>Khởi đầu</span>
            <span>Thần chú tối thượng</span>
          </div>
        </section>

        {/* Bento Grid for Vocabulary Details */}
        <section className="mt-16">
          <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-8">Ghi chú từ Giáo sư Lupin</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phonetics Card */}
            <div className="md:col-span-1 bg-tertiary-container text-white p-6 rounded-xl shadow-sm border border-tertiary">
              <span className="material-symbols-outlined mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>record_voice_over</span>
              <h5 className="font-headline-sm text-xl font-bold mb-2">Phát âm</h5>
              <p className="font-body-md text-base opacity-90 italic mb-4">/ˈɡluːmi/</p>
              <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined text-sm">volume_up</span>
                <span className="font-label-md text-sm font-bold">Nghe thử</span>
              </button>
            </div>
            {/* Usage Card */}
            <div className="md:col-span-2 bg-surface p-6 rounded-xl border border-outline-variant shadow-[inset_1px_1px_3px_rgba(60,47,47,0.2)]">
              <h5 className="font-headline-sm text-xl font-bold text-primary mb-2">Cách sử dụng Thần chú</h5>
              <p className="font-body-md text-base text-on-surface-variant mb-4">"Gloomy" thường mô tả bầu trời hoặc tâm trạng. Khi dùng <strong>Riddikulus</strong>, chúng ta thay đổi góc nhìn thành sự hy vọng hoặc ánh sáng.</p>
              <div className="bg-surface-container-lowest p-3 rounded border-l-4 border-surface-tint italic text-on-surface-variant">
                "The gloomy sky became bright with a sudden flash of light!"
              </div>
            </div>
            {/* Fun Fact / Magic Tip */}
            <div className="md:col-span-3 bg-surface-variant p-6 rounded-xl border border-outline-variant flex items-center gap-6">
              <img alt="Chocolate Tip" className="w-20 h-20 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-qyZix2OZcEH1wizUkCXLeePby7jvmjE8UFPL9BvkFW-12tI3fTy8c2DHdyyx4tfbGf2DLrsB05ZW6FiHS51MEVAA-JR5j4Q5YIvN5YQtKBx0dBB-SWvlWsuhzQiCxX25QaTHke9Erpa9dEIQSbu7Rf3pIwQBnbl17X3SLEdZEfwuaV14m0FvDLyLgEiJtQ2BxHK0NjyYlFjGEvQ31udOqPE46uQpMJRWysMKh9jfMVvY_gwKddISDJRlDciTyPFTH9IiIf0xPSw"/>
              <div>
                <h5 className="font-label-md text-sm font-bold text-primary uppercase">Lời khuyên của Giáo sư</h5>
                <p className="font-body-md text-base text-on-surface-variant">Đừng quên ăn một chút sô-cô-la sau khi đối mặt với Boggart để hồi phục tinh thần nhé!</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

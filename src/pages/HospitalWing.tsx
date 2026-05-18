import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function HospitalWing() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      addXp(100);
      addGold(20);
      alert("Chính xác! Lá Dittany (Bạch tiên) rất hiệu quả trong việc chữa bỏng. Bạn đã hồi phục toàn bộ HP và Mana! (+100 XP, +20 Gold)");
      navigate('/victory');
    } else {
      alert("Chưa đúng! Hãy thử lại. Nhớ lại bài học về các sinh vật lửa nhé.");
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface-container-low shadow-[0_4px_12px_rgba(60,47,47,0.1)] flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-primary">
            <img alt="Student Portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnCfM0U09YkUnttdBFMgmG_5iBoQF7FU7JLlkeyf56qzeM-5ALiT49MFJ8MBdY3Z-33K31ybUjuYiRsQVcx8J6JVE6Ap0K4kpstm794X0-KQoVfxzW5fp4bEccfwq8sKKwBTqMhiqpyCSWUUxNSm0p8ejfeLt072LoN26s4m-GmgzJfMRndaqEe9HJiOEFxJw1PYhgbiTDo0FrywNLgNq2W1RT9YJyWkJcR8Z_flkxOIvr43iSpNbuBipiSQeizF_dhfDJDGcfYe4"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl md:text-3xl font-bold text-primary-container italic">Wizarding Academy</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-primary text-2xl">refresh</button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 max-w-4xl mx-auto min-h-screen">
        {/* Hospital Wing Hero Section */}
        <section className="relative rounded-xl overflow-hidden mb-8 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10"></div>
          <img alt="Hospital Wing" className="w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlZh6UVPIKk6_q-0-X3NtkzbV6-7kD8NGGx8B-bDOgld5J6PrWS5SypQvIfW4ViblAK8CfuyIizaZhn7XDhtc3xK1yqLBoMp_WMqpv7hSgc6UpzDl1411RFpPQP_n1cp2Rg653fRerR3sJyJs36hCym2ox6fyPkQdVP4YmuRxRnctPVKptxjdtVWWxe4UQISXd7UOPUvjWDM3GiwXO3hJPyE7cv8OQ_Y8bB9Hwy2B30Uvgr5j_qXNulztUcIckHZdIxP7G3F_kLFc"/>
          <div className="absolute bottom-6 left-6 z-20">
            <h2 className="font-headline-md text-2xl font-bold text-primary mb-1">Hospital Wing</h2>
            <p className="font-body-md text-sm text-on-surface-variant italic">Nơi nghỉ ngơi dành cho những phù thủy nhỏ mỏi mệt.</p>
          </div>
        </section>

        {/* Recovery Status */}
        <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">healing</span>
          </div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Tiến trình phục hồi</h3>
              <p className="font-caption text-xs text-on-surface-variant">Uống độc dược để sớm trở lại lớp học!</p>
            </div>
            <span className="font-headline-sm text-xl font-bold text-primary">65%</span>
          </div>
          <div className="h-4 w-full bg-surface-variant rounded-full overflow-hidden border border-outline-variant/30">
            <div className="h-full bg-gradient-to-r from-secondary to-[#416e4d] relative w-[65%]">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(212, 175, 55, 0.1) 100%)' }}></div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="font-label-md text-xs font-bold">HP: 12/100</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-[#162147] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-md text-xs font-bold">Mana: 5/100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Madam Pomfrey & Guidance */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="bg-surface-container-high p-5 rounded-xl border border-outline-variant relative" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 88% 95%, 85% 99%, 80% 94%, 75% 98%, 70% 95%, 65% 99%, 60% 94%, 55% 98%, 50% 95%, 45% 99%, 40% 94%, 35% 98%, 30% 95%, 25% 99%, 20% 94%, 15% 98%, 10% 95%, 5% 99%, 0% 95%)' }}>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-surface-container-lowest border-2 border-primary overflow-hidden shrink-0">
                  <img alt="Madam Pomfrey" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbXRvMtgmUh70uxcoE1IjLrICeAkZAAi3bL3vmNo1KnpbcX3rc6IFIapQF3McFfNsFSRPIoinnB-mIiuo4DkMctoatub5nfRZMSGIrRnS-BuK8mGTnjBUYEKvMxWU3RJD3sFjEM1-lP37M6gVk4DdW1Csk5rmEyXwJc1FJko_mh7Mgv9I1C1-RUbG1eXZtafKOALiHoa2GdvE6y_PK5IBxkiebT3HDOHFB7_JlFt7UKR4Lie9FjYNcsii4VBvLY4isVIqrOynzVdM"/>
                </div>
                <div>
                  <p className="font-headline-sm text-base font-bold text-primary mb-0.5">Madam Pomfrey</p>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Y tá trưởng</span>
                </div>
              </div>
              <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                "Con trông có vẻ kiệt sức quá. Đừng lo lắng, hãy uống một chút <strong>Độc Dược Hồi Phục</strong> nhé. Chỉ cần trả lời vài câu hỏi từ giáo trình <i>Evan</i>, con sẽ cảm thấy khỏe hơn ngay thôi!"
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col gap-3">
              <h4 className="font-label-md text-xs font-bold text-on-surface-variant uppercase">Lựa chọn Độc dược</h4>
              <div className="flex gap-3">
                <button className="flex-1 flex flex-col items-center gap-2 p-3 bg-surface-container-highest rounded-lg border-2 border-primary active:scale-95 transition-transform" style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>
                  <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                  <span className="font-label-md text-xs font-bold text-primary">HP Potion</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant opacity-60 grayscale hover:grayscale-0 transition-all">
                  <span className="material-symbols-outlined text-2xl text-[#162147]">clear_all</span>
                  <span className="font-label-md text-xs font-bold text-[#162147]">Mana Elixir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quiz Canvas */}
          <div className="md:col-span-7">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-outline-variant shadow-lg min-h-[350px] flex flex-col" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#d4c5a1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-md text-xs font-bold text-on-surface-variant">CÂU HỎI 03 / 05</span>
                  <div className="flex-1 h-[2px] bg-outline-variant">
                    <div className="h-full bg-primary w-3/5"></div>
                  </div>
                </div>
                <h3 className="font-headline-md text-xl font-bold text-on-background leading-snug">
                  "Trong chương 4 của giáo trình Evan, loài thảo dược nào có khả năng chữa lành các vết bỏng do rồng gây ra?"
                </h3>
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <button onClick={() => handleAnswer(false)} className="w-full text-left p-4 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-secondary-container/30 transition-colors group flex justify-between items-center active:scale-[0.98]">
                  <span className="font-body-md text-sm text-on-surface">Cỏ Mandrake (Nhân sâm hét)</span>
                  <span className="w-5 h-5 rounded-full border border-outline-variant group-hover:border-secondary"></span>
                </button>
                <button onClick={() => handleAnswer(true)} className="w-full text-left p-4 rounded-xl border-2 border-secondary bg-secondary-container/20 transition-colors group flex justify-between items-center ring-2 ring-secondary/10">
                  <span className="font-body-md text-sm text-[#234f32] font-bold">Lá Dittany (Bạch tiên)</span>
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xs">check</span>
                  </span>
                </button>
                <button onClick={() => handleAnswer(false)} className="w-full text-left p-4 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-secondary-container/30 transition-colors group flex justify-between items-center active:scale-[0.98]">
                  <span className="font-body-md text-sm text-on-surface">Tai Chó Sói (Wolfsbane)</span>
                  <span className="w-5 h-5 rounded-full border border-outline-variant group-hover:border-secondary"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function HalloweenFeast() {
  const navigate = useNavigate();
  const { addXp, addGold } = useGameStore();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedFood === 'Pumpkin Pie') {
      addXp(120);
      addGold(30);
      alert("Chính xác! Bánh bí ngô đã được đặt lên bàn tiệc! +120 XP, +30 Gold");
      navigate('/victory');
    } else if (selectedFood) {
      alert("Sai món rồi! Evan yêu cầu Pumpkin Pie (Bánh bí ngô) cơ mà.");
    } else {
      alert("Hãy chọn một món ăn trước khi xác nhận nhé!");
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24 max-w-[390px] mx-auto shadow-2xl relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#f3dedd 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      {/* Top Navigation Bar */}
      <header className="bg-surface sticky top-0 z-50 shadow-sm flex justify-between items-center px-6 py-4 h-16 w-full" style={{ backgroundImage: 'radial-gradient(#f3dedd 1px, transparent 0)', backgroundSize: '24px 24px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <img alt="Student Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB75hbXwtrcsA9H6dn3QLlho06lODSBdfQLBvcWM47ET4uv63mGTfNbBl9tcYGlkzVmY_EulLQ7R1YPnCDeeZGDeuoSZFDWUWtEkmyAXFkqIrjWnHp4CZqSOCOl7ZLR1_PwbYG5focWN73rgK-5WVn3m95B01VBNZA7kwVHY3yxqn1-txEV3uW_KAsY_qcHN4UtfYsABM4gO0pMAyKE1qz2Hq4AyCIqEbQCy_96HMviMGFtayoX5XohACB5jn2IYvvHIzOHhXpbY-E"/>
          </div>
          <span className="font-headline-md text-xl font-bold text-primary">Từ Điển Huyền Bí</span>
        </div>
        <button onClick={() => navigate('/')} className="text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-transform active:scale-95 duration-300">
          <span className="material-symbols-outlined text-[32px]">auto_fix_high</span>
        </button>
      </header>

      <main className="px-5 pt-8 space-y-8">
        {/* Hero Title Section */}
        <section className="text-center space-y-2">
          <div className="inline-flex items-center justify-center space-x-2 bg-primary-container/10 px-4 py-1 rounded-full text-on-primary-container font-label-md text-sm font-bold">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>theater_comedy</span>
            <span>Sự Kiện Đặc Biệt</span>
          </div>
          <h1 className="font-display-lg-mobile text-3xl font-bold text-primary leading-tight">Lễ Hội Halloween tại Đại Sảnh Đường</h1>
          <p className="font-body-lg text-base text-on-surface-variant italic">Hãy giúp các giáo sư chuẩn bị đại tiệc bằng những từ vựng ma thuật!</p>
        </section>

        {/* Main Game Area: Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Floating Elements / Visual Context Card */}
          <div className="relative h-[240px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(60,47,47,0.15)] border border-outline-variant/30">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-o7M1AXKNgHFwCO2ZQr8sVkhrEWSZUZdP_cvw3VD7IzL5TqT1W--RixUKRabm_C_gfND-Kgw6JeTkIWIL4WuvkC8OVaHHtmDiNSw7CIBqA6gHQY9AyuSZ0jiQlVWWo2mOLvbo0T8Qv6dLpDbPKQgl3BTJ0O-XvJbMZO7jnanWYsDp7PSr_6I2e6-KD0LOZGia9OUIAvgYvvi2s7s7b7Y2rEK6wbrrLSjDprmcKG6MrXNCBFRLAL81kiU8yKFxnarS8adQYZtKkB0" alt="Great Hall Halloween"/>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400">restaurant</span>
                <span className="font-headline-sm text-xl font-bold">Đại Tiệc Từ Vựng</span>
              </div>
              <p className="font-body-md text-sm opacity-90">Tìm các món ăn theo yêu cầu của Evan!</p>
            </div>
            {/* Animated Floating Elements Overlay */}
            <div className="absolute top-8 right-8 animate-[bounce_6s_infinite]">
              <span className="material-symbols-outlined text-orange-400 text-5xl opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>bakery_dining</span>
            </div>
            <div className="absolute top-16 left-8 animate-[bounce_5s_infinite_reverse]">
              <span className="material-symbols-outlined text-purple-300 text-4xl opacity-60" style={{ fontVariationSettings: "'FILL' 1" }}>Ghost</span>
            </div>
          </div>

          {/* Task/Requirement Card */}
          <div className="bg-surface-container p-6 rounded-xl border-2 border-dashed border-primary/20 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-primary">Yêu cầu từ Evan</h3>
              <p className="font-body-md text-sm text-on-surface mt-2 italic">"Hãy tìm món <span className="font-bold text-primary underline underline-offset-4 decoration-primary/30">Pumpkin Pie</span> để bày lên bàn tiệc!"</p>
            </div>
            <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-2/3 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
            </div>
            <span className="font-label-md text-xs font-bold text-on-surface-variant">Tiến độ: 4/6 món ăn</span>
          </div>

          {/* Vocabulary Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Option 1: Wrong */}
            <button onClick={() => setSelectedFood('Turkey')} className={`group relative bg-surface p-3 rounded-xl border ${selectedFood === 'Turkey' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'} transition-all duration-300 flex flex-col items-center gap-3`}>
              <div className="w-full aspect-square rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden">
                <img className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGziHXEvvKQ1tMkLEWCrQPT8S0ZkikCayXnVEpmKUZsXaYzgt74M-HB3_3PaZIiKvEKqP3M3oMsbpt6Ms0f-3pIYLGsmpXMA5rQTfk_6m_LRoyOAlEXX8MVvQn8ObbnDKGNm5kxPpawd1cPYhVuo6GLZWEOunxL-dQsX2LvqZWbbLx4B6YXOQLjV-aGzSe2LnJc3rrAKc97JQAPeJklReFP_NwyXEY1hvdCXoPiQAEP0hnXZunu9pytUgykKKj-La00SZItz-POmE" alt="Turkey"/>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-headline-sm text-base font-bold text-primary">Turkey</p>
                <p className="font-caption text-xs text-on-surface-variant">Gà tây quay</p>
              </div>
            </button>
            {/* Option 2: Correct */}
            <button onClick={() => setSelectedFood('Pumpkin Pie')} className={`group relative bg-surface p-3 rounded-xl border-2 ${selectedFood === 'Pumpkin Pie' ? 'border-primary bg-primary/5' : 'border-outline-variant'} transition-all duration-300 flex flex-col items-center gap-3`}>
              {selectedFood === 'Pumpkin Pie' && (
                <div className="absolute -top-3 -right-3 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
              )}
              <div className="w-full aspect-square rounded-lg bg-orange-50 flex items-center justify-center overflow-hidden relative">
                <img className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC91RmAul04VaiMcmhgCB6vtRF2j9w8jXXKbA6bl67LzwJee8I6ZXO9PJ6Lde-UeUKRJ-UrMqRx3lWzbuXIoFsfzFwELsWc3zEYeXdEGjvZhj1IinE6T-TwIdwUwg6y5HQHw37_jKJ9bnmiTH3x3ijL81VtXhYqkr-JCN-mmQZ8WwZ9ZzsHHCJvX7M33SjDwDZNhNoK8LAEhXMoEmR5IIrB_MEoiR1_Sb40mvGKLAQQsPIHQCuXItAoPaA7MzNz6UWdnL6yXYdequw" alt="Pumpkin Pie"/>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-headline-sm text-base font-bold text-primary">Pumpkin Pie</p>
                <p className="font-caption text-xs text-on-surface-variant">Bánh bí ngô</p>
              </div>
            </button>
            {/* Option 3: Wrong */}
            <button onClick={() => setSelectedFood('Candies')} className={`group relative bg-surface p-3 rounded-xl border ${selectedFood === 'Candies' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'} transition-all duration-300 flex flex-col items-center gap-3`}>
              <div className="w-full aspect-square rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden">
                <img className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2k8Lrqn9ufMWE19Ibqs4u6XlApJOWtwMrOBFbjO98W2lV1eaql8oGJwpl5zu2eEs3sWZidPVhDHoiMjC40jc7IPM8-bYFX00eE61t3_9f-CDJxnOj1pi9xShxO86XTb1UIWeXdd7PDzhTZTptdMFzrUDiYfqaEu-yRUZMfSE42a6XzCv4RyhDO0sAhYfQiyR9fmPcsrg4OBekw_riuWPVbLMOrmtrCfWAqjno3NX1F2Y4zxv7NEIdRvN7px279rulhBJPVoI4qCA" alt="Candies"/>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-headline-sm text-base font-bold text-primary">Candies</p>
                <p className="font-caption text-xs text-on-surface-variant">Kẹo ngọt</p>
              </div>
            </button>
            {/* Option 4: Wrong */}
            <button onClick={() => setSelectedFood('Toffee Apple')} className={`group relative bg-surface p-3 rounded-xl border ${selectedFood === 'Toffee Apple' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'} transition-all duration-300 flex flex-col items-center gap-3`}>
              <div className="w-full aspect-square rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden">
                <img className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXBtFkB4PkQh5IDUz-7tEJYlWJk6wVg-1JEGdWIWF5__EJlUTbPD3iBHLm5nQ_-qMa_vaOzacRl-UKxhS7xPt4Kqx6kKKGV7ig0dBiC4so6-5Gw7U9ymgpf0g3lzmCMYHaFYeF-M2TBh5_zgMnkH9cFT6fmXCgMmBLk-HL80_lCbcxtcVWSgU9Sk5sbBoJwbQ4twUD7qrOBrQniFi98_Z2UaRNYGkl7bakkOyvRnH7uVR0U0MAUE27rU2xIVahnrTLJ4pbJrObvmY" alt="Toffee Apple"/>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-headline-sm text-base font-bold text-primary">Toffee Apple</p>
                <p className="font-caption text-xs text-on-surface-variant">Táo bọc đường</p>
              </div>
            </button>
          </div>
        </div>

        {/* Feedback Section (Wax Seal Style Action) */}
        <div className="flex justify-center pt-4 pb-8">
          <button onClick={handleConfirm} className="group relative flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-primary rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-2 border-[#D4AF37] flex items-center justify-center transition-all duration-300 active:scale-90 active:shadow-inner hover:brightness-110">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <span className="font-label-md text-sm font-bold text-primary tracking-widest uppercase">Xác Nhận</span>
            {/* Magical Particles Decoration */}
            <div className="absolute -top-4 -left-4 text-orange-400 opacity-40">
              <span className="material-symbols-outlined text-[24px]">flare</span>
            </div>
            <div className="absolute -bottom-4 -right-4 text-orange-400 opacity-40">
              <span className="material-symbols-outlined text-[24px]">flare</span>
            </div>
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}

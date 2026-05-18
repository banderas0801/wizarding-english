import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';
import { useGameStore } from '../store/useGameStore';

export default function ArithmancyClass() {
  const navigate = useNavigate();
  const { addXp, addGold, addWisdom } = useGameStore();
  const [inputValue, setInputValue] = useState('');

  const handleDecipher = () => {
    // Hermione's hint: multiples of 7. R = 5, Thorn = ?. Sum should be a multiple of 7.
    // If they enter 7, 14, 21, etc.
    const num = parseInt(inputValue);
    if (!isNaN(num) && num % 7 === 0 && num > 0) {
      addXp(160);
      addGold(50);
      addWisdom(10);
      alert("Xuất sắc! Cổ ngữ đã được giải mã! +160 XP, +50 Gold, +10 Trí tuệ");
      navigate('/victory');
    } else {
      alert("Sai rồi... Hãy đọc kỹ ghi chép của Hermione về con số 7!");
      setInputValue('');
    }
  };

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen pb-32 max-w-[390px] mx-auto shadow-2xl relative" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#fdf5e6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      {/* TopAppBar */}
      <header className="bg-surface-container-low shadow-[0_4px_20px_rgba(60,47,47,0.1)] w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
              <img alt="Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRA1WK_ztSXXt2t7R-SiagA2lTeah0RVfzCBLEbXDmNfeS_1lyzOeymwys5DZ8Ba3kSSKVm-Xd1RRYwN-5TfKSH_2DbSZlNpXCZaAxckg0dFXv6ALYr3FiCn_uFMWwkIDGIiI3TvRwbzHPd5b9xMsYZ5hWk8_GbYWoGdt5LqO2Niw-XOThtw_VfdfVvCoE6qV6DHZ2ly5MDTAR4yoqjpZx0IW_9VE3doB98ycGSt7zZY5cFSzmNFoI0IpoTS8syUUeKTI5sCfDZNg"/>
            </div>
            <h1 className="font-display-lg-mobile text-2xl font-bold text-surface-tint tracking-tight">Mystic Academy</h1>
          </div>
          <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center text-surface-tint hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 pt-8 space-y-8">
        {/* Hero Header */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-surface-tint mb-2">
            <span className="material-symbols-outlined">auto_fix_high</span>
            <span className="font-label-md text-sm font-bold uppercase tracking-widest">Môn Số học Huyền bí</span>
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-primary leading-tight mb-2">Lớp Số học huyền bí: Giải mã Cổ ngữ</h2>
          <p className="font-body-lg text-base text-on-surface-variant max-w-2xl">Vận dụng tư duy logic và các phương trình ma thuật để giải mã các cổ ngữ cổ xưa. Sự chính xác là chìa khóa để mở ra kho tàng tri thức.</p>
        </section>

        {/* Main Interaction: Arcane Equations Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Equation Canvas */}
          <div className="bg-surface-bright p-6 rounded-xl shadow-sm border border-outline-variant relative overflow-hidden group" style={{ clipPath: 'polygon(100% 0%, 100% 98%, 98% 99%, 95% 97%, 92% 100%, 88% 98%, 85% 99%, 80% 97%, 75% 100%, 70% 98%, 65% 99%, 60% 97%, 55% 100%, 50% 98%, 45% 99%, 40% 97%, 35% 100%, 30% 98%, 25% 99%, 20% 97%, 15% 100%, 10% 98%, 5% 99%, 0% 97%, 0% 0%)' }}>
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="font-label-md text-sm font-bold text-secondary">Phương trình hiện tại</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-lg text-3xl font-bold text-primary" style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.4)' }}>∑ (ᚱ + ᚦ) = ?</span>
                  </div>
                </div>
                <div className="bg-tertiary-container text-white px-4 py-2 rounded-full font-label-md text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
                  <span>04:59</span>
                </div>
              </div>

              {/* Rune Deciphering Area */}
              <div className="bg-surface-container rounded-xl p-4 border-2 border-dashed border-outline-variant">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant text-center space-y-2 shadow-sm">
                    <span className="text-4xl font-serif text-primary block">ᚠ</span>
                    <span className="font-label-md text-xs font-bold text-on-surface-variant block">Wealth (2)</span>
                  </div>
                  <div className="bg-primary-container p-4 rounded-lg border border-primary text-center space-y-2 ring-2 ring-surface-tint">
                    <span className="text-4xl font-serif text-white block">ᚱ</span>
                    <span className="font-label-md text-xs font-bold text-white block">Journey (5)</span>
                  </div>
                  <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant text-center space-y-2 opacity-50">
                    <span className="text-4xl font-serif text-primary block">ᚦ</span>
                    <span className="font-label-md text-xs font-bold text-on-surface-variant block">Thorn (?)</span>
                  </div>
                  <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant text-center space-y-2 shadow-sm">
                    <span className="text-4xl font-serif text-primary block">ᚺ</span>
                    <span className="font-label-md text-xs font-bold text-on-surface-variant block">Hail (9)</span>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-4 pb-4">
                <label className="font-label-md text-sm font-bold text-on-surface-variant px-1">Nhập giá trị số học để hoàn tất cổ ngữ:</label>
                <div className="flex gap-4">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-outline focus:border-surface-tint focus:ring-0 text-3xl font-bold text-primary placeholder:text-outline-variant transition-all py-2 text-center" 
                    placeholder="0" 
                    type="number"
                  />
                  <button onClick={handleDecipher} className="bg-primary hover:bg-primary-container text-white px-6 rounded-full font-label-md font-bold transition-all active:scale-95 shadow-lg flex items-center gap-2">
                    <span>GIẢI MÃ</span>
                    <span className="material-symbols-outlined text-sm">key</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Bento Column */}
          <div className="space-y-6">
            {/* Hermiones Notes */}
            <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-surface-tint border-b border-outline-variant pb-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                <h3 className="font-headline-sm text-lg font-bold">Ghi chép của Hermione</h3>
              </div>
              <p className="font-body-md text-sm italic text-on-surface-variant">"Đừng quên rằng số 7 là con số mang sức mạnh pháp thuật mạnh mẽ nhất. Trong các bài toán về Cổ ngữ Rune, hãy luôn kiểm tra lại các bội số của 7 trước khi đưa ra kết luận cuối cùng."</p>
            </div>

            {/* Progress Glass Card */}
            <div className="relative bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/60 shadow-xl overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-surface-tint opacity-10 rounded-full blur-2xl"></div>
              <h4 className="font-label-md text-sm font-bold text-primary mb-4">Tiến độ giải mã</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-on-surface-variant">Rune cổ cấp 1</span>
                  <span className="text-sm font-bold text-surface-tint">65%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-surface-tint to-primary-container w-[65%] relative"></div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 rounded-lg border border-outline-variant flex items-center justify-center bg-surface-bright">
                    <span className="material-symbols-outlined text-surface-tint text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <div className="flex-1 h-10 rounded-lg border border-outline-variant flex items-center justify-center bg-surface-bright">
                    <span className="material-symbols-outlined text-surface-tint text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <div className="flex-1 h-10 rounded-lg border border-outline-variant flex items-center justify-center bg-surface-container-low opacity-30">
                    <span className="material-symbols-outlined text-outline text-sm">star</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Context Section */}
        <section className="grid grid-cols-1 gap-6 items-center bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <div className="space-y-4">
            <h3 className="font-headline-sm text-lg font-bold text-primary">Tư duy Toán học &amp; Phê phán</h3>
            <p className="font-body-md text-sm text-on-surface-variant">Trong Số học huyền bí, mỗi con số không chỉ đại diện cho một lượng, mà còn mang theo một thuộc tính bản thể. Để giải mã cổ ngữ, học viên phải áp dụng logic toán học của Evan để tìm ra mối liên hệ giữa các ký tự Rune rời rạc.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold border border-outline-variant">#Logic</span>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold border border-outline-variant">#GiaiMa</span>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold border border-outline-variant">#CoNgu</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white aspect-video relative group">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVoMb7jrZCPccuxUFI9locMNuqCEQ-vRNCA8GklEilHQ9mT9ubKo83oKYPKZBetYmFR1o39a2LuTIeceRPG2lJulbzott-HcyLkSLF5zfGyZVr9tj191ZiIYROSByXdSiQV6gfpSyUMidQhSTyLPtMLpJWVttEbaZe91XWnyFRf-Zoh66MRXNDuN8NmlOKUS65L927EystIFG9v8tuPwxDktXi0OFNNEnLrlmtUBBD6Zm81j-qb1Cw7N7uD9ZHVzdjWVuydbfAtyw" alt="Mystical scroll"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-white font-label-md text-xs font-bold">Thư viện trường Hogwarts - Khu vực cấm</span>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

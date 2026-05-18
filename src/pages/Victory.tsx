import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export default function Victory() {
  const navigate = useNavigate();
  const { xp, gold, level, wisdom } = useGameStore();

  return (
    <div className="bg-surface-container-highest min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 197, 161, 0.2) 0%, transparent 100%)' }}>
      
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-2xl border border-outline-variant max-w-[340px] w-full relative">
        {/* Confetti Effect (Static representation) */}
        <div className="absolute -top-12 -left-12 text-primary opacity-20 text-6xl rotate-12 pointer-events-none">✨</div>
        <div className="absolute -bottom-8 -right-8 text-primary opacity-20 text-6xl -rotate-12 pointer-events-none">✨</div>

        <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),2px_4px_8px_rgba(60,47,47,0.3)]">
          <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
        </div>
        
        <h1 className="font-display-lg-mobile text-3xl font-bold text-primary mb-2 drop-shadow-sm">Thành Tích Xuất Sắc!</h1>
        <p className="font-body-md text-sm text-on-surface-variant italic mb-8">Bạn đã hoàn thành xuất sắc nhiệm vụ bài học.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shadow-inner flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="font-label-md text-xs font-bold text-on-surface uppercase tracking-widest">Kinh Nghiệm</span>
            <span className="font-headline-sm text-xl font-bold text-secondary">{xp}</span>
          </div>
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shadow-inner flex flex-col items-center">
            <span className="material-symbols-outlined text-[#D4AF37] text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            <span className="font-label-md text-xs font-bold text-on-surface uppercase tracking-widest">Vàng</span>
            <span className="font-headline-sm text-xl font-bold text-[#D4AF37]">{gold}</span>
          </div>
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shadow-inner flex flex-col items-center col-span-2">
             <div className="flex justify-around w-full">
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Cấp Độ</span>
                  <span className="font-headline-sm text-lg font-bold text-primary">Lv.{level}</span>
                </div>
                <div className="w-[1px] h-full bg-outline-variant/50"></div>
                <div className="flex flex-col items-center">
                  <span className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Trí Tuệ</span>
                  <span className="font-headline-sm text-lg font-bold text-tertiary">{wisdom}</span>
                </div>
             </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-primary text-white py-3 rounded-full font-label-md text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all mb-3 relative z-10"
        >
          Trở Về Bản Đồ
        </button>
        <button 
          onClick={() => navigate('/shop')}
          className="w-full bg-surface-variant text-primary py-3 rounded-full font-label-md text-sm font-bold shadow-sm border border-primary/20 hover:scale-105 active:scale-95 transition-all relative z-10"
        >
          Đến Hẻm Xéo
        </button>
      </div>
    </div>
  );
}

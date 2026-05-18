import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../components/common/BottomNavBar';

export default function Inbox() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed min-h-[100dvh] pb-24 overflow-x-hidden max-w-[390px] mx-auto shadow-2xl relative">
      <style>{`
        .deckle-edge {
            clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 98% 97%, 95% 94%, 92% 98%, 89% 95%, 85% 99%, 81% 94%, 78% 97%, 74% 94%, 70% 98%, 67% 95%, 63% 99%, 59% 94%, 55% 97%, 51% 94%, 47% 98%, 44% 95%, 40% 99%, 36% 94%, 32% 97%, 29% 94%, 25% 98%, 21% 95%, 17% 99%, 13% 94%, 10% 97%, 6% 94%, 3% 98%, 0% 95%);
        }
        .wax-seal-shadow {
            box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.2), 0 4px 8px rgba(60, 47, 47, 0.3);
        }
        .gold-glow {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
            border: 1px solid #D4AF37;
        }
        .parchment-texture {
            background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCWR6G7Y_VgtKNSNlk589eQV7QpEjUZYMQbVobd97KA-Dc2tTMBsy3pvnysN5fAC6M6d2f-u3U6gMb520_Q5RHrRMoiMQB7UteTw_Sx4b13FTfbjaTZPaKTH1GaG4bDNQYptCnbqEdtWiVBf4K3VcevCUfzRSuuvAouSEWc1FpndE0p2Frs7k4HPeX7BrggmBBLBN3Mpc99OQz1YP796zD-iEZ8HuI3HJKmgMwLNQGuP8mjSUjhzeUqCHOLYqL9AL-OrB5y-Mpq2YQ);
        }
      `}</style>
      
      {/* Top App Bar */}
      <header className="flex justify-between items-center w-full px-5 h-16 sticky top-0 z-40 bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)]">
        <div className="flex items-center gap-3">
          <span 
            className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform"
            onClick={() => setIsDrawerOpen(true)}
          >
            menu
          </span>
          <h1 className="font-display-lg-mobile text-[24px] text-primary drop-shadow-sm font-bold tracking-tight">Mystic Academy</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border-2 border-outline-variant overflow-hidden active:scale-95 transition-transform" onClick={() => navigate('/profile')}>
            <img alt="Wizard Student Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDScsoEqzSq0IG-pY4IPPTmfUSlS4m72quPetN-nox0P-O3vPT-RNfAAGL0vHSq1uuhwA5FACLkXMLDrE9RN6CgcKRcWhGZ0MYEsSO-kP6NyPobYfE7anOTPD7X65rfuzul8VjZ-tnXFw96cLaPAASJz3iuiHuO_OfmNbKtC-X1BTp8Wtn1kLtRX9HOGrpUel-1m7BbqlQJNMX6E-ByNLOstLiCsp-fRqYmapayub1Qg4f0WKaxogWzu4hsECZosqAx-bmGR006OdU"/>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-6 pb-28 px-5 min-h-[100dvh] relative overflow-hidden">
        {/* Background Imagery (Cozy Common Room at Dusk) */}
        <div className="absolute inset-0 -z-10 bg-surface-dim">
          <img alt="Common Room Background" className="w-full h-full object-cover opacity-30 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr2nY1ApOue8l6cL_wlJ0HC3SZ2UU49W6sXrI5RAqtdxPTTAfC53yUjhrArxHstEHJmkG19bIb3KAEh6XFnfQ_P6Mq1WpdOiKdpbrzCJnGJHPDnLvP8D2Z1wb4hPI2DCsj_70ZS2LYO1zMIaZ89VqF5Pr3ZB5vGL10BEqZpISGDJrw0rulXF11hWonRmc7KqEoVv5iq938iPpd9aZy0NoPW3q2yGgFKYNhInstWh1hIT3QrqXpBK4lRVLxoME6q-k-dFNKQA4cE_M"/>
        </div>
        
        <section className="max-w-md mx-auto relative z-10">
          <header className="mb-8">
            <h2 className="font-headline-md text-2xl font-bold text-primary mb-2">Owl Post Inbox</h2>
            <p className="font-body-md text-on-surface-variant italic">Messages from the high towers and hidden halls.</p>
          </header>

          {/* Notification List */}
          <div className="flex flex-col gap-6">
            {/* Unread Glowing Letter */}
            <article className="relative parchment-texture bg-surface-container-low p-6 deckle-edge rounded-t-sm shadow-[0_4px_12px_rgba(60,47,47,0.12)] gold-glow transition-all active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                  <span className="font-label-md text-sm font-bold text-primary uppercase tracking-widest">Professor McGonagall</span>
                </div>
                <span className="font-caption text-xs text-on-surface-variant">2 mins ago</span>
              </div>
              <h3 className="font-headline-sm text-lg text-on-surface mb-2 font-bold leading-tight">Advanced Transfiguration Materials</h3>
              <p className="font-body-md text-base text-on-surface-variant line-clamp-2">The latest scrolls regarding Animagus transformations have arrived in the North Tower. Please attend...</p>
              <div className="mt-4 flex items-center gap-2 text-primary font-bold cursor-pointer hover:underline">
                <span className="font-label-md text-sm">Read Invitation</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
              {/* Golden Particle Decorative Sparkle */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-tertiary-fixed rounded-full flex items-center justify-center border border-primary shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </article>

            {/* Regular Letter (House News) */}
            <article className="parchment-texture bg-surface-container-low p-6 deckle-edge rounded-t-sm shadow-[0_2px_8px_rgba(60,47,47,0.08)] border-l-4 border-secondary transition-all hover:translate-x-1 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">shield</span>
                  <span className="font-label-md text-sm font-bold text-secondary uppercase tracking-widest">House News</span>
                </div>
                <span className="font-caption text-xs text-on-surface-variant">3 hours ago</span>
              </div>
              <h3 className="font-headline-sm text-lg text-on-surface mb-2 font-bold leading-tight">Quidditch Trials Announcement</h3>
              <p className="font-body-md text-base text-on-surface-variant line-clamp-2">Dust off your broomsticks! Trials for the starting Seeker position will begin this Saturday morning...</p>
              <div className="mt-4 flex items-center gap-2 text-secondary font-bold">
                <span className="font-label-md text-sm">View Details</span>
                <span className="material-symbols-outlined text-sm">stadium</span>
              </div>
            </article>

            {/* System Update (The Scrap) */}
            <article className="parchment-texture bg-surface-container p-5 rounded-lg border border-outline-variant shadow-sm flex gap-4 transition-all hover:bg-surface-container-high cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-full h-fit flex-shrink-0">
                <span className="material-symbols-outlined text-primary">history_edu</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-sm font-bold text-primary">Academy Ledger</span>
                  <span className="font-caption text-xs text-on-surface-variant">Yesterday</span>
                </div>
                <h3 className="font-label-md text-base text-on-surface font-bold">Grades Updated: Potion Making II</h3>
                <p className="font-body-md text-sm text-on-surface-variant mt-1 leading-snug">Your latest draft on Draught of Living Death has been evaluated by Professor Snape.</p>
              </div>
            </article>

            {/* Older Letter */}
            <article className="opacity-70 parchment-texture bg-surface-container-low p-6 deckle-edge rounded-t-sm shadow-[0_2px_4px_rgba(60,47,47,0.05)] transition-all hover:opacity-100 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                  <span className="font-label-md text-sm font-bold text-on-surface-variant uppercase tracking-widest">Owl Post Service</span>
                </div>
                <span className="font-caption text-xs text-on-surface-variant">2 days ago</span>
              </div>
              <h3 className="font-headline-sm text-lg text-on-surface mb-2 font-bold leading-tight">Package Delivered to Great Hall</h3>
              <p className="font-body-md text-base text-on-surface-variant line-clamp-1">Your order from Diagon Alley Shop has arrived via screech owl.</p>
            </article>
          </div>
        </section>

        {/* Contextual FAB: Send Owl */}
        <button className="fixed bottom-24 right-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center wax-seal-shadow text-on-primary active:scale-95 transition-all group z-30">
          <div className="absolute -top-12 right-0 bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-xs font-label-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap">Send Owl</div>
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
        </button>
      </main>

      {/* Sidebar / Drawer */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
      <aside className={`fixed left-0 top-0 h-full z-50 flex flex-col p-6 gap-3 bg-surface shadow-2xl transition-transform duration-300 w-80 max-w-[80vw] ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end mb-2">
          <button className="material-symbols-outlined text-on-surface-variant active:scale-95" onClick={() => setIsDrawerOpen(false)}>close</button>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
              <img alt="Wizard Headmaster" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC72jgXsUwm_EBWc3bZ-KbGRVe9BwUnjg1RdKKzeWoBhMZV2wJ4z5I4pCsYb_tVzDpQyQTlkT9R0wPw7H7t6UxSjkjC7A6O_N_LgOdu-ajSwEUX0Sl6egiq6yjbQZCLS55obnG270lr0FOuMYfLXG0oAOFx6LM1jACyhe9v8Z1jJJ5YfEXbdPIzX0wNeXCh5KrCuXfG72eEn1GGdCf_PMnrIdV5SPHz0PvevCxyl2avXVhWiixK6g9ruhASaHxKx5gGIppvXQIn-JU"/>
            </div>
            <div>
              <h4 className="font-headline-sm text-lg font-bold text-on-surface">Albus Dumbledore</h4>
              <p className="font-body-md text-sm text-on-surface-variant">Headmaster</p>
            </div>
          </div>
          <span className="font-label-md text-sm text-primary font-bold">Year 7</span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <button className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all active:scale-95 text-left" onClick={() => { setIsDrawerOpen(false); navigate('/shop'); }}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-body-md font-semibold">Diagon Alley Shop</span>
          </button>
          <button className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all active:scale-95 text-left" onClick={() => { setIsDrawerOpen(false); navigate('/daily-quests'); }}>
            <span className="material-symbols-outlined">military_tech</span>
            <span className="font-body-md font-semibold">Daily Quests</span>
          </button>
          
          {/* Active indicator for Mail in Drawer */}
          <button className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container font-bold rounded-lg transition-all active:scale-95 text-left" onClick={() => setIsDrawerOpen(false)}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            <span className="font-body-md font-semibold">Owl Post</span>
          </button>
          
          <button className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all active:scale-95 text-left" onClick={() => { setIsDrawerOpen(false); navigate('/profile'); }}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md font-semibold">Settings</span>
          </button>
        </nav>
      </aside>

      <BottomNavBar />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and go to the Map or Portal
    navigate('/portal');
  };

  return (
    <div className="bg-on-background min-h-[100dvh] flex items-center justify-center p-6 relative overflow-x-hidden font-body-md text-on-surface  shadow-2xl">
      <style>{`
        .parchment-texture {
            background-image: radial-gradient(circle at center, #fff8f7 0%, #ffe9e8 100%);
            position: relative;
        }
        .deckle-edge {
            clip-path: polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 95% 98%, 92% 100%, 89% 98%, 86% 100%, 83% 98%, 80% 100%, 77% 98%, 74% 100%, 71% 98%, 68% 100%, 65% 98%, 62% 100%, 59% 98%, 56% 100%, 53% 98%, 50% 100%, 47% 98%, 44% 100%, 41% 98%, 38% 100%, 35% 98%, 32% 100%, 29% 98%, 26% 100%, 23% 98%, 20% 100%, 17% 98%, 14% 100%, 11% 98%, 8% 100%, 5% 98%, 2% 100%, 0% 98%);
        }
        .wax-seal {
            box-shadow: inset -2px -2px 4px rgba(0,0,0,0.4), 2px 2px 8px rgba(0,0,0,0.3);
            background: linear-gradient(145deg, #871f1c, #510003);
        }
        .gold-glow {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }
      `}</style>

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img alt="Hogwarts at night" className="w-full h-full object-cover opacity-60 scale-105 blur-[2px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnNDGw5NBvYx8uHoJ4D1oW_D8rnA7dGOT5ok85HSNNqHgkj8dIeR5f8fLTLaQuliYluh_tNT_D9Sebsa9qcIpG83qHvG4Vva7TpAhGOdvYDeYroxkSlZD3CcmIuraQCl6OMVonG2XTHdHR28hxvKysK_ogxESXkBg2O3zwVJQ2uUTUtvpvw09NRZn4VrR57zgOs9T9kuzdJDagTCHBgtdWHakax3O5TIk0RizXBJ-F6BUFITYTC1VZpxXppYwWMUI_AdMIyaX3kpI"/>
        <div className="absolute inset-0 bg-gradient-to-t from-on-background via-transparent to-transparent"></div>
      </div>

      {/* UI Elements Background - Abstract floating symbols */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        <span className="material-symbols-outlined absolute top-[10%] left-[5%] text-primary-fixed text-6xl rotate-12">auto_awesome</span>
        <span className="material-symbols-outlined absolute top-[20%] right-[10%] text-tertiary-fixed text-4xl -rotate-12">history_edu</span>
        <span className="material-symbols-outlined absolute bottom-[15%] left-[15%] text-secondary-fixed text-5xl rotate-45">star</span>
        <span className="material-symbols-outlined absolute bottom-[25%] right-[5%] text-primary-fixed text-7xl -rotate-45">castle</span>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header / Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display-lg-mobile text-[32px] text-primary-fixed drop-shadow-lg mb-2 font-bold tracking-tight">Mystic Academy</h1>
          <p className="font-label-md text-sm text-secondary-fixed tracking-widest uppercase font-bold">The Arcane Lexicon</p>
        </div>

        {/* The Floating Parchment / Login Card */}
        <div className="parchment-texture deckle-edge rounded-lg p-8 shadow-2xl border border-outline-variant/30 flex flex-col gap-8 relative bg-surface">
          {/* Floating Particles Decoration */}
          <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
          </div>
          
          <div className="text-center">
            <h2 className="font-headline-md text-2xl text-primary mb-2 font-bold">Enter the Library</h2>
            <div className="w-24 h-[2px] bg-outline-variant mx-auto rounded-full"></div>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-sm text-on-surface-variant flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">person</span>
                Wizard ID
              </label>
              <div className="relative group">
                <input 
                  required className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary outline-none px-1 py-3 transition-all placeholder:text-on-surface-variant/40 font-body-md text-base" 
                  placeholder="e.g. harry.p@hogwarts.edu" 
                  type="email"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-sm text-on-surface-variant flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">key</span>
                Secret Incantation
              </label>
              <div className="relative group">
                <input 
                  required className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary outline-none px-1 py-3 transition-all placeholder:text-on-surface-variant/40 font-body-md text-base" 
                  placeholder="••••••••••••" 
                  type="password"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Reveal Button (Wax Seal Style) */}
            <div className="flex flex-col items-center mt-4">
              <button className="wax-seal group w-24 h-24 rounded-full flex flex-col items-center justify-center text-on-primary transition-all active:scale-90 hover:scale-105 gold-glow relative" type="submit">
                <span className="material-symbols-outlined text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="font-label-md text-[10px] tracking-tighter uppercase font-bold">Reveal</span>
                {/* Glow Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-tertiary-fixed/30 group-hover:border-tertiary-fixed transition-colors"></div>
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="flex flex-col gap-4 text-center border-t border-outline-variant/20 pt-6">
            <button className="font-label-md text-sm text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 font-bold">
              <span className="material-symbols-outlined text-sm">school</span>
              New Student? Apply to Hogwarts
            </button>
            <button className="font-caption text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
              Lost your Owl? (Forgot Password)
            </button>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute bottom-4 left-4 opacity-10">
            <span className="material-symbols-outlined text-4xl">menu_book</span>
          </div>
        </div>

        {/* Secondary Prompt / Call to Action */}
        <div className="mt-8 text-center px-6">
          <p className="font-body-md text-base text-secondary-fixed/80 italic">
            "Words are, in my not-so-humble opinion, our most inexhaustible source of magic."
          </p>
        </div>
      </main>
    </div>
  );
}

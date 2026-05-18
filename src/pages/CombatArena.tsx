import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/useGameStore'
import { useI18n } from '../hooks/useI18n'

export default function CombatArena() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { addXp, addGold } = useGameStore()
  const [playerHp, setPlayerHp] = useState(85)
  const [enemyHp, setEnemyHp] = useState(60)
  const [isCasting, setIsCasting] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleCorrectAnswer = () => {
    if (isCasting) return;
    setSelectedAnswer('B')
    setIsCasting(true)
    setTimeout(() => {
      setEnemyHp(0)
      setTimeout(() => {
        addXp(250)
        addGold(80)
        navigate('/victory')
      }, 1000)
    }, 1500)
  }

  const handleWrongAnswer = (ans: string) => {
    if (isCasting) return;
    setSelectedAnswer(ans)
    setPlayerHp((prev) => Math.max(0, prev - 20))
    if (playerHp - 20 <= 0) {
      setTimeout(() => {
        navigate('/location/hospital')
      }, 1000)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden">
      <header className="bg-surface-container-low shadow-[0_4px_20px_-5px_rgba(60,47,47,0.1)] flex justify-between items-center w-full px-6 py-2 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-surface-tint overflow-hidden">
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4WlWwGRuU57EHfjE_YrrpCLE_pXRiLEXzd3mdo-5S-XpBc1prdVvFRh5UeIae5LXa4KFT3igOkcO5m9N_wepDA9cRtEbJXFJ4rUdTueK_Zx8f5agMvSPSzC4HHMlclDt8DT6vdt22cn7VH7Zm4C30ajA4NTw53lFoL2YyqBHQfhcQ9ZkGT8Q568smXSUkdt8o0Ju7_ZG4QxRXMJPT-EEiyB81Og9ng4AN--i3IYD_6KeHJRz8Ast7P9KTs7HIlz8UaWyRopvMLPg"/>
          </div>
          <h1 className="font-display-lg-mobile text-2xl text-primary leading-tight">The Scholarly Path</h1>
        </div>
        <button onClick={() => navigate('/')} className="text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined" data-icon="auto_fix_high">auto_fix_high</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-lg mx-auto px-6 pt-6 pb-32 gap-6">
        <div className="text-center w-full">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-[0.2em] whitespace-nowrap">{t('combat.title')}</h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-surface-tint to-transparent mx-auto mt-2"></div>
        </div>

        {/* Duelists & Stats Section */}
        <div className="w-full bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant relative">
          <div className="flex justify-between items-start gap-2">
            {/* Player */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-2">
                <div className={`w-16 h-16 rounded-full border-4 border-surface-tint p-1 bg-surface-bright shadow-md overflow-hidden ${playerHp <= 20 ? 'animate-pulse' : ''}`}>
                  <img alt="Player" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7rLjFJOwMS0_2ndMczL5HCRktc0rUlVkT6ezWFoOHjjkB2hhcbCb0Yr-mePXjar3MwCu-VKzfNpFxhLwduICbexdM8aTH1gyW4S1o7n9I9noOeviXUdQMWrJB1eTyWI0ZKvvHsm2tlpXila4TGh_SE8Qva-lPrap2affC8XNwZJZpaun8pB3pdPJK4oX_MceZEifPBws9E2ME0VguAWz3OCW-SE63LdzB2cG8K7cN7HiJ37Umv2N1du1SZFEGWl1FiFjDKGaDlA"/>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-outline">{t('combat.player')}</div>
              </div>
              <div className="w-full text-center">
                <span className="font-label-md text-[10px] text-primary uppercase">{t('combat.energy')}</span>
                <div className="h-2 w-full bg-surface-container-highest rounded-full mt-1 border border-outline-variant overflow-hidden relative">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${playerHp}%` }}></div>
                </div>
                <span className="font-label-md text-[10px] text-primary">{playerHp}/100</span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="flex items-center justify-center pt-4 z-10">
              <div className="w-10 h-10 bg-primary rounded-full border-2 border-surface-tint flex items-center justify-center shadow-lg rotate-45">
                <span className="material-symbols-outlined text-on-primary -rotate-45 text-xl" data-icon="swords">swords</span>
              </div>
            </div>

            {/* Opponent */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-2">
                <div className={`w-16 h-16 rounded-full border-4 border-outline p-1 bg-surface-bright shadow-md overflow-hidden transition-all ${isCasting ? 'scale-90 opacity-50 filter grayscale' : ''}`}>
                  <img alt="Opponent" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Vn5RtDYaRZ3N2CJ4FQrumA44gCP4UePtPTNKRPKQA1sPSoFXA5ANSz6n_vzz-mNR-lV_BiWiRS8_gBqXP0BlhapqZyKHIMQRAtY1XV282uKlLZ4sPVY29mKcVF2UMDso1RteuoPJniJ_MKVFx9ZruNGZ9fl6_6BV-ofTZB1s_r8tTEmUq5pAKR14pHvJH6iy6qQGMauI0LLVphDCI6qdpg1UWvpPRG8nY_zLNlacAGI6POUq3CgpKR2jjJeCh0U-14vqjCg7Ev4"/>
                </div>
                <div className="absolute -bottom-1 -left-1 bg-inverse-surface text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-outline">{t('combat.enemy')}</div>
              </div>
              <div className="w-full text-center">
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase">{t('combat.power')}</span>
                <div className="h-2 w-full bg-surface-container-highest rounded-full mt-1 border border-outline-variant overflow-hidden">
                  <div className="h-full bg-on-surface-variant transition-all duration-300" style={{ width: `${enemyHp}%` }}></div>
                </div>
                <span className="font-label-md text-[10px] text-on-surface-variant">{enemyHp}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Arena */}
        <div className="w-full aspect-[16/9] rounded-xl relative overflow-hidden bg-inverse-surface shadow-2xl border-2 border-outline-variant/30">
          <img alt="Arena" className={`w-full h-full object-cover transition-all duration-1000 ${isCasting ? 'scale-110 filter brightness-150' : ''}`} src="https://lh3.googleusercontent.com/aida/ADBb0ugD3mFOUMMFo1ftnvyVlFurfuCNHb2xSD42Udco2te_fTyT39dfiOdA76tP0EotBs_CTZbOBO_SpvzuViGk9PhqXfLVAUzmpjJAHxRLumuK7gJ8MgmhZ3HeAJnBa8VDdybSVP9QF50kbHfFJWtXFh4H4PeiUw2pEUgdRPY8Y8enM8EBDLPpPPJsh3IaVVCUp-D24YFSFeFLESJaqdvD96PE-YuGNb9XPJlwr9ldCMq_i6U1pIQ0EZApNK8"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          {isCasting && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="material-symbols-outlined text-[120px] text-secondary drop-shadow-[0_0_30px_rgba(189,239,198,1)] animate-ping">bolt</span>
            </div>
          )}
        </div>

        {/* Spell Challenge Card */}
        <div className="w-full bg-surface-container-low p-4 border border-[#D4C5A1] deckle-edge shadow-lg relative flex flex-col gap-4">
          <div className="text-center">
            <p className="font-label-md text-[10px] text-on-surface-variant tracking-widest uppercase mb-1">{t('combat.instruction')}</p>
            <h3 className="font-headline-sm text-lg text-on-background italic magical-glow text-primary">"If I ___ a wizard, I would fly."</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 pb-4">
            <button onClick={() => handleWrongAnswer('A')} className={`p-3 bg-surface-bright border rounded-lg text-left flex items-center gap-2 active:scale-95 transition-all hover:bg-surface-container ${selectedAnswer === 'A' ? 'border-error ring-2 ring-error/50' : 'border-outline-variant'}`}>
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-highest font-label-md text-[10px] text-on-surface-variant">A</span>
              <span className="font-body-md text-sm text-on-surface">was</span>
            </button>
            <button onClick={handleCorrectAnswer} className={`p-3 bg-surface-bright border-2 rounded-lg text-left flex items-center gap-2 active:scale-95 transition-all hover:bg-surface-container ${selectedAnswer === 'B' ? 'border-secondary ring-2 ring-secondary/50 bg-secondary-container/30' : 'border-surface-tint ring-2 ring-surface-tint/20'}`}>
              <span className={`w-6 h-6 flex items-center justify-center rounded-full font-label-md text-[10px] ${selectedAnswer === 'B' ? 'bg-secondary text-on-secondary' : 'bg-primary-container text-on-primary-container'}`}>B</span>
              <span className="font-body-md text-sm text-primary font-bold">were</span>
            </button>
            <button onClick={() => handleWrongAnswer('C')} className={`p-3 bg-surface-bright border rounded-lg text-left flex items-center gap-2 active:scale-95 transition-all hover:bg-surface-container ${selectedAnswer === 'C' ? 'border-error ring-2 ring-error/50' : 'border-outline-variant'}`}>
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-highest font-label-md text-[10px] text-on-surface-variant">C</span>
              <span className="font-body-md text-sm text-on-surface">am</span>
            </button>
            <button onClick={() => handleWrongAnswer('D')} className={`p-3 bg-surface-bright border rounded-lg text-left flex items-center gap-2 active:scale-95 transition-all hover:bg-surface-container ${selectedAnswer === 'D' ? 'border-error ring-2 ring-error/50' : 'border-outline-variant'}`}>
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-highest font-label-md text-[10px] text-on-surface-variant">D</span>
              <span className="font-body-md text-sm text-on-surface">be</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center justify-between gap-4 py-4 relative">
          <div className="w-24 h-24 flex-shrink-0">
            <img alt="Movement Controls" className="w-full h-full object-contain filter drop-shadow-lg" src="https://lh3.googleusercontent.com/aida/ADBb0ujyiRuKEkBNhk6ttA-XGi7VzpnGs4uWM6jwze2U6LRm7bWATjPSRIuAfM8D42QlCY8HeMO5Sv8pgQ9-C_LGmO29_2pBtrkhb9rL5LbLqtXyL8O7BuNumiivWfhGDHATUgh56F4QD2_nn3aP6ca5n9-BvsVnV7UQdwwGhRVgc-1I3BUnh-lhfupeHdEOZQL_YCjz8fk8uixPjg99eyrWIgQFobqSxmCTdx-5NsuPcjF_Tzke4rgqw0pptA"/>
          </div>
          <div className="flex items-center gap-4 flex-grow justify-end">
            <div className="flex flex-col items-center gap-1">
              <button className="w-14 h-14 rounded-full bg-primary shadow-[inset_0_-4px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(81,0,3,0.3)] flex items-center justify-center text-white border-2 border-surface-tint active:translate-y-1 active:shadow-none transition-all">
                <span className="material-symbols-outlined text-2xl" data-icon="bolt">bolt</span>
              </button>
              <span className="font-label-md text-[10px] text-primary uppercase">{t('combat.attack')}</span>
            </div>
            <div className="flex flex-col items-center gap-1 -mt-4">
              <button onClick={handleCorrectAnswer} className="w-20 h-20 rounded-full bg-primary-container shadow-[0_0_20px_rgba(168,55,48,0.5)] flex items-center justify-center text-on-primary-container border-4 border-[#D4AF37] active:scale-95 transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-[pulse_2s_infinite]"></div>
                <span className="material-symbols-outlined text-4xl relative z-10" data-icon="auto_fix_high">auto_fix_high</span>
              </button>
              <span className="font-label-md text-[10px] text-primary font-bold uppercase tracking-wider">{t('combat.cast')}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="w-14 h-14 rounded-full bg-secondary shadow-[inset_0_-4px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(59,104,72,0.3)] flex items-center justify-center text-white border-2 border-secondary-fixed transition-all active:translate-y-1 active:shadow-none">
                <span className="material-symbols-outlined text-2xl" data-icon="shield">shield</span>
              </button>
              <span className="font-label-md text-[10px] text-secondary uppercase">{t('combat.defend')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

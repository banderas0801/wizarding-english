import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomNavBar } from '../components/common/BottomNavBar'
import { getLessonById } from '../data/curriculum'

export default function QuestDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const lesson = getLessonById(id ?? '1-daily-warm-ups-reading-grade-1-p100') || getLessonById('1-daily-warm-ups-reading-grade-1-p100')!
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden max-w-[390px] mx-auto relative shadow-2xl">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface-container shadow-[0_4px_10px_rgba(60,47,47,0.1)] w-full px-6 h-16 sticky top-0 z-50 rounded-b-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span 
            className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform touch-manipulation" 
            onClick={() => navigate('/')}
          >
            arrow_back
          </span>
          <h1 className="font-headline-md italic font-bold text-primary dark:text-on-primary-container">Arcane Lexicon</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-primary flex items-center justify-center overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/portal')}>
            <img alt="Wizard Portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB26pgl-tpHi_OXI4SNK-V4JBXOiI31rcxCpJ0rCw3Tx34E2wFxYOLAv4lC3nMLewARf1EsSe2Q-KiRyFc2TnvUEdcgyUsRs4doKkt9tWqcQxHK44BHVqwygSdkMyxM2kzzm4oEyk45sB1KfGZgyNX_3WkuMm_DLRXBlAGfFjibVf2BFSRCtxQhbhLOvzEHlgQFu41as6pXFhEynyARvL207LIY6nS3u7ab-_p-qjwdP2WGlArCW35hRo6VBBU_lsc_d_pnfBUtTXo"/>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main 
        className="flex-grow relative flex flex-col items-center pt-8 pb-40 px-6"
        style={{ backgroundColor: '#fff8f7', backgroundImage: 'radial-gradient(#dfbfbc 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
      >
        {/* Environment Background Simulation */}
        <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
          <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFv7Qbf2VWEmm83Bv2vLaOmiYq5-7UgrJbpkPyorUD6gcG_dJoQewcWbghnOBiZnz3yizSpRwa__F-U4VI6raYBXAkEBajWjX0tB7HwlqfUpoBoO7XDkYoKL1Q2ZClTXC9NhrHrhSk00DcQRFYXas9qc8ws1F6hz3ZFL7QUOZy40qVMeNBPtAGI6qn7zHC-CtLxawWJ63qvB03Dseel0gso_kjjsuLzI3QDfHpx7Zs4glY4NQ8BWqPWXSfdiSCgK1g8l0nHr815Q"/>
        </div>

        {/* Floating Candles Decoration (mostly hidden on very small screens, kept for completeness) */}
        <div className="absolute top-10 left-10 hidden floating-candle opacity-60 z-10">
          <span className="material-symbols-outlined text-4xl text-[#D4AF37]">flare</span>
        </div>

        {/* Professor Section */}
        <div className="w-full flex flex-col items-center gap-8 mb-12 z-10">
          {/* Professor Portrait Card */}
          <div className="relative w-48 h-64 bg-surface-container border border-outline-variant/30 rounded-xl shadow-sm p-2 -rotate-2">
            <div className="w-full h-full bg-surface overflow-hidden rounded-lg border border-outline-variant/50">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPwLHDVRXWaX7zj9y9c8kyDxe11ZxZirLA8DpH-XT24BaXd42HZ-fTmkAA5E8FE9HgzTWHtAdjpdwDhukf7faSIKJFWM_0m0xHwQboJHqH4p35YG1r78dJf1mjgQTmKhPJuwoGqEqg2eJ-qi_1z3irMZLT5kTWMs2XkwtLmdD33e3YkL4-aYR515JBCYC32FVF4Qszq2ksJ73y6W5qqBk3srpMv9ZrFA3RCYcwM18Di8T_-lImnB42zjmL4ZzP7tkYIxAE6eiMwc4"/>
            </div>
            {/* Name Tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary px-4 py-1 rounded-full shadow-md font-label-md text-label-md rotate-2 whitespace-nowrap">
              Professor Flitwick
            </div>
          </div>

          {/* Dialogue Bubble */}
          <div className="w-full relative mt-4">
            <div className="bg-surface p-6 rounded-2xl shadow-[0_4px_20px_rgba(60,47,47,0.08)] deckle-edge border border-[#D4C5A1] relative" style={{ backgroundImage: 'linear-gradient(to bottom right, #fff8f7, #f3dedd)' }}>
              {/* Speech Tail */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface border-t border-l border-[#D4C5A1] rotate-45"></div>
              
              <h2 className="font-headline-sm text-headline-sm text-primary mb-4 italic">{lesson.spellName}</h2>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                "Remember the wrist movement we practiced! Swish and flick. Now, to activate the charm, you must concentrate your intent and say the incantation clearly: 
                <span className="inline-flex items-center gap-2 font-bold text-primary italic border-b-2 border-dashed border-primary px-2 py-1 bg-primary-fixed/30 rounded-t-lg mx-1 mt-2">
                  Wingardium 
                  <span className={`px-4 py-0.5 rounded border border-outline select-none ${selectedWord ? 'text-primary' : 'animate-pulse text-transparent bg-surface-container-highest'}`}>
                    {selectedWord ? selectedWord : '_______'}
                  </span>
                </span>."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Lesson Section */}
        <div className="w-full flex flex-col gap-6 z-10">
          <p className="text-center font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-[10px]">Select the correct word to complete the spell</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Word Chips */}
            {[
              { word: 'Leviosa', meaning: 'To Lift', correct: true },
              { word: 'Lumos', meaning: 'To Light', correct: false },
              { word: 'Alohomora', meaning: 'To Open', correct: false },
              { word: 'Accio', meaning: 'To Summon', correct: false }
            ].map(option => (
              <button 
                key={option.word}
                onClick={() => setSelectedWord(option.word)}
                className={`border py-4 px-2 rounded-xl flex flex-col items-center gap-2 transition-all active:scale-95 group ${
                  selectedWord === option.word 
                    ? 'bg-surface-container border-primary shadow-md scale-105' 
                    : 'bg-surface border-outline-variant hover:border-primary hover:bg-surface-container'
                }`}
              >
                <span className={`font-headline-sm text-headline-sm ${selectedWord === option.word ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>{option.word}</span>
                <span className="font-caption text-caption text-on-surface-variant">{option.meaning}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button (Wax Seal) */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
          <button 
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-on-primary wax-seal border-4 relative group touch-manipulation transition-all duration-300 ${
              selectedWord ? 'bg-primary border-primary-container hover:scale-105 active:scale-95' : 'bg-surface-variant border-outline-variant opacity-50 grayscale'
            }`}
            disabled={!selectedWord}
            onClick={() => {
              if (selectedWord === 'Leviosa') {
                navigate('/victory')
              } else {
                alert('Khẩu quyết chưa chính xác! Hãy chọn "Leviosa" (To Lift).')
              }
            }}
          >
            {/* Magical Glow Aura */}
            {selectedWord && <div className="absolute inset-0 rounded-full bg-primary-container opacity-0 group-hover:opacity-40 blur-xl transition-opacity"></div>}
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>wand_stars</span>
            <span className="font-label-md text-[10px] uppercase tracking-tighter mt-1">Cast Spell</span>
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNavBar />
    </div>
  )
}

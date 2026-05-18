/**
 * WaxSealButton - Game Element Component
 * Extracted from wax-seal pattern in Stitch design system
 * Used for primary actions (Play, Quest Start)
 */

interface WaxSealButtonProps {
  readonly onClick?: () => void
  readonly icon?: string
  readonly size?: 'sm' | 'md' | 'lg'
  readonly className?: string
  readonly children?: React.ReactNode
}

export function WaxSealButton({ onClick, icon, size = 'md', className = '', children }: WaxSealButtonProps) {
  const sizeMap = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-14 h-14' }
  const iconSizeMap = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' }

  return (
    <button
      className={`${sizeMap[size]} bg-primary rounded-full wax-seal flex items-center justify-center active:scale-90 active:translate-y-1 transition-all duration-100 touch-manipulation cursor-pointer ${className}`}
      onTouchStart={() => {}}
      onClick={onClick}
    >
      {icon && <span className={`material-symbols-outlined text-white ${iconSizeMap[size]}`}>{icon}</span>}
      {children}
    </button>
  )
}

/**
 * QuestCard - Game Element Component
 * Extracted from the bottom quest card pattern in Stitch Map screen
 */

interface QuestCardProps {
  readonly title: string
  readonly description: string
  readonly progress: number // 0–100
  readonly label?: string
  readonly onPlay?: () => void
}

export function QuestCard({ title, description, progress, label = 'Nhiệm vụ hiện tại', onPlay }: QuestCardProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/50 rounded-xl p-5 shadow-xl deckle-edge relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <span className="material-symbols-outlined text-[#d4af37] opacity-40 text-4xl animate-pulse">auto_awesome</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <span className="font-label-md text-label-md text-secondary-fixed-dim bg-secondary/10 px-2 py-1 rounded uppercase text-xs">
              {label}
            </span>
            <h2 className="mt-2 font-headline-md text-xl font-bold text-primary">{title}</h2>
            <p className="font-body-md text-sm text-on-surface-variant">{description}</p>
          </div>
          <WaxSealButton size="lg" icon="play_arrow" onClick={onPlay} />
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-base">hourglass_top</span>
          <div className="flex-1 h-3 bg-surface-variant rounded-full overflow-hidden inner-depth relative">
            <div
              className="h-full bg-gradient-to-r from-primary to-[#d4af37] shadow-[0_0_8px_#d4af37] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/shattered.png')] opacity-30"></div>
            </div>
          </div>
          <span className="font-label-md text-label-md text-primary text-sm">{progress}%</span>
        </div>
      </div>
    </div>
  )
}

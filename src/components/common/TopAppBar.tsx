/**
 * TopAppBar - Shared Component
 * Extracted from SCREEN_62 (Bản Đồ Hogwarts) per Technical Spec
 * Reusable across all screens in the app
 */

interface TopAppBarProps {
  readonly title: string
  readonly onMenuPress?: () => void
  readonly avatarUrl?: string
  readonly showBack?: boolean
  readonly onBackPress?: () => void
}

export function TopAppBar({ title, onMenuPress, avatarUrl, showBack, onBackPress }: TopAppBarProps) {
  const defaultAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO1zC-qMxmWZjdV2OJ_ClGApriqcMKwSzR-yqoGd5hU6l-iYAlL3ZMi1h7-uWwILiGoxTthS-IYSR9_nHyGiFg2ouORT0WZW7d_X8kC6p-GVjziIMxAMF31KNy7d57_xqzTRzd4N9FbLPZxIsenGS9bVMmh9Xz3JhVEg0AsLK1x1rI0kEfJhlIVm4uQk3nP9jr24qFnoHo9aBSvmYQt3N-o6KT9qNlqzB4zvzI6dEOYBtI0rH66wLrYR_Xa2rsMWO3fdSGu0qFIy4'

  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-16 flex justify-between items-center px-6 bg-surface shadow-[0_4px_10px_rgba(60,47,47,0.1)] rounded-b-xl">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button
            className="material-symbols-outlined text-primary active:scale-90 transition-transform touch-manipulation"
            onTouchStart={() => {}}
            onClick={onBackPress}
          >
            arrow_back
          </button>
        ) : (
          <button
            className="material-symbols-outlined text-primary cursor-pointer active:scale-90 transition-transform touch-manipulation"
            onTouchStart={() => {}}
            onClick={onMenuPress}
          >
            menu
          </button>
        )}
        <h1 className="font-headline-md italic font-bold text-primary">{title}</h1>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-sm">
        <img alt="Chân dung Phù thủy" className="w-full h-full object-cover" src={avatarUrl ?? defaultAvatar} />
      </div>
    </header>
  )
}

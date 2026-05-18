import { useNavigate, useLocation } from 'react-router-dom'

/**
 * BottomNavBar - Shared Component
 * Extracted from SCREEN_62 per Technical Spec
 * Active tab is highlighted based on current route
 */

interface NavItem {
  readonly icon: string
  readonly label: string
  readonly path: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'auto_fix_high', label: 'Thần chú', path: '/daily-quests' },
  { icon: 'map',           label: 'Bản đồ',   path: '/' },
  { icon: 'inventory_2',   label: 'Rương đồ', path: '/inventory' },
  { icon: 'auto_stories',  label: 'Thư viện', path: '/curriculum' },
  { icon: 'shopping_bag',  label: 'Cửa hàng', path: '/shop' },
]

export function BottomNavBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-[24px] pb-[34px] pt-3 bg-surface-container-low shadow-[0_-4px_12px_rgba(60,47,47,0.08)] rounded-t-xl border-t border-outline-variant/30">
      {NAV_ITEMS.map(item => {
        const isActive = pathname === item.path
        return (
          <button
            key={item.icon}
            className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] active:scale-95 active:brightness-90 transition-all duration-150 touch-manipulation py-1 px-2 rounded-full ${
              isActive
                ? 'bg-primary text-on-primary w-14 h-14 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ring-2 ring-primary-fixed'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
            onTouchStart={() => {}}
            onClick={() => navigate(item.path)}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {!isActive && <span className="font-label-md text-label-md text-xs">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}

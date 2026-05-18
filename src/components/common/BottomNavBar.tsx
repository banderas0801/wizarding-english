import { useNavigate, useLocation } from 'react-router-dom'

interface NavItem {
  readonly icon: string
  readonly label: string
  readonly path: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'map',          label: 'Bản đồ',   path: '/' },
  { icon: 'auto_stories', label: 'Thư viện', path: '/curriculum' },
  { icon: 'inventory_2',  label: 'Rương đồ', path: '/inventory' },
  { icon: 'shopping_bag', label: 'Cửa hàng', path: '/shop' },
  { icon: 'person',       label: 'Hồ sơ',   path: '/profile' },
]

// Routes where bottom nav should be hidden (full-screen sessions)
const HIDE_ON = ['/stage', '/sorting', '/portal', '/select-language', '/combat']

export function BottomNavBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (HIDE_ON.some(p => pathname.startsWith(p))) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto flex justify-around items-center px-2 pt-2 bg-[#1a0f14]/95 border-t border-[#d4af37]/20 backdrop-blur-md"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
    >
      {NAV_ITEMS.map(item => {
        const isActive = item.path === '/'
          ? pathname === '/'
          : pathname.startsWith(item.path)

        return (
          <button
            key={item.icon}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all active:scale-95 relative min-w-[56px]"
          >
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute top-1 w-1 h-1 rounded-full bg-[#d4af37]" />
            )}
            <span
              className="material-symbols-outlined text-[22px] transition-colors"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                color: isActive ? '#d4af37' : 'rgba(255,255,255,0.45)',
              }}
            >
              {item.icon}
            </span>
            <span
              className="text-[10px] font-medium transition-colors"
              style={{ color: isActive ? '#d4af37' : 'rgba(255,255,255,0.40)' }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

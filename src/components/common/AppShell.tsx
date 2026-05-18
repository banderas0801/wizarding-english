/**
 * AppShell — single layout wrapper for all pages
 *
 * Handles:
 * - max-w-[430px] mx-auto (mobile-first, desktop centered)
 * - Safe area insets (iOS notch/home bar)
 * - CSS variable --header-height for pages to reference
 * - Gothic dark background (unified theme)
 * - BottomNavBar slot
 */
import type { ReactNode } from 'react'
import { BottomNavBar } from './BottomNavBar'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="relative mx-auto overflow-x-hidden"
      style={{
        maxWidth: '430px',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #1a0f14 0%, #0d0d1a 100%)',
        // Desktop: show subtle border so it doesn't look stretched
        boxShadow: '0 0 60px rgba(0,0,0,0.8)',
      }}
    >
      {/* CSS variable for header height — pages use pt-[var(--header-height)] */}
      <style>{`:root { --header-height: 72px; }`}</style>

      {/* Page content */}
      <div className="relative w-full overflow-y-auto" style={{ minHeight: '100dvh' }}>
        {children}
      </div>

      {/* Bottom nav (auto-hides on full-screen routes) */}
      <BottomNavBar />
    </div>
  )
}

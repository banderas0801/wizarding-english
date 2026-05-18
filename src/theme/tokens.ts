/**
 * Design Tokens - Theme Definition
 * Sourced directly from Stitch Design System (tailwind-config in HTML export)
 * This is the single source of truth for all colors, fonts, spacing
 */

export const colors = {
  // Primary palette
  primary: '#510003',
  'primary-container': '#741010',
  'primary-fixed': '#ffdad6',
  'primary-fixed-dim': '#ffb4ab',
  'on-primary': '#ffffff',
  'on-primary-container': '#ff7b6f',
  'inverse-primary': '#ffb4ab',

  // Secondary palette
  secondary: '#3b6848',
  'secondary-container': '#bdefc6',
  'secondary-fixed': '#bdefc6',
  'secondary-fixed-dim': '#a1d2ab',
  'on-secondary': '#ffffff',
  'on-secondary-container': '#416e4d',

  // Tertiary palette
  tertiary: '#162147',
  'tertiary-container': '#2c375e',
  'tertiary-fixed': '#dce1ff',
  'tertiary-fixed-dim': '#bac5f4',
  'on-tertiary': '#ffffff',
  'on-tertiary-container': '#96a1ce',

  // Surface palette
  background: '#fff8f7',
  surface: '#fff8f7',
  'surface-dim': '#ead5d5',
  'surface-bright': '#fff8f7',
  'surface-variant': '#f3dedd',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#fff0f0',
  'surface-container': '#ffe9e8',
  'surface-container-high': '#f9e3e3',
  'surface-container-highest': '#f3dedd',
  'surface-tint': '#a83730',
  'inverse-surface': '#3a2d2d',
  'inverse-on-surface': '#ffedec',

  // On-surface
  'on-surface': '#241919',
  'on-background': '#241919',
  'on-surface-variant': '#57413f',

  // Outline
  outline: '#8b716e',
  'outline-variant': '#dfbfbc',

  // Error
  error: '#ba1a1a',
  'error-container': '#ffdad6',
  'on-error': '#ffffff',
  'on-error-container': '#93000a',

  // Special
  gold: '#D4AF37',
} as const

export const fontFamily = {
  serif: ['Libre Caslon Text', 'serif'],
  sans: ['Hanken Grotesk', 'sans-serif'],
} as const

export const spacing = {
  gutter: '16px',
  containerMobile: '24px',
  containerDesktop: '48px',
  unit: '8px',
  elementGap: '12px',
} as const

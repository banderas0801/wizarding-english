# Developer Quick Reference
## Arcane Lexicon UI/UX Standards

**Quick lookup guide for developers implementing the Arcane Lexicon design system.**

---

## Color Palette (Copy-Paste Ready)

```css
/* Primary Colors */
--primary: #741010;           /* Gryffindor Red - Main actions */
--primary-dark: #8b1818;      /* Darker primary - Hover state */
--secondary: #3B6848;         /* Herbology Green - Success */
--tertiary: #D4AF37;          /* Golden Snitch - Special events */

/* Backgrounds */
--surface: #FFF8F7;           /* Main background */
--surface-container: #F5EEEC; /* Cards */
--surface-high: #EAE2E0;      /* Hover states */

/* Text Colors */
--on-surface: #241919;        /* Primary text */
--on-surface-variant: #5F4F4F; /* Secondary text */
--on-primary: #FFFFFF;        /* Text on primary bg */

/* Borders */
--outline: #7F7070;           /* Primary border */
--outline-variant: #DFBFBC;   /* Subtle border */

/* Semantic */
--success: #2E7D32;           /* Correct answers */
--error: #C62828;             /* Wrong answers */
--warning: #F57C00;           /* Warnings */
--info: #1976D2;              /* Information */
```

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: '#741010',
      'primary-dark': '#8b1818',
      secondary: '#3B6848',
      tertiary: '#D4AF37',
      surface: '#FFF8F7',
      'surface-container': '#F5EEEC',
      'surface-container-high': '#EAE2E0',
      'on-surface': '#241919',
      'on-surface-variant': '#5F4F4F',
      'on-primary': '#FFFFFF',
      outline: '#7F7070',
      'outline-variant': '#DFBFBC',
      success: '#2E7D32',
      error: '#C62828',
      warning: '#F57C00',
      info: '#1976D2',
    },
    extend: {
      boxShadow: {
        'sm': '0 1px 3px rgba(60, 47, 47, 0.1)',
        'md': '0 4px 10px rgba(60, 47, 47, 0.1)',
        'lg': '0 10px 20px rgba(60, 47, 47, 0.15)',
        'xl': '0 20px 40px rgba(60, 47, 47, 0.2)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
    },
  },
};
```

## Common Component Patterns

### Button (Primary)
```tsx
<button className="w-full px-6 py-3 rounded-full bg-primary text-on-primary font-bold hover:brightness-110 active:scale-95 transition-all">
  Click Me
</button>
```

### Button (Secondary)
```tsx
<button className="px-4 py-2 rounded-lg border-2 border-outline-variant text-on-surface font-semibold hover:border-primary hover:bg-surface-container transition-all">
  Secondary
</button>
```

### Card
```tsx
<div className="p-6 rounded-2xl border-2 border-outline-variant bg-surface-container shadow-md hover:border-primary hover:shadow-lg transition-all">
  Card Content
</div>
```

### Input Field
```tsx
<input 
  className="w-full px-4 py-3 rounded-lg border-2 border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
  placeholder="Enter text..."
/>
```

### Tab Navigation
```tsx
<nav className="flex justify-around border-b border-outline-variant/50">
  <button className="pb-2 px-4 font-semibold text-on-surface-variant hover:text-primary transition-colors">
    Tab 1
  </button>
  <button className="pb-2 px-4 font-semibold text-primary border-b-2 border-primary">
    Tab 2 (Active)
  </button>
</nav>
```

### Modal/Dialog
```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="w-full max-w-md bg-surface rounded-2xl p-6 shadow-xl">
    <h2 className="text-2xl font-bold text-primary mb-4">Modal Title</h2>
    <p className="text-on-surface-variant mb-6">Modal content here</p>
    <button className="w-full px-6 py-3 rounded-full bg-primary text-on-primary font-bold">
      Confirm
    </button>
  </div>
</div>
```

## Spacing Quick Guide

| Purpose | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Container padding | `px-4` | `px-6 md:px-8` | `px-12` |
| Section gap | `gap-4` | `gap-6` | `gap-8` |
| Card padding | `p-4` | `p-6` | `p-6` |
| Component gap | `gap-2` | `gap-3` | `gap-4` |

## Typography Shortcuts

| Style | Tailwind Classes |
|-------|---|
| H1 (Title) | `text-3xl md:text-4xl font-bold text-primary` |
| H2 (Section) | `text-2xl md:text-3xl font-bold text-primary` |
| H3 (Subsection) | `text-xl md:text-2xl font-semibold text-on-surface` |
| Body (Normal) | `text-base md:text-lg text-on-surface` |
| Label | `text-sm font-semibold text-on-surface` |
| Caption | `text-xs text-on-surface-variant` |

## Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: 0px - 639px (mobile) */
/* sm: 640px - 767px */
/* md: 768px - 1023px */
/* lg: 1024px+ */

/* Usage in Tailwind */
<div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 lg:max-w-7xl lg:mx-auto">
  /* Full width mobile, responsive padding, centered desktop */
</div>
```

## Icon Usage

```tsx
{/* Icon button */}
<button className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center hover:brightness-110">
  <span className="material-symbols-outlined text-primary">favorite</span>
</button>

{/* Icon with text */}
<button className="flex items-center gap-2 text-primary hover:text-primary-dark">
  <span className="material-symbols-outlined">arrow_back</span>
  <span>Back</span>
</button>

{/* Standalone icon */}
<span className="material-symbols-outlined text-2xl text-primary">star</span>
```

## Common Classes Reference

| What | Class |
|------|-------|
| Primary button | `bg-primary text-on-primary rounded-full px-6 py-3 font-bold` |
| Card container | `bg-surface-container rounded-2xl p-6 border border-outline-variant` |
| Section padding | `px-4 sm:px-6 md:px-8 lg:px-12` |
| Centered container | `mx-auto w-full max-w-7xl` |
| Divider | `border-b border-outline-variant/50` |
| Success badge | `bg-success/20 text-success font-semibold px-3 py-1 rounded-full` |
| Error state | `bg-error/20 border border-error text-error rounded-lg p-3` |
| Hover effect | `hover:brightness-110 hover:shadow-lg transition-all` |
| Active effect | `active:scale-95` |
| Disabled state | `opacity-50 cursor-not-allowed` |

## Do's and Don'ts

### ✓ DO
- Use 8px multiples for all spacing
- Use full-width (`w-full`) for mobile content
- Add responsive padding: `px-4 sm:px-6 md:px-8 lg:px-12`
- Include visual feedback on interaction (hover, active, disabled)
- Test on 375px (mobile) and 1440px (desktop)
- Keep touch targets ≥ 44x44px
- Use semantic HTML (`<button>`, `<header>`, `<nav>`, etc.)
- Provide clear focus indicators for keyboard navigation

### ✗ DON'T
- Mix color systems (don't create new colors)
- Use hardcoded pixel sizes for responsive layouts
- Use `max-w-[390px]` (this breaks responsive design!)
- Stack more than 2-3 colors in one component
- Forget contrast ratios (must be 4.5:1 for text)
- Use colors without checking contrast first
- Create shadows with pure black `rgba(0,0,0,0.x)`
- Forget to test on actual mobile devices
- Use font sizes smaller than 12px for body text
- Mix hover effects inconsistently

## Performance Tips

```tsx
// ✓ Good - Efficient styling
const className = "w-full px-4 sm:px-6 bg-surface rounded-lg"

// ✗ Bad - Dynamic classes (use CSS or config instead)
const className = `w-full px-${value}`

// ✓ Good - Static Tailwind classes
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

// ✗ Bad - Too much nesting
<div className="relative">
  <div className="absolute inset-0">
    <div className="flex items-center justify-center">
      ...
    </div>
  </div>
</div>
```

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Button not responsive | Add `w-full` for mobile, remove on desktop |
| Text overflowing | Add `truncate` or `line-clamp-2` |
| Modal not centered | Use `fixed inset-0 flex items-center justify-center` |
| Spacing inconsistent | Check 8px grid alignment |
| Colors not matching | Verify hex codes match specification |
| Touch targets too small | Min 44x44px including padding |
| Hover not showing | Add `transition-all` class |
| Focus outline missing | Add `focus:outline-2 focus:outline-primary` |

## Testing Checklist

Before committing code:
- [ ] Responsive design: Mobile (375px), Tablet (768px), Desktop (1440px)
- [ ] Color contrast: ≥ 4.5:1 for normal text
- [ ] Touch targets: ≥ 44x44px
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Browser tested: Chrome, Firefox, Safari, Mobile Safari
- [ ] Performance: Smooth animations, no jank
- [ ] Accessibility: No console errors, proper semantic HTML
- [ ] Spacing: All gaps are 8px multiples

---

**Last Updated**: 2026-05-17  
**Version**: 1.0  
**For Questions**: Refer to UI_UX_SPECIFICATIONS.md for detailed reference

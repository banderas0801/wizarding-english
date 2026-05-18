# Technical UI/UX Specifications
## Arcane Lexicon (Từ Điển Huyền Bí) Project

**Project**: Arcane Lexicon - English Learning Game for Vietnamese Children  
**Target**: Mobile-first responsive design  
**Status**: v1.0 - Complete Design System  
**Last Updated**: 2026-05-17

---

## Table of Contents

1. [Typography System](#1-typography-system)
2. [Color Palette & Branding](#2-color-palette--branding)
3. [Layout & Components](#3-layout--components)
4. [Interaction Standards](#4-interaction-standards)
5. [Iconography](#5-iconography)
6. [Responsive Design](#6-responsive-design)
7. [Accessibility Standards](#7-accessibility-standards)
8. [Implementation Checklist](#8-implementation-checklist)

---

## 1. Typography System

### 1.1 Font Families

The project uses a strategic combination of serif and sans-serif typefaces to balance classic "Harry Potter" aesthetics with modern mobile readability.

| Role | Font | Use Case | Weight | Size |
|------|------|----------|--------|------|
| Headlines | Libre Caslon Text | Page titles, major headings | 700 (Bold) | 28-32px |
| Subheadings | Libre Caslon Text | Section headers, lesson titles | 600 | 20-24px |
| Body Text | Hanken Grotesk | Paragraphs, descriptions, lesson content | 400-500 | 16-18px |
| Labels | Hanken Grotesk | Button text, tab names, badges | 600-700 | 12-14px |
| Captions | Hanken Grotesk | Hints, secondary info, timestamps | 400 | 11-12px |

### 1.2 Typography Scale

```
Headline Large (H1):    32px / 700 / 1.2 line-height
Headline Medium (H2):   24px / 700 / 1.3 line-height
Headline Small (H3):    20px / 600 / 1.3 line-height
Body Large (Body):      18px / 400 / 1.5 line-height
Body Medium:            16px / 400 / 1.5 line-height
Body Small:             14px / 400 / 1.4 line-height
Label Large:            14px / 600 / 1.2 line-height
Label Medium:           12px / 600 / 1.1 line-height
Label Small:            11px / 500 / 1.0 line-height
```

### 1.3 Text Requirements

- **Minimum Font Size**: 12px (never smaller, to comply with WCAG AA)
- **Line Height**: 1.4x - 1.5x font size (for readability on mobile)
- **Letter Spacing**: Normal (0) for body text; +0.5px for labels and caps
- **Text Color**: Use `on-surface` (#241919) for primary text on light backgrounds
- **Text Alignment**: Left-aligned by default; centered only for headings or CTAs

---

## 2. Color Palette & Branding

### 2.1 Primary Colors

Color system follows Material Design 3 conventions, tailored for the "Mystic Academy" theme.

#### Primary Color: Gryffindor Red
- **Hex**: `#741010`
- **RGB**: `116, 16, 16`
- **Usage**: Main action buttons, active states, important headings
- **Tone**: Deep burgundy red that evokes magic and power
- **Application Examples**:
  - "Next Lesson" button
  - Active tab underline
  - XP/Gold reward badges
  - Primary CTA buttons

#### Secondary Color: Herbology Green
- **Hex**: `#3B6848`
- **RGB**: `59, 104, 72`
- **Usage**: Success states, completion indicators, nature-related content
- **Tone**: Earthy green suggesting growth and achievement
- **Application Examples**:
  - Success checkmarks
  - Correct answer highlighting
  - Achievement badges
  - Nature/Herbology lesson indicators

#### Tertiary Color: Golden Snitch (Accent)
- **Hex**: `#D4AF37`
- **RGB**: `212, 175, 55`
- **Usage**: Rare achievements, special events, premium elements
- **Tone**: Warm gold suggesting prestige
- **Application Examples**:
  - Daily bonus indicators
  - Special event headers
  - Achievement unlocks
  - Premium rewards

### 2.2 Background & Surface Colors

#### Surface (Main Background)
- **Hex**: `#FFF8F7`
- **RGB**: `255, 248, 247`
- **Usage**: Main content background
- **Tone**: Warm cream/parchment that reduces eye strain
- **Notes**: Preferable to pure white (#FFFFFF) for extended reading

#### Surface Container (Cards & Containers)
- **Hex**: `#F5EEEC`
- **RGB**: `245, 238, 236`
- **Usage**: Card backgrounds, container backgrounds
- **Tone**: Slightly darker than Surface for visual hierarchy
- **Elevation**: 1dp shadow to create depth

#### Surface Container High (Selected/Hover)
- **Hex**: `#EAE2E0`
- **RGB**: `234, 226, 224`
- **Usage**: Hovered states, active cards
- **Tone**: Even darker for interactive feedback

### 2.3 Semantic Colors

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| Success | `#2E7D32` | Correct answers, achievements | ✓ Checkmark |
| Error | `#C62828` | Wrong answers, warnings | ✗ X mark |
| Warning | `#F57C00` | Caution states | ⚠ Alert |
| Info | `#1976D2` | Information, hints | ℹ Info |

### 2.4 Text Colors

| Color | Hex | Usage |
|-------|-----|-------|
| On-Surface | `#241919` | Primary text (heading, body) |
| On-Surface Variant | `#5F4F4F` | Secondary text (hints, labels) |
| On-Primary | `#FFFFFF` | Text on primary-colored backgrounds |
| On-Secondary | `#FFFFFF` | Text on secondary-colored backgrounds |

### 2.5 Outline & Border Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Outline | `#7F7070` | Primary borders, dividers |
| Outline Variant | `#DFBFBC` | Subtle borders, secondary dividers |

### 2.6 Brand Color Usage Rules

```
✓ Primary (#741010) for:
  - Main action buttons
  - Active states
  - Important indicators
  
✓ Secondary (#3B6848) for:
  - Success feedback
  - Completion states
  - Achievement elements
  
✓ Tertiary (#D4AF37) for:
  - Rare/special events
  - Premium elements
  - Attention-grabbing accents
  
✗ Do NOT:
  - Use Primary for all interactive elements (reduces importance)
  - Mix too many colors in one screen (max 3 semantic colors + neutral)
  - Use colors that don't meet WCAG AA contrast ratios
```

---

## 3. Layout & Components

### 3.1 Grid & Spacing System

#### 8px Grid System

All measurements must be multiples of 8px for consistency and scalability.

| Increment | Pixel Value | Use Case |
|-----------|-------------|----------|
| xs | 4px | Micro spacing (rarely used) |
| sm | 8px | Small gaps between inline elements |
| md | 16px | Standard gap between related items |
| lg | 24px | Container padding, major gaps |
| xl | 32px | Large section spacing |
| xxl | 48px | Desktop padding (lg breakpoint) |

#### Container Padding

- **Mobile (0-639px)**: 16px (px-4)
- **Tablet (640-1023px)**: 24px (px-6) → 32px (px-8)
- **Desktop (1024px+)**: 48px (px-12) + max-w-7xl

#### Component Spacing

| Component | Vertical Spacing | Horizontal Spacing | Notes |
|-----------|------------------|-------------------|-------|
| Page sections | 24px | - | Between major sections |
| Cards | 16px | 16px | Between cards in grid |
| List items | 12px | - | Between list items |
| Buttons | - | 8px | Gap between button groups |
| Form inputs | 16px | - | Between form fields |

### 3.2 Component Shapes & Radii

#### Card Radius: 16px
- **Purpose**: Soft, approachable appearance
- **Usage**: Lesson cards, exercise containers, modal backgrounds
- **Class**: `rounded-2xl` (Tailwind)
- **Visual Effect**: Friendly yet professional

```css
/* Card styling example */
.card {
  border-radius: 16px;
  background: #F5EEEC;
  box-shadow: 0 2px 8px rgba(60, 47, 47, 0.1);
  padding: 24px;
}
```

#### Button Radius: Full (Pill Shape)

**For Primary Action Buttons**:
- **Purpose**: Clear, distinctive CTA appearance
- **Usage**: "Next Lesson", "Play Game", "Submit"
- **Class**: `rounded-full` (Tailwind)
- **Min Width**: 44px
- **Min Height**: 44px (to meet 48px touch target when padded)

```css
/* Primary button styling */
.btn-primary {
  border-radius: 9999px;
  background: #741010;
  color: #FFFFFF;
  padding: 12px 24px;
  min-height: 44px;
  font-weight: 600;
}
```

#### Secondary Button Radius: 8px

**For Utility/Secondary Buttons**:
- **Purpose**: Subtle, consistent appearance
- **Usage**: Small action buttons, toggle buttons
- **Class**: `rounded-lg` (Tailwind)

```css
.btn-secondary {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
}
```

### 3.3 Effects & Shadows

#### Shadow System

The shadow system uses warm, desaturated shadows to complement the parchment aesthetic.

| Shadow Level | CSS | Usage | Example |
|--------------|-----|-------|---------|
| Shadow SM | `0 1px 3px rgba(60, 47, 47, 0.1)` | Subtle cards, text overlays | Tab underline |
| Shadow MD | `0 4px 10px rgba(60, 47, 47, 0.1)` | Medium elevation cards | Lesson cards |
| Shadow LG | `0 10px 20px rgba(60, 47, 47, 0.15)` | Floating actions, headers | Modal backdrop |
| Shadow XL | `0 20px 40px rgba(60, 47, 47, 0.2)` | Maximum elevation | Large modals |

#### Shadow Color

- **RGB**: `rgba(60, 47, 47, 0.X)` (warm brown tint)
- **NOT**: `rgba(0, 0, 0, 0.X)` (cold black tint)
- **Reason**: Maintains warm, cohesive aesthetic with parchment

#### Texture: Parchment Background

For important screens (Curriculum, Quiz Results), add subtle parchment texture:

```css
background-image: radial-gradient(#dfbfbc 0.5px, transparent 0.5px);
background-size: 24px 24px;
opacity: 0.1;
```

This creates a subtle paper grain effect that enhances the magical academy theme.

### 3.4 Component Library

#### Buttons

```css
/* Primary Button (Full Width Mobile, Fixed Width Desktop) */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  border-radius: 9999px;
  background: #741010;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: #8b1818;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(116, 16, 16, 0.3);
}

.btn-primary:active {
  transform: scale(0.95);
}

/* Secondary Button */
.btn-secondary {
  padding: 8px 16px;
  border: 2px solid #DFBFBC;
  border-radius: 8px;
  background: transparent;
  color: #241919;
  font-size: 12px;
  font-weight: 600;
  transition: all 150ms ease;
}

.btn-secondary:hover {
  border-color: #741010;
  background: #FFF8F7;
}

.btn-secondary:active {
  transform: scale(0.95);
}
```

#### Cards (Lesson, Exercise, Achievement)

```css
.card {
  padding: 24px;
  background: #F5EEEC;
  border: 2px solid #DFBFBC;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(60, 47, 47, 0.1);
  transition: all 200ms ease;
}

.card:hover {
  border-color: #741010;
  box-shadow: 0 4px 12px rgba(60, 47, 47, 0.15);
  transform: translateY(-2px);
}

.card.active {
  background: #EAE2E0;
  border-color: #741010;
}
```

#### Input Fields

```css
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #DFBFBC;
  border-radius: 8px;
  background: #FFF8F7;
  font-size: 16px;
  transition: border-color 150ms ease;
}

.input-field:focus {
  outline: none;
  border-color: #741010;
  box-shadow: 0 0 0 3px rgba(116, 16, 16, 0.1);
}

.input-field::placeholder {
  color: #5F4F4F;
  font-style: italic;
}
```

---

## 4. Interaction Standards

### 4.1 Touch Target Sizes

All interactive elements must meet minimum size requirements for child users.

| Element | Min Width | Min Height | Reason |
|---------|-----------|-----------|--------|
| Button | 44px | 44px | WCAG AA recommended minimum |
| Tab | 40px | 40px | Finger-friendly navigation |
| Checkbox/Radio | 24px | 24px | Easy to tap accurately |
| Icon Button | 40px | 40px | Single-purpose action buttons |
| List Item | 100% | 44px | Scannable, easy to tap |

### 4.2 Interaction Feedback

Every interaction must provide immediate, clear visual feedback.

#### Button States

```
Normal State:
  - Color: Primary (#741010)
  - Shadow: shadow-md
  - Scale: 1.0

Hover State (Desktop only):
  - Color: Darker (#8b1818)
  - Shadow: shadow-lg
  - Scale: 1.05
  - Cursor: pointer

Active/Pressed State:
  - Color: Darker (#8b1818)
  - Shadow: shadow-sm (reduced)
  - Scale: 0.95
  - Animation: Immediate visual feedback

Disabled State:
  - Color: Outline Variant (#DFBFBC)
  - Text: On-Surface Variant (#5F4F4F)
  - Cursor: not-allowed
  - Opacity: 0.5
```

#### Card States

```
Default:
  - Border: outline-variant (#DFBFBC)
  - Background: surface-container (#F5EEEC)
  
Hover:
  - Border: primary (#741010)
  - Shadow: shadow-md
  - Transform: translateY(-2px)
  
Selected/Active:
  - Border: primary (#741010)
  - Background: surface-container-high (#EAE2E0)
  - Shadow: shadow-md

Disabled:
  - Opacity: 0.6
  - Cursor: not-allowed
```

### 4.3 Loading States

#### Skeleton Loading

Show placeholder shapes matching content layout while data loads:

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #E8E8E8 25%,
    #F0F0F0 50%,
    #E8E8E8 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Loading Spinner

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #DFBFBC;
  border-top-color: #741010;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 4.4 Transition & Animation Timing

| Animation Type | Duration | Easing | Usage |
|---|---|---|---|
| Instant feedback | 150ms | ease | Button press, checkbox toggle |
| Standard transition | 200ms | ease | Color change, shadow update |
| Page transition | 300ms | ease-out | Route change, modal open |
| Entrance animation | 400ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Bounce in effect |

---

## 5. Iconography

### 5.1 Icon System

**Single Icon Set**: Material Symbols Outlined (Google's latest Material Design icons)

| Property | Specification |
|----------|---|
| Set | Material Symbols Outlined |
| Weight | 400 (default) |
| Size | 16px, 20px, 24px, 28px, 32px (as needed) |
| Style | Outlined (not filled, not rounded) |
| Color | Inherits text color by default |

### 5.2 Icon Usage Guidelines

```css
/* Icon color inheritance */
.icon {
  display: inline-block;
  font-size: 24px;
  color: inherit; /* Inherits from parent color */
}

/* Icon in button */
.btn-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-with-icon .icon {
  font-size: 20px;
}

/* Icon alignment */
.icon--align-center {
  vertical-align: middle;
}
```

### 5.3 Common Icons

| Component | Icon | Usage |
|---|---|---|
| Navigation Back | `arrow_back` | Header back button |
| Navigation Forward | `arrow_forward` | Navigation next |
| Menu | `menu` | Hamburger menu |
| Settings | `settings` | Settings access |
| Favorite | `favorite` | Bookmark/favorite |
| Search | `search` | Search function |
| Close | `close` | Dismiss, close modal |
| Check | `check_circle` | Correct answer, success |
| Error | `cancel` | Wrong answer, error |
| Warning | `warning` | Warning state |
| Info | `info` | Information, hint |
| Star | `star` | Rating, achievement |
| Lightning | `bolt` | Magic, power, XP |
| Shield | `shield` | Defense, protection |
| Sword | `swords` | Battle, combat |
| Sparkle | `sparkle` | Magic, special |

### 5.4 Icon Sizes

```css
/* Small icons (12px content, 40px touch target) */
.icon--sm {
  font-size: 16px;
}

/* Regular icons (24px content, 48px touch target) */
.icon--md {
  font-size: 24px;
}

/* Large icons (32px content, 56px+ touch target) */
.icon--lg {
  font-size: 32px;
}

/* Jumbo icons (44px content, decorative) */
.icon--xl {
  font-size: 44px;
}
```

---

## 6. Responsive Design

### 6.1 Breakpoint System

| Breakpoint | Width Range | Device | Content Width |
|---|---|---|---|
| Mobile | 0px - 639px | iPhone, small Android | 100% width - 16px padding |
| Small | 640px - 767px | Large phone, landscape | 100% width - 24px padding |
| Tablet | 768px - 1023px | iPad, tablets | 100% width - 32px padding |
| Desktop | 1024px + | Desktop, large screens | max-w-7xl (1280px) centered |

### 6.2 Responsive Behavior

```css
/* Mobile-first approach */

/* Default (Mobile: 0-639px) */
.container {
  width: 100%;
  padding: 0 16px; /* px-4 */
}

/* Small screens (640-767px) */
@media (min-width: 640px) {
  .container {
    padding: 0 24px; /* px-6 */
  }
}

/* Tablets (768-1023px) */
@media (min-width: 768px) {
  .container {
    padding: 0 32px; /* px-8 */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    width: 100%;
    max-width: 1280px; /* max-w-7xl */
    margin: 0 auto;
    padding: 0 48px; /* px-12 */
  }
}
```

### 6.3 Mobile-First Design Rules

- **Content First**: All content must be readable on mobile (375px minimum)
- **Progressive Enhancement**: Desktop features add, don't replace mobile features
- **Touch-Friendly**: All interactive elements ≥ 44x44px
- **Performance**: Optimize images and lazy-load below-fold content
- **Orientation**: Support both portrait and landscape orientations

### 6.4 Tablet & Desktop Considerations

| Screen Size | Layout Change | Component Adjustment |
|---|---|---|
| 768px+ (Tablet) | 2-column layout possible | Increase spacing for readability |
| 1024px+ (Desktop) | max-w-7xl container | Larger header, centered content |
| 1440px+ (Large) | Full layout utilization | Maximum visual hierarchy usage |

---

## 7. Accessibility Standards

### 7.1 WCAG AA Compliance

All interfaces must meet WCAG 2.1 Level AA standards:

| Standard | Requirement | Implementation |
|---|---|---|
| Contrast Ratio | ≥ 4.5:1 (normal text) | Always check color combinations |
| Text Size | ≥ 12px | No smaller fonts for body content |
| Touch Target | ≥ 44x44px | Minimum spacing for tap accuracy |
| Focus Indicator | Visible outline | Add `outline: 2px solid primary` for keyboard nav |
| Alt Text | Descriptive | Every image needs alt text |
| Semantic HTML | Proper hierarchy | Use `<h1>`, `<button>`, `<label>` correctly |

### 7.2 Color Contrast Examples

```
✓ GOOD (4.5:1+ ratio):
  - #741010 (Primary) on #FFF8F7 (Surface) = 7.2:1
  - #241919 (On-Surface) on #FFF8F7 = 15.6:1

✗ BAD (< 4.5:1 ratio):
  - #D4AF37 (Tertiary) on #FFF8F7 = 3.2:1 (needs outline)
  - #DFBFBC (Outline) on #FFF8F7 = 1.8:1 (not for text)
```

### 7.3 Focus Management

```css
/* Keyboard navigation focus */
button:focus,
a:focus,
input:focus {
  outline: 2px solid #741010;
  outline-offset: 2px;
}

/* Remove default outline on mouse users (optional, modern approach) */
button:focus:not(:focus-visible) {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #741010;
  outline-offset: 2px;
}
```

### 7.4 Semantic Markup

```html
<!-- ✓ Good -->
<header>
  <h1>Lesson Title</h1>
</header>

<nav>
  <ul>
    <li><a href="#content">Content</a></li>
    <li><a href="#vocab">Vocabulary</a></li>
  </ul>
</nav>

<main>
  <section>
    <h2>Section Title</h2>
  </section>
</main>

<!-- ✗ Bad -->
<div class="header">
  <div class="title">Lesson Title</div>
</div>

<div class="nav">
  <div class="menu-item">Content</div>
</div>
```

---

## 8. Implementation Checklist

### Design System Implementation

- [ ] All colors imported as CSS variables or Tailwind config
- [ ] Font families loaded via Google Fonts or system fonts
- [ ] 8px grid system enforced throughout codebase
- [ ] Shadow values standardized via Tailwind/CSS
- [ ] Rounded corners use predefined values (8px, 16px, full)

### Component Implementation

- [ ] Buttons meet min 44x44px size requirement
- [ ] Cards use 16px border radius and drop shadow
- [ ] All text ≥ 12px size
- [ ] Interactive elements have clear hover/active states
- [ ] Loading states show skeleton or spinner
- [ ] Error states clearly marked in red

### Responsive Implementation

- [ ] Mobile (mobile-first design)
  - [ ] Full-width layouts with 16px padding
  - [ ] Stacked navigation and content
  - [ ] Touch-friendly spacing
  
- [ ] Tablet 
  - [ ] 24-32px padding
  - [ ] 2-column layouts where appropriate
  - [ ] Increased whitespace
  
- [ ] Desktop
  - [ ] max-w-7xl centered container
  - [ ] 48px padding
  - [ ] Optimal reading width for text

### Accessibility Implementation

- [ ] All color combinations meet WCAG AA (4.5:1+)
- [ ] Focus indicators visible for keyboard navigation
- [ ] Semantic HTML (button, h1-h6, nav, main, section)
- [ ] Form labels properly associated with inputs
- [ ] Images have alt text
- [ ] Icons have ARIA labels when needed

### Testing Checklist

- [ ] Visual design matches specification across all breakpoints
- [ ] All interactions responsive and performant
- [ ] No color contrast violations found
- [ ] Touch targets all ≥ 44x44px
- [ ] Tested on iOS Safari and Chrome Mobile
- [ ] Tested on Android Chrome and Firefox Mobile
- [ ] Tested on tablets (iPad Air, Galaxy Tab)
- [ ] Tested on desktop (1920x1080, 1440x900)

---

## Design Token Reference

### Spacing Values (Tailwind)

```
p-2   = 8px     px-4  = 16px   
p-3   = 12px    px-6  = 24px   
p-4   = 16px    px-8  = 32px   
p-6   = 24px    px-12 = 48px
```

### Font Sizes

```
text-xs   = 12px   text-base   = 16px   text-2xl = 24px
text-sm   = 14px   text-lg     = 18px   text-3xl = 30px
text-sm   = 14px   text-xl     = 20px   text-4xl = 36px
```

### Colors (Tailwind)

```
bg-surface           = #FFF8F7
bg-surface-container = #F5EEEC
text-on-surface      = #241919
text-primary         = #741010
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-05-17 | Initial UI/UX specification document |

---

**Document Status**: ✅ COMPLETE  
**Next Review**: 2026-06-17  
**Maintained By**: Design & Development Team

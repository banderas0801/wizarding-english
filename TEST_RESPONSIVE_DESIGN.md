# Responsive Design Testing Guide

## Quick Start

1. **Start the dev server**:
   ```bash
   cd wizarding-app
   npm run dev -- --host
   ```

2. **Open in browser**: 
   - Local: `http://localhost:5173`
   - Remote: Check the terminal output for the local network URL

## 📱 Mobile Testing (375px - 425px)

Use Chrome DevTools: 
1. Open DevTools (F12)
2. Click Device Emulation (Ctrl+Shift+M)
3. Select "iPhone 12" or "iPhone 13"

### Checklist:
- [ ] App loads without errors
- [ ] Header fits without overflow
- [ ] Logo "Arcane" is visible
- [ ] Progress indicator visible (X/40)
- [ ] 5 tabs visible: Content, Vocabulary, Practice, 🎮 Game
- [ ] Tabs don't wrap to multiple lines
- [ ] Tab underlines show active tab clearly
- [ ] Content padding feels right (not cramped)
- [ ] Content doesn't exceed screen width
- [ ] No horizontal scrolling needed

### Lesson Content Testing:
- [ ] Passage/Story text readable
- [ ] Grammar point box displays properly
- [ ] Example box has proper spacing
- [ ] Vocabulary cards stack vertically
- [ ] Each vocab card shows word and "Tap for definition"
- [ ] Vocab cards span full width

### Vocabulary Modal Testing:
- [ ] Tap a vocabulary word
- [ ] Modal appears from bottom
- [ ] Word definition visible
- [ ] Speaker button (🔊) visible and clickable
- [ ] Close button (✕) visible
- [ ] "Got it!" button spans full width
- [ ] Modal doesn't overflow screen

### Practice Tab Testing:
- [ ] Questions display clearly
- [ ] Option buttons span full width
- [ ] Option text is readable (not truncated)
- [ ] Exercise type badge visible
- [ ] XP reward badge visible
- [ ] Selected answer highlights properly
- [ ] Correct/incorrect feedback appears
- [ ] Navigation buttons work

### Game Tab Testing:
- [ ] "Mini Game Challenge" or game type displays
- [ ] Game container takes full width
- [ ] Questions readable
- [ ] Options buttons full width
- [ ] Progress bar displays correctly
- [ ] Result screen centered properly

## 💻 Tablet Testing (600px - 850px)

Use Chrome DevTools:
1. Device Emulation
2. Select "iPad Air" or custom 768px width

### Checklist:
- [ ] App uses full available width
- [ ] Content has proper margins (not full-bleed)
- [ ] Padding looks appropriate (px-4 sm:px-6 md:px-8)
- [ ] Header spans properly
- [ ] 5 tabs still visible without wrapping
- [ ] Game area comfortable for reading
- [ ] No excessive whitespace on sides
- [ ] Touch targets are adequate (buttons 48px+)
- [ ] Modal displays properly
- [ ] Exercises display with good spacing

## 🖥️ Desktop Testing (1024px and up)

Resize browser window to 1024px, then to full screen (1440px+)

### Checklist:
- [ ] App respects max-w-7xl constraint
- [ ] Content properly centered
- [ ] Padding increases appropriately (lg:px-12)
- [ ] Game area comfortable reading width
- [ ] No shrinkage back to 390px (the bug we fixed)
- [ ] Hover states work on buttons
- [ ] No horizontal scrolling at any width
- [ ] Modal centered properly
- [ ] All game components display well

### Performance Check:
- [ ] App responsive when resizing (no jank)
- [ ] Smooth transitions between breakpoints
- [ ] No layout shifts when content loads

## 🎮 Game-Specific Tests

### QUIZ Game:
- [ ] "Mini Game Challenge" displays at all sizes
- [ ] "Play Now" button full width
- [ ] Progress bar visible during quiz
- [ ] Question text readable
- [ ] Option buttons clearly labeled
- [ ] Correct/incorrect icons show properly
- [ ] Result screen well-formatted

### BATTLE Game:
- [ ] HP bars display side-by-side on mobile
- [ ] VS badge centered
- [ ] Player HP on left, Enemy on right
- [ ] Question area below HP bars
- [ ] Options buttons full width
- [ ] Victory/Defeat screens centered
- [ ] Rewards display properly

### Other Games (RIDDLE, MATCH, STORY):
- [ ] Containers take full width
- [ ] Content properly centered
- [ ] No overflow at any viewport size
- [ ] Interactive elements properly sized

## 🔍 CSS Verification

### Check for Fixed Width Issues:
```bash
# Search for problematic patterns
grep -r "max-w-\[390" src/
grep -r "maxWidth.*390" src/
grep -r "width.*px" src/ | grep -v "100%" | head -20
```

**Expected Result**: No matches (all fixed width issues removed)

### Verify Responsive Classes:
```bash
# Should find responsive padding
grep -r "px-4 sm:px-6 md:px-8 lg:px-12" src/
```

**Expected Result**: Found in LessonEvan.tsx

## 📊 Responsive Design Breakdown

### Tailwind Breakpoints Used:
- **None/Mobile**: 0px - 639px
- **sm**: 640px - 767px  
- **md**: 768px - 1023px
- **lg**: 1024px - ∞

### App Width Behavior:
- **Mobile (0-639px)**: `w-full px-4` (full width with 16px padding)
- **Small Tablet (640-767px)**: `w-full px-6` (full width with 24px padding)
- **Tablet (768-1023px)**: `w-full px-8` (full width with 32px padding)
- **Desktop (1024px+)**: `max-w-7xl mx-auto px-12` (centered max 1280px with 48px padding)

## ✅ Success Criteria

The responsive design fix is working correctly if:

1. **Mobile (375px)**: Content fits perfectly, no overflow, good padding
2. **Tablet (768px)**: App uses available width, content properly spaced
3. **Desktop (1440px)**: App centers content with max-w-7xl, doesn't shrink to 390px
4. **All Sizes**: No horizontal scrolling needed at any viewport size
5. **Games**: All 5 game types display properly at all sizes
6. **Modals**: Vocabulary modal centers and scales properly

## 🚨 Red Flags (Should NOT see these)

- ❌ App shrinking to 390px on desktop
- ❌ Horizontal scrolling required
- ❌ Content overlapping at edges
- ❌ Text truncation (e.g., question text cut off)
- ❌ Buttons misaligned or too small
- ❌ Modal appearing off-screen
- ❌ Header text wrapping to multiple lines
- ❌ Game containers not full width

## 📸 Documentation

Take screenshots at these breakpoints:
1. iPhone 12 (390px) - Portrait
2. iPad Air (768px) - Portrait
3. Desktop (1440px) - Full screen

### What to capture:
- Header with logo and progress
- Content tab with lesson text
- Vocabulary tab with word cards
- Practice tab with exercises
- Game tab with game interface
- Modal/Popup (vocab definition)

## 🔧 Troubleshooting

### If app still shows 390px max-width:
1. Hard refresh (Ctrl+Shift+R) to clear cache
2. Check browser DevTools styles for hardcoded widths
3. Verify vite is serving latest files
4. Check that App.tsx doesn't have max-width in style

### If tabs wrap or overflow:
1. Check whitespace-nowrap on tab buttons
2. Verify overflow-x-auto on nav
3. Ensure px values allow room for all 5 tabs

### If modal doesn't center:
1. Verify `inset-0` on overlay
2. Check `flex items-center justify-center` on container
3. Ensure modal bg properly set to surface

---

**Last Updated**: 2026-05-17
**Status**: Ready for Testing

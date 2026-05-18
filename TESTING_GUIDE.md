# Testing & Verification Guide

**Purpose**: Verify that mobile responsiveness and flow clarity fixes work correctly  
**Time Estimate**: 20-30 minutes  
**Test Environment**: Local dev server or staging

---

## Prerequisites

1. Dependencies installed: `npm install` (takes ~2 minutes)
2. Dev server running: `npm run dev`
3. Access to browser DevTools (F12) for mobile simulation

---

## Test 1: Mobile Responsiveness (375px - iPhone SE)

### Setup
- Open DevTools (F12)
- Click device toolbar (mobile icon)
- Set to iPhone SE (375x667)
- Reload page

### 1.1: HogwartsMap on Mobile

**URL**: http://localhost:5173/

**What to Check**:
- [ ] Page loads without console errors
- [ ] Header visible with profile pic and menu (not cut off)
- [ ] "Choose a Location" title centered and readable
- [ ] Location buttons (Library, Potions, etc.) are full width
- [ ] No content hidden behind bottom navigation
- [ ] All text is readable (no overlaps)
- [ ] Scroll content above bottom nav without obstruction

**Specific Elements**:
- Profile button: Should be 48x48px (check DevTools computed styles)
- Menu button: Should be 48x48px
- Location cards: Should have consistent padding left/right
- Main content: Should have pb-24 (padding-bottom: 6rem)

**Expected**: Green checkmarks all the way

---

### 1.2: Portal on Mobile (New User)

**URL**: http://localhost:5173/portal

**Setup**: Clear browser storage first
- Open DevTools
- Application tab → Local Storage
- Find `game-store` key
- Delete it
- Reload

**What to Check**:
- [ ] Single [Start Learning] button visible (big and obvious)
- [ ] Button text and icon properly sized
- [ ] Centered on screen
- [ ] Button is tappable (48x48px minimum touch area)
- [ ] No confusing extra buttons
- [ ] Welcome message displays correctly

**Expected**: Only one button, clearly prompts new user to start

---

### 1.3: Portal on Mobile (Returning User)

**Setup**:
- Open DevTools
- Application tab → Local Storage
- Find `game-store` key
- Set `hasCompletedOnboarding` to `true`
- Reload

**What to Check**:
- [ ] Page loads briefly
- [ ] Auto-redirects to HogwartsMap (/)
- [ ] No Portal content shown
- [ ] HogwartsMap loads properly

**Expected**: Automatic redirect, user never sees Portal

---

### 1.4: LocationDetail on Mobile

**URL**: http://localhost:5173/location/library

**What to Check**:
- [ ] Top bar visible with location name
- [ ] Hero card (brown background) visible with icon
- [ ] Hero card has proper padding (16px on mobile, not 32px)
- [ ] Lesson list below is readable
- [ ] All lesson cards are full width
- [ ] No content hidden behind bottom nav
- [ ] All text visible and readable

**Specific Elements**:
- Hero card padding: Should be `p-4` on mobile (check DevTools)
- Main content: Should have `pb-24`

**Expected**: Green checkmarks all the way

---

## Test 2: Tablet Responsiveness (768px - iPad)

### Setup
- Open DevTools
- Set to iPad (768x1024)

### 2.1: Portal on Tablet (New User)

**URL**: http://localhost:5173/portal

**What to Check**:
- [ ] [Start Learning] button visible but less dominant
- [ ] Centered on screen
- [ ] Proper padding around button

**Expected**: Button still obvious but not oversized

---

### 2.2: Portal on Tablet (Returning User)

**URL**: http://localhost:5173/portal

**Setup**: Set hasCompletedOnboarding = true

**What to Check**:
- [ ] Progress cards display in 3-column grid
- [ ] [Open Map] button below progress
- [ ] Proper spacing and alignment
- [ ] No wrapping issues

**Expected**: 3-column grid, clean layout

---

### 2.3: HogwartsMap on Tablet

**URL**: http://localhost:5173/

**What to Check**:
- [ ] Location cards display nicely
- [ ] Padding is md:px-6 (24px)
- [ ] All buttons have w-10 h-10 (40px) on tablet
- [ ] Responsive layout looks good

**Expected**: Layout responsive, buttons properly sized

---

## Test 3: Desktop Responsiveness (1200px)

### Setup
- Open DevTools
- Set to desktop or disable device toolbar
- Resize to 1200px wide

### 3.1: Portal Desktop

**URL**: http://localhost:5173/portal

**What to Check**:
- [ ] Progress cards in 3-column grid
- [ ] [Open Map] button full width
- [ ] Proper desktop spacing
- [ ] All padding is md:px-6

**Expected**: Clean desktop layout

---

### 3.2: HogwartsMap Desktop

**URL**: http://localhost:5173/

**What to Check**:
- [ ] Location cards responsive
- [ ] Buttons are w-10 h-10 (40px)
- [ ] No excessive spacing
- [ ] Layout looks professional

**Expected**: Clean, readable layout

---

## Test 4: Onboarding Flow (New User)

### Full Flow Test

**Setup**: Clear `game-store` from Local Storage
- Application tab → Local Storage
- Delete `game-store`

**Flow**:
1. [ ] Open http://localhost:5173/portal
2. [ ] See [Start Learning] button
3. [ ] Click button
4. [ ] Navigate to /select-language
5. [ ] Select language (e.g., English)
6. [ ] Navigate to /sorting
7. [ ] Select house (e.g., Gryffindor)
8. [ ] See "You have been sorted!" message
9. [ ] Auto-redirect to / (HogwartsMap)
10. [ ] See map with locations

**At Each Step**:
- [ ] Layout is responsive (test on 375px, 768px, 1200px)
- [ ] All text readable
- [ ] No console errors (F12 → Console tab)
- [ ] All buttons tappable/clickable

**Expected**: Smooth flow, no errors, no confusing screens

---

## Test 5: Return User Flow

### Setup
- Browser storage has `game-store` with:
  - `hasCompletedOnboarding = true`
  - `language = "en"` or `"vi"`
  - `house = "gryffindor"` (or other house)

**Flow**:
1. [ ] Open http://localhost:5173/portal
2. [ ] Page auto-redirects to /
3. [ ] HogwartsMap loads
4. [ ] Can click on location (e.g., Library)
5. [ ] See lessons for that location
6. [ ] Can click on lesson
7. [ ] Lesson content loads

**At Each Step**:
- [ ] No unexpected redirects
- [ ] Layout responsive
- [ ] No console errors

**Expected**: Seamless experience, user goes straight to learning

---

## Test 6: Bottom Navigation

### On Mobile (375px)

**URL**: http://localhost:5173/

**What to Check**:
- [ ] Bottom nav visible at bottom
- [ ] 4 navigation items: Curriculum, Quests, Portal, Rewards
- [ ] Portal item shows "Portal" label
- [ ] All items tappable (48x48px touch area)
- [ ] Content doesn't get hidden behind nav
- [ ] Scroll works properly above nav

**Interaction Test**:
1. [ ] Click Curriculum → /curriculum loads
2. [ ] Click Quests → /daily-quests loads
3. [ ] Click Portal → /portal loads (or auto-redirects if onboarded)
4. [ ] Click Rewards → /victory loads

**Expected**: All navigation works, no overlap

---

## Test 7: Console Errors

### On All Pages

**Setup**: Open DevTools → Console tab (F12)

**What to Check**:
- [ ] No red errors in console
- [ ] No warning about missing keys
- [ ] No network errors
- [ ] No React warnings

**Pages to Check**:
- [ ] /portal (new user)
- [ ] /select-language
- [ ] /sorting
- [ ] / (HogwartsMap)
- [ ] /location/library
- [ ] /lesson/evan?id=<any>

**Expected**: Clean console, no errors

---

## Test 8: Responsive Images

### On Mobile (375px)

**URL**: http://localhost:5173/

**What to Check**:
- [ ] Profile picture loads quickly
- [ ] Images don't cause layout shifts
- [ ] No pixelation or distortion
- [ ] Hero cards display properly

**Note**: Currently using Google Cloud images. If slow, may need optimization later.

**Expected**: Images load appropriately for device

---

## Test 9: Touch Targets

### On Mobile (375px)

**DevTools Check**:
- Open DevTools → Elements tab
- Select profile button
- Check "Styles" panel
- Look for width and height
- Should be: `width: 48px; height: 48px;`

**Repeat For**:
- [ ] Profile button (HogwartsMap)
- [ ] Menu button (Portal)
- [ ] Location buttons
- [ ] Bottom nav items

**Expected**: All > 44x44px on mobile

---

## Test 10: Language Persistence

### Setup
- Open /select-language
- Select Vietnamese (Tiếng Việt)
- Navigate through app
- Reload page

**What to Check**:
- [ ] Language stays as Vietnamese
- [ ] All labels in Vietnamese
- [ ] No fallback to English

**Repeat For**:
- [ ] English language
- [ ] Multiple pages

**Expected**: Language persists across sessions

---

## Test 11: House Selection Persistence

### Setup
- Complete /sorting
- Select house
- Navigate around
- Reload page

**What to Check**:
- [ ] House remains selected
- [ ] Shown in Portal progress view
- [ ] Persists across sessions

**Expected**: House selection saved and retrieved correctly

---

## Checklist Summary

### Mobile (375px) - Critical
- [ ] No content hidden by bottom nav
- [ ] All buttons 48x48px+
- [ ] Padding 16px (px-4)
- [ ] Text readable
- [ ] Onboarding shows 1 button only
- [ ] No console errors

### Tablet (768px) - Important
- [ ] Progress cards in 3-column grid
- [ ] Responsive layout working
- [ ] Buttons 40px+
- [ ] Padding 24px (md:px-6)

### Desktop (1200px) - Should Work
- [ ] Clean layout
- [ ] Proper spacing
- [ ] Professional appearance

### Flow - Critical
- [ ] New users: Language → Sorting → Map
- [ ] Return users: Auto-redirect to Map
- [ ] No confusion about next steps
- [ ] Bottom nav always accessible

---

## Debugging Tips

### If Content Hidden by Bottom Nav
```
Check: main element has pb-24 class
DevTools Styles: Should show "padding-bottom: 6rem"
Fix: Add pb-24 to main element
```

### If Buttons Too Small on Mobile
```
Check: Button has w-12 h-12 md:w-10 md:h-10 classes
DevTools Styles: On mobile should show width: 48px, height: 48px
Fix: Update button sizing classes
```

### If Grid Not Responsive
```
Check: section has grid-cols-1 sm:grid-cols-3 classes
DevTools: On 375px should show 1 column, on 768px should show 3
Fix: Update grid column classes
```

### If Language Not Persisting
```
Check: useGameStore is persisted with zustand persist
File: src/store/useGameStore.ts
Should have: persist({ ... })
```

---

## Sign-Off

Once all tests pass:
- [ ] Mobile (375px) responsive ✓
- [ ] Tablet (768px) responsive ✓
- [ ] Desktop (1200px) responsive ✓
- [ ] Onboarding flow clear ✓
- [ ] Return user flow smooth ✓
- [ ] No console errors ✓
- [ ] All translation keys work ✓
- [ ] Bottom nav doesn't overlap content ✓
- [ ] Touch targets accessible ✓

**Status**: Ready for deployment

---

## Next Step: Production Deployment

After all tests pass:
1. Commit changes: `git add . && git commit -m "Mobile responsiveness & flow clarity fixes"`
2. Push to main: `git push origin main`
3. Deploy to staging: `npm run build && deploy-to-staging`
4. Monitor error logs for 24-48 hours
5. Deploy to production when stable

---

## Questions & Issues

If tests fail:
1. Check the console for error messages
2. Verify translation keys exist in en.json
3. Check that files were saved correctly (grep Portal.tsx for useEffect)
4. Clear browser cache: DevTools → Network → "Disable cache"
5. Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

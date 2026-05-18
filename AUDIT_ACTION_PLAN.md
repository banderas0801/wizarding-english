# 🎯 Audit Action Plan - Step By Step

**Goal**: Systematically check every feature and flow  
**Prepared**: 2026-05-17  
**Status**: Ready for execution

---

## 📥 PHASE 1: Setup (5 min)

### Step 1: Start the Dev Server
```bash
cd wizarding-app
npm install          # If not done yet (2-3 min)
npm run dev          # Start development server
```

**Expected**: Terminal shows "VITE v5.x.x ready in XXX ms"

### Step 2: Open Browser
- Open http://localhost:5173 in browser
- Open DevTools: Press **F12**
- Go to Console tab - **Watch for red errors!**
- Keep DevTools open during testing

### Step 3: Prepare Testing Environment
- **Mobile**: DevTools → Click device icon → Select iPhone SE (375x667)
- **Tablet**: DevTools → Select iPad mini (768x1024)
- **Desktop**: Disable device toolbar, use 1200px width

---

## 📋 PHASE 2: Critical Flow Testing (20 min)

### Test 1: Onboarding (New User)

**Clear local storage first:**
```
DevTools → Application → Local Storage
→ Find "game-store" key
→ Delete it
→ Reload page (F5)
```

**Then follow flow:**

| Step | Action | Expected | Check |
|------|--------|----------|-------|
| 1 | Go to /portal | [Start Learning] button shows | ✅ or ❌ |
| 2 | Click [Start Learning] | Navigate to /select-language | ✅ or ❌ |
| 3 | Select English or 越南语 | Save and go to /sorting | ✅ or ❌ |
| 4 | Click house (any) | "You've been sorted" + redirect | ✅ or ❌ |
| 5 | Land on HogwartsMap (/) | 5 locations visible | ✅ or ❌ |

**Issues Found**: _____________

---

### Test 2: HogwartsMap Main Hub (10 min)

**URL**: http://localhost:5173/

| Element | Test | Expected | Check |
|---------|------|----------|-------|
| Title | Visible | "Choose a Location" | ✅ or ❌ |
| Library | Click | Expands, shows lessons | ✅ or ❌ |
| Potions | Click | Expands, shows lessons | ✅ or ❌ |
| Arithmancy | Click | Expands, shows lessons | ✅ or ❌ |
| Herbology | Click | Expands, shows lessons | ✅ or ❌ |
| Great Hall | Click | Expands, shows lessons | ✅ or ❌ |
| Lesson | Click lesson | Navigate to /lesson/evan?id=X | ✅ or ❌ |

**Mobile Check**: 
- [ ] No content hidden behind bottom nav
- [ ] All text readable
- [ ] Buttons are tappable (big touch targets)
- [ ] Padding looks right (16px sides)

**Issues Found**: _____________

---

### Test 3: Lesson & Game (10 min)

**URL**: http://localhost:5173/lesson/evan?id=(any id from previous test)

| Element | Test | Expected | Check |
|---------|------|----------|-------|
| Lesson loads | Page loads | Content visible, no errors | ✅ or ❌ |
| Game element | Look for game | Interactive game visible | ✅ or ❌ |
| Game plays | Play game | Game responds to input | ✅ or ❌ |
| Complete | Finish game | Game shows result | ✅ or ❌ |
| Navigation | Click back/next | Navigate correctly | ✅ or ❌ |

**Mobile Check**:
- [ ] Game playable on 375px screen
- [ ] All buttons tappable
- [ ] No layout shifts

**Console Check**:
- [ ] No red errors (F12 → Console)
- [ ] No undefined errors
- [ ] All console messages normal

**Issues Found**: _____________

---

## 📚 PHASE 3: Secondary Features Testing (30 min)

### Test 4: Navigation Buttons

**From HogwartsMap (/), test bottom navigation:**

| Button | Action | Expected Destination | Check |
|--------|--------|----------------------|-------|
| Curriculum | Click | /curriculum loads | ✅ or ❌ |
| Quests | Click | /daily-quests loads | ✅ or ❌ |
| Portal | Click | /portal loads | ✅ or ❌ |
| Rewards | Click | /victory loads | ✅ or ❌ |

**For each page:**
- [ ] Page loads without errors
- [ ] Content displays
- [ ] Responsive on mobile
- [ ] Can navigate back

**Issues Found**: _____________

---

### Test 5: Language Switching

**From HogwartsMap:**
1. Go to /select-language (via bottom nav or Portal)
2. Select Vietnamese (Tiếng Việt)
3. Confirm change happens
4. Check all text is in Vietnamese
5. Go to /sorting (if in Portal)
6. Verify house names in Vietnamese
7. Return to /
8. Verify HogwartsMap in Vietnamese

**Specific Checks**:
- [ ] Location names translated
- [ ] Lesson names translated
- [ ] Button labels translated
- [ ] Switch back to English works

**Issues Found**: _____________

---

### Test 6: House Selection

**From Portal or after onboarding:**
1. Go to /sorting
2. Click different houses (test each)
3. Verify house saves
4. Return to /profile
5. Verify house shown in profile
6. Reload page (F5)
7. Verify house still shows

**Specific Checks**:
- [ ] House saves correctly
- [ ] House persists after reload
- [ ] All 4 houses selectable
- [ ] House displays in profile

**Issues Found**: _____________

---

## 🎮 PHASE 4: Features Testing (30 min)

### Test 7: Secondary Pages

**Test each page for:**
- Page loads without errors
- Content displays properly
- Buttons work
- Mobile responsive
- No broken links

**Pages to Test:**
```
□ /profile        - Shows player stats
□ /inventory      - Shows items
□ /shop           - Shows items for purchase
□ /curriculum     - Shows all lessons
□ /daily-quests   - Shows daily tasks
□ /titles         - Shows achievements/titles
□ /leaderboard    - Shows player rankings
□ /inbox          - Shows messages (if applicable)
```

**For Each Page**:
1. Navigate to page
2. Check if content loads (within 3 seconds)
3. Look for console errors (F12)
4. Try clicking buttons
5. Test on mobile (375px)

**Issues Found**: _____________

---

## 📱 PHASE 5: Responsive Design Check (20 min)

### Test 8: Mobile (375px)

**Test EVERY page at 375px width:**

Checklist for each page:
- [ ] No horizontal scrolling
- [ ] Text readable (not too small)
- [ ] Buttons 48px+ (easy to tap)
- [ ] Padding correct (16px sides)
- [ ] Bottom nav visible and not covering content
- [ ] Images properly sized
- [ ] No layout breaks

**Pages to Test at 375px:**
```
□ / (HogwartsMap)
□ /portal
□ /select-language
□ /sorting
□ /location/library
□ /lesson/evan?id=x
□ /profile
□ /inventory
□ /curriculum
```

**Issues Found**: _____________

---

### Test 9: Tablet (768px)

**Key Checks:**
- [ ] Grid columns showing correctly (should be 3 columns)
- [ ] Spacing looks balanced
- [ ] Buttons at 40px size
- [ ] Padding 24px sides
- [ ] Layout professional

**If issues on tablet, check classes:**
```
Grid should be: grid-cols-1 sm:grid-cols-3
Padding should be: px-4 md:px-6
Buttons should be: w-12 h-12 md:w-10 md:h-10
```

**Issues Found**: _____________

---

### Test 10: Desktop (1200px+)

**Key Checks:**
- [ ] Layout uses full width effectively
- [ ] Spacing looks good
- [ ] No awkward empty space
- [ ] Professional appearance
- [ ] All features accessible

**Issues Found**: _____________

---

## 🔴 PHASE 6: Console & Error Checking (10 min)

### Test 11: Console Errors

**Keep browser console open (F12) while:**
1. Reload page (F5)
2. Navigate through onboarding
3. Click HogwartsMap locations
4. Switch languages
5. Open Profile page

**Watch for RED ERRORS:**
```
❌ BAD (Red errors):
- Uncaught TypeError: ...
- Cannot read property 'x' of undefined
- Module not found

✅ OK (Green/Gray):
- 🗺️ HogwartsMap: Render (debug log)
- 📍 Locations found: (debug log)
```

**Record Any Red Errors:**

| Error Message | Page | When | Priority |
|--------------|------|------|----------|
| Example: "Cannot read property 'title' of undefined" | /lesson/evan | Click lesson | CRITICAL |

**Issues Found**: _____________

---

### Test 12: Missing Translation Keys

**Look for text like:**
- `app.title` (shows key instead of text)
- `language.select` (shows key instead of text)
- `undefined` appearing in UI

**If found:**
1. Note the key (e.g., "app.title")
2. Check if it exists in en.json
3. Check if it exists in vi.json
4. Add if missing

**Issues Found**: _____________

---

## 📊 PHASE 7: Duplicate File Check (5 min)

### Test 13: Cleanup Duplicate Versions

**These duplicate files exist - test which to keep:**

1. **CurriculumCenter.tsx** vs **CurriculumCenter_Enhanced.tsx**
   - [ ] Test CurriculumCenter.tsx → Works?
   - If YES: Delete CurriculumCenter_Enhanced.tsx

2. **HogwartsMap.tsx** vs **HogwartsMap_Enhanced.tsx**
   - [ ] Test HogwartsMap.tsx → Works?
   - If YES: Delete HogwartsMap_Enhanced.tsx

3. **LessonEvan.tsx** vs **LessonEvan_Enhanced.tsx** vs **LessonEvan_Updated.tsx**
   - [ ] Test LessonEvan.tsx → Works?
   - If YES: Delete _Enhanced and _Updated versions

**Action**: 
```bash
# Remove unused versions
rm src/pages/CurriculumCenter_Enhanced.tsx
rm src/pages/HogwartsMap_Enhanced.tsx
rm src/pages/LessonEvan_Enhanced.tsx
rm src/pages/LessonEvan_Updated.tsx
```

---

## 📝 PHASE 8: Results Summary

### Audit Completion Checklist

**Fill in after testing:**

```
PHASE 1 - Setup: ✅ Complete
PHASE 2 - Critical Flows: ✅ Complete
  ✅ Onboarding
  ✅ HogwartsMap
  ✅ Lesson/Game
  
PHASE 3 - Secondary: ✅ Complete
  ✅ Navigation
  ✅ Language
  ✅ House selection
  
PHASE 4 - Features: ✅ Complete
  ✅ All secondary pages tested
  
PHASE 5 - Responsive: ✅ Complete
  ✅ Mobile (375px)
  ✅ Tablet (768px)
  ✅ Desktop (1200px)
  
PHASE 6 - Errors: ✅ Complete
  ✅ Console check
  ✅ Translation check
  
PHASE 7 - Cleanup: ✅ Complete
  ✅ Duplicates removed
  
TOTAL ISSUES FOUND: ___ (critical, high, medium, low)
```

---

## 🐛 Issues Found - Summary

**Format each issue like this:**

```
ISSUE #1: HogwartsMap doesn't show lessons
Priority: CRITICAL
Page: /
Steps to Reproduce:
  1. Go to /
  2. Click "Library" location
  3. No lessons show
Expected: Lessons should expand
Actual: Nothing happens
Console Error: "getLessonsForSubject is undefined"
Severity: Blocks core feature

---

ISSUE #2: Text shows keys instead of English
Priority: HIGH
Pages: /portal, /profile
Example: "app.title" shows instead of "Arcane Lexicon"
Cause: Translation key not in en.json
Fix: Add missing keys to locales
```

---

## ✅ When Complete

After filling out all phases:

1. **Count issues by priority:**
   - [ ] CRITICAL: ___ issues
   - [ ] HIGH: ___ issues
   - [ ] MEDIUM: ___ issues
   - [ ] LOW: ___ issues

2. **Create fix list** (prioritize critical first)

3. **Report results:**
   - Share AUDIT_RESULTS.md with all findings
   - Provide screenshots of bugs
   - List which features work vs broken

---

## 🎓 Tips While Testing

### If a button doesn't work:
1. Check browser console (F12) for errors
2. Click the button and look for error messages
3. Check if button has onClick handler
4. Check useNavigate() is imported

### If content doesn't show:
1. Check console for errors
2. Check if API/context is loading data
3. Check if data structure matches expected format
4. Try refreshing page

### If layout is broken on mobile:
1. Check if pb-24 is present (prevents nav overlap)
2. Check if px-4 is present (should be 16px padding)
3. Check if button sizes are w-12 h-12 (should be 48px)
4. Check Tailwind classes are correct

### If translation shows key instead of text:
1. Go to src/locales/en.json
2. Search for the key (e.g., "app.title")
3. If not found, add it with correct text
4. Do same for vi.json

---

## 📞 Need Help?

See AUDIT_QUICK_START.md for common issues and fixes.

---

**Status**: Audit materials ready  
**Time Estimate**: 2-3 hours  
**Next Step**: Start Phase 1 setup and run through tests

**Let's audit! 🚀**

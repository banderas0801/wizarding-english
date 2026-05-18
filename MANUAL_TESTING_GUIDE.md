# 📋 Manual Testing Guide - Run On Your Machine

**Status**: npm install on server experiencing timeout  
**Solution**: Run testing locally on your computer  
**Time**: ~2-3 hours for full audit

---

## 🚀 SETUP ON YOUR COMPUTER

### Step 1: Open Terminal/Command Prompt
```bash
cd path/to/wizarding-app
```

### Step 2: Clean Install Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```
**Expected**: Takes 2-3 minutes, ends with "added X packages"

### Step 3: Start Dev Server
```bash
npm run dev
```

**Expected Output**:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open Browser
- Go to http://localhost:5173
- Open DevTools: Press **F12**
- Go to **Console** tab
- Keep this open throughout testing

---

## 📋 PHASE 2: CRITICAL FLOW TESTING (20 min)

### Test 1: Onboarding Flow

#### Step 1: Clear Local Storage
```
DevTools → Application → Local Storage
→ Right-click "game-store" 
→ Delete
→ Reload page (F5)
```

#### Step 2: Test New User Flow

| Step | Action | Expected | ✅/❌ |
|------|--------|----------|------|
| 1 | See /portal | [Start Learning] button shows | __ |
| 2 | Click [Start Learning] | Navigate to /select-language | __ |
| 3 | Select English or Việt | Save language, go to /sorting | __ |
| 4 | Click house (any) | "You've been sorted" message | __ |
| 5 | Confirm | Auto-redirect to / (HogwartsMap) | __ |
| 6 | See map | 5 locations visible | __ |

**Console Check**: 
- [ ] No red errors
- [ ] No "undefined" messages
- [ ] Debug logs might show (that's OK)

**Record any issues**:
```
Issue 1: ________________
Issue 2: ________________
Issue 3: ________________
```

---

### Test 2: HogwartsMap Main Hub

**URL**: http://localhost:5173/

| Element | Action | Expected | ✅/❌ |
|---------|--------|----------|------|
| Title | Visible | "Choose a Location" shows | __ |
| Library | Click | Expands, shows lessons below | __ |
| Potions | Click | Expands, shows lessons | __ |
| Arithmancy | Click | Expands, shows lessons | __ |
| Herbology | Click | Expands, shows lessons | __ |
| Great Hall | Click | Expands, shows lessons | __ |
| First lesson | Click | Navigate to /lesson/evan?id=X | __ |

**Check Locations Load:**
- [ ] All 5 locations visible
- [ ] Each has icon, name, lesson count
- [ ] All are clickable
- [ ] Lessons expand correctly

**Mobile Test (if available)**:
- [ ] Resize to 375px (DevTools)
- [ ] Content not hidden behind bottom nav
- [ ] Text readable
- [ ] Buttons tappable

**Record any issues**:
```
Issue 1: ________________
Issue 2: ________________
Issue 3: ________________
```

---

### Test 3: Lesson & Game

**URL**: http://localhost:5173/lesson/evan?id=(any id from test 2)

| Element | Test | Expected | ✅/❌ |
|---------|------|----------|------|
| Page loads | Wait 2 sec | Content visible | __ |
| Lesson title | Look | Title displays | __ |
| Game area | Look | Interactive game visible | __ |
| Game plays | Try interacting | Game responds | __ |
| Complete game | Finish action | Result shows | __ |
| Next button | Click | Navigate to next lesson | __ |

**Check Game:**
- [ ] Game loads within 2 seconds
- [ ] Game is interactive (responds to clicks/input)
- [ ] Game has clear instructions
- [ ] Completion tracked
- [ ] XP shown

**Console Check**:
- [ ] No red errors during game
- [ ] No "Cannot read property" errors
- [ ] No undefined values

**Record any issues**:
```
Issue 1: ________________
Issue 2: ________________
Issue 3: ________________
```

---

## 📱 PHASE 3: RESPONSIVE DESIGN (15 min)

### Test Mobile (375px)

**In DevTools:**
```
Click device icon → iPhone SE (375x667)
Reload page (F5)
```

**Check Every Page at 375px:**

For **HogwartsMap**:
- [ ] Locations stack vertically
- [ ] No horizontal scroll
- [ ] Bottom nav visible, not covering content
- [ ] Text readable (not too small)
- [ ] Buttons big enough to tap

For **Portal**:
- [ ] [Start Learning] button centered
- [ ] Button big and obvious
- [ ] Proper spacing around

For **LocationDetail**:
- [ ] Hero card responsive
- [ ] Lesson list fits width
- [ ] All readable

For **LessonEvan**:
- [ ] Content fits on screen
- [ ] Game playable on 375px
- [ ] No layout breaks

**Record any mobile issues**:
```
Mobile Issue 1: ________________
Mobile Issue 2: ________________
Mobile Issue 3: ________________
```

---

### Test Tablet (768px)

**In DevTools:**
```
Click device icon → iPad mini (768x1024)
Reload page (F5)
```

**Check:**
- [ ] Grid shows 3 columns (if applicable)
- [ ] Spacing looks balanced
- [ ] Professional appearance
- [ ] All readable

---

### Test Desktop (1200px)

**In DevTools:**
```
Disable device mode (click device icon again)
Resize to 1200px wide
```

**Check:**
- [ ] Layout professional
- [ ] Good spacing
- [ ] No awkward gaps
- [ ] All readable

---

## 🎮 PHASE 4: SECONDARY FEATURES (20 min)

### Bottom Navigation Test

**From HogwartsMap**, click each nav button:

| Button | Navigate To | Expected Page | ✅/❌ |
|--------|-------------|----------------|------|
| Curriculum | /curriculum | Shows all lessons | __ |
| Quests | /daily-quests | Shows daily tasks | __ |
| Portal | /portal | Shows progress (if onboarded) | __ |
| Rewards | /victory | Shows achievements | __ |

**For Each Page:**
- [ ] Loads within 2 seconds
- [ ] Content displays
- [ ] No console errors
- [ ] Can navigate back

**Record issues**:
```
Nav Issue 1: ________________
Nav Issue 2: ________________
```

---

### Language Switching Test

**From HogwartsMap:**
1. Go to /select-language (click Curriculum → any lesson)
2. Select Vietnamese (Tiếng Việt)
3. Confirm - should see Vietnamese text
4. Go to /sorting to verify
5. Return to /
6. Check all text is Vietnamese

**Check**:
- [ ] Location names in Vietnamese
- [ ] Lesson names in Vietnamese
- [ ] Button labels in Vietnamese
- [ ] Switch back to English works
- [ ] Language persists on reload

**Record issues**:
```
Language Issue 1: ________________
Language Issue 2: ________________
```

---

## 🔍 PHASE 5: CONSOLE & ERRORS (10 min)

### Keep Console Open (F12)

While navigating through:
1. Reload page
2. Go through onboarding
3. Click locations
4. Open lessons
5. Play games
6. Switch languages
7. Visit different pages

**Watch for RED ERRORS:**

Record any red error messages:
```
Error 1: ____________________________________
Error 2: ____________________________________
Error 3: ____________________________________
```

**Record Warnings** (yellow):
```
Warning 1: ____________________________________
Warning 2: ____________________________________
```

---

## ✅ PHASE 6: FEATURE CHECKLIST

### Pages to Verify

Test each page loads and works:

```
Entry/Onboarding:
□ /login       - Login form works
□ /portal      - Buttons correct
□ /select-language - Language selection
□ /sorting     - House selection

Learning:
□ /            - HogwartsMap loads
□ /location/:key - Location detail
□ /lesson/evan - Lesson content
□ /curriculum  - Curriculum list

Features:
□ /profile     - Shows player stats
□ /inventory   - Shows items
□ /shop        - Shows items
□ /daily-quests - Shows quests
□ /victory     - Shows achievements

Games/Quests:
□ /quest/potion - Potion game
□ /quest/sphinx - Sphinx riddle
□ /quest/y1-l1  - Sentence game
□ /quest/dragon - Dragon quest
□ /quest/maze   - Maze riddle
```

---

## 📝 RESULTS TEMPLATE

After completing all tests, fill this out:

```
AUDIT RESULTS - [Your Name]
Date: [Today]

CRITICAL FLOWS:
  Onboarding: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  HogwartsMap: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  Lesson/Game: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

RESPONSIVE (375px):
  Mobile: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  Issues: 
    - Issue 1
    - Issue 2

SECONDARY FEATURES:
  Navigation: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  Language: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  
CONSOLE:
  Red Errors: 0 / 1 / 2+ ?
  Warnings: 0 / 1 / 2+ ?

TOTAL ISSUES: ___

CRITICAL: ___
HIGH: ___
MEDIUM: ___
LOW: ___

ISSUES FOUND:
1. [Description]
2. [Description]
3. [Description]
...
```

---

## 🎯 PRIORITY ISSUES TO LOOK FOR

If you find these, they're **CRITICAL**:

1. **Onboarding doesn't complete** (auto-redirect not working)
2. **HogwartsMap doesn't show locations** (data not loading)
3. **Lessons don't load** (game not showing)
4. **Mobile content hidden** (behind bottom nav)
5. **Red console errors** (breaking functionality)

If you find these, they're **HIGH**:

1. Buttons don't navigate
2. Languages don't switch
3. Game not interactive
4. House not saving
5. Text shows keys like "app.title"

---

## 💾 SAVE YOUR RESULTS

When complete:
1. Take screenshots of any bugs
2. Copy console error messages
3. Note exact steps to reproduce issues
4. List all issues by priority

---

## 📤 REPORT BACK WITH

- [ ] Completed PHASE 2 (onboarding, map, lesson)
- [ ] Completed PHASE 3 (mobile, tablet, desktop)
- [ ] Completed PHASE 4 (secondary features)
- [ ] Completed PHASE 5 (console check)
- [ ] List of all issues found
- [ ] Screenshots of any bugs
- [ ] Recommendations for fixes

---

**Good luck with your audit! 🎓**

When done, share your findings and I'll help fix any issues found.

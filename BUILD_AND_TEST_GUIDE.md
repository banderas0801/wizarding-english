# 🚀 **BUILD & TEST GUIDE - Wizarding App**

**Run these commands on your machine (not workspace)**

---

## 🧪 **Step 1: Install Dependencies**

```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app

# Clean install
rm -r node_modules package-lock.json
npm install
```

**Expected output:**
```
added XXX packages in XXs
```

---

## ✅ **Step 2: Quality Checks**

### 2a. Lint (ESLint)
```bash
npm run lint
```

**Expected:** No errors (maybe some warnings are OK)

### 2b. Type Check (TypeScript)
```bash
npx tsc --noEmit
```

**Expected:** No errors (should complete instantly)

### 2c. Build
```bash
npm run build
```

**Expected:**
```
> wizarding-app@0.0.0 build
> tsc -b && vite build

✓ built in XXXms
```

---

## 🎮 **Step 3: Run Dev Server**

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.12  ready in XXX ms

  ➜  Local:   http://localhost:5176/
  ➜  press h + enter to show help
```

**Note:** If port 5176 is taken, Vite will use 5177, 5178, etc.

---

## 🧪 **Step 4: Functional Tests**

Open browser and test these routes:

### Test 1: Main Map Page
- **URL:** `http://localhost:5176/#/`
- **Check:**
  - ✅ Page loads without errors
  - ✅ "Hogwarts Map" header visible
  - ✅ 5 location cards show (Library, Potions, Arithmancy, Herbology, Great Hall)
  - ✅ No console errors (F12)

### Test 2: Curriculum Page
- **URL:** `http://localhost:5176/#/curriculum`
- **Check:**
  - ✅ Page loads without errors
  - ✅ 7 grade levels show (K, 1, 2, 3, 4, 5, 6)
  - ✅ Click a grade → expands to show subjects
  - ✅ Click subject → shows units
  - ✅ Click unit → shows lessons
  - ✅ Lessons show title and XP

### Test 3: Lesson Page
- **URL:** `http://localhost:5176/#/lesson/evan?id=k-reading-1-1`
- **Check:**
  - ✅ Lesson loads: "Letter A - Alphabet Recognition"
  - ✅ Shows spell name and grade level
  - ✅ Content tab: Shows passage text
  - ✅ Vocabulary tab: Shows 4 words
  - ✅ Exercises tab: Shows practice items
  - ✅ Next/Previous buttons work
  - ✅ Progress shows "Level 1/40"

### Test 4: Navigation Flow
- **Steps:**
  1. Go to curriculum page
  2. Expand a grade
  3. Click a lesson
  4. Verify lesson page loads with correct content
  5. Click "Next" button
  6. Verify next lesson loads
  7. Click "Previous" button
  8. Verify previous lesson loads

### Test 5: Sample Lessons
Test all 7 sample lessons load correctly:
- [ ] k-reading-1-1 (Grade K, Reading)
- [ ] 1-reading-2-3 (Grade 1, Reading)
- [ ] 2-writing-1-1 (Grade 2, Writing)
- [ ] 3-math-1-2 (Grade 3, Math)
- [ ] 4-science-2-1 (Grade 4, Science)
- [ ] 5-vocabulary-1-3 (Grade 5, Vocabulary)
- [ ] 6-grammar-1-2 (Grade 6, Grammar)

---

## 🎨 **Step 5: Visual/UX Tests**

### Responsive Design
- [ ] Resize browser to 390px width
- [ ] All elements stack correctly
- [ ] Text readable
- [ ] Buttons clickable
- [ ] No horizontal scroll

### Colors & Typography
- [ ] Gold color (#D4AF37) visible as accent
- [ ] Text contrast acceptable
- [ ] Fonts consistent (display/headline/body/label)
- [ ] Spacing proportional

### Animations
- [ ] Tab switching smooth
- [ ] Expand/collapse smooth
- [ ] No jank or stuttering
- [ ] Loads at 60fps (DevTools > Performance)

### Mobile Friendly
- [ ] Touch targets minimum 48x48px
- [ ] No content cut off
- [ ] Scrolling smooth
- [ ] Buttons easy to tap

---

## 🔍 **Step 6: Console Check**

**In browser DevTools (F12):**

### Check Console Tab
- [ ] No red error messages
- [ ] No warning about missing components
- [ ] No broken asset warnings

### Check Network Tab
- [ ] All requests successful (no 404s)
- [ ] `lessons-manifest.json` loads (should be ~2KB with sample data)
- [ ] Assets load quickly (< 1s)
- [ ] No failed requests

### Check Performance
- [ ] First Paint: < 1 second
- [ ] Interactive: < 2 seconds
- [ ] No layout shifts (CLS close to 0)
- [ ] Smooth scrolling (60fps)

---

## ✨ **Step 7: Feature Tests**

### Lesson Features
- [ ] Can read lesson content
- [ ] Can switch between tabs (Content/Vocab/Exercises)
- [ ] Can navigate lessons with Next/Previous
- [ ] Progress level updates
- [ ] Can click back button

### Curriculum Features
- [ ] Can expand/collapse levels
- [ ] Can expand/collapse subjects
- [ ] Can expand/collapse units
- [ ] Can click lesson to navigate
- [ ] Shows correct metadata (grade, subject, XP)

### Map Features
- [ ] Can click location cards
- [ ] Lessons appear when location selected
- [ ] Can click lesson from list
- [ ] Shows correct location grouping

---

## 📊 **Step 8: Coverage Report**

Run coverage:
```bash
npm run test:coverage  # if available
# or check with DevTools coverage tab
```

**Goal:** > 80% code coverage

---

## 🐛 **Step 9: Known Issues**

### Expected:
- ❌ Extraction not working (needs debugging)
- ❌ Only 7 sample lessons available (not 500+)
- ⚠️ Some pages not fully styled (Portal, DailyQuests, etc.)

### NOT Expected:
- ❌ Page won't load
- ❌ Console errors
- ❌ Routes broken
- ❌ Styling completely broken
- ❌ Navigation doesn't work

---

## 📋 **Quality Checklist**

### Code Quality ✅
- [ ] Lint: `npm run lint` passes
- [ ] Types: `npx tsc --noEmit` passes
- [ ] Build: `npm run build` succeeds
- [ ] No console errors

### Functionality ✅
- [ ] All routes load
- [ ] Navigation works
- [ ] Data displays correctly
- [ ] No broken links
- [ ] Sample lessons accessible

### Performance ✅
- [ ] First Paint < 1s
- [ ] Interactive < 2s
- [ ] Smooth animations (60fps)
- [ ] No layout shifts
- [ ] Images optimized

### Accessibility ✅
- [ ] Color contrast OK
- [ ] Text readable
- [ ] Touch targets 48x48px
- [ ] Semantic HTML
- [ ] Keyboard navigation works

### Mobile ✅
- [ ] Responsive at 390px
- [ ] Touch friendly
- [ ] No horizontal scroll
- [ ] Safe area respected
- [ ] All features work on mobile

---

## 📈 **Success Criteria**

### PASS ✅
- [ ] All routes load without errors
- [ ] No console errors or warnings
- [ ] All 7 sample lessons work
- [ ] Navigation between lessons works
- [ ] Curriculum/Map pages functional
- [ ] Responsive design works
- [ ] Lint/build/types pass

### FAIL ❌
- [ ] App crashes
- [ ] Console errors
- [ ] Routes broken
- [ ] Cannot navigate
- [ ] Styling completely broken

---

## 🚀 **What to Report Back**

When done, tell me:

1. **Build Status**
   - [ ] Lint: Pass/Fail
   - [ ] Types: Pass/Fail
   - [ ] Build: Pass/Fail

2. **Runtime Issues**
   - Console errors? List them
   - Broken pages? Which ones?
   - Navigation problems? Describe

3. **Feature Status**
   - All lessons load? Y/N
   - Navigation works? Y/N
   - Curriculum visible? Y/N
   - Map visible? Y/N

4. **Recommendations**
   - What looks good?
   - What needs improvement?
   - Any missing features?
   - Any confusing UX?

---

## 🎯 **Next Steps After Testing**

**If PASS:** 
- Ready for user testing
- Ready for enhancements
- Can start extraction debugging

**If FAIL:**
- Fix issues before proceeding
- Debug console errors
- Verify dependencies installed

---

## 💡 **Troubleshooting**

### Port Already in Use
```bash
# Kill process on port 5176
# Windows:
netstat -ano | findstr :5176
taskkill /PID <PID> /F

# Mac:
lsof -ti:5176 | xargs kill -9
```

### Dependencies Not Installing
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Build Fails
```bash
npm run build 2>&1 | head -50  # see full error
```

### Types Failing
```bash
npx tsc --noEmit --pretty false  # more detail
```

---

**Ready? Let's go!** 🚀

```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app
npm install && npm run dev
```

Then report results! 📊

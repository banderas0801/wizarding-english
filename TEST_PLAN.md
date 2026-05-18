# 🧪 **COMPREHENSIVE TEST PLAN - Wizarding App**

**Based on Industry Best Practices**  
**Date:** May 17, 2026

---

## 📊 **Testing Framework**

### Test Types (in order)
1. **Static Analysis** (Linting, Type Checking)
2. **Unit Tests** (Individual components)
3. **Integration Tests** (Component interactions)
4. **Functional Tests** (User workflows)
5. **Visual Tests** (Design & responsive)
6. **Performance Tests** (Speed & optimization)
7. **Accessibility Tests** (WCAG compliance)

---

## 1️⃣ **STATIC ANALYSIS**

### 1.1 Linting (ESLint)
```bash
npm run lint
```

**Checklist:**
- [ ] No critical errors
- [ ] No unused imports
- [ ] No console.log left in production code
- [ ] Consistent naming conventions
- [ ] Proper spacing & formatting

**Expected:** 0 errors, ≤ 5 warnings

---

### 1.2 Type Checking (TypeScript)
```bash
npx tsc --noEmit
```

**Checklist:**
- [ ] No type errors
- [ ] All props typed
- [ ] All state typed
- [ ] No 'any' types (unless justified)
- [ ] Consistent import/export types

**Expected:** 0 errors, clean compilation

---

### 1.3 Build Check
```bash
npm run build
```

**Checklist:**
- [ ] Build completes without errors
- [ ] Output in `dist/` folder
- [ ] All assets included
- [ ] Source maps generated
- [ ] Bundle size reasonable

**Expected:** ✅ Successfully built

---

## 2️⃣ **UNIT TESTS** (Component Level)

### Components to Test

#### LessonEvan.tsx
```
✓ Loads lesson from query param (?id=)
✓ Displays lesson content (passage, story)
✓ Shows vocabulary words
✓ Shows exercises with options
✓ Tab switching works (Content/Vocab/Exercises)
✓ Next/Previous buttons navigate
✓ Progress level displays correctly
✓ Error state shows on failed load
✓ Loading state shows while fetching
```

#### CurriculumCenter.tsx
```
✓ Loads all curriculum levels (K-6)
✓ Expands/collapses levels
✓ Shows subjects under levels
✓ Shows units under subjects
✓ Shows lessons under units
✓ Displays correct lesson metadata
✓ Navigation to lesson works
✓ Empty state shown when no lessons
```

#### HogwartsMap.tsx
```
✓ Shows 5 location cards
✓ Groups lessons by location
✓ Clicking location expands lesson list
✓ Shows correct lesson count per location
✓ Can navigate to lesson from list
✓ Displays lesson metadata (title, XP, etc.)
✓ Empty state shown when no lessons
```

#### CurriculumContext.tsx
```
✓ Provides curriculum data
✓ goToLesson() works
✓ goToNextLesson() works
✓ goToPreviousLesson() works
✓ getCurrentProgressionLevel() correct
✓ getStatistics() accurate
✓ Error handling on failed load
✓ Loading states managed correctly
```

### Test Command (if tests exist)
```bash
npm run test
npm run test:watch
npm run test:coverage
```

**Expected:** > 80% coverage

---

## 3️⃣ **INTEGRATION TESTS**

### User Workflows

#### Workflow 1: Browse Curriculum
```
1. Start at http://localhost:5176/#/
2. Navigate to http://localhost:5176/#/curriculum
3. Expand Grade K
4. Expand "Phonics" subject
5. Expand "Unit 1"
6. See "k-reading-1-1" lesson
7. Verify metadata displays (XP, title, spell name)

Expected: ✅ All steps work, no errors
```

#### Workflow 2: View Lesson
```
1. Click lesson from curriculum
2. Verify lesson page loads
3. Verify lesson ID in URL (?id=k-reading-1-1)
4. Check Content tab shows passage
5. Check Vocabulary tab shows words
6. Check Exercises tab shows questions
7. Verify progress shows "1/40"

Expected: ✅ Full lesson displays correctly
```

#### Workflow 3: Navigate Lessons
```
1. Load lesson page
2. Click "Next" button
3. Verify new lesson loads (id changes)
4. Verify content updates
5. Verify progress updates
6. Click "Previous" button
7. Verify previous lesson loads

Expected: ✅ Navigation works smoothly
```

#### Workflow 4: Browse by Location
```
1. Go to main map page
2. See all 5 locations
3. Click "Library" location
4. See lessons in library
5. Click a lesson
6. Verify lesson page loads

Expected: ✅ Location filtering works
```

#### Workflow 5: Back Navigation
```
1. Start at curriculum page
2. Click a lesson
3. Click back button
4. Verify returns to curriculum
5. Scroll position maintained

Expected: ✅ Back button works
```

---

## 4️⃣ **FUNCTIONAL TESTS**

### Feature: Lesson Loading
```
Test Case 1.1: Load first lesson
- URL: http://localhost:5176/#/lesson/evan?id=k-reading-1-1
- Expected: Lesson loads, title = "Letter A - Alphabet Recognition"

Test Case 1.2: Load different lesson
- URL: http://localhost:5176/#/lesson/evan?id=1-reading-2-3
- Expected: Lesson loads, content changes

Test Case 1.3: Load invalid lesson
- URL: http://localhost:5176/#/lesson/evan?id=invalid-id
- Expected: Error message shown, "No lesson available"
```

### Feature: Tab Switching
```
Test Case 2.1: Content tab
- Click "Content" tab
- Expected: Story/passage displays

Test Case 2.2: Vocabulary tab
- Click "Vocabulary" tab
- Expected: Word list shows (4 words for k-reading-1-1)

Test Case 2.3: Exercises tab
- Click "Exercises" tab
- Expected: Questions/exercises show
```

### Feature: Navigation
```
Test Case 3.1: Next button at first lesson
- Click "Next" from lesson 1
- Expected: Load lesson 2

Test Case 3.2: Previous button at second lesson
- Click "Previous" from lesson 2
- Expected: Load lesson 1

Test Case 3.3: Navigation flow
- Navigate through all 7 lessons
- Expected: Each loads without errors
```

### Feature: Curriculum Expansion
```
Test Case 4.1: Expand grade level
- Click Grade K
- Expected: Subjects appear

Test Case 4.2: Expand subject
- Click "Phonics"
- Expected: Units appear

Test Case 4.3: Expand unit
- Click "Unit 1"
- Expected: Lessons appear

Test Case 4.4: Collapse expansion
- Click again to collapse
- Expected: Content disappears smoothly
```

### Feature: Lesson Discovery
```
Test Case 5.1: Browse map locations
- See 5 location buttons
- Expected: Library, Potions, Arithmancy, Herbology, Great Hall

Test Case 5.2: Filter by location
- Click "Library"
- Expected: Shows reading/grammar lessons

Test Case 5.3: Select from location
- Click lesson from location
- Expected: Navigates to lesson page
```

---

## 5️⃣ **VISUAL & RESPONSIVE TESTS**

### Desktop (1920x1080)
```
Checklist:
- [ ] Page layout correct
- [ ] Text readable
- [ ] Spacing proportional
- [ ] Colors correct
- [ ] Images scaled properly
- [ ] No horizontal scroll
```

### Tablet (768x1024)
```
Checklist:
- [ ] Page adapts to width
- [ ] Touch targets large enough
- [ ] Text still readable
- [ ] Layout doesn't break
```

### Mobile (390x844)
```
Checklist:
- [ ] Fits without horizontal scroll
- [ ] Touch targets ≥ 48x48px
- [ ] Spacing adjusted for mobile
- [ ] Navigation easy to use
- [ ] Bottom nav accessible
- [ ] Text readable without zoom
```

### Dark Mode (if implemented)
```
Checklist:
- [ ] Colors readable in dark
- [ ] Contrast meets WCAG AA
- [ ] No flickering on toggle
```

---

## 6️⃣ **PERFORMANCE TESTS**

### Metrics to Check (DevTools)

#### Load Time
```
Target: First Paint < 1s
Target: Interactive < 2s
Target: Largest Contentful Paint < 2.5s

Measure:
- Open DevTools > Performance tab
- Record page load
- Check metrics above
```

#### Bundle Size
```
Target: Main bundle < 200KB gzipped
Target: Vendor bundle < 150KB gzipped

Measure:
- npm run build
- Check dist/ folder sizes
- Use webpack-bundle-analyzer if needed
```

#### Runtime Performance
```
Target: 60fps animations
Target: No layout shifts (CLS < 0.1)
Target: Fast interactions (INP < 100ms)

Measure:
- DevTools > Performance tab
- Record user interaction (click tab, scroll, etc.)
- Check frame rate graph
- Check CLS in DevTools > Lighthouse
```

#### Memory Usage
```
Target: Initial: < 50MB
Target: After interaction: < 100MB
Target: No memory leaks

Measure:
- DevTools > Memory tab
- Take heap snapshot before/after
- Check for retained objects
```

---

## 7️⃣ **ACCESSIBILITY TESTS**

### Keyboard Navigation
```
Test: Tab through page
- [ ] Can reach all buttons with Tab key
- [ ] Focus visible on all elements
- [ ] Can activate buttons with Enter/Space
- [ ] Tab order logical
- [ ] No keyboard traps
```

### Color Contrast
```
Test: Check text readability
- [ ] Body text: 4.5:1 contrast (WCAG AA)
- [ ] Large text: 3:1 contrast minimum
- [ ] Links distinguishable from text
- [ ] No color-only indicators

Tool: DevTools > Lighthouse > Accessibility
```

### Screen Reader Testing
```
Test: Use accessibility inspector
- [ ] Semantic HTML used
- [ ] Alt text on images
- [ ] Form labels present
- [ ] ARIA labels where needed
- [ ] Heading hierarchy correct

Tool: Chrome DevTools > Accessibility tab
```

### Mobile Accessibility
```
Test: Phone accessibility features
- [ ] Can zoom (not disabled)
- [ ] Touch targets min 48x48px
- [ ] Color contrast OK
- [ ] Text size adjustable
```

---

## 8️⃣ **CROSS-BROWSER TESTS**

### Chrome
- [ ] Latest version
- [ ] All features work
- [ ] Performance good

### Firefox
- [ ] Latest version
- [ ] All features work
- [ ] Styling consistent

### Safari
- [ ] Latest version
- [ ] All features work
- [ ] iOS Safari tested

### Edge
- [ ] Latest version
- [ ] All features work

---

## 9️⃣ **ERROR HANDLING TESTS**

### Network Errors
```
Test Case 1: Slow network
- Throttle network (DevTools)
- Load lesson
- Expected: Loading state shows, eventually loads

Test Case 2: Network failure
- Go offline (DevTools)
- Try to load lesson
- Expected: Error message shown, helpful text
```

### Invalid Input
```
Test Case 3: Invalid lesson ID
- URL: http://localhost:5176/#/lesson/evan?id=nonexistent
- Expected: Error shown, "Lesson not found"

Test Case 4: No lesson selected
- URL: http://localhost:5176/#/lesson/evan
- Expected: Message shown, "Select a lesson first"
```

### Edge Cases
```
Test Case 5: Empty curriculum
- Clear lessons-manifest.json
- Expected: "No lessons available" shown
- Expected: App doesn't crash

Test Case 6: Very long lesson title
- Check with long vocabulary words
- Expected: Text wraps properly

Test Case 7: Many lessons
- Test with 500+ lessons (after extraction)
- Expected: App stays responsive
- Expected: Scrolling smooth
```

---

## 📋 **DETAILED TEST MATRIX**

| Feature | Unit | Integration | Functional | Visual | Performance | Accessibility |
|---------|------|-------------|-----------|--------|-------------|---|
| Lesson Loading | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tab Switching | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Navigation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Curriculum Display | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Map Filtering | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Error Handling | ✓ | ✓ | ✓ | - | - | - |
| Responsive Design | - | - | - | ✓ | ✓ | ✓ |
| Performance | - | - | - | - | ✓ | - |

---

## 🎯 **PASS/FAIL CRITERIA**

### PASS ✅
- [ ] All static analysis checks pass
- [ ] No console errors on any page
- [ ] All routes load successfully
- [ ] All 7 sample lessons accessible
- [ ] Navigation works (Next/Previous/Back)
- [ ] Responsive design works (390px+)
- [ ] Accessibility: WCAG AA compliant
- [ ] Performance: Metrics within targets
- [ ] No critical bugs

### FAIL ❌
- [ ] Build fails
- [ ] Critical console errors
- [ ] Routes broken
- [ ] Lessons won't load
- [ ] Navigation broken
- [ ] Design completely broken
- [ ] Accessibility severely broken

---

## 📝 **TEST EXECUTION STEPS**

### 1. Setup
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app
npm install
npm run build
npm run dev
```

### 2. Static Analysis
```bash
npm run lint
npx tsc --noEmit
npm run build
```

### 3. Run Tests
```bash
npm run test              # if tests exist
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
```

### 4. Manual Testing
- Open browser to http://localhost:5176
- Follow test cases in sections above
- Document any issues

### 5. DevTools Testing
- F12 → Console (check for errors)
- DevTools → Network (check requests)
- DevTools → Performance (check metrics)
- DevTools → Accessibility (check violations)

### 6. Report Results
- List all issues found
- Mark pass/fail for each category
- Prioritize fixes needed

---

## 📊 **TEST REPORT TEMPLATE**

```
# Test Results - [Date]

## Summary
- Tests Run: X
- Passed: X
- Failed: X
- Pass Rate: XX%

## Static Analysis
- ✅/❌ Lint
- ✅/❌ Types
- ✅/❌ Build

## Functional Tests
- ✅/❌ Lesson Loading
- ✅/❌ Navigation
- ✅/❌ Curriculum Browse
- ✅/❌ Map Filtering

## Visual Tests
- ✅/❌ Desktop
- ✅/❌ Mobile
- ✅/❌ Tablet

## Performance
- Load Time: Xs
- Bundle Size: XXKb
- FPS: 60fps

## Accessibility
- WCAG AA: ✅/❌
- Keyboard Nav: ✅/❌
- Screen Reader: ✅/❌

## Issues Found
1. [Issue 1]
2. [Issue 2]
...

## Recommendations
1. [Fix 1]
2. [Fix 2]
...

## Status: PASS ✅ / FAIL ❌
```

---

## 🚀 **SUCCESS DEFINITION**

**App is production-ready when:**
1. ✅ All static checks pass
2. ✅ No console errors
3. ✅ All features functional
4. ✅ All 7 lessons accessible
5. ✅ Responsive design works
6. ✅ Accessibility compliant
7. ✅ Performance targets met
8. ✅ No critical bugs

---

**Ready to test! Follow this plan section by section.** 🧪

Report results as you go! 📊

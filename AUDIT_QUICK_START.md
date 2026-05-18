# 🚀 Audit Quick Start Guide

**Goal**: Verify all flows, features, and content work correctly  
**Time**: ~2-3 hours  
**Status**: Ready to begin

---

## 📌 What To Do

1. **Open this checklist**: COMPREHENSIVE_AUDIT.md
2. **Test each section** and mark as ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
3. **Log any issues** found
4. **Report results** back

---

## 🎯 Critical Flow (Test First)

These are the most important features - test these first:

### 1️⃣ **Onboarding Flow** (5 min)
```
/portal (new user)
  → [Start Learning] button
    → /select-language
      → Choose English/Vietnamese
        → /sorting
          → Choose house
            → Auto-redirect to /
              → HogwartsMap
```
**Check**: Each step loads, no errors, correct button actions

### 2️⃣ **Main Learning Hub** (10 min)
```
HogwartsMap (/)
  → Shows 5 locations:
    - Library
    - Potions Classroom
    - Arithmancy Classroom
    - Herbology Greenhouse
    - Great Hall
  → Click location → Shows lessons
  → Click lesson → /lesson/evan?id=X
```
**Check**: All locations load, lessons show, navigation works

### 3️⃣ **Lesson & Game** (15 min)
```
/lesson/evan?id=lesson123
  → Lesson content loads
  → Game/interactive element works
  → XP calculated
  → Completion tracked
```
**Check**: Game plays without errors, XP awarded

---

## ⚠️ Known Issues To Look For

### Mobile Issues:
- [ ] Content hidden behind bottom nav
- [ ] Buttons too small (should be 48px)
- [ ] Text cramped or unreadable
- [ ] Layout broken on 375px screen

### Navigation Issues:
- [ ] Buttons don't navigate
- [ ] Wrong page loads
- [ ] Back button doesn't work
- [ ] Redirects not working

### Content Issues:
- [ ] Text not translated (shows key like "app.title")
- [ ] Images not loading
- [ ] Data not showing
- [ ] Console errors in F12

### State Issues:
- [ ] Language not persisting
- [ ] House not persisting
- [ ] XP not tracking
- [ ] onboarding flag not working

---

## 🔴 Files With Duplicates (Clean Up!)

**These have multiple versions - decide which to use:**

1. **CurriculumCenter.tsx** vs **CurriculumCenter_Enhanced.tsx**
   - [ ] Keep CurriculumCenter.tsx (main)
   - [ ] Delete CurriculumCenter_Enhanced.tsx
   - **Action**: Remove unused version

2. **HogwartsMap.tsx** vs **HogwartsMap_Enhanced.tsx**
   - [ ] Keep HogwartsMap.tsx (main)
   - [ ] Delete HogwartsMap_Enhanced.tsx
   - **Action**: Remove unused version

3. **LessonEvan.tsx** vs **LessonEvan_Enhanced.tsx** vs **LessonEvan_Updated.tsx**
   - [ ] Keep LessonEvan.tsx (main - GameTab_Master imported)
   - [ ] Delete LessonEvan_Enhanced.tsx
   - [ ] Delete LessonEvan_Updated.tsx
   - **Action**: Remove unused versions

---

## 📊 Test Environments

### Mobile (375px)
- Open DevTools (F12)
- Click device toolbar icon
- Set to iPhone SE (375x667)
- **Pages to test**: All critical flows

### Tablet (768px)
- Same DevTools
- Set to iPad mini (768x1024)
- **Check**: Responsive grid working

### Desktop (1200px)
- Normal browser
- **Check**: Professional layout

---

## ✅ Checklist Template

After testing each section, mark:

```
Section 1.1 Login Page
Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
Issues: (if any)
  - Issue 1
  - Issue 2

Section 1.2 Portal (New User)
Status: ✅ PASS
Issues: None

Section 1.3 Portal (Returning User)
Status: ❌ FAIL
Issues:
  - Auto-redirect not working
  - Progress cards not showing
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot read property 'title' of undefined"
**Cause**: Curriculum data not loaded  
**Fix**: Check CurriculumContext is providing data

### Issue: Text shows "app.title" instead of translation
**Cause**: Translation key missing or i18n not initialized  
**Fix**: Check en.json/vi.json has key, check useLanguage() hook

### Issue: Button doesn't navigate
**Cause**: onClick handler missing or navigate() not working  
**Fix**: Check button has onClick, check useNavigate() imported

### Issue: Content hidden behind bottom nav
**Cause**: Missing pb-24 padding  
**Fix**: Add `pb-24` to main element

### Issue: Button too small to tap on mobile
**Cause**: Button not w-12 h-12 on mobile  
**Fix**: Change to `w-12 h-12 md:w-10 md:h-10`

---

## 📝 Reporting Issues

When you find an issue, note:

1. **Where**: Page URL or component name
2. **What**: What's not working
3. **Expected**: What should happen
4. **Actual**: What actually happens
5. **Environment**: Mobile/Tablet/Desktop
6. **Console**: Any errors in F12?

**Example**:
```
Page: /lesson/evan?id=lesson1
Issue: Game doesn't load
Expected: Game should show and be playable
Actual: Blank area, no game visible
Environment: Mobile (375px)
Console Error: "GameTab_Master is undefined"
Priority: CRITICAL
```

---

## 📋 Priority Order

**Test in this order** to catch critical issues first:

1. **CRITICAL** (stops users):
   - Onboarding flow
   - HogwartsMap loading
   - Lesson & game

2. **HIGH** (breaks features):
   - Navigation/routing
   - Language switching
   - House selection

3. **MEDIUM** (missing features):
   - Secondary pages
   - Quests/games
   - Inventory

4. **LOW** (polish):
   - Animations
   - Duplicate files
   - Edge cases

---

## 🎯 Success Criteria

### After Audit, You Should Have:
- ✅ Full checklist filled out
- ✅ All critical flows tested
- ✅ All issues documented
- ✅ Screenshots of any bugs
- ✅ Priority list of fixes needed

### Green Lights:
- ✅ No content hidden on mobile
- ✅ All buttons 48px+ on mobile
- ✅ All text translated properly
- ✅ All navigation working
- ✅ No console errors
- ✅ Lessons load and complete
- ✅ State persists (language, house, XP)

---

## 📞 Need Help?

If you get stuck on something:
1. Check the issue in COMPREHENSIVE_AUDIT.md section
2. Look for that issue in "Common Issues & Fixes" above
3. Check browser console (F12) for errors
4. Read the specific page file for the issue

---

## 🚀 Let's Start!

1. Open COMPREHENSIVE_AUDIT.md
2. Follow Section 1: Entry & Onboarding Flow
3. Mark each item as ✅/⚠️/❌
4. Move to Section 2 when done
5. Report back with results

**Time**: ~20 min for critical flows, 2+ hours for full audit

**Good luck!** 🎓✨

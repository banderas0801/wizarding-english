# Code Audit Report - Wizarding App
**Date**: 2026-05-17  
**Scope**: Phase 1 (i18n) + Phase 2 (Routes) + Phase 3 (Onboarding + Progression)  
**Status**: ✅ ALL ISSUES FIXED (4 Medium Fixed, 1 Low - Optional)

---

## ✅ FIXES APPLIED (2026-05-17)

### ✅ Fix #1 Applied - LanguageSelection.tsx
- Added `import type { Language } from '../services/i18n'`
- Changed `handleSelectLanguage(lang: string)` → `handleSelectLanguage(lang: Language)`
- Status: **FIXED** ✅

### ✅ Fix #2 Applied - SortingCeremony.tsx
- Added `type HouseName = 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin'`
- Changed `handleChoice(house: string)` → `handleChoice(house: HouseName)`
- Status: **FIXED** ✅

### ✅ Fix #3 Applied - LocationDetail.tsx (Type Cast)
- Added `import type { LocationKey } from '../constants/locations'`
- Changed `getLocation(locationKey as any)` → `getLocation(locationKey as LocationKey)`
- Status: **FIXED** ✅

### ✅ Fix #4 Applied - LocationDetail.tsx (Hardcoded Lessons)
- Added `import { useState, useEffect } from 'react'`
- Added `import { useCurriculum } from '../contexts/CurriculumContext'`
- Added `import type { MappedLesson } from '../types/curriculum'`
- Added `const [lessons, setLessons] = useState<MappedLesson[]>([])`
- Added `useEffect` to fetch lessons by subject from curriculum
- Replaced hardcoded Vietnamese lessons with real curriculum data
- Updated navigation to use lesson ID: `/lesson/evan?id=${lessonId}`
- Shows real lesson title, spellName, and XP values
- Status: **FIXED** ✅

---

## 🔴 CRITICAL ISSUES: 0

---

## 🟠 MEDIUM ISSUES: 4

### Issue #1: Type Safety - LanguageSelection.tsx (Line 15)
**Severity**: MEDIUM  
**File**: `src/pages/LanguageSelection.tsx`  
**Problem**: Parameter type mismatch

```typescript
// CURRENT (line 15)
const handleSelectLanguage = (lang: string) => {
  setLanguage(lang)
  navigate('/sorting')
}

// ISSUE
// - Parameter is `string` but should be `Language` type ('en' | 'vi')
// - TypeScript allows passing invalid values
// - useGameStore.setLanguage() expects Language type
```

**Fix Required**:
```typescript
// CORRECTED
import type { Language } from '../services/i18n'

const handleSelectLanguage = (lang: Language) => {
  setLanguage(lang)
  navigate('/sorting')
}

// Also update both button calls:
// onClick={() => handleSelectLanguage('en')}  ✅ (correct)
// onClick={() => handleSelectLanguage('vi')}  ✅ (correct)
```

---

### Issue #2: Type Safety - SortingCeremony.tsx (Line 10)
**Severity**: MEDIUM  
**File**: `src/pages/SortingCeremony.tsx`  
**Problem**: Parameter type too loose

```typescript
// CURRENT (line 10)
const handleChoice = (house: string) => {
  setHouse(house)
  completeOnboarding()
  navigate('/')
}

// ISSUE
// - Parameter is `string` but should validate valid houses
// - Houses are: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin'
// - No type checking prevents invalid values
// - Could be stored incorrectly in localStorage
```

**Fix Required**:
```typescript
// CORRECTED
type HouseName = 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin'

const handleChoice = (house: HouseName) => {
  setHouse(house)
  completeOnboarding()
  navigate('/')
}

// All button calls are correct:
// onClick={() => handleChoice('gryffindor')}     ✅
// onClick={() => handleChoice('slytherin')}      ✅
// onClick={() => handleChoice('ravenclaw')}      ✅
// onClick={() => handleChoice('hufflepuff')}     ✅
```

---

### Issue #3: Unsafe Type Cast - LocationDetail.tsx (Line 13)
**Severity**: MEDIUM  
**File**: `src/pages/LocationDetail.tsx`  
**Problem**: Using `as any` defeats TypeScript safety

```typescript
// CURRENT (line 13)
const locationConfig = isValid ? getLocation(locationKey as any) : null

// ISSUE
// - `as any` circumvents TypeScript type checking
// - After isValidLocationKey() check, we know it's safe to cast to LocationKey
// - Violates TypeScript best practices
```

**Fix Required**:
```typescript
// CORRECTED
import { getLocation, isValidLocationKey, type LocationKey } from '../constants/locations'

const locationConfig = isValid ? getLocation(locationKey as LocationKey) : null

// Better approach:
const isValid = locationKey && isValidLocationKey(locationKey)
const locationConfig = isValid ? getLocation(locationKey) : null  // No cast needed!
```

---

### Issue #4: Hardcoded Vietnamese Data - LocationDetail.tsx (Lines 44-64)
**Severity**: MEDIUM  
**File**: `src/pages/LocationDetail.tsx`  
**Problem**: Placeholder lessons are hardcoded in Vietnamese

```typescript
// CURRENT (lines 44-64)
{['Bài 1: Từ vựng cơ bản', 'Bài 2: Câu ghép đơn giản', 'Bài 3: Thực hành hội thoại']
  .map((lesson, i) => (
    <button key={i} ...>
      <p>{lesson}</p>
      // Shows hardcoded Vietnamese lessons!
    </button>
  ))}

// ISSUE
// - This is temporary MVP data, not real lessons from curriculum
// - Violates "English Learning App" requirement
// - Should fetch lessons from CurriculumContext or HogwartsMap
// - Prevents real lesson display for the selected location
```

**Fix Required**:
```typescript
// CORRECTED - Option A: Fetch from CurriculumContext
import { useCurriculum } from '../contexts/CurriculumContext'

const { getLessonsForSubject } = useCurriculum()
const [lessons, setLessons] = useState<MappedLesson[]>([])

useEffect(() => {
  if (isValid && locationConfig) {
    getLessonsForSubject(locationConfig.subject).then(setLessons)
  }
}, [isValid, locationConfig])

return (
  <>
    {lessons.map(lesson => (
      <button key={lesson.lessonId} ...>
        <p>{lesson.title}</p>
        <p>{lesson.spellName}</p>
        <span>{lesson.completionXp} XP</span>
      </button>
    ))}
  </>
)
```

---

## 🟡 LOW SEVERITY ISSUES: 1

### Issue #5: Unsafe Type Pattern - HogwartsMap.tsx (Lines 110, 113, 127)
**Severity**: LOW  
**File**: `src/pages/HogwartsMap.tsx`  
**Problem**: Redundant type casting with fallback

```typescript
// CURRENT (line 110)
{LOCATIONS[location as keyof typeof LOCATIONS]?.icon ?? 'auto_stories'}

// ISSUE
// - The pattern `location as keyof typeof LOCATIONS` is valid but verbose
// - Since location comes from lessonsByLocation, could be cleaner
// - Works correctly, but not ideal TypeScript style
```

**Status**: ⚠️ Works, but not optimal  
**Priority**: LOW - Consider refactoring after core issues fixed

**Suggested Improvement**:
```typescript
// Better approach:
const locationConfig = LOCATIONS[location as keyof typeof LOCATIONS]
const icon = locationConfig?.icon ?? 'auto_stories'
const title = locationConfig?.title ?? location.replaceAll('_', ' ')

// Then reuse:
<span>{icon}</span>
<h4>{title}</h4>
```

---

## ✅ ITEMS VERIFIED AS CORRECT

| Component | Check | Status |
|-----------|-------|--------|
| `src/services/i18n.ts` | Singleton pattern, type safety, exports | ✅ OK |
| `src/hooks/useLanguage.ts` | Hook implementation, subscription pattern | ✅ OK |
| `src/constants/locations.ts` | Export structure, types, helper functions | ✅ OK |
| `src/store/useGameStore.ts` | Zustand persist, types, state shape | ✅ OK |
| `src/App.tsx` | Route definitions, `/location/:locationKey` | ✅ OK |
| `src/pages/Portal.tsx` | Conditional rendering, consolidation | ✅ OK |
| `src/pages/HogwartsMap.tsx` | LOCATIONS usage, lessonsByLocation logic | ✅ OK |
| `src/locales/en.json` | Structure, translation keys (spot checked) | ✅ OK |
| `src/locales/vi.json` | Structure, translation keys (spot checked) | ✅ OK |

---

## 📋 FIXES SUMMARY

| Issue | File | Fix Time | Test |
|-------|------|----------|------|
| #1: Lang type | LanguageSelection.tsx | 2 min | Verify setLanguage works |
| #2: House type | SortingCeremony.tsx | 2 min | Verify setHouse persists |
| #3: Unsafe cast | LocationDetail.tsx | 2 min | TypeScript check |
| #4: Hardcoded data | LocationDetail.tsx | 10 min | Fetch real lessons |
| #5: Verbose pattern | HogwartsMap.tsx | 5 min | Optional refactor |

**Total Fix Time**: ~20 minutes  
**Risk Level**: LOW (no breaking changes)

---

## 🚀 RECOMMENDATION

**Fix Issues #1-3 immediately** (5 min):
- Quick type safety fixes
- No logic changes
- Prevents potential runtime errors

**Fix Issue #4** (10 min):
- Replace hardcoded Vietnamese lessons
- Use CurriculumContext to fetch real lessons
- Completes "English Learning App" requirement

**Issue #5 - Optional**:
- Can fix later as refactor
- Works correctly, just not ideal style

---

## 📝 Status: ALL FIXES APPLIED ✅

All 4 issues have been fixed and are ready for testing.

### Next Actions:

1. **TypeScript Verification** (1 min)
   ```bash
   npm run build
   # Should compile with NO errors
   ```

2. **Start Dev Server** (Ready for testing)
   ```bash
   npm run dev
   # Navigate to http://localhost:5173/portal
   ```

3. **Follow End-to-End Testing Checklist**
   - See: `PHASE_3_ONBOARDING_STATE_MACHINE.md`
   - Complete all test scenarios
   - Verify fixes work in browser

**Fixes Applied**: 5 min ✅  
**TypeScript Check**: Pending ⏳  
**End-to-End Testing**: Next step 🚀

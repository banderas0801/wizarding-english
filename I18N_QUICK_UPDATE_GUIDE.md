# i18n Quick Update Guide - Apply to Remaining Screens

**Time per Screen**: ~10-15 minutes  
**Pattern**: Same for all screens

---

## Template Pattern (Copy & Paste)

### Step 1: Add Import
```typescript
import { useLanguage } from '../hooks/useLanguage'
```

### Step 2: Use Hook
```typescript
export default function MyComponent() {
  const { t } = useLanguage()
  // ... rest of code
}
```

### Step 3: Replace Hardcoded Strings
```typescript
// BEFORE (Vietnamese/hardcoded)
<h1>Từ Điển Huyền Bí</h1>
<p>Chọn ngôn ngữ để bắt đầu</p>
<button>Chọn Tiếng Việt</button>

// AFTER (using i18n)
<h1>{t('app.title')}</h1>
<p>{t('language.instruction')}</p>
<button onClick={() => setLanguage('vi')}>{t('language.vietnamese')}</button>
```

---

## Screens to Update

### 1. LanguageSelection.tsx
**Find & Replace These**:
```
"Chọn Ngôn Ngữ" → t('language.select')
"Tiếng Việt" → t('language.vietnamese')
"English" → t('language.english')
"Tôi muốn học..." → t('language.learning')
```

**Key Translations Used**:
- `language.select` - Main heading
- `language.english` - Button label
- `language.vietnamese` - Button label
- `language.instruction` - Description

---

### 2. SortingCeremony.tsx
**Find & Replace These**:
```
"Lễ Phân Công" → t('sorting.ceremony')
"Welcome to Hogwarts!" → t('sorting.welcome')
"Gryffindor" → t('sorting.gryffindor')
"Hufflepuff" → t('sorting.hufflepuff')
"Ravenclaw" → t('sorting.ravenclaw')
"Slytherin" → t('sorting.slytherin')
"You have been sorted..." → t('sorting.sorted', { house: house })
"Continue" → t('sorting.continueButton')
```

**Key Translations Used**:
- `sorting.ceremony` - Page title
- `sorting.welcome` - Header
- `sorting.instruction` - Description
- `sorting.gryffindor/hufflepuff/ravenclaw/slytherin` - House names
- `sorting.gryffindorDesc` etc - House descriptions
- `sorting.sorted` - Sorted message (uses {house} variable)

---

### 3. HogwartsMap.tsx
**Find & Replace These**:
```
"Hogwarts Map" → t('hogwartsMap.title')
"Lessons by magical location" → t('hogwartsMap.subtitle')
"Choose a Location" → t('hogwartsMap.chooseLocation')
"Library" → t('hogwartsMap.library')
"Potions Classroom" → t('hogwartsMap.potionsClassroom')
"Arithmancy Classroom" → t('hogwartsMap.arithmancyClassroom')
"Herbology Greenhouse" → t('hogwartsMap.herbologyGreenhouse')
"Great Hall" → t('hogwartsMap.greatHall')
"available lesson" → t('hogwartsMap.availableLessons')
"available lessons" → t('hogwartsMap.availableLessonsPlural')
```

---

### 4. LocationDetail.tsx
**Find & Replace These**:
```
"Location" → t('location.title')
"All Lessons in {location}" → t('location.allLessonsInLocation', { location: name })
"Start Lesson" → t('location.startLesson')
"Difficulty" → t('location.difficulty')
"Duration" → t('location.duration')
"minutes" → t('location.minutes')
```

---

### 5. LessonEvan.tsx  
**Find & Replace These**:
```
"Content" → t('lesson.content')
"Vocabulary" → t('lesson.vocabulary')
"Practice" → t('lesson.practice')
"🎮 Game" → t('lesson.game')
"Back" → t('lesson.back')
"Previous" → t('lesson.previous')
"Next" → t('lesson.next')
"Correct!" → t('lesson.correct')
"Incorrect" → t('lesson.incorrect')
"Try Again" → t('lesson.tryAgain')
"Check Answer" → t('lesson.checkAnswer')
```

---

### 6. CurriculumCenter.tsx
**Find & Replace These**:
```
"Curriculum Center" → t('curriculum.center')
"All Lessons" → t('curriculum.allLessons')
"By Level" → t('curriculum.byLevel')
"By Subject" → t('curriculum.bySubject')
"Reading" → t('curriculum.reading')
"Writing" → t('curriculum.writing')
"Mathematics" → t('curriculum.math')
"Science" → t('curriculum.science')
"Vocabulary" → t('curriculum.vocabulary')
"Grammar" → t('curriculum.grammar')
"Phonics" → t('curriculum.phonics')
"Critical Thinking" → t('curriculum.criticalThinking')
```

---

### 7. Victory.tsx
**Find & Replace These**:
```
"Congratulations!" → t('victory.title')
"You completed the lesson!" → t('victory.lessonComplete')
"XP Bonus" → t('victory.xpBonus')
"Gold Reward" → t('victory.goldReward')
"Next Lesson" → t('victory.nextLesson')
"Review Lesson" → t('victory.reviewLesson')
"Back to Map" → t('victory.backToMap')
```

---

## Common Translations (Use Everywhere)

```typescript
// General UI
t('common.loading')        // "Loading..."
t('common.error')          // "Error"
t('common.success')        // "Success"
t('common.cancel')         // "Cancel"
t('common.confirm')        // "Confirm"
t('common.close')          // "Close"
t('common.save')           // "Save"
t('common.retry')          // "Retry"

// Buttons
t('lesson.complete')       // "Complete Lesson"
t('games.startGame')       // "Start Game"
t('games.playAgain')       // "Play Again"
t('shop.buy')              // "Buy"
t('inventory.equip')       // "Equip"
```

---

## Multi-language Button Example

For screens with language switcher:

```typescript
import { useLanguage } from '../hooks/useLanguage'

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div>
      <h1>{t('app.title')}</h1>
      
      {/* Language switcher */}
      <div className="flex gap-2">
        <button 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'active' : ''}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('vi')}
          className={language === 'vi' ? 'active' : ''}
        >
          Tiếng Việt
        </button>
      </div>
    </div>
  )
}
```

---

## Variable Substitution Examples

```typescript
// Single variable
<p>{t('sorting.sorted', { house: 'Gryffindor' })}</p>
// Output: "You have been sorted into Gryffindor!"

// Multiple variables (if needed)
<p>{t('location.allLessonsInLocation', { location: 'Library' })}</p>
// Output: "All Lessons in Library"

// With user data
const userName = 'Alex'
<p>{t('auth.welcome')} {userName}</p>
// Output: "Welcome back, wizard Alex"
```

---

## Tips

1. **Lookup Keys in en.json** - All available keys are documented there
2. **Copy Exact Key Path** - `t('sorting.sorted')` not `t('sorting_sorted')`
3. **Test in Both Languages** - After updating, switch language to verify
4. **No Breaking Changes** - Old hardcoded text → new i18n calls, smooth transition
5. **Consistency** - Use same key everywhere (don't create duplicate keys)

---

## Checklist (Per Screen)

- [ ] Added `import { useLanguage }`
- [ ] Added `const { t } = useLanguage()` in component
- [ ] Replaced ALL hardcoded text with `t()` calls
- [ ] Verified all keys exist in en.json
- [ ] Tested in English (default)
- [ ] Tested language switch (if applicable)
- [ ] No console warnings about missing translations

---

## Quick Test Command

After updating each component:

```bash
npm run dev -- --host
# Then check:
# 1. Component displays in English
# 2. No console errors
# 3. Try language switch (if implemented)
# 4. Refresh page - text should remain in selected language
```

---

## If Translation Key Not Found

Error in console: `Translation key not found: some.key`

**Solution**:
1. Check key spelling in `t()` call
2. Verify key exists in `src/locales/en.json`
3. If missing, add to both en.json AND vi.json
4. Example format:
```json
"new": {
  "key": "English text here"
}
```
Then in vi.json:
```json
"new": {
  "key": "Văn bản tiếng Việt tại đây"
}
```

---

**Total Time Estimate**: 7 screens × 12 minutes = ~1.5 hours  
**Then**: Build + test = 30 minutes  
**Total Phase 1 Completion**: ~2 hours remaining

Ready to proceed? Start with LanguageSelection.tsx! 🚀

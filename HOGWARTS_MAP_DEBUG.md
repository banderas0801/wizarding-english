# HogwartsMap Debug Guide

## Issue
Clicking on the library location in HogwartsMap shows no response - no expansion, no lessons list.

## Root Cause Analysis

### What We Know
1. Lessons in `lessons-manifest.json` have subject: "general" (no location field)
2. CurriculumBuilder.mapLesson() assigns location based on subject mapping
3. "general" normalizes to "reading" which maps to location: "library"
4. HogwartsMap groups lessons by location field in a useMemo

### Possible Causes
1. ❓ Curriculum not loading (loading state stuck at true)
2. ❓ Curriculum loading with error (error state set)
3. ❓ Curriculum loaded but has no lessons (empty)
4. ❓ Lessons don't have location field populated correctly
5. ❓ Click handler not firing or state not updating

## Debug Solution Added

### Logging Added to HogwartsMap.tsx
1. **Render logging**: Shows curriculum state (loading, error, total lessons)
2. **Location grouping**: Shows all locations found and lesson counts
3. **Location click**: Shows which location was clicked and toggle action
4. **Selected lessons**: Shows selected location and available lessons

## How to Test

### Step 1: Run the App
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app
npm run dev -- --host
```

### Step 2: Open Browser Console
- Open browser DevTools (F12 or Ctrl+Shift+I)
- Go to Console tab
- Look for emoji-prefixed logs (🗺️ 📍 🔘 📚)

### Step 3: Navigate to HogwartsMap
- Open the app in browser (usually http://localhost:5173)
- Navigate to the Hogwarts Map page

### Step 4: Check Console Logs

**Look for this pattern:**
```
🗺️ HogwartsMap: Render {
  loading: false,
  error: null,
  totalLessons: 5307,
  hasLevels: true,
  levelCount: 7
}

📍 Locations found: [
  { location: "library", count: 1234 },
  { location: "potions_classroom", count: 800 },
  ...
]
```

If you see:
- ✅ `loading: false` + `totalLessons: 5307` = Curriculum loaded correctly
- ❌ `loading: true` = Curriculum still loading (wait or check network)
- ❌ `error: "..."` = Curriculum failed to load (see error message)
- ❌ `Locations found: []` = No locations found (lessons missing location field)

### Step 5: Click Library Button
Check console for:
```
🔘 Location clicked: {
  location: "library",
  isSelected: false,
  toggling: true
}

📚 Selected lessons: {
  location: "library",
  count: 1234,
  lessons: [
    { title: "Lesson 1", id: "..." },
    { title: "Lesson 2", id: "..." },
    ...
  ]
}
```

If clicking shows:
- ✅ `🔘` and `📚` logs = Everything working, state updating
- ❌ No `🔘` log = Click handler not firing
- ❌ `📚` shows `count: 0` = No lessons in location

## Expected Console Output

When app first loads:
```
✓ Loaded 5307 lessons from /lessons-manifest.json
CurriculumContext: Loading curriculum...
CurriculumContext: Curriculum loaded, enriching with game types...
CurriculumContext: Enrichment complete. Total lessons: 5307
🗺️ HogwartsMap: Render { loading: false, error: null, totalLessons: 5307, ... }
📍 Locations found: [
  { location: "arithmancy_classroom", count: 847 },
  { location: "great_hall", count: 1234 },
  { location: "herbology_greenhouse", count: 956 },
  { location: "library", count: 1099 },
  { location: "potions_classroom", count: 1171 }
]
```

When clicking library:
```
🔘 Location clicked: { location: "library", isSelected: false, toggling: true }
📚 Selected lessons: { location: "library", count: 1099, lessons: [...] }
```

## If Something is Wrong

### Scenario 1: `loading: true` (Curriculum stuck loading)
- Check Network tab - does `/lessons-manifest.json` load successfully?
- Check if file exists: `C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app\public\lessons-manifest.json`
- File size should be ~15MB with 5307 lessons

### Scenario 2: `error: "..."` message
- Read the error message carefully
- Likely: File not found, malformed JSON, or fetch failed
- Solution: Verify manifest file exists and is valid JSON

### Scenario 3: `Locations found: []` (No locations)
- Means lessonsByLocation Map is empty
- Possible cause: No lessons in curriculum despite loading: false
- Check if curriculum.levels is populated

### Scenario 4: Click shows `🔘` but no `📚`
- State is updating but selectedLessons is empty
- Means location name doesn't match any entry in lessonsByLocation
- Check location key naming consistency

### Scenario 5: No logs at all
- HogwartsMap might not be rendering
- Check router configuration
- Check if you're on the right page

## Next Steps (After Testing)

Once we see the console output, we can:
1. ✅ Confirm curriculum loads and has lessons
2. ✅ Verify location grouping works correctly
3. ✅ Fix any data issues identified
4. ✅ Verify click and state update work

---

**Remember**: The solution depends on what the console logs show. Share the console output and we'll know exactly what to fix.

# HogwartsMap Testing Checklist

## Pre-Test Verification

### Files Modified
- ✅ `src/pages/HogwartsMap.tsx` - Added debug logging
- ✅ `src/services/LessonLoader.ts` - Added curriculum load logging
- ✅ `public/lessons-manifest.json` - Should exist (verified)

### Expected State After Changes
- HogwartsMap logs curriculum loading to console
- Location grouping shows all locations and lesson counts
- Click handler logs show when button is clicked
- Selected lessons log shows which lessons are displayed

---

## Quick Test Procedure

### 1. Start the App (5 min)
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app
npm install  # if needed
npm run dev -- --host
```

**Expected output in terminal:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 2. Open Browser & DevTools (1 min)
- Open: http://localhost:5173/
- Press F12 or Ctrl+Shift+I to open DevTools
- Click Console tab
- Look for messages with emojis (🗺️ 📍 🔘 📚 📦)

### 3. Navigate to HogwartsMap (1 min)
- Click on "Hogwarts Map" in navigation
- OR navigate directly if you know the URL

### 4. Check Initial Load Logs (1 min)

**You should see in Console:**

#### Scenario A: ✅ HEALTHY (Curriculum Loaded)
```
📦 LessonLoader: Loading extracted lessons...
✓ Loaded 5307 lessons from /lessons-manifest.json
📦 LessonLoader: Got 5307 lessons, building curriculum...
🗺️ HogwartsMap: Render {
  loading: false,
  error: null,
  totalLessons: 5307,
  hasLevels: true,
  levelCount: 7
}
📍 Locations found: [
  { location: "arithmancy_classroom", count: 847 },
  { location: "great_hall", count: 1234 },
  { location: "herbology_greenhouse", count: 956 },
  { location: "library", count: 1099 },
  { location: "potions_classroom", count: 1171 }
]
```

#### Scenario B: ❌ STILL LOADING (Curriculum Not Ready)
```
🗺️ HogwartsMap: Render {
  loading: true,
  error: null,
  totalLessons: undefined,
  hasLevels: false,
  levelCount: undefined
}
```

**Action**: Wait 10-30 seconds for loading to complete. If it never completes, check Network tab for failed `/lessons-manifest.json` fetch.

#### Scenario C: ❌ ERROR (Curriculum Failed)
```
error: "Failed to load manifest: tried '/lessons-manifest.json' (404) and './lessons-manifest.json' (404)"
```

**Action**: Check if manifest file exists and is being served.

#### Scenario D: ❌ NO LOCATIONS (Empty Curriculum)
```
📍 Locations found: []
```

**Action**: Indicates lessons don't have location field. Likely an issue with mapLesson() function.

---

## Click Test

### 5. Click Library Button (30 sec)

**In Console, you should see:**
```
🔘 Location clicked: {
  location: "library",
  isSelected: false,
  toggling: true
}

📚 Selected lessons: {
  location: "library",
  count: 1099,
  lessons: [
    { title: "1-Daily-Warm-Ups-Reading-Grade 1 - Page 100", id: "1-daily-warm-ups-reading-grade-1-p100" },
    { title: "1-Daily-Warm-Ups-Reading-Grade 1 - Page 101", id: "..." },
    { title: "...", id: "..." }
  ]
}
```

**On Screen, you should see:**
- Library card expands/changes color (if styled correctly)
- Lessons list appears below showing available lessons
- Can click on individual lessons to open them

### 6. Click Again to Collapse (30 sec)

**In Console:**
```
🔘 Location clicked: {
  location: "library",
  isSelected: true,
  toggling: false
}
```

**On Screen:**
- Library card returns to normal state
- Lessons list disappears

---

## Interpretation Guide

### Console Shows All Healthy Logs ✅
If you see all the expected logs in Scenario A and click logging:
- **Diagnosis**: Everything is working correctly
- **Next Step**: Issue might be CSS styling - the lessons might be rendering but not visible
- **Action**: Check if lessons HTML is in DOM (DevTools Elements tab)

### Console Shows Loading Stuck ⏳
If `loading: true` persists:
- **Diagnosis**: Manifest file not loading
- **Check**: 
  - Network tab → XHR/Fetch → `/lessons-manifest.json`
  - Status should be 200, not 404 or error
  - File should be ~15MB
- **Fix**: Ensure `public/lessons-manifest.json` exists

### Console Shows Error Message ❌
If error message is shown:
- **Diagnosis**: Manifest fetch failed
- **Common Errors**:
  - `404` = File not found, check public folder
  - `CORS` = Cross-origin issue
  - `JSON` = File is malformed
- **Fix**: Verify manifest file is valid JSON

### Console Shows No Locations 📍
If `Locations found: []`:
- **Diagnosis**: Lessons have no location field
- **Root Cause**: mapLesson() function not assigning location
- **Fix**: Check CurriculumBuilder.ts - normalizeSubject should convert "general" to "reading"

### Console Shows Logs But No Click Response 🔘
If clicking library shows no console log:
- **Diagnosis**: Click handler not firing
- **Check**: Make sure you're clicking the location button, not somewhere else
- **Fix**: May need to debug React event binding

### Console Shows Click Log But No Selected Lessons 📚
If `📚` log shows `count: 0`:
- **Diagnosis**: Location name doesn't match
- **Example**: Button says "Library" but lessonsByLocation uses "library" (case-sensitive)
- **Fix**: Check location key names match exactly

---

## Advanced Debugging (If Needed)

### Check Browser Network Tab
1. Open DevTools → Network tab
2. Filter by "manifest"
3. Reload page
4. Look for `/lessons-manifest.json`
5. Check:
   - Status: 200 ✅ or error ❌
   - Size: ~15MB ✅ or small ❌
   - Response: Should be JSON array ✅

### Check DevTools Elements Tab
1. Open DevTools → Elements tab
2. Look for the location buttons
3. Check if they have click handlers
4. Inspect to see the button structure

### Check All Locations
Click each location button and verify:
- Arithmancy Classroom (should have math lessons)
- Great Hall (should have vocabulary/phonics lessons)
- Herbology Greenhouse (should have science lessons)
- Library (should have reading lessons)
- Potions Classroom (should have writing lessons)

---

## Console Log Dump

**Copy everything from console and paste here for analysis:**

```
[Paste all console logs here]
```

---

## Checklist

- [ ] Terminal shows Vite server running
- [ ] Browser loads http://localhost:5173
- [ ] DevTools Console is open and visible
- [ ] Navigation to HogwartsMap page succeeds
- [ ] Initial logs show curriculum loading
- [ ] See expected location list in logs
- [ ] Click library button
- [ ] See click handler log
- [ ] See selected lessons log
- [ ] Lessons appear on screen (or DOM)
- [ ] Can click on individual lesson to open it

---

## Expected Results

### Fully Working ✅
- All logs appear as expected
- Click logs show proper state updates
- Library button expands to show lessons
- Clicking lessons navigates to lesson page
- Can toggle between all locations

### Partially Working ⚠️
- Logs show data loading correctly
- But clicking doesn't show visual response
- Likely a CSS/styling issue
- DOM has lessons but they're hidden

### Not Working ❌
- Logs show curriculum stuck loading
- OR shows error loading manifest
- OR shows no locations found
- Fix: Troubleshoot based on specific log output

---

**Remember**: The console logs will tell us exactly what's happening. Once we see them, we can pinpoint the exact issue and fix it.

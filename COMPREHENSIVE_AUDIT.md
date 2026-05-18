# 🔍 Comprehensive Audit Checklist
**Date**: 2026-05-17  
**Status**: In Progress  
**Purpose**: Verify all flows, features, content, and synchronization

---

## 📋 SECTION 1: ENTRY & ONBOARDING FLOW

### 1.1 Login Page (`/login`)
**File**: Login.tsx  
**Purpose**: Initial authentication
- [ ] Page loads without errors
- [ ] Login form displays correctly
- [ ] Email input works
- [ ] Password input works
- [ ] Submit button functional
- [ ] Redirects to /portal after login
- [ ] Error messages display (if login fails)
- [ ] Layout responsive (mobile/tablet/desktop)

### 1.2 Portal - New User (`/portal` - hasCompletedOnboarding = false)
**File**: Portal.tsx  
**Purpose**: Entry point for new users
- [ ] Shows [Start Learning] button only
- [ ] No confusing options
- [ ] Button is clickable
- [ ] Button navigates to /select-language
- [ ] Layout centered and readable
- [ ] Mobile responsive (48px button touch target)
- [ ] Proper styling and colors

### 1.3 Portal - Returning User (`/portal` - hasCompletedOnboarding = true)
**File**: Portal.tsx  
**Purpose**: Hub for returning users
- [ ] Auto-redirects to / (HogwartsMap) via useEffect
- [ ] Progress dashboard shows:
  - [ ] Current level
  - [ ] Total lessons available
  - [ ] XP earned
- [ ] [Open Map] button visible
- [ ] Bottom nav accessible (Curriculum, Quests, Portal, Rewards)
- [ ] No onboarding buttons shown
- [ ] Responsive grid (1 col mobile, 3 cols tablet+)

### 1.4 Language Selection (`/select-language`)
**File**: LanguageSelection.tsx  
**Purpose**: Choose learning language
- [ ] Page loads without errors
- [ ] English option shows
- [ ] Vietnamese option shows
- [ ] Both options are clickable
- [ ] Selection saves to `useGameStore.language`
- [ ] After selection, navigates to /sorting
- [ ] Proper styling and layout
- [ ] Images load correctly
- [ ] Mobile responsive

### 1.5 Sorting Ceremony (`/sorting`)
**File**: SortingCeremony.tsx  
**Purpose**: Choose house
- [ ] Page loads without errors
- [ ] 4 house options display:
  - [ ] Gryffindor
  - [ ] Hufflepuff
  - [ ] Ravenclaw
  - [ ] Slytherin
- [ ] Each house has description
- [ ] Click selects house
- [ ] Selection saves to `useGameStore.house`
- [ ] Sets `hasCompletedOnboarding = true`
- [ ] After selection, redirects to /
- [ ] Sorting hat animation (if any) works
- [ ] Layout responsive

---

## 📚 SECTION 2: MAIN LEARNING HUB

### 2.1 HogwartsMap (`/`)
**File**: HogwartsMap.tsx  
**Purpose**: Main learning navigation hub
**Critical**: This is the core feature

#### Content Display:
- [ ] Page loads without errors
- [ ] "Choose a Location" title visible
- [ ] Location buttons display:
  - [ ] Library
  - [ ] Potions Classroom
  - [ ] Arithmancy Classroom
  - [ ] Herbology Greenhouse
  - [ ] Great Hall
- [ ] Each location shows:
  - [ ] Icon
  - [ ] Location name
  - [ ] Number of lessons available
- [ ] All locations clickable

#### Interaction:
- [ ] Click location → expands to show lessons
- [ ] Lessons display with:
  - [ ] Title
  - [ ] Spell name
  - [ ] XP reward
- [ ] Click lesson → navigates to /lesson/evan?id=<lessonId>
- [ ] Click location again → collapses lessons

#### Technical:
- [ ] Uses `isValidLocationKey()` for location validation
- [ ] Lesson location properly mapped from curriculum
- [ ] Console shows no errors for invalid locations
- [ ] Curriculum data loads correctly
- [ ] Loading state shows while fetching
- [ ] Error state shows if data fails to load

#### Responsive Design:
- [ ] Mobile (375px):
  - [ ] pb-24 padding prevents bottom nav overlap
  - [ ] px-4 padding (16px sides)
  - [ ] Buttons are w-12 h-12 (48px)
  - [ ] No content hidden behind bottom nav
  - [ ] All text readable
- [ ] Tablet (768px):
  - [ ] px-6 padding (24px sides)
  - [ ] Buttons are w-10 h-10 (40px)
  - [ ] Good spacing
- [ ] Desktop (1200px):
  - [ ] Professional layout
  - [ ] Proper spacing

#### Header:
- [ ] Profile button visible and clickable
- [ ] Profile button → /profile
- [ ] Menu button visible and clickable
- [ ] Title centered

#### Bottom Navigation:
- [ ] Curriculum button works → /curriculum
- [ ] Quests button works → /daily-quests
- [ ] Portal button works → /portal (shows progress if onboarded)
- [ ] Rewards button works → /victory
- [ ] No overlap with main content

### 2.2 Location Detail (`/location/:locationKey`)
**File**: LocationDetail.tsx  
**Purpose**: View all lessons in a location
- [ ] Page loads with location details
- [ ] Hero card displays:
  - [ ] Location icon
  - [ ] Location name
  - [ ] Location description
  - [ ] Correct background color
- [ ] Lessons list shows all lessons for that location
- [ ] Each lesson shows:
  - [ ] Lesson number (1, 2, 3...)
  - [ ] Lesson title
  - [ ] Spell name
  - [ ] Progress bar
  - [ ] XP reward
- [ ] Click lesson → /lesson/evan?id=<lessonId>
- [ ] Back button works → returns to previous page
- [ ] Responsive (16px padding mobile, 32px desktop)
- [ ] Curriculum data properly fetched
- [ ] Type safety: Uses LocationKey type (not "as any")

---

## 🎮 SECTION 3: LESSON & GAME SYSTEMS

### 3.1 Lesson Page (`/lesson/evan?id=<lessonId>`)
**File**: LessonEvan.tsx (Main version, not _Enhanced or _Updated)
**Purpose**: Main lesson content and games
**Critical**: Core learning experience

#### Content:
- [ ] Lesson title displays
- [ ] Lesson content loads from curriculum
- [ ] Spell name shown
- [ ] Difficulty level shown
- [ ] Progress indicator shows
- [ ] Lesson description displays

#### Game System:
- [ ] Game loads without errors
- [ ] Game type determines UI (RIDDLE, MATCH, STORY, VOCAB, etc.)
- [ ] Game instructions display
- [ ] Game is interactive and responsive
- [ ] Game completion tracked
- [ ] XP calculated and awarded
- [ ] Completion marked in curriculum

#### Navigation:
- [ ] Previous button works (if not first lesson)
- [ ] Next button works (if not last lesson)
- [ ] Back button returns to HogwartsMap
- [ ] Lesson ID correctly parsed from URL

#### Data Sync:
- [ ] Lesson data matches curriculum
- [ ] XP rewards correct
- [ ] Completion status persisted
- [ ] Progress saved to useGameStore

### 3.2 Game Types (RIDDLE, MATCH, STORY, VOCAB, etc.)
**Purpose**: Different interactive learning experiences

#### Riddle Game:
- [ ] Question displays
- [ ] Input field for answer
- [ ] Submit button works
- [ ] Feedback on correct/incorrect answer
- [ ] Next button available after completion

#### Match Game:
- [ ] Cards or items display
- [ ] Matching mechanism works
- [ ] Feedback on correct matches
- [ ] All pairs matchable

#### Story Game:
- [ ] Story content displays
- [ ] Questions about story shown
- [ ] Answer options work
- [ ] Story progresses correctly

#### Vocabulary Game:
- [ ] Words with definitions shown
- [ ] Translation/matching works
- [ ] Feedback provided
- [ ] All vocab covered

---

## 🏆 SECTION 4: SECONDARY FEATURES

### 4.1 Inventory (`/inventory`)
**File**: Inventory.tsx
- [ ] Page loads without errors
- [ ] Items display in grid/list
- [ ] Item count shows
- [ ] Item details viewable
- [ ] Equipped items marked
- [ ] Layout responsive

### 4.2 Profile (`/profile`)
**File**: Profile.tsx
- [ ] Player name displays
- [ ] Player house shows (from useGameStore)
- [ ] Player level shows (calculated from XP)
- [ ] Player stats display:
  - [ ] Total XP
  - [ ] Lessons completed
  - [ ] Gold earned
  - [ ] Day streak
- [ ] Edit profile works (if applicable)
- [ ] Logout button works (if applicable)

### 4.3 Shop (`/shop`)
**File**: Shop.tsx
- [ ] Shop items display
- [ ] Item prices shown
- [ ] Buy button works
- [ ] Gold deducted on purchase
- [ ] Inventory updates after purchase
- [ ] Item details show
- [ ] Responsive layout

### 4.4 Daily Quests (`/daily-quests`)
**File**: DailyQuests.tsx
- [ ] Daily quests list displays
- [ ] Each quest shows:
  - [ ] Quest name
  - [ ] Quest description
  - [ ] Reward (XP/gold)
  - [ ] Progress
  - [ ] Status (completed/in-progress/locked)
- [ ] Click quest → details view or starts quest
- [ ] Completion tracked
- [ ] Rewards granted

### 4.5 Curriculum Center (`/curriculum`)
**File**: CurriculumCenter.tsx (Main version, not _Enhanced)
- [ ] Page loads without errors
- [ ] All lessons/units display
- [ ] Lessons organized by:
  - [ ] Level (Y1-Y7)
  - [ ] Subject (if applicable)
- [ ] Each lesson shows:
  - [ ] Status (completed/locked/available)
  - [ ] Progress bar
  - [ ] XP reward
- [ ] Click lesson → /lesson/evan?id=<lessonId>
- [ ] Responsive layout
- [ ] Large number of lessons handled properly

### 4.6 Victory Page (`/victory`)
**File**: Victory.tsx
- [ ] Displays achievements
- [ ] Shows earned rewards
- [ ] Lists badges/titles
- [ ] Shows progress towards next milestone
- [ ] Layout celebratory and engaging

### 4.7 Titles (`/titles`)
**File**: Titles.tsx
- [ ] User titles/badges display
- [ ] Earned titles marked
- [ ] Locked titles show requirements
- [ ] Titles can be selected/previewed
- [ ] Layout clear and organized

### 4.8 Leaderboard (`/leaderboard`)
**File**: Leaderboard.tsx
- [ ] Player list displays sorted by ranking
- [ ] Top players highlighted
- [ ] User's position shown
- [ ] Score/XP shown for each player
- [ ] Responsive layout
- [ ] Pagination works (if many players)

### 4.9 Inbox (`/inbox`)
**File**: Inbox.tsx
- [ ] Messages display
- [ ] Read/unread status shown
- [ ] Message details viewable
- [ ] Delete/archive works (if applicable)
- [ ] Responsive layout

---

## ⚡ SECTION 5: QUEST/GAME PAGES

### 5.1 Individual Quest Pages
These should all load and function similarly:

#### PotionBrewing (`/quest/potion`)
- [ ] Quest loads
- [ ] Interactive potion mixing works
- [ ] Visual feedback on actions
- [ ] Completion tracked

#### SentenceStructureQuest (`/quest/y1-l1`)
- [ ] Sentences display
- [ ] Drag-and-drop/reordering works
- [ ] Feedback provided
- [ ] Completion tracked

#### MidnightDuelQuest (`/quest/y1-l2`)
- [ ] Duel interface loads
- [ ] Combat mechanics work
- [ ] Opponent responds
- [ ] Victory condition clear

#### DragonQuest (`/quest/y4-dragon`)
- [ ] Quest narrative displays
- [ ] Choices/options work
- [ ] Story progresses
- [ ] Ending varies by choices

#### SeekerChallenge (`/quest/seeker`)
- [ ] Challenge displays
- [ ] Interaction mechanism works
- [ ] Feedback provided

#### SphinxRiddle (`/quest/sphinx`)
- [ ] Riddle question displays
- [ ] Input/selection mechanism works
- [ ] Feedback on answer
- [ ] Correct answer accepted

#### DragonDuel (`/quest/dragon`)
- [ ] Duel setup displays
- [ ] Combat works
- [ ] Victory/defeat handled

#### PatronusCharm (`/quest/patronus`)
- [ ] Charm mechanics work
- [ ] Visual effects display
- [ ] Completion tracked

#### Transfiguration (`/quest/transfiguration`)
- [ ] Transformation mechanics work
- [ ] Visual changes occur
- [ ] Completion tracked

#### MazeRiddle (`/quest/maze`)
- [ ] Maze displays
- [ ] Navigation works
- [ ] Exit findable
- [ ] Completion tracked

#### QuidditchFinal (`/quest/quidditch-final`)
- [ ] Game displays
- [ ] Player controls work
- [ ] Win condition clear
- [ ] Score tracked

#### ChamberOfSecrets (`/quest/chamber`)
- [ ] Chamber exploration works
- [ ] Items/puzzles interact properly
- [ ] Story progresses
- [ ] Completion tracked

#### RoomOfRequirement (`/quest/room-of-requirement`)
- [ ] Room appears with needed items
- [ ] Interaction mechanisms work
- [ ] Solution logic sound
- [ ] Completion tracked

#### PensieveMemory (`/quest/pensieve`)
- [ ] Memory sequences display
- [ ] Interaction with memories works
- [ ] Story revealed
- [ ] Completion tracked

---

## 🌍 SECTION 6: CLASS/LESSON PAGES

These are specialized lesson pages for specific subjects:

### 6.1 Subject Classes
Each should:
- [ ] Load without errors
- [ ] Display subject-specific content
- [ ] Have interactive elements
- [ ] Track completion
- [ ] Award XP correctly

#### Classes:
- [ ] AstronomyClass (`/lesson/astronomy`)
- [ ] HerbologyClass (`/lesson/herbology`)
- [ ] BoggartClass (`/lesson/boggart`)
- [ ] ArithmancyClass (`/lesson/arithmancy`)
- [ ] FlyingClass (`/lesson/flying`)
- [ ] LevitationClass (`/lesson/levitation`)
- [ ] CareOfMagicalCreatures (`/lesson/creatures`)
- [ ] HistoryOfMagic (`/library`)

### 6.2 Special Events
- [ ] HalloweenFeast (`/event/halloween`)
  - [ ] Themed content displays
  - [ ] Interactions work
  - [ ] Completion tracked

### 6.3 Advanced Locations
- [ ] HospitalWing (`/location/hospital`)
  - [ ] Displays correctly
  - [ ] Lessons/content accessible
  - [ ] Navigation works

---

## 🎯 SECTION 7: SYSTEM FEATURES

### 7.1 State Management (useGameStore)
**File**: src/store/useGameStore.ts
- [ ] Language persists (en/vi)
- [ ] House persists (gryffindor/hufflepuff/ravenclaw/slytherin)
- [ ] hasCompletedOnboarding persists
- [ ] Level calculates correctly (XP / 1000 + 1)
- [ ] XP accumulates
- [ ] Gold accumulates
- [ ] All state persisted to localStorage
- [ ] State loads on page refresh

### 7.2 i18n System (useLanguage)
**File**: src/services/i18n.ts, src/hooks/useLanguage.ts
**Translations**: src/locales/en.json, src/locales/vi.json

#### Key Translation Checks:
- [ ] t('app.title') returns correct text
- [ ] t('language.select') works
- [ ] t('sorting.ceremony') works
- [ ] t('portal.title') works
- [ ] t('hogwartsMap.title') works
- [ ] t('hogwartsMap.chooseLocation') works
- [ ] t('curriculum.center') works
- [ ] t('lesson.*') keys work
- [ ] Vietnamese translations exist for all keys
- [ ] Language switching works (English ↔ Vietnamese)
- [ ] Language change reflected across all pages

#### Coverage Check:
- [ ] All UI text has translation keys
- [ ] No hardcoded English/Vietnamese text in JSX
- [ ] Fallback text sensible if key missing

### 7.3 Curriculum Context (CurriculumContext)
**File**: src/contexts/CurriculumContext.tsx
- [ ] Curriculum data loads
- [ ] Lessons properly structured
- [ ] getLessonsForSubject() works
- [ ] getTotalLessons() returns correct count
- [ ] Location lesson mapping correct
- [ ] Lesson IDs unique and valid
- [ ] Lesson data complete (title, spellName, xp, etc.)

### 7.4 Location Constants (locations.ts)
**File**: src/constants/locations.ts
- [ ] All 5 locations defined:
  - [ ] library
  - [ ] potions_classroom
  - [ ] arithmancy_classroom
  - [ ] herbology_greenhouse
  - [ ] great_hall
- [ ] Each has:
  - [ ] title (English)
  - [ ] icon (Material Symbols)
  - [ ] description
  - [ ] color
  - [ ] subject (for fetching lessons)
  - [ ] route (for navigation)
- [ ] getLocation() function works
- [ ] isValidLocationKey() validates keys
- [ ] LocationKey type comprehensive

---

## 🎨 SECTION 8: RESPONSIVE DESIGN & LAYOUT

### 8.1 Mobile (375px - iPhone SE)
**Critical for app usability**

#### All Pages Should Have:
- [ ] px-4 padding (not px-6)
- [ ] pb-24 on main content (prevents bottom nav overlap)
- [ ] w-12 h-12 buttons (48px touch targets)
- [ ] Text readable without horizontal scroll
- [ ] Images properly sized
- [ ] No layout shifts
- [ ] Bottom nav always accessible
- [ ] No content hidden behind nav

#### Specific Page Checks:
- [ ] HogwartsMap: pb-24, px-4, readable layout
- [ ] Portal: Centered button, proper spacing
- [ ] LanguageSelection: Cards responsive, readable
- [ ] SortingCeremony: All 4 options visible, tappable
- [ ] LocationDetail: Hero card responsive, pb-24
- [ ] LessonEvan: Content fits screen, game playable

### 8.2 Tablet (768px - iPad mini)
**Standard tablet experience**

#### All Pages Should Have:
- [ ] px-6 padding
- [ ] md:w-10 md:h-10 buttons (40px)
- [ ] grid-cols-1 sm:grid-cols-3 (3 column grids working)
- [ ] Good spacing
- [ ] Professional layout
- [ ] No issues from mobile constraints

### 8.3 Desktop (1200px+)
**Full desktop experience**

#### All Pages Should:
- [ ] Display cleanly
- [ ] Use full width effectively
- [ ] Have professional spacing
- [ ] Buttons at 40px (w-10 h-10)
- [ ] Text easily readable

---

## 🔴 SECTION 9: CRITICAL ISSUES TO FIND

### Common Issues to Check:
- [ ] TypeScript errors in console
- [ ] Missing translation keys (undefined text)
- [ ] Navigation routes not working
- [ ] Data not loading (API/context issues)
- [ ] State not persisting
- [ ] Layout broken on mobile
- [ ] Bottom nav overlapping content
- [ ] Images not loading
- [ ] Games not interactive
- [ ] XP/rewards not calculating
- [ ] Lessons not completing
- [ ] House/language not saving
- [ ] Duplicate page versions (use _Enhanced? or main?)

### Browser Console Checks:
- [ ] No red errors (F12 → Console)
- [ ] No undefined translation keys
- [ ] No network 404s
- [ ] No React warnings about missing keys
- [ ] No unhandled promise rejections

---

## 📝 SECTION 10: FILE STRUCTURE ISSUES

### Duplicate Files Found:
- [ ] CurriculumCenter.tsx vs CurriculumCenter_Enhanced.tsx → Decide which to use
- [ ] HogwartsMap.tsx vs HogwartsMap_Enhanced.tsx → Decide which to use
- [ ] LessonEvan.tsx vs LessonEvan_Enhanced.tsx vs LessonEvan_Updated.tsx → Decide which to use

**Action**: Remove unused versions to avoid confusion

### Missing Implementations:
- [ ] Check if all pages actually implement their features
- [ ] Check if all buttons have functional onClick handlers
- [ ] Check if all forms actually submit
- [ ] Check if all animations/transitions work

---

## ✅ AUDIT SIGN-OFF TEMPLATE

### After Testing Each Section, Mark:
```
✅ PASS - Feature fully working
⚠️ PARTIAL - Some features working, some broken
❌ FAIL - Feature broken
🚫 SKIP - Feature not implemented/not tested
```

### Example:
```
1.1 Login Page: ✅ PASS
1.2 Portal New User: ✅ PASS
1.3 Portal Returning: ✅ PASS
1.4 Language Selection: ✅ PASS
1.5 Sorting Ceremony: ✅ PASS
2.1 HogwartsMap: ⚠️ PARTIAL (lessons not loading)
2.2 Location Detail: ✅ PASS
3.1 Lesson Page: ❌ FAIL (game not loading)
...
```

---

## 🎯 PRIORITY FOR FIXING

**CRITICAL** (Block users):
1. HogwartsMap (main hub)
2. LessonEvan (learning)
3. Curriculum data loading

**HIGH** (Breaks flow):
1. Onboarding flow
2. Navigation/routing
3. Bottom nav

**MEDIUM** (Missing features):
1. Games/quests
2. Secondary pages
3. Translations

**LOW** (Polish):
1. Duplicate files
2. Animations
3. Edge cases

---

## 📊 TESTING SCHEDULE

**Time**: ~2-3 hours for full audit

1. **Entry & Onboarding** (20 min)
2. **Main Learning Hub** (30 min)
3. **Lesson & Games** (40 min)
4. **Secondary Features** (20 min)
5. **Quests/Classes** (15 min)
6. **System Features** (20 min)
7. **Responsive Design** (20 min)
8. **Issues & Fixes** (varies)

---

**Next Step**: Begin testing and fill in checklist
**Status**: Ready to audit

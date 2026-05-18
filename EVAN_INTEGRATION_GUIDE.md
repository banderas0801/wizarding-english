# Evan-Moor PDF Integration Guide for Wizarding App

**Date:** May 17, 2026  
**Objective:** Connect Evan-Moor PDFs to dynamic lesson system  
**Status:** Implementation Plan

---

## 🎯 Integration Overview

### Current State
```
❌ Hardcoded curriculum.ts with 3 placeholder lessons
❌ LessonEvan.tsx has fake content (Harry Potter spells)
❌ No connection to PDF extraction pipeline
```

### Target State
```
✅ Dynamic lessons loaded from extracted Evan-Moor content
✅ 100+ lessons from 37 Evan-Moor PDF books
✅ Real vocabulary, sentences, exercises from curriculum
✅ Full K-6 coverage (Grades 1-6)
```

---

## 📊 Data Flow Architecture

```
Evan-Moor PDFs (37 books)
    ↓
[PDF Extraction Pipeline]
    ↓
Extracted Lessons JSON (500+ files)
    ↓
[ContentMapper] - Map lessons to Hogwarts locations
    ↓
[LessonLoader] - Load into React Context
    ↓
[UI Components] - Render in HogwartsMap, LessonEvan, etc.
```

---

## Step 1: PDF Extraction Pipeline (Already Exists)

The extraction pipeline from English Kids App can be reused:

```python
# Files in /english_kids_app:
- extract_all.py          # Main extraction orchestrator
- pdf_extractor.py        # PDFs → text
- question_detector.py    # Extract exercises
- text_processor.py       # Clean content
- validator.py            # Validate quality
```

### Run Extraction

```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\english_kids_app

# Copy Evan PDFs to input folder (if not already there)
cp -r "C:\Users\Admin\Downloads\Evan\*.pdf" ./input/pdfs/

# Start extraction (runs 2-4 hours)
python3 extract_all.py

# Monitor progress
find ./output/lessons -name "*.json" | wc -l  # Should reach 500+
```

### Output Structure

```json
{
  "lessonId": "evan_grade2_unit3_lesson1",
  "title": "Daily Reading Comprehension Grade 2",
  "grade": 2,
  "unit": 3,
  "content": {
    "story": "Once upon a time...",
    "vocabulary": ["word1", "word2", ...],
    "grammar_point": "Past tense",
    "cultural_note": "American tradition..."
  },
  "exercises": [
    {
      "type": "multiple_choice",
      "question": "What did the character do?",
      "options": ["A", "B", "C", "D"],
      "answer": "B",
      "xpReward": 100
    },
    ...
  ],
  "xpTotal": 500,
  "difficulty": "A1"
}
```

---

## Step 2: Create Content Mapper

Map Evan lessons to Hogwarts locations/themes:

### File: `src/services/ContentMapper.ts`

```typescript
/**
 * Maps Evan-Moor lessons to Hogwarts locations
 * Creates thematic bridges between curriculum and game world
 */

interface EvanLesson {
  lessonId: string;
  title: string;
  grade: number;
  unit: number;
  content: {
    story: string;
    vocabulary: string[];
    grammar_point: string;
  };
  exercises: Exercise[];
  xpTotal: number;
  difficulty: string;
}

interface MappedLesson extends EvanLesson {
  spellName: string;           // "Incantation Charm"
  location: string;            // "dai-sanh-duong"
  house: string;               // "gryffindor"
  year: number;                // 1-7
  progressionLevel: number;    // 1-40 (K-6)
}

export const contentMapper = {
  // Map Evan grade levels to Hogwarts years
  gradeToYear: {
    'K': 1,
    '1': 2,
    '2': 3,
    '3': 4,
    '4': 5,
    '5': 6,
    '6': 7,
  } as const,

  // Map Evan subjects to Hogwarts classes
  subjectToLocation: {
    'reading_comprehension': 'library',
    'daily_warm_ups': 'great_hall',
    '6_trait_writing': 'potions_classroom',
    'geography': 'divination_tower',
    'math': 'arithmancy_classroom',
  } as const,

  // Generate spell name from lesson
  generateSpellName(lesson: EvanLesson): string {
    const spellMap: Record<string, string> = {
      'reading': 'Librarium Aperio',
      'writing': 'Scriptus Incantatus',
      'math': 'Numerus Maxima',
      'vocabulary': 'Verborum Multiplicatus',
    };
    
    const subject = lesson.title.toLowerCase();
    for (const [key, spell] of Object.entries(spellMap)) {
      if (subject.includes(key)) return spell;
    }
    return 'Studium Magicum';
  },

  // Map lesson to Hogwarts locations
  mapLesson(evanLesson: EvanLesson): MappedLesson {
    const year = this.gradeToYear[`${evanLesson.grade}` as keyof typeof this.gradeToYear] || 1;
    
    // Determine location from subject
    let location = 'great_hall';
    const title = evanLesson.title.toLowerCase();
    
    if (title.includes('reading')) location = 'library';
    if (title.includes('writing')) location = 'potions_classroom';
    if (title.includes('geography')) location = 'divination_tower';
    if (title.includes('math')) location = 'arithmancy_classroom';

    return {
      ...evanLesson,
      spellName: this.generateSpellName(evanLesson),
      location,
      house: ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'][
        evanLesson.grade % 4
      ],
      year,
      progressionLevel: evanLesson.grade * 10 + evanLesson.unit,
    };
  },

  // Batch map all lessons
  mapLessons(evanLessons: EvanLesson[]): MappedLesson[] {
    return evanLessons
      .map(lesson => this.mapLesson(lesson))
      .sort((a, b) => a.progressionLevel - b.progressionLevel);
  },
};
```

---

## Step 3: Create Lesson Loader Service

### File: `src/services/LessonLoader.ts`

```typescript
/**
 * Loads extracted Evan lessons and manages caching
 */

import { EvanLesson, MappedLesson } from '../types';
import { contentMapper } from './ContentMapper';

interface CacheState {
  lessons: MappedLesson[];
  loaded: boolean;
  error: string | null;
}

class LessonLoaderService {
  private cache: CacheState = {
    lessons: [],
    loaded: false,
    error: null,
  };

  // Load lessons from extracted JSON files
  async loadLessons(): Promise<MappedLesson[]> {
    if (this.cache.loaded) return this.cache.lessons;

    try {
      // In production: fetch from API
      // const response = await fetch('/api/lessons');
      // const evanLessons = await response.json();
      
      // For now: import from local build
      const evanLessons: EvanLesson[] = await this.loadFromPublic();
      
      // Map to game structure
      const mapped = contentMapper.mapLessons(evanLessons);
      
      // Cache & return
      this.cache = {
        lessons: mapped,
        loaded: true,
        error: null,
      };
      
      return mapped;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.cache.error = errorMsg;
      console.error('Failed to load lessons:', errorMsg);
      return [];
    }
  }

  // Load specific lesson by ID
  async getLessonById(id: string): Promise<MappedLesson | undefined> {
    const lessons = await this.loadLessons();
    return lessons.find(l => l.lessonId === id);
  }

  // Get all lessons for a location
  async getLessonsByLocation(location: string): Promise<MappedLesson[]> {
    const lessons = await this.loadLessons();
    return lessons.filter(l => l.location === location);
  }

  // Get all lessons for a year
  async getLessonsByYear(year: number): Promise<MappedLesson[]> {
    const lessons = await this.loadLessons();
    return lessons.filter(l => l.year === year);
  }

  // Get progression level (1-40)
  async getLessonsByLevel(level: number): Promise<MappedLesson[]> {
    const lessons = await this.loadLessons();
    return lessons.filter(l => l.progressionLevel === level);
  }

  private async loadFromPublic(): Promise<EvanLesson[]> {
    // Build a manifest of all extracted lessons
    // This would be generated during build time
    // For development: import from compiled output
    
    const manifest = await import('/public/lessons-manifest.json');
    return manifest.default;
  }

  // Get loading state
  getState() {
    return {
      isLoading: !this.cache.loaded,
      error: this.cache.error,
      lessonCount: this.cache.lessons.length,
    };
  }
}

export const lessonLoader = new LessonLoaderService();
```

---

## Step 4: Create React Context for Lessons

### File: `src/contexts/LessonContext.tsx`

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MappedLesson } from '../types';
import { lessonLoader } from '../services/LessonLoader';

interface LessonContextType {
  lessons: MappedLesson[];
  currentLesson: MappedLesson | null;
  loading: boolean;
  error: string | null;
  setCurrentLesson: (lesson: MappedLesson) => void;
  getLessonsByYear: (year: number) => MappedLesson[];
  getLessonsByLocation: (location: string) => MappedLesson[];
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lessons, setLessons] = useState<MappedLesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<MappedLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const loaded = await lessonLoader.loadLessons();
        setLessons(loaded);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons');
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  const value: LessonContextType = {
    lessons,
    currentLesson,
    loading,
    error,
    setCurrentLesson,
    getLessonsByYear: (year) => lessons.filter(l => l.year === year),
    getLessonsByLocation: (location) => lessons.filter(l => l.location === location),
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLessons = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessons must be used within LessonProvider');
  }
  return context;
};
```

---

## Step 5: Update App.tsx to Wrap with Provider

### File: `src/App.tsx` (Modified)

```typescript
import { Routes, Route } from 'react-router-dom'
import { LessonProvider } from './contexts/LessonContext'

// ... imports ...

export default function App() {
  return (
    <LessonProvider>
      <div className="...">
        <Routes>
          {/* All routes */}
        </Routes>
      </div>
    </LessonProvider>
  )
}
```

---

## Step 6: Update Curriculum.ts to Use Dynamic Data

### File: `src/data/curriculum.ts` (Modified)

```typescript
import { MappedLesson } from '../types';

/**
 * Dynamic curriculum that loads from Evan-Moor content
 * Replaces hardcoded curriculum.ts
 */

export interface DynamicCurriculum {
  years: Array<{
    year: number;
    title: string;
    lessons: MappedLesson[];
  }>;
}

// This gets populated by LessonContext
// Courses now come from Evan-Moor PDFs, not hardcoded data

export const buildCurriculumFromLessons = (lessons: MappedLesson[]): DynamicCurriculum => {
  const years = new Map<number, MappedLesson[]>();
  
  // Group lessons by year
  lessons.forEach(lesson => {
    if (!years.has(lesson.year)) {
      years.set(lesson.year, []);
    }
    years.get(lesson.year)!.push(lesson);
  });
  
  // Build curriculum structure
  const yearArray = Array.from(years.entries())
    .map(([yearNum, yearLessons]) => ({
      year: yearNum,
      title: `Year ${yearNum}: Hogwarts Academic Year`,
      lessons: yearLessons.sort((a, b) => a.progressionLevel - b.progressionLevel),
    }))
    .sort((a, b) => a.year - b.year);
  
  return { years: yearArray };
};
```

---

## Step 7: Update LessonEvan Component

### File: `src/pages/LessonEvan.tsx` (Modified)

```typescript
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLessons } from '../contexts/LessonContext';
import { MappedLesson } from '../types';

export default function LessonEvan() {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { lessons, loading, error } = useLessons();
  const [currentLesson, setCurrentLesson] = useState<MappedLesson | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'vocab' | 'practice'>('theory');

  useEffect(() => {
    if (lessonId && lessons.length > 0) {
      const lesson = lessons.find(l => l.lessonId === lessonId);
      setCurrentLesson(lesson || null);
    }
  }, [lessonId, lessons]);

  if (loading) {
    return <div className="...">Loading lesson...</div>;
  }

  if (error || !currentLesson) {
    return <div className="...">Error loading lesson: {error}</div>;
  }

  return (
    <div className="bg-surface text-on-background min-h-screen pb-32 max-w-[390px] mx-auto">
      {/* Header with real lesson title */}
      <header className="...">
        <h1 className="...">{currentLesson.title}</h1>
      </header>

      <main className="pt-24 px-5">
        {/* Theory Tab - Real content from PDF */}
        {activeTab === 'theory' && (
          <section className="...">
            <h3 className="...">{currentLesson.content.grammar_point}</h3>
            <p className="...">{currentLesson.content.story}</p>
          </section>
        )}

        {/* Vocabulary Tab - Real words from lesson */}
        {activeTab === 'vocab' && (
          <section className="...">
            <div className="grid grid-cols-2 gap-4">
              {currentLesson.content.vocabulary.map((word) => (
                <div key={word} className="...">
                  <p className="font-headline-sm text-lg font-bold">{word}</p>
                  <button className="text-primary">
                    <span className="material-symbols-outlined">volume_up</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice Tab - Real exercises from PDF */}
        {activeTab === 'practice' && (
          <section className="...">
            {currentLesson.exercises.map((exercise, idx) => (
              <div key={idx} className="...">
                <p className="font-headline-sm">{exercise.question}</p>
                {exercise.type === 'multiple_choice' && (
                  <div className="space-y-2">
                    {exercise.options?.map((option, i) => (
                      <button
                        key={i}
                        className="w-full p-3 border rounded text-left hover:bg-primary-container"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
```

---

## Step 8: Build Process Setup

### File: `build-lessons-manifest.js`

```javascript
/**
 * Build script to create lessons manifest
 * Run during build: npm run build:lessons
 */

const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, 'output', 'lessons');
const OUTPUT_FILE = path.join(__dirname, 'public', 'lessons-manifest.json');

function buildManifest() {
  console.log('Building lessons manifest...');
  
  const lessons = [];
  
  // Read all lesson JSON files
  const files = fs.readdirSync(LESSONS_DIR);
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(LESSONS_DIR, file);
      const lesson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      lessons.push(lesson);
    }
  });
  
  // Write manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(lessons, null, 2));
  
  console.log(`✅ Built manifest with ${lessons.length} lessons`);
  console.log(`📁 Written to: ${OUTPUT_FILE}`);
}

buildManifest();
```

### Update `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run build:lessons && tsc -b && vite build",
    "build:lessons": "node build-lessons-manifest.js",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

---

## Step 9: Full Integration Flow

### Before (Current - Hardcoded)
```
curriculum.ts (hardcoded)
  ↓
LessonEvan.tsx (shows placeholder Harry Potter content)
  ↓
User sees fake "Incantation Charm" lesson
```

### After (With Evan Integration)
```
Evan-Moor PDFs (37 books)
  ↓
[Extract: python extract_all.py]
  ↓
output/lessons/*.json (500+ real lessons)
  ↓
[Build: npm run build:lessons]
  ↓
public/lessons-manifest.json
  ↓
[App loads via LessonContext]
  ↓
LessonEvan.tsx (shows real Daily Reading Comprehension lesson)
  ↓
User sees "Unit 3 Story Reading" with real content, vocab, exercises
```

---

## Step 10: Implementation Checklist

### Phase 1: Setup (1 day)
- [ ] Copy Evan PDFs to english_kids_app/input/pdfs/
- [ ] Run extraction pipeline
- [ ] Verify 500+ lessons extracted to output/lessons/

### Phase 2: Integration (2 days)
- [ ] Create ContentMapper.ts
- [ ] Create LessonLoader.ts
- [ ] Create LessonContext.tsx
- [ ] Create build-lessons-manifest.js
- [ ] Update package.json with build:lessons script

### Phase 3: UI Updates (2 days)
- [ ] Wrap App with LessonProvider
- [ ] Update curriculum.ts to use dynamic data
- [ ] Rewrite LessonEvan.tsx to use real content
- [ ] Update other lesson pages (AstronomyClass, HerbologyClass, etc.)
- [ ] Update HogwartsMap to show real lessons

### Phase 4: Testing (1 day)
- [ ] Run integration tests
- [ ] Test all 20 lesson pages with real content
- [ ] Verify exercise scoring works
- [ ] Check performance with 500+ lessons

### Phase 5: Polish (1 day)
- [ ] Add loading skeletons
- [ ] Error handling
- [ ] Accessibility testing
- [ ] Mobile optimization

**Total: 7 days** (vs. 3-5 weeks if starting from scratch)

---

## Code Examples: Before vs. After

### Before (Hardcoded)
```typescript
// curriculum.ts
export const curriculum: Module[] = [
  {
    id: 'year-1',
    title: 'Năm Nhất: Nhập Môn Bùa Chú',
    lessons: [
      {
        id: 'y1-l1',
        title: 'Levitation Spells',
        description: 'Make feathers float...',
        exercises: [
          {
            question: 'What does "levitate" mean?',
            options: ['To fly', 'To rise', ...],
            answer: 'To rise',
          }
        ]
      }
    ]
  }
]
```

### After (Dynamic)
```typescript
// LessonEvan.tsx
const { lessons } = useLessons();
const lesson = lessons.find(l => l.lessonId === 'evan_grade2_unit3');

return (
  <div>
    <h1>{lesson.title}</h1> {/* "Daily Reading Comprehension Grade 2" */}
    <p>{lesson.content.story}</p> {/* Real story from PDF */}
    <ul>
      {lesson.content.vocabulary.map(word => (
        <li key={word}>{word}</li> {/* Real vocabulary from lesson */}
      ))}
    </ul>
    {lesson.exercises.map((ex, i) => (
      <Exercise key={i} exercise={ex} /> {/* Real exercises from PDF */}
    ))}
  </div>
)
```

---

## Deployment Workflow

```bash
# 1. Ensure Evan PDFs are in place
ls C:\Users\Admin\Downloads\Evan\*.pdf | wc -l  # Should be 37

# 2. Run extraction (in english_kids_app folder)
cd C:\Users\Admin\.gemini\antigravity\scratch\english_kids_app
python3 extract_all.py
# Wait 2-4 hours...

# 3. Verify extraction
find ./output/lessons -name "*.json" | wc -l  # Should be 500+

# 4. Build lessons manifest
cd C:\Users\Admin\.gemini\antigravity\scratch\wizarding-app
npm run build:lessons

# 5. Start development
npm run dev

# 6. Verify lessons load
# Go to http://localhost:5173
# Click a lesson and see real Evan-Moor content
```

---

## Summary

### What Changes
- ❌ Hardcoded curriculum.ts → ✅ Dynamic lesson loading
- ❌ Placeholder content → ✅ Real Evan-Moor lessons
- ❌ 3 lessons → ✅ 500+ lessons
- ❌ Harry Potter vocabulary → ✅ K-6 core vocabulary

### Time Investment
- Extraction: 2-4 hours (automated, one-time)
- Integration: 7 days of work
- **Total: 1-2 weeks to complete launch-ready app**

### Result
**Wizarding App becomes a fully functional, content-complete English learning app** using real Evan-Moor curriculum integrated into the Harry Potter theme.

---

**Ready to implement?** Let me know if you want me to start building these components!

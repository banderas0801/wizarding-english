/**
 * Evan Curriculum Data (JSON Schema - DOCUMENT_23)
 * Sourced from Stitch Technical Spec
 * 
 * Structure: Year → Module → Lesson → Exercise
 * Each Year = 1 Hogwarts learning path
 * Each Lesson = 1 Stitch screen (Quest)
 */

export interface Exercise {
  id: string
  type: 'multiple_choice' | 'fill_blank' | 'pronunciation' | 'listening'
  question: string
  options?: string[]
  answer: string
  xpReward: number
  goldReward: number
}

export interface Lesson {
  id: string
  title: string
  titleVi: string
  spellName: string        // e.g. "Wingardium Leviosa"
  location: string         // Hogwarts location
  description: string
  xpTotal: number
  exercises: Exercise[]
  isUnlocked: boolean
  progress: number         // 0–100
}

export interface Module {
  id: string
  title: string
  year: number             // Hogwarts year (1–7)
  icon: string             // Material Symbol
  lessons: Lesson[]
}

// ── Evan Curriculum Data ──────────────────────────────────────────────

export const curriculum: Module[] = [
  {
    id: 'year-1',
    title: 'Năm Nhất: Nhập Môn Bùa Chú',
    year: 1,
    icon: 'school',
    lessons: [
      {
        id: '1-daily-warm-ups-reading-grade-1-p100',
        title: 'Levitation Spells',
        titleVi: 'Học Bùa Bay Lơ Lửng',
        spellName: 'Wingardium Leviosa',
        location: 'dai-sanh-duong',
        description: 'Làm chủ cách phát âm và cú pháp của các câu thần chú trên không cơ bản.',
        xpTotal: 500,
        progress: 65,
        isUnlocked: true,
        exercises: [
          {
            id: 'y1-l1-e1',
            type: 'multiple_choice',
            question: 'What does "levitate" mean?',
            options: ['To fly', 'To rise in the air', 'To spin around', 'To disappear'],
            answer: 'To rise in the air',
            xpReward: 100,
            goldReward: 20,
          },
          {
            id: 'y1-l1-e2',
            type: 'pronunciation',
            question: 'Pronounce: Wing-GAR-dium Le-VI-o-sa',
            answer: 'wingardium leviosa',
            xpReward: 150,
            goldReward: 30,
          },
          {
            id: 'y1-l1-e3',
            type: 'fill_blank',
            question: 'The feather _____ into the air after Harry cast the spell.',
            answer: 'floated',
            xpReward: 100,
            goldReward: 20,
          },
        ],
      },
      {
        id: '1-daily-warm-ups-reading-grade-1-p101',
        title: 'Unlocking Spells',
        titleVi: 'Học Phép Mở Cửa',
        spellName: 'Alohomora',
        location: 'thu-vien',
        description: 'Học từ vựng về khóa, cửa và khám phá.',
        xpTotal: 400,
        progress: 0,
        isUnlocked: false,
        exercises: [],
      },
      {
        id: '1-daily-warm-ups-reading-grade-1-p102',
        title: 'Light Spells',
        titleVi: 'Học Phép Chiếu Sáng',
        spellName: 'Lumos',
        location: 'rung-cam',
        description: 'Từ vựng về ánh sáng, bóng tối và thiên nhiên.',
        xpTotal: 350,
        progress: 0,
        isUnlocked: false,
        exercises: [],
      },
    ],
  },
  {
    id: 'year-2',
    title: 'Năm Hai: Phép Biến Hình',
    year: 2,
    icon: 'auto_awesome',
    lessons: [],
  },
]

// ── Helper functions ──────────────────────────────────────────────────

export function getLessonById(id: string): Lesson | undefined {
  for (const mod of curriculum) {
    const lesson = mod.lessons.find(l => l.id === id)
    if (lesson) return lesson
  }
  return undefined
}

export function getLessonByLocation(location: string): Lesson[] {
  const result: Lesson[] = []
  for (const mod of curriculum) {
    result.push(...mod.lessons.filter(l => l.location === location))
  }
  return result
}

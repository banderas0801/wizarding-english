/**
 * Curriculum Type Definitions
 * Structures for organizing K-6 English curriculum by level and subject
 */

// Exercise types from Evan-Moor content
export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'true_false'
  | 'matching'
  | 'short_answer'
  | 'pronunciation'
  | 'listening'
  | 'writing';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string | string[];
  xpReward: number;
  goldReward?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hints?: string[];
}

// Raw lesson from Evan PDF extraction
export interface ExtractedLesson {
  lessonId: string;
  title: string;
  source: string; // "Daily Reading Comprehension Grade 2" etc
  grade: number; // K=0, 1=1, 2=2, ... 6=6
  subject: string; // "Reading", "Writing", "Math", "Science", "Grammar", "Vocabulary"
  unit: number;
  unitTitle?: string;
  content: {
    story?: string;
    passage?: string;
    instructions?: string;
    vocabulary: string[];
    grammarPoint?: string;
    culturalNote?: string;
    example?: string;
  };
  exercises: Exercise[];
  xpTotal: number;
  difficulty: 'A0' | 'A1' | 'A2' | 'B1' | 'B2';
}

// Mapped lesson with Hogwarts theming
export interface MappedLesson extends ExtractedLesson {
  spellName: string; // "Incantation Charm", "Levitation Charm"
  location: string; // "library", "potions_classroom"
  house: string; // "gryffindor", "hufflepuff", "ravenclaw", "slytherin"
  year: number; // Hogwarts year (1-7)
  progressionLevel: number; // 1-40 for overall progression
  completionXp: number;
  completionReward: {
    gold: number;
    xp: number;
  };
}

// Organized curriculum structure
export interface CurriculumLevel {
  level: number; // 0=K, 1=Grade1, 2=Grade2, etc.
  title: string; // "Kindergarten", "Grade 1", etc.
  description: string;
  year: number; // Hogwarts year
  subjects: CurriculumSubject[];
  totalLessons: number;
  totalXp: number;
}

export interface CurriculumSubject {
  id: string; // "reading", "writing", "math", etc.
  name: string; // "Reading Comprehension"
  description: string;
  icon: string; // Material Symbol icon
  units: CurriculumUnit[];
  totalLessons: number;
  totalXp: number;
}

export interface CurriculumUnit {
  id: string;
  title: string;
  description?: string;
  lessons: MappedLesson[];
  totalLessons: number;
  totalXp: number;
  progress: number; // 0-100
}

// Full curriculum structure
export interface CurriculumStructure {
  levels: CurriculumLevel[];
  totalLessons: number;
  totalXp: number;
  gradeRange: {
    min: string; // "K"
    max: string; // "6"
  };
}

// Subject to location mapping
export interface SubjectMapping {
  id: string;
  name: string;
  location: string;
  icon: string;
  color: string;
  description: string;
}

// Level metadata
export interface LevelMetadata {
  level: number;
  title: string;
  hogwartsYear: number;
  ageRange: string;
  cefLevel: string;
  description: string;
}

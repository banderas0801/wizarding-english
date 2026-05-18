/**
 * Curriculum Builder
 * Organizes extracted lessons into K-6 curriculum structure
 * Groups by level → subject → unit → lesson
 */

import type {
  ExtractedLesson,
  MappedLesson,
  CurriculumLevel,
  CurriculumStructure,
  CurriculumSubject,
  SubjectMapping,
  LevelMetadata,
} from '../types/curriculum';

// Subject configurations
const SUBJECT_MAPPINGS: Record<string, SubjectMapping> = {
  reading: {
    id: 'reading',
    name: 'Reading Comprehension',
    location: 'library',
    icon: 'menu_book',
    color: '#3b6848',
    description: 'Reading stories, passages, and comprehension exercises',
  },
  writing: {
    id: 'writing',
    name: 'Writing & Composition',
    location: 'potions_classroom',
    icon: 'edit',
    color: '#510003',
    description: 'Writing practice, sentence structure, and composition',
  },
  math: {
    id: 'math',
    name: 'Mathematics',
    location: 'arithmancy_classroom',
    icon: 'calculate',
    color: '#162147',
    description: 'Numbers, operations, and mathematical thinking',
  },
  science: {
    id: 'science',
    name: 'Science',
    location: 'herbology_greenhouse',
    icon: 'science',
    color: '#a83730',
    description: 'Nature, experiments, and scientific concepts',
  },
  vocabulary: {
    id: 'vocabulary',
    name: 'Vocabulary & Words',
    location: 'great_hall',
    icon: 'abc',
    color: '#741010',
    description: 'Word meanings, synonyms, and word families',
  },
  grammar: {
    id: 'grammar',
    name: 'Grammar & Syntax',
    location: 'library',
    icon: 'spellcheck',
    color: '#416e4d',
    description: 'Sentence structure, parts of speech, and grammar rules',
  },
  phonics: {
    id: 'phonics',
    name: 'Phonics & Sounds',
    location: 'great_hall',
    icon: 'hearing',
    color: '#2c375e',
    description: 'Letter sounds, blending, and phonetic awareness',
  },
};

// Level metadata
const LEVEL_METADATA: LevelMetadata[] = [
  {
    level: 0,
    title: 'Kindergarten',
    hogwartsYear: 1,
    ageRange: '5-6 years',
    cefLevel: 'A0',
    description: 'Foundation year - Letter recognition, basic sounds, color words',
  },
  {
    level: 1,
    title: 'Grade 1',
    hogwartsYear: 2,
    ageRange: '6-7 years',
    cefLevel: 'A1',
    description: 'Early reading - CVC words, simple sentences, basic concepts',
  },
  {
    level: 2,
    title: 'Grade 2',
    hogwartsYear: 3,
    ageRange: '7-8 years',
    cefLevel: 'A1+',
    description: 'Fluent reading - More complex sentences, story comprehension',
  },
  {
    level: 3,
    title: 'Grade 3',
    hogwartsYear: 4,
    ageRange: '8-9 years',
    cefLevel: 'A2',
    description: 'Independent reading - Multiple paragraphs, varied vocabulary',
  },
  {
    level: 4,
    title: 'Grade 4',
    hogwartsYear: 5,
    ageRange: '9-10 years',
    cefLevel: 'A2+',
    description: 'Critical thinking - Complex texts, inference, analysis',
  },
  {
    level: 5,
    title: 'Grade 5',
    hogwartsYear: 6,
    ageRange: '10-11 years',
    cefLevel: 'B1',
    description: 'Advanced skills - Research, writing, literary analysis',
  },
  {
    level: 6,
    title: 'Grade 6',
    hogwartsYear: 7,
    ageRange: '11-12 years',
    cefLevel: 'B1+',
    description: 'Mastery level - Complex texts, diverse genres, critical analysis',
  },
];

export class CurriculumBuilder {
  /**
   * Build complete curriculum structure from extracted lessons
   */
  static buildCurriculum(lessons: ExtractedLesson[]): CurriculumStructure {
    // Map lessons to Hogwarts theme
    const mappedLessons = lessons.map(lesson => this.mapLesson(lesson));

    // Organize by level
    const levelMap = new Map<number, ExtractedLesson[]>();
    mappedLessons.forEach(lesson => {
      if (!levelMap.has(lesson.grade)) {
        levelMap.set(lesson.grade, []);
      }
      levelMap.get(lesson.grade)!.push(lesson);
    });

    // Build level structures
    const levels: CurriculumLevel[] = LEVEL_METADATA.map(metadata => {
      const levelLessons = levelMap.get(metadata.level) || [];
      return this.buildLevel(metadata, levelLessons);
    });

    // Calculate totals
    const totalLessons = mappedLessons.length;
    const totalXp = mappedLessons.reduce((sum, lesson) => sum + lesson.xpTotal, 0);

    return {
      levels,
      totalLessons,
      totalXp,
      gradeRange: {
        min: 'K',
        max: '6',
      },
    };
  }

  /**
   * Build a single level with subjects and units
   */
  private static buildLevel(
    metadata: LevelMetadata,
    lessons: ExtractedLesson[]
  ): CurriculumLevel {
    // Group by subject
    const subjectMap = new Map<string, ExtractedLesson[]>();
    lessons.forEach(lesson => {
      const subject = this.normalizeSubject(lesson.subject);
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, []);
      }
      subjectMap.get(subject)!.push(lesson);
    });

    // Build subjects
    const subjects = Array.from(subjectMap.entries())
      .map(([subjectId, subjectLessons]) => {
        const mapping = SUBJECT_MAPPINGS[subjectId];
        if (!mapping) return null;

        return this.buildSubject(mapping, subjectLessons);
      })
      .filter((subject): subject is CurriculumSubject => subject !== null);

    // Calculate totals
    const totalLessons = lessons.length;
    const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xpTotal, 0);

    return {
      level: metadata.level,
      title: metadata.title,
      description: metadata.description,
      year: metadata.hogwartsYear,
      subjects,
      totalLessons,
      totalXp,
    };
  }

  /**
   * Build a subject with units
   */
  private static buildSubject(
    mapping: SubjectMapping,
    lessons: ExtractedLesson[]
  ): CurriculumSubject {
    // Group by unit
    const unitMap = new Map<number, ExtractedLesson[]>();
    lessons.forEach(lesson => {
      if (!unitMap.has(lesson.unit)) {
        unitMap.set(lesson.unit, []);
      }
      unitMap.get(lesson.unit)!.push(lesson);
    });

    // Build units
    const units = Array.from(unitMap.entries())
      .map(([unitNum, unitLessons]) => ({
        id: `${mapping.id}_unit_${unitNum}`,
        title: unitLessons[0]?.unitTitle || `Unit ${unitNum}`,
        description: `${mapping.name} - Unit ${unitNum}`,
        lessons: unitLessons as MappedLesson[],
        totalLessons: unitLessons.length,
        totalXp: unitLessons.reduce((sum, l) => sum + l.xpTotal, 0),
        progress: 0,
      }))
      .sort((a, b) => parseInt(a.id.split('_').pop() || '0') - parseInt(b.id.split('_').pop() || '0'));

    return {
      id: mapping.id,
      name: mapping.name,
      description: mapping.description,
      icon: mapping.icon,
      units,
      totalLessons: lessons.length,
      totalXp: lessons.reduce((sum, l) => sum + l.xpTotal, 0),
    };
  }

  /**
   * Map extracted lesson to Hogwarts themed lesson
   * Uses existing data from lessons-manifest.json when available
   */
  static mapLesson(lesson: ExtractedLesson): MappedLesson {
    const subject = this.normalizeSubject(lesson.subject);
    const mapping = SUBJECT_MAPPINGS[subject] || SUBJECT_MAPPINGS.reading;
    const metadata = LEVEL_METADATA[lesson.grade];

    const existingLesson = lesson as Partial<MappedLesson>;
    const spellName = existingLesson.spellName || this.generateSpellName(lesson.subject, lesson.unit);
    const location = existingLesson.location || mapping.location;
    const house = existingLesson.house || ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'][
      lesson.grade % 4
    ];
    const year = existingLesson.year || metadata.hogwartsYear;
    const progressionLevel = existingLesson.progressionLevel ?? (lesson.grade * 6 + lesson.unit);
    const completionXp = existingLesson.completionXp || lesson.xpTotal;
    const completionReward = existingLesson.completionReward || {
      gold: Math.round(lesson.exercises.length * 10),
      xp: completionXp,
    };

    return {
      ...lesson,
      spellName,
      location,
      house,
      year,
      progressionLevel,
      completionXp,
      completionReward,
    } as MappedLesson;
  }

  /**
   * Normalize subject names
   */
  private static normalizeSubject(subject: string): string {
    const normalized = subject.toLowerCase().trim();

    // Map various names to standard subjects
    const mappings: Record<string, string> = {
      'reading comprehension': 'reading',
      'daily reading': 'reading',
      'reading': 'reading',
      'writing': 'writing',
      '6-trait writing': 'writing',
      'writing practice': 'writing',
      'grammar': 'grammar',
      'sentence structure': 'grammar',
      'phonics': 'phonics',
      'letter recognition': 'phonics',
      'sounds': 'phonics',
      'vocabulary': 'vocabulary',
      'words': 'vocabulary',
      'math': 'math',
      'mathematics': 'math',
      'arithmetic': 'math',
      'science': 'science',
      'geography': 'science',
      'nature': 'science',
    };

    for (const [key, value] of Object.entries(mappings)) {
      if (normalized.includes(key)) {
        return value;
      }
    }

    return 'reading'; // Default to reading
  }

  /**
   * Generate spell name from subject and unit
   */
  private static generateSpellName(subject: string, unit: number): string {
    const subjNorm = this.normalizeSubject(subject);

    const spellTemplates: Record<string, string[]> = {
      reading: [
        'Storybook Revelus',
        'Tale Aperio',
        'Comprehensio Maxima',
        'Passage Illuminus',
        'Reading Charm',
        'Word Vision',
      ],
      writing: [
        'Scriptus Charmantis',
        'Quill Expertise',
        'Composition Charm',
        'Writing Mastery',
        'Sentence Perfectus',
        'Ink Flow',
      ],
      math: [
        'Numerus Maxima',
        'Calculation Charm',
        'Math Mastery',
        'Number Sense',
        'Arithmetic Perfectus',
        'Sum Charm',
      ],
      science: [
        'Nature Knowledge',
        'Science Insight',
        'Experiment Charm',
        'Discovery Spell',
        'Nature Understanding',
        'Scientific Maxima',
      ],
      vocabulary: [
        'Verborum Multiplicatus',
        'Word Power',
        'Vocabulary Expansion',
        'Synonym Charm',
        'Word Knowledge',
        'Lexicon Maxima',
      ],
      grammar: [
        'Grammar Perfectus',
        'Syntax Charm',
        'Sentence Structure',
        'Grammar Mastery',
        'Rule Knowledge',
        'Language Precision',
      ],
      phonics: [
        'Sound Recognition',
        'Phonetic Charm',
        'Letter Sound',
        'Blending Mastery',
        'Phonics Power',
        'Sound Awareness',
      ],
    };

    const spells = spellTemplates[subjNorm] || spellTemplates.reading;
    return spells[(unit - 1) % spells.length];
  }

  /**
   * Get curriculum statistics
   */
  static getStatistics(curriculum: CurriculumStructure) {
    return {
      totalLevels: curriculum.levels.length,
      totalSubjects: curriculum.levels.reduce(
        (sum, level) => sum + level.subjects.length,
        0
      ),
      totalUnits: curriculum.levels.reduce(
        (sum, level) =>
          sum +
          level.subjects.reduce((subSum, subject) => subSum + subject.units.length, 0),
        0
      ),
      totalLessons: curriculum.totalLessons,
      totalXp: curriculum.totalXp,
      averageXpPerLesson: Math.round(curriculum.totalXp / curriculum.totalLessons),
      levelsDistribution: curriculum.levels.map(level => ({
        level: level.title,
        lessons: level.totalLessons,
        xp: level.totalXp,
        subjects: level.subjects.length,
      })),
    };
  }

  /**
   * Find lessons by criteria
   */
  static findLessons(
    curriculum: CurriculumStructure,
    criteria: {
      level?: number;
      subject?: string;
      unit?: number;
      difficulty?: string;
    }
  ): MappedLesson[] {
    const results: MappedLesson[] = [];

    curriculum.levels.forEach(level => {
      if (criteria.level !== undefined && level.level !== criteria.level) {
        return;
      }

      level.subjects.forEach(subject => {
        if (criteria.subject && subject.id !== criteria.subject) {
          return;
        }

        subject.units.forEach(unit => {
          const lessonNum = parseInt(unit.id.split('_').pop() || '0');
          if (criteria.unit && lessonNum !== criteria.unit) {
            return;
          }

          unit.lessons.forEach(lesson => {
            if (criteria.difficulty && lesson.difficulty !== criteria.difficulty) {
              return;
            }

            results.push(lesson);
          });
        });
      });
    });

    return results;
  }

  /**
   * Return prerequisite unit id for progression gating.
   * Order:
   * 1) previous unit in same subject
   * 2) last unit in previous subject of same grade
   * 3) last unit in last subject of previous grade
   */
  static getPrerequisiteUnitId(
    curriculum: CurriculumStructure,
    targetUnitId: string
  ): string | null {
    for (let li = 0; li < curriculum.levels.length; li++) {
      const level = curriculum.levels[li];
      for (let si = 0; si < level.subjects.length; si++) {
        const subject = level.subjects[si];
        for (let ui = 0; ui < subject.units.length; ui++) {
          const unit = subject.units[ui];
          if (unit.id !== targetUnitId) continue;

          if (ui > 0) {
            return subject.units[ui - 1].id;
          }

          if (si > 0) {
            const prevSubject = level.subjects[si - 1];
            return prevSubject.units[prevSubject.units.length - 1]?.id ?? null;
          }

          if (li > 0) {
            const prevLevel = curriculum.levels[li - 1];
            const prevSubject = prevLevel.subjects[prevLevel.subjects.length - 1];
            return prevSubject?.units[prevSubject.units.length - 1]?.id ?? null;
          }

          return null;
        }
      }
    }

    return null;
  }

  static isFirstUnitOfGrade(
    curriculum: CurriculumStructure,
    targetUnitId: string
  ): boolean {
    for (const level of curriculum.levels) {
      const firstSubject = level.subjects[0];
      const firstUnit = firstSubject?.units[0];
      if (firstUnit?.id === targetUnitId) return true;
    }
    return false;
  }

  static getStarFromScore(score: number): 0 | 1 | 2 | 3 {
    if (score >= 90) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  }
}

export default CurriculumBuilder;

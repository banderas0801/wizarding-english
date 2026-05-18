/**
 * Lesson Loader Service
 * Loads and caches curriculum from extracted Evan-Moor lessons
 */

import type {
  ExtractedLesson,
  MappedLesson,
  CurriculumStructure,
} from '../types/curriculum';
import CurriculumBuilder from './CurriculumBuilder';

interface LoaderState {
  curriculum: CurriculumStructure | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

class LessonLoaderService {
  private state: LoaderState = {
    curriculum: null,
    loaded: false,
    loading: false,
    error: null,
    lastUpdated: null,
  };

  private listeners: Set<(state: LoaderState) => void> = new Set();

  /**
   * Load curriculum from extracted lessons
   */
  async loadCurriculum(force = false): Promise<CurriculumStructure | null> {
    if (this.state.loaded && !force) {
      return this.state.curriculum;
    }

    this.setState({ loading: true, error: null });

    try {
      // Load extracted lessons manifest
      const extractedLessons = await this.loadExtractedLessons();

      if (!extractedLessons || extractedLessons.length === 0) {
        throw new Error('No extracted lessons found');
      }

      // Build curriculum structure
      const curriculum = CurriculumBuilder.buildCurriculum(extractedLessons);

      // Update state
      this.setState({
        curriculum,
        loaded: true,
        loading: false,
        lastUpdated: new Date(),
      });

      return curriculum;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        error: errorMsg,
        loaded: false,
        loading: false,
      });
      console.error('Failed to load curriculum:', errorMsg);
      return null;
    }
  }

  /**
   * Get lesson by ID
   */
  async getLessonById(lessonId: string): Promise<MappedLesson | null> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return null;

    for (const level of curriculum.levels) {
      for (const subject of level.subjects) {
        for (const unit of subject.units) {
          const lesson = unit.lessons.find(l => l.lessonId === lessonId);
          if (lesson) return lesson;
        }
      }
    }

    return null;
  }

  /**
   * Get lessons by level
   */
  async getLessonsByLevel(level: number): Promise<MappedLesson[]> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return [];

    const levelData = curriculum.levels.find(l => l.level === level);
    if (!levelData) return [];

    const lessons: MappedLesson[] = [];
    levelData.subjects.forEach(subject => {
      subject.units.forEach(unit => {
        lessons.push(...unit.lessons);
      });
    });

    return lessons.sort((a, b) => a.progressionLevel - b.progressionLevel);
  }

  /**
   * Get lessons by subject
   */
  async getLessonsBySubject(subjectId: string): Promise<MappedLesson[]> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return [];

    const lessons: MappedLesson[] = [];

    curriculum.levels.forEach(level => {
      const subject = level.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.units.forEach(unit => {
          lessons.push(...unit.lessons);
        });
      }
    });

    return lessons.sort((a, b) => a.progressionLevel - b.progressionLevel);
  }

  /**
   * Get lessons by level and subject
   */
  async getLessonsByLevelAndSubject(
    level: number,
    subjectId: string
  ): Promise<MappedLesson[]> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return [];

    const levelData = curriculum.levels.find(l => l.level === level);
    if (!levelData) return [];

    const subject = levelData.subjects.find(s => s.id === subjectId);
    if (!subject) return [];

    const lessons: MappedLesson[] = [];
    subject.units.forEach(unit => {
      lessons.push(...unit.lessons);
    });

    return lessons.sort((a, b) => a.progressionLevel - b.progressionLevel);
  }

  /**
   * Get lessons by unit
   */
  async getLessonsByUnit(unitId: string): Promise<MappedLesson[]> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return [];

    for (const level of curriculum.levels) {
      for (const subject of level.subjects) {
        const unit = subject.units.find(u => u.id === unitId);
        if (unit) return unit.lessons;
      }
    }

    return [];
  }

  /**
   * Get all lessons in progression order
   */
  async getAllLessonsInOrder(): Promise<MappedLesson[]> {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return [];

    const lessons: MappedLesson[] = [];

    curriculum.levels.forEach(level => {
      level.subjects.forEach(subject => {
        subject.units.forEach(unit => {
          lessons.push(...unit.lessons);
        });
      });
    });

    return lessons.sort((a, b) => a.progressionLevel - b.progressionLevel);
  }

  /**
   * Get next lesson from current
   */
  async getNextLesson(currentLessonId: string): Promise<MappedLesson | null> {
    const allLessons = await this.getAllLessonsInOrder();
    const currentIndex = allLessons.findIndex(l => l.lessonId === currentLessonId);

    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }

    return null;
  }

  /**
   * Get previous lesson from current
   */
  async getPreviousLesson(currentLessonId: string): Promise<MappedLesson | null> {
    const allLessons = await this.getAllLessonsInOrder();
    const currentIndex = allLessons.findIndex(l => l.lessonId === currentLessonId);

    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }

    return null;
  }

  /**
   * Get curriculum structure
   */
  async getCurriculum(): Promise<CurriculumStructure | null> {
    return this.loadCurriculum();
  }

  /**
   * Get curriculum statistics
   */
  async getStatistics() {
    const curriculum = await this.loadCurriculum();
    if (!curriculum) return null;

    return CurriculumBuilder.getStatistics(curriculum);
  }

  /**
   * Search lessons
   */
  async searchLessons(query: string): Promise<MappedLesson[]> {
    const allLessons = await this.getAllLessonsInOrder();
    const lowerQuery = query.toLowerCase();

    return allLessons.filter(
      lesson =>
        lesson.title.toLowerCase().includes(lowerQuery) ||
        lesson.spellName.toLowerCase().includes(lowerQuery) ||
        lesson.content.vocabulary.some(word =>
          word.toLowerCase().includes(lowerQuery)
        )
    );
  }

  /**
   * Get state
   */
  getState(): LoaderState {
    return { ...this.state };
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: LoaderState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Private: Update state and notify listeners
   */
  private setState(partial: Partial<LoaderState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Private: Load extracted lessons from manifest
   */
  private async loadExtractedLessons(): Promise<ExtractedLesson[]> {
    try {
      const cacheBuster = new Date().getTime();
      let lessons: any[] = [];

      // Prefer chunked manifest: /lessons/index.json + /lessons/grade-*.json
      const indexRes = await fetch(`/lessons/index.json?t=${cacheBuster}`, {
        headers: {
          'Bypass-Tunnel-Reminder': 'true',
          'ngrok-skip-browser-warning': 'true',
          'Cache-Control': 'no-cache'
        }
      });

      if (indexRes.ok) {
        const index = await indexRes.json();
        const gradeFiles: string[] = Object.values(index?.grades || {})
          .map((g: any) => g?.file)
          .filter((v: unknown): v is string => typeof v === 'string' && v.length > 0);

        const chunks = await Promise.all(
          gradeFiles.map(async (file) => {
            const res = await fetch(`${file}?t=${cacheBuster}`, {
              headers: {
                'Bypass-Tunnel-Reminder': 'true',
                'ngrok-skip-browser-warning': 'true',
                'Cache-Control': 'no-cache'
              }
            });
            if (!res.ok) return [];
            const text = await res.text();
            try {
              const parsed = JSON.parse(text);
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })
        );

        lessons = chunks.flat();
      } else {
        // Fallback to single-file manifest
        const response = await fetch(`/lessons-manifest.json?t=${cacheBuster}`, {
          headers: {
            'Bypass-Tunnel-Reminder': 'true',
            'ngrok-skip-browser-warning': 'true',
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to load manifest: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        try {
          lessons = JSON.parse(text);
        } catch {
          throw new Error(`Invalid JSON response: ${text.substring(0, 20)}...`);
        }
      }

      if (!Array.isArray(lessons)) throw new Error('Manifest is not an array');

      // Strictly enforce NO HALLUCINATIONS: Filter out invalid exercises from the original manifest
      lessons = lessons.map((lesson: any) => {
        let content = lesson.content || {};
        
        // Remove "STORY QUESTIONS" or similar artifacts from the end of the passage if present
        if (content.passage) {
          content.passage = content.passage.replace(/Warm-Up\s+\d+.*?STORY\s*QUESTIONS$/i, '').trim();
          content.passage = content.passage.replace(/STORY\s*QUESTIONS$/i, '').trim();
        }

        // Check if there's actual readable text for the Content tab
        const hasReadableText = !!(content.passage?.trim()) || !!(content.story?.trim()) || !!(content.grammarPoint?.trim());
        
        // Fallback for completely empty content
        if (!hasReadableText) {
          content.passage = `Cuốn bí kíp ma thuật này chứa đựng kiến thức về ${lesson.title || 'bài học này'}. Nội dung đã bị ẩn đi bởi một câu bùa chú bí ẩn! Hãy sử dụng sự thông minh của bạn để đọc thêm tài liệu gốc nhé!`;
        }

        // STRICT MODE: Only keep exercises that legitimately have options from the source JSON
        // AND do not contain fallback questions like "What is the main idea of this passage?"
        let finalExercises = (lesson.exercises || []).filter((ex: any) => {
           const promptLower = (ex.question || '').toLowerCase();
           if (promptLower.includes('what is the main idea') || promptLower.includes('what does this mean')) {
             return false;
           }
           return ex.options && ex.options.length > 1;
        });

        // STRICT MODE: Drop exercise if answer is missing or not in options
        // NO MORE faking answers with options[0]!
        finalExercises = finalExercises.filter((ex: any) => {
          let ans = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer;
          return ex.options && ex.options.length > 0 && ex.options.includes(ans);
        });

        return {
          ...lesson,
          content,
          exercises: finalExercises
        };
      });

      return lessons;
    } catch (error) {
      console.error('Failed to load extracted lessons:', error);
      throw error;
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.setState({
      curriculum: null,
      loaded: false,
      error: null,
      lastUpdated: null,
    });
  }

  /**
   * Get cached status
   */
  isCached(): boolean {
    return this.state.loaded;
  }

  /**
   * Get cache age in seconds
   */
  getCacheAge(): number | null {
    if (!this.state.lastUpdated) return null;
    return Math.floor(
      (Date.now() - this.state.lastUpdated.getTime()) / 1000
    );
  }
}

// Singleton instance
export const lessonLoader = new LessonLoaderService();

export default LessonLoaderService;

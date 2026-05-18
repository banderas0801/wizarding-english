/**
 * Curriculum Context
 * Provides curriculum and lesson data to all components
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type {
  MappedLesson,
  CurriculumStructure,
  CurriculumLevel,
} from '../types/curriculum';
import { lessonLoader } from '../services/LessonLoader';
import { CurriculumBuilder } from '../services/CurriculumBuilder';

interface CurriculumContextType {
  // State
  curriculum: CurriculumStructure | null;
  loading: boolean;
  error: string | null;
  currentLesson: MappedLesson | null;

  // Navigation
  setCurrentLesson: (lesson: MappedLesson | null) => void;
  goToNextLesson: () => Promise<void>;
  goToPreviousLesson: () => Promise<void>;
  goToLesson: (lessonId: string) => Promise<void>;

  // Queries
  getLevel: (levelNumber: number) => CurriculumLevel | undefined;
  getLessonsForLevel: (levelNumber: number) => Promise<MappedLesson[]>;
  getLessonsForSubject: (subjectId: string) => Promise<MappedLesson[]>;
  getLessonsForLevelAndSubject: (
    level: number,
    subjectId: string
  ) => Promise<MappedLesson[]>;
  searchLessons: (query: string) => Promise<MappedLesson[]>;

  // Progression
  getProgressionPercentage: () => number;
  getCurrentProgressionLevel: () => number;
  getTotalProgressionLevels: () => number;

  // Stats
  getTotalLessons: () => number;
  getTotalXp: () => number;
  getStatistics: () => Promise<ReturnType<typeof CurriculumBuilder.getStatistics> | null>;

  // Reload
  reloadCurriculum: () => Promise<void>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

interface CurriculumProviderProps {
  children: React.ReactNode;
}

/**
 * Curriculum Provider Component
 */
export const CurriculumProvider: React.FC<CurriculumProviderProps> = ({
  children,
}) => {
  const [curriculum, setCurriculum] = useState<CurriculumStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<MappedLesson | null>(null);

  // Load curriculum on mount
  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const loaded = await lessonLoader.loadCurriculum();
        if (!loaded) {
          const stateError = lessonLoader.getState().error;
          setError(stateError || 'Failed to load curriculum (returned null)');
        } else {
          setCurriculum(loaded);
        }
        setLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load curriculum';
        setError(message);
        setLoading(false);
      }
    };

    loadCurriculum();
  }, []);

  // Navigation handlers
  const goToNextLesson = useCallback(async () => {
    if (!currentLesson) return;
    const next = await lessonLoader.getNextLesson(currentLesson.lessonId);
    if (next) setCurrentLesson(next);
  }, [currentLesson]);

  const goToPreviousLesson = useCallback(async () => {
    if (!currentLesson) return;
    const prev = await lessonLoader.getPreviousLesson(currentLesson.lessonId);
    if (prev) setCurrentLesson(prev);
  }, [currentLesson]);

  const goToLesson = useCallback(async (lessonId: string) => {
    const lesson = await lessonLoader.getLessonById(lessonId);
    if (lesson) setCurrentLesson(lesson);
  }, []);

  // Query handlers
  const getLevel = useCallback(
    (levelNumber: number): CurriculumLevel | undefined => {
      return curriculum?.levels.find(l => l.level === levelNumber);
    },
    [curriculum]
  );

  const getLessonsForLevel = useCallback(
    (levelNumber: number) => lessonLoader.getLessonsByLevel(levelNumber),
    []
  );

  const getLessonsForSubject = useCallback(
    (subjectId: string) => lessonLoader.getLessonsBySubject(subjectId),
    []
  );

  const getLessonsForLevelAndSubject = useCallback(
    (level: number, subjectId: string) =>
      lessonLoader.getLessonsByLevelAndSubject(level, subjectId),
    []
  );

  const searchLessons = useCallback(
    (query: string) => lessonLoader.searchLessons(query),
    []
  );

  // Progression handlers
  const getProgressionPercentage = useCallback(() => {
    if (!curriculum || curriculum.totalLessons === 0) return 0;
    if (!currentLesson) return 0;
    return Math.round((currentLesson.progressionLevel / 40) * 100);
  }, [curriculum, currentLesson]);

  const getCurrentProgressionLevel = useCallback(() => {
    return currentLesson?.progressionLevel || 0;
  }, [currentLesson]);

  const getTotalProgressionLevels = useCallback(() => {
    return 40; // K-6 = 7 levels × 6 units = 42 max
  }, []);

  // Stats handlers
  const getTotalLessons = useCallback(() => {
    return curriculum?.totalLessons || 0;
  }, [curriculum]);

  const getTotalXp = useCallback(() => {
    return curriculum?.totalXp || 0;
  }, [curriculum]);

  const getStatistics = useCallback(async () => {
    return lessonLoader.getStatistics();
  }, []);

  // Reload handler
  const reloadCurriculum = useCallback(async () => {
    setLoading(true);
    try {
      const loaded = await lessonLoader.loadCurriculum(true);
      setCurriculum(loaded);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reload curriculum';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: CurriculumContextType = {
    curriculum,
    loading,
    error,
    currentLesson,
    setCurrentLesson,
    goToNextLesson,
    goToPreviousLesson,
    goToLesson,
    getLevel,
    getLessonsForLevel,
    getLessonsForSubject,
    getLessonsForLevelAndSubject,
    searchLessons,
    getProgressionPercentage,
    getCurrentProgressionLevel,
    getTotalProgressionLevels,
    getTotalLessons,
    getTotalXp,
    getStatistics,
    reloadCurriculum,
  };

  return (
    <CurriculumContext.Provider value={value}>
      {children}
    </CurriculumContext.Provider>
  );
};

/**
 * Hook to use curriculum context
 */
/* eslint-disable-next-line react-refresh/only-export-components */
export const useCurriculum = (): CurriculumContextType => {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum must be used within CurriculumProvider');
  }
  return context;
};

export default CurriculumContext;

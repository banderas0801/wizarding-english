import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UnitProgress {
  score: number;
  stars: 0 | 1 | 2 | 3;
  completedAt: string;
  attempts: number;
}

interface GameState {
  gold: number;
  xp: number;
  level: number;
  wisdom: number;
  greenThumbLevel: number;
  unlockedLessons: string[];
  inventory: string[];
  
  // Settings & Onboarding
  language: string | null;
  house: string | null;
  hasCompletedOnboarding: boolean;
  currentStreak: number;
  lastPlayedAt: string | null;
  completedUnits: Record<string, UnitProgress>;
  bestScores: Record<string, number>;
  setLanguage: (lang: string) => void;
  setHouse: (house: string) => void;
  completeOnboarding: () => void;

  addGold: (amount: number) => void;
  addXp: (amount: number) => void;
  addWisdom: (amount: number) => void;
  unlockLesson: (lessonId: string) => void;
  addToInventory: (item: string) => void;
  recordUnitCompletion: (unitId: string, score: number, stars: 0 | 1 | 2 | 3) => void;
  getBestScoreForUnit: (unitId: string) => number;
  isUnitUnlocked: (unitId: string, prerequisiteUnitId?: string | null) => boolean;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      gold: 150,
      xp: 450,
      level: 1,
      wisdom: 450,
      greenThumbLevel: 4,
      unlockedLessons: ['transfiguration', 'creatures', 'history', 'astronomy', 'herbology'],
      inventory: ['wand_basic', 'standard_book_of_spells'],
      
      language: null,
      house: null,
      hasCompletedOnboarding: false,
      currentStreak: 0,
      lastPlayedAt: null,
      completedUnits: {},
      bestScores: {},
      
      setLanguage: (lang) => set({ language: lang }),
      setHouse: (house) => set({ house }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
      
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple level up logic: 1000 XP per level
        const newLevel = Math.floor(newXp / 1000) + 1;
        return { xp: newXp, level: newLevel };
      }),
      
      addWisdom: (amount) => set((state) => ({ wisdom: state.wisdom + amount })),
      
      unlockLesson: (lessonId) => set((state) => ({
        unlockedLessons: state.unlockedLessons.includes(lessonId) 
          ? state.unlockedLessons 
          : [...state.unlockedLessons, lessonId]
      })),
      
      addToInventory: (item) => set((state) => ({
        inventory: [...state.inventory, item]
      })),

      recordUnitCompletion: (unitId, score, stars) => set((state) => {
        const prev = state.completedUnits[unitId];
        const previousBest = state.bestScores[unitId] ?? 0;
        const nextBest = Math.max(previousBest, score);
        const today = new Date().toISOString().slice(0, 10);
        const prevDay = state.lastPlayedAt?.slice(0, 10);
        const streakInc = prevDay && prevDay !== today ? 1 : prevDay === today ? 0 : 1;
        return {
          completedUnits: {
            ...state.completedUnits,
            [unitId]: {
              score,
              stars,
              completedAt: new Date().toISOString(),
              attempts: (prev?.attempts ?? 0) + 1,
            },
          },
          bestScores: {
            ...state.bestScores,
            [unitId]: nextBest,
          },
          currentStreak: state.currentStreak + streakInc,
          lastPlayedAt: new Date().toISOString(),
        };
      }),

      getBestScoreForUnit: (unitId) => get().bestScores[unitId] ?? 0,

      isUnitUnlocked: (unitId, prerequisiteUnitId) => {
        if (!prerequisiteUnitId) return true;
        const prevBest = get().bestScores[prerequisiteUnitId] ?? 0;
        if (prevBest >= 70) return true;
        // allow replay unlocked unit even if prerequisite not met
        return Boolean(get().completedUnits[unitId]);
      },
    }),
    {
      name: 'wizarding-academy-storage', // key in localStorage
      version: 2,
      migrate: (persistedState: any, version) => {
        if (!persistedState) return persistedState;
        if (version < 2) {
          return {
            ...persistedState,
            currentStreak: persistedState.currentStreak ?? 0,
            lastPlayedAt: persistedState.lastPlayedAt ?? null,
            completedUnits: persistedState.completedUnits ?? {},
            bestScores: persistedState.bestScores ?? {},
          };
        }
        return persistedState;
      },
    }
  )
);

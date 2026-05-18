import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setLanguage: (lang: string) => void;
  setHouse: (house: string) => void;
  completeOnboarding: () => void;

  addGold: (amount: number) => void;
  addXp: (amount: number) => void;
  addWisdom: (amount: number) => void;
  unlockLesson: (lessonId: string) => void;
  addToInventory: (item: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'wizarding-academy-storage', // key in localStorage
    }
  )
);

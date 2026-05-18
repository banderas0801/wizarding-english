/**
 * useLanguage Hook
 * Provides translation function and language state to components
 */

import { useState, useEffect, useCallback } from 'react';
import { i18nService, type Language } from '../services/i18n';

interface UseLanguageReturn {
  /**
   * Current language
   */
  language: Language;

  /**
   * Translation function
   * Usage: t('key.path') or t('key.with.{variable}', { variable: 'value' })
   */
  t: (key: string, variables?: Record<string, string>) => string;

  /**
   * Change language
   */
  setLanguage: (language: Language) => void;

  /**
   * Get locale name
   */
  getLanguageName: (lang: Language) => string;
}

/**
 * Hook to use i18n in components
 * Triggers re-render when language changes
 */
export function useLanguage(): UseLanguageReturn {
  const [language, setLanguageState] = useState<Language>(i18nService.getLanguage());

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = i18nService.subscribe(newLanguage => {
      setLanguageState(newLanguage);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Handle language change
  const handleSetLanguage = useCallback((newLanguage: Language) => {
    i18nService.setLanguage(newLanguage);
    setLanguageState(newLanguage);
  }, []);

  // Translation function
  const t = useCallback(
    (key: string, variables?: Record<string, string>) => {
      return i18nService.t(key, variables);
    },
    [language] // Re-run if language changes
  );

  // Get readable language name
  const getLanguageName = (lang: Language): string => {
    return lang === 'en' ? 'English' : 'Tiếng Việt';
  };

  return {
    language,
    t,
    setLanguage: handleSetLanguage,
    getLanguageName,
  };
}

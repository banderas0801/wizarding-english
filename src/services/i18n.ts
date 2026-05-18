/**
 * i18n Service
 * Handles language selection and translations
 */

import enLocale from '../locales/en.json';
import viLocale from '../locales/vi.json';

type Language = 'en' | 'vi';
type Locale = Record<string, any>;

const locales: Record<Language, Locale> = {
  en: enLocale,
  vi: viLocale,
};

class I18nService {
  private currentLanguage: Language = 'en'; // Default to English
  private listeners: Set<(language: Language) => void> = new Set();

  /**
   * Get current language
   */
  getLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Set language
   */
  setLanguage(language: Language) {
    if (language !== this.currentLanguage) {
      this.currentLanguage = language;
      this.notifyListeners();
    }
  }

  /**
   * Initialize language from storage or default
   */
  initializeLanguage(savedLanguage?: Language) {
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      this.currentLanguage = savedLanguage;
    } else {
      this.currentLanguage = 'en'; // Default to English
    }
  }

  /**
   * Translate a key with optional variables
   * Example: t('sorting.sorted', { house: 'Gryffindor' })
   * Returns: "You have been sorted into Gryffindor!"
   */
  translate(key: string, variables?: Record<string, string>): string {
    const keys = key.split('.');
    let value: any = locales[this.currentLanguage];

    // Navigate through nested keys
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key if not found
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace variables if provided
    if (variables) {
      let result = value;
      for (const [varKey, varValue] of Object.entries(variables)) {
        result = result.replace(`{${varKey}}`, varValue);
      }
      return result;
    }

    return value;
  }

  /**
   * Short alias for translate
   */
  t(key: string, variables?: Record<string, string>): string {
    return this.translate(key, variables);
  }

  /**
   * Get all translations for current language
   */
  getLocale(): Locale {
    return locales[this.currentLanguage];
  }

  /**
   * Check if language is supported
   */
  isSupportedLanguage(language: any): language is Language {
    return language === 'en' || language === 'vi';
  }

  /**
   * Get list of supported languages
   */
  getSupportedLanguages(): Language[] {
    return ['en', 'vi'];
  }

  /**
   * Subscribe to language changes
   */
  subscribe(listener: (language: Language) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of language change
   */
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }
}

// Singleton instance
export const i18nService = new I18nService();

export type { Language, Locale };

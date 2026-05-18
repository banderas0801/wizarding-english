import { useGameStore } from '../store/useGameStore';

const dictionaries: Record<string, Record<string, string>> = {
  en: {
    'combat.title': 'MAGIC ARENA',
    'combat.player': 'Scholar',
    'combat.enemy': 'Darkness',
    'combat.energy': 'Energy',
    'combat.power': 'Power',
    'combat.instruction': 'Complete the spell:',
    'combat.attack': 'Attack',
    'combat.cast': 'CAST SPELL',
    'combat.defend': 'Defend',
  },
  vi: {
    'combat.title': 'ĐẤU TRƯỜNG PHÁP THUẬT',
    'combat.player': 'Học Giả',
    'combat.enemy': 'Bóng Tối',
    'combat.energy': 'Năng lượng',
    'combat.power': 'Thế lực',
    'combat.instruction': 'Hoàn thiện lời chú:',
    'combat.attack': 'Tấn công',
    'combat.cast': 'PHÓNG CHÚ',
    'combat.defend': 'Phòng thủ',
  }
};

export function useI18n() {
  const language = useGameStore(state => state.language) || 'vi'; // Default to vi based on current UI
  
  const t = (key: string): string => {
    return dictionaries[language]?.[key] || key;
  };

  return { t, language };
}

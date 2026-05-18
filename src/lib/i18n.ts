import { useGameStore } from '../store/useGameStore';

const dict = {
  en: {
    choose_correct: 'Choose the correct answer',
    wizard_duel: 'Wizard Duel',
    fill_blank: 'Fill in the blank',
    short_answer: 'Short answer',
    matching_instructions: 'Match each pair',
    matching_tap_to_match: 'Tap left, then tap right',
    skip: 'Skip',
    answer_placeholder: 'Type your answer...',
    submit: 'Check',
    next: 'Next',
    correct: 'Correct!',
    wrong: 'Try again',
    answer_label: 'Answer',
    start: 'Start',
    questions: 'Questions',
    hearts: 'Hearts',
    modes: 'Modes',
    no_questions: 'No questions found for this stage',
    map: 'Map',
    retry: 'Retry',
    out_of_hearts: 'Out of hearts',
    great_job: 'Great job!',
    keep_going: 'Keep going!',
    try_again: 'Try again!',
    correct_count: 'Correct',
    xp_earned: 'XP earned',
  },
  vi: {
    choose_correct: 'Chọn câu trả lời đúng',
    wizard_duel: 'Đấu pháp sư',
    fill_blank: 'Điền từ còn thiếu',
    short_answer: 'Trả lời ngắn',
    matching_instructions: 'Nối từng cặp đúng',
    matching_tap_to_match: 'Chạm cột trái rồi cột phải',
    skip: 'Bỏ qua',
    answer_placeholder: 'Nhập câu trả lời...',
    submit: 'Kiểm tra',
    next: 'Tiếp',
    correct: 'Đúng rồi!',
    wrong: 'Sai mất rồi',
    answer_label: 'Đáp án',
    start: 'Bắt đầu',
    questions: 'Số câu',
    hearts: 'Tim',
    modes: 'Dạng bài',
    no_questions: 'Chưa có câu hỏi cho stage này',
    map: 'Bản đồ',
    retry: 'Thử lại',
    out_of_hearts: 'Hết tim',
    great_job: 'Xuất sắc!',
    keep_going: 'Cố lên!',
    try_again: 'Thử lại nhé!',
    correct_count: 'Câu đúng',
    xp_earned: 'XP nhận được',
  },
} as const;

export type UiLang = keyof typeof dict;
export type TKey = keyof (typeof dict)['en'];

export function useT() {
  const language = useGameStore((s) => s.language ?? 'vi');
  const lang: UiLang = language === 'en' ? 'en' : 'vi';
  return (key: TKey) => dict[lang][key];
}

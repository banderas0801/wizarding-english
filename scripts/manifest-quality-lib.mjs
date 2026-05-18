const GENERIC_QUESTION_PATTERNS = [
  /^what does this mean\??$/i,
  /^what is the answer\??$/i,
  /^choose the best option:?$/i,
  /^what is the main idea of this passage\??$/i,
];

const PLACEHOLDER_OPTION_PATTERN = /^option\s*\d+[\.\)]?$/i;
const VIETNAMESE_DIACRITIC_PATTERN =
  /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;

function isGenericQuestion(question) {
  return GENERIC_QUESTION_PATTERNS.some(pattern => pattern.test(question));
}

function isPlaceholderOption(option) {
  if (typeof option !== 'string') return true;
  const normalized = option.trim();
  if (!normalized) return true;
  return PLACEHOLDER_OPTION_PATTERN.test(normalized);
}

function isLikelyEnglishText(text) {
  const normalized = String(text || '').trim();
  if (!normalized) return false;
  return !VIETNAMESE_DIACRITIC_PATTERN.test(normalized);
}

function makeStats() {
  return {
    inputLessons: 0,
    outputLessons: 0,
    droppedLessons: 0,
    inputExercises: 0,
    outputExercises: 0,
    droppedExercises: 0,
    dropReasons: {
      emptyQuestion: 0,
      genericQuestion: 0,
      nonEnglishQuestion: 0,
      insufficientOptions: 0,
      placeholderOption: 0,
      nonEnglishOption: 0,
      missingAnswerForMcq: 0,
      answerNotInOptions: 0,
      noCoreContent: 0,
      nonEnglishCoreContent: 0,
      noUsableExercises: 0,
    },
  };
}

function sanitizeLessonsWithStats(lessons) {
  const stats = makeStats();
  stats.inputLessons = lessons.length;

  const sanitized = lessons
    .map(lesson => {
      const originalExercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
      stats.inputExercises += originalExercises.length;

      const filteredExercises = originalExercises.filter(exercise => {
        const question = String(exercise?.question ?? '').trim();
        const options = Array.isArray(exercise?.options) ? exercise.options : [];
        const answer = exercise?.answer;
        const isMultipleChoice = exercise?.type === 'multiple_choice';

        if (!question) {
          stats.dropReasons.emptyQuestion++;
          return false;
        }
        if (isGenericQuestion(question)) {
          stats.dropReasons.genericQuestion++;
          return false;
        }
        if (!isLikelyEnglishText(question)) {
          stats.dropReasons.nonEnglishQuestion++;
          return false;
        }
        if (isMultipleChoice && options.length < 2) {
          stats.dropReasons.insufficientOptions++;
          return false;
        }
        if (isMultipleChoice && options.some(opt => isPlaceholderOption(opt))) {
          stats.dropReasons.placeholderOption++;
          return false;
        }
        if (isMultipleChoice && options.some(opt => !isLikelyEnglishText(opt))) {
          stats.dropReasons.nonEnglishOption++;
          return false;
        }

        if (isMultipleChoice) {
          if (typeof answer !== 'string' || !answer.trim()) {
            stats.dropReasons.missingAnswerForMcq++;
            return false;
          }
          if (!options.includes(answer)) {
            stats.dropReasons.answerNotInOptions++;
            return false;
          }
        }

        return true;
      });

      return { ...lesson, exercises: filteredExercises };
    })
    .filter(lesson => {
      const passage = String(lesson?.content?.passage || '');
      const story = String(lesson?.content?.story || '');
      const hasCoreContent = Boolean(passage || story);
      const englishCore = isLikelyEnglishText(passage) || isLikelyEnglishText(story);
      const hasUsableExercises = Array.isArray(lesson.exercises) && lesson.exercises.length > 0;

      if (!hasCoreContent) stats.dropReasons.noCoreContent++;
      if (hasCoreContent && !englishCore) stats.dropReasons.nonEnglishCoreContent++;
      if (!hasUsableExercises) stats.dropReasons.noUsableExercises++;

      return hasCoreContent && englishCore && hasUsableExercises;
    });

  stats.outputLessons = sanitized.length;
  stats.droppedLessons = stats.inputLessons - stats.outputLessons;
  stats.outputExercises = sanitized.reduce(
    (sum, lesson) => sum + (Array.isArray(lesson.exercises) ? lesson.exercises.length : 0),
    0
  );
  stats.droppedExercises = stats.inputExercises - stats.outputExercises;

  return { sanitized, stats };
}

export {
  sanitizeLessonsWithStats,
  isLikelyEnglishText,
  isPlaceholderOption,
  isGenericQuestion,
};

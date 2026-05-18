const GENERIC_QUESTION_PATTERNS = [
  /^what does this mean\??$/i,
  /^what is the answer\??$/i,
  /^choose the best option:?$/i,
  /^what is the main idea of this passage\??$/i,
];

const PLACEHOLDER_OPTION_PATTERN = /^option\s*\d+[\.\)]?$/i;
const VIETNAMESE_DIACRITIC_PATTERN =
  /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const QUESTION_NOISE_PATTERN =
  /(warm-?up|name\s*_+|date\s*_+|teacher created resources|copyright|©)/i;
const OPTION_POLLUTION_PATTERN =
  /(\b[abcd]\.\s)|(\b[2-9]\.\s)|(\bstory questions?\b)|(\bfiction\b)|(\bnonfiction\b)/i;

function looksLikeCleanQuestion(text) {
  if (!text) return false;
  if (QUESTION_NOISE_PATTERN.test(text)) return false;
  if (text.length < 8 || text.length > 220) return false;
  return true;
}

function looksLikeCleanOption(text) {
  if (!text) return false;
  if (text.length < 1 || text.length > 120) return false;
  if (OPTION_POLLUTION_PATTERN.test(text)) return false;
  return true;
}

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
    droppedMatchingCount: 0,
    dropReasons: {
        emptyQuestion: 0,
        noisyQuestion: 0,
        badQuestionLength: 0,
        genericQuestion: 0,
        nonEnglishQuestion: 0,
        insufficientOptions: 0,
        pollutedOption: 0,
        badOptionLength: 0,
        placeholderOption: 0,
        nonEnglishOption: 0,
        missingAnswerForMcq: 0,
        answerNotInOptions: 0,
        duplicateAnswerInOptions: 0,
        noCoreContent: 0,
        nonEnglishCoreContent: 0,
        noUsableExercises: 0,
        malformedMatching: 0,
    },
  };
}

function isValidMatchingExercise(exercise) {
  if (exercise?.type !== 'matching') return true;
  const pairs = Array.isArray(exercise?.pairs) ? exercise.pairs : [];
  if (pairs.length < 3 || pairs.length > 6) return false;
  const lefts = new Set();
  const rights = new Set();
  for (const pair of pairs) {
    const left = String(pair?.left ?? '').trim();
    const right = String(pair?.right ?? '').trim();
    if (!left || !right) return false;
    if (lefts.has(left) || rights.has(right)) return false;
    lefts.add(left);
    rights.add(right);
  }
  return true;
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
        if (QUESTION_NOISE_PATTERN.test(question)) {
          stats.dropReasons.noisyQuestion++;
          return false;
        }
        if (!looksLikeCleanQuestion(question)) {
          stats.dropReasons.badQuestionLength++;
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
        if (isMultipleChoice && options.length < 3) {
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
        if (isMultipleChoice && options.some(opt => !looksLikeCleanOption(String(opt).trim()))) {
          stats.dropReasons.badOptionLength++;
          return false;
        }
        if (isMultipleChoice && options.some(opt => OPTION_POLLUTION_PATTERN.test(String(opt)))) {
          stats.dropReasons.pollutedOption++;
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
          if (options.filter(opt => opt === answer).length !== 1) {
            stats.dropReasons.duplicateAnswerInOptions++;
            return false;
          }
        }

        if (!isValidMatchingExercise(exercise)) {
          stats.dropReasons.malformedMatching++;
          stats.droppedMatchingCount++;
          const unitHint = lesson?.unitTitle || lesson?.unit || lesson?.lessonId || 'unknown-unit';
          console.warn(`[sanitize] drop malformed matching in unit ${unitHint}`);
          return false;
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

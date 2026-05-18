import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const MANIFEST_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const MAP_PATH = path.join(ROOT, 'public', 'answer-key-map.json');
const OUTPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.with-answer-key.json');

/**
 * answer-key-map.json format:
 * {
 *   "lesson_id": {
 *     "0": "A",
 *     "1": "C"
 *   }
 * }
 * - First key: lessonId
 * - Nested key: exercise index in lesson.exercises
 * - Value: option letter A/B/C/D
 */

function letterToIndex(letter) {
  const map = { A: 0, B: 1, C: 2, D: 3 };
  return map[String(letter || '').trim().toUpperCase()] ?? -1;
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Manifest not found: ${MANIFEST_PATH}`);
  }
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error(`Answer key map not found: ${MAP_PATH}`);
  }

  const lessons = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const keyMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf-8'));
  if (!Array.isArray(lessons)) {
    throw new Error('Manifest must be an array');
  }

  let updatedAnswers = 0;
  let skippedMappings = 0;

  const updatedLessons = lessons.map(lesson => {
    const lessonMap = keyMap?.[lesson.lessonId];
    if (!lessonMap || !Array.isArray(lesson.exercises)) return lesson;

    const exercises = lesson.exercises.map((exercise, idx) => {
      const mappedLetter = lessonMap[String(idx)];
      if (!mappedLetter) return exercise;

      const answerIndex = letterToIndex(mappedLetter);
      const options = Array.isArray(exercise?.options) ? exercise.options : [];

      if (answerIndex < 0 || answerIndex >= options.length) {
        skippedMappings++;
        return exercise;
      }

      updatedAnswers++;
      return {
        ...exercise,
        answer: options[answerIndex],
        answerSource: 'answer_key_map',
        answerKeyLetter: String(mappedLetter).toUpperCase(),
      };
    });

    return { ...lesson, exercises };
  });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(updatedLessons, null, 2));
  console.log('Applied answer key map.');
  console.log(`Updated answers: ${updatedAnswers}`);
  console.log(`Skipped mappings: ${skippedMappings}`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main();

/**
 * Post-processor: Extract real multiple-choice questions from lesson passages
 * Finds patterns like:
 *   1. Question text? a. Option A b. Option B c. Option C d. Option D
 * and converts them to proper exercises.
 *
 * Usage: node post-process-manifest.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.join(__dirname, 'public', 'lessons-manifest.json');

console.log('🔧 Post-processing manifest to extract real MC questions...\n');

const lessons = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'));

/**
 * Parse multiple-choice questions from a passage string.
 * Handles patterns like:
 *  1. Why are people afraid? a. because... b. because... c. because... d. because...
 */
function parseMCQuestions(text) {
  if (!text) return [];

  // Normalize encoding artifacts
  const clean = text
    .replace(/â€œ/g, '"').replace(/â€/g, '"').replace(/â€™/g, "'")
    .replace(/Â©/g, '©').replace(/â€˜/g, "'");

  const questions = [];

  // Match numbered questions: "1. Question text a. ... b. ... c. ... d. ..."
  const qPattern = /\d+\.\s+(.+?)\s+a\.\s+(.+?)\s+b\.\s+(.+?)\s+c\.\s+(.+?)\s+d\.\s+(.+?)(?=\d+\.|$)/gs;

  let match;
  while ((match = qPattern.exec(clean)) !== null) {
    const [, q, a, b, c, d] = match;
    const question = q.trim().replace(/\s+/g, ' ');
    const opts = [a, b, c, d].map(o => o.trim().replace(/\s+/g, ' '));

    // Skip if question looks like a page header / metadata
    if (question.length < 10 || question.match(/^(name|date|warm.up|story question)/i)) continue;
    // Skip if options are too short or look like headers
    if (opts.some(o => o.length < 2)) continue;

    questions.push({
      id: `mc-${Math.random().toString(36).slice(2, 9)}`,
      type: 'multiple_choice',
      question,
      options: opts,
      answer: opts[0], // We don't know the right answer from text alone — default to a.
      xpReward: 10,
      goldReward: 5,
      difficulty: 'easy',
    });
  }

  return questions;
}

let improved = 0;
let totalNewExercises = 0;

const processed = lessons.map(lesson => {
  // Already has real MC exercises with options — skip
  const hasMC = lesson.exercises?.some(e => e.options && e.options.length >= 2);
  if (hasMC) return lesson;

  // Try to extract from passage
  const passage = lesson.content?.passage || lesson.content?.story || '';
  const mcQuestions = parseMCQuestions(passage);

  if (mcQuestions.length > 0) {
    improved++;
    totalNewExercises += mcQuestions.length;
    return {
      ...lesson,
      exercises: mcQuestions,
      xpTotal: mcQuestions.length * 10,
    };
  }

  return lesson;
});

// Filter out lessons that STILL have no proper exercises after processing
const valid = processed.filter(l =>
  l.exercises && l.exercises.length > 0 &&
  l.exercises.some(e => e.options && e.options.length >= 2)
);

fs.writeFileSync(MANIFEST, JSON.stringify(valid, null, 2));

console.log(`✅ Done!`);
console.log(`  Improved: ${improved} lessons (extracted MC questions from passage)`);
console.log(`  New exercises added: ${totalNewExercises}`);
console.log(`  Final valid lessons: ${valid.length} (had MC options)`);
console.log(`  Removed: ${processed.length - valid.length} lessons with no usable MC`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeLessonsWithStats } from './manifest-quality-lib.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const OUTPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.sanitized.json');

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Manifest not found: ${MANIFEST_PATH}`);
  }

  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const lessons = JSON.parse(raw);
  if (!Array.isArray(lessons)) {
    throw new Error('Manifest must be an array');
  }

  const { sanitized, stats } = sanitizeLessonsWithStats(lessons);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sanitized, null, 2));

  console.log('Sanitize manifest completed.');
  console.log(`Input lessons: ${stats.inputLessons}`);
  console.log(`Output lessons: ${stats.outputLessons}`);
  console.log(`Dropped lessons: ${stats.droppedLessons}`);
  console.log(`Input exercises: ${stats.inputExercises}`);
  console.log(`Output exercises: ${stats.outputExercises}`);
  console.log(`Dropped exercises: ${stats.droppedExercises}`);
  console.log(`Dropped malformed matching: ${stats.droppedMatchingCount}`);
  console.log(`Output file: ${OUTPUT_PATH}`);
}

main();

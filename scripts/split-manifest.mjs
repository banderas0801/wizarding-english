import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const INPUT_PATHS = [
  path.join(ROOT, 'public', 'lessons-manifest.sanitized.json'),
  path.join(ROOT, 'public', 'lessons-manifest.json'),
];
const OUT_DIR = path.join(ROOT, 'public', 'lessons');
const INDEX_PATH = path.join(OUT_DIR, 'index.json');

function resolveInputPath() {
  for (const p of INPUT_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`No manifest found. Tried: ${INPUT_PATHS.join(', ')}`);
}

function normalizeSubject(subject) {
  const s = String(subject || '').toLowerCase();
  if (s.includes('reading')) return 'reading';
  if (s.includes('writing')) return 'writing';
  if (s.includes('math')) return 'math';
  if (s.includes('science')) return 'science';
  if (s.includes('vocabulary')) return 'vocabulary';
  if (s.includes('grammar')) return 'grammar';
  if (s.includes('phonics')) return 'phonics';
  return 'general';
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const inputPath = resolveInputPath();
  const lessons = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  if (!Array.isArray(lessons)) throw new Error('Manifest must be array');

  ensureDir(OUT_DIR);

  const byGrade = new Map();
  const gradeMeta = {};

  for (const lesson of lessons) {
    const grade = Number(lesson.grade ?? 0);
    if (!byGrade.has(grade)) byGrade.set(grade, []);
    byGrade.get(grade).push(lesson);
  }

  for (const [grade, chunk] of byGrade.entries()) {
    const filename = `grade-${grade}.json`;
    const filePath = path.join(OUT_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(chunk));

    const subjects = {};
    let exerciseCount = 0;
    for (const lesson of chunk) {
      const subject = normalizeSubject(lesson.subject);
      subjects[subject] = (subjects[subject] || 0) + 1;
      exerciseCount += Array.isArray(lesson.exercises) ? lesson.exercises.length : 0;
    }

    gradeMeta[String(grade)] = {
      file: `/lessons/${filename}`,
      lessons: chunk.length,
      exercises: exerciseCount,
      subjects,
    };
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: path.basename(inputPath),
    totalLessons: lessons.length,
    grades: gradeMeta,
  };

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
  console.log(`Split manifest completed.`);
  console.log(`Index: ${INDEX_PATH}`);
  console.log(`Grade files: ${byGrade.size}`);
}

main();

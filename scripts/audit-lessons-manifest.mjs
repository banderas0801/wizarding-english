import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeLessonsWithStats } from './manifest-quality-lib.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const INPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_JSON_PATH = path.join(REPORT_DIR, 'manifest-quality-report.json');
const REPORT_MD_PATH = path.join(REPORT_DIR, 'manifest-quality-report.md');

function pct(part, total) {
  if (!total) return '0.00%';
  return `${((part / total) * 100).toFixed(2)}%`;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function buildMarkdown(stats) {
  const lines = [];
  lines.push('# Manifest Quality Report');
  lines.push('');
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Input lessons: ${stats.inputLessons}`);
  lines.push(`- Output lessons: ${stats.outputLessons}`);
  lines.push(`- Dropped lessons: ${stats.droppedLessons} (${pct(stats.droppedLessons, stats.inputLessons)})`);
  lines.push(`- Input exercises: ${stats.inputExercises}`);
  lines.push(`- Output exercises: ${stats.outputExercises}`);
  lines.push(`- Dropped exercises: ${stats.droppedExercises} (${pct(stats.droppedExercises, stats.inputExercises)})`);
  lines.push('');
  lines.push('## Drop Reasons');
  lines.push('');
  lines.push('| Reason | Count |');
  lines.push('|---|---:|');
  for (const [reason, count] of Object.entries(stats.dropReasons)) {
    lines.push(`| ${reason} | ${count} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Manifest not found: ${INPUT_PATH}`);
  }

  const raw = fs.readFileSync(INPUT_PATH, 'utf-8');
  const lessons = JSON.parse(raw);
  if (!Array.isArray(lessons)) {
    throw new Error('Manifest must be an array');
  }

  const { stats } = sanitizeLessonsWithStats(lessons);
  ensureDir(REPORT_DIR);

  const reportPayload = {
    generatedAt: new Date().toISOString(),
    inputPath: INPUT_PATH,
    summary: stats,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(reportPayload, null, 2));
  fs.writeFileSync(REPORT_MD_PATH, buildMarkdown(stats));

  console.log('Manifest quality audit completed.');
  console.log(`Report JSON: ${REPORT_JSON_PATH}`);
  console.log(`Report MD: ${REPORT_MD_PATH}`);
}

main();

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeLessonsWithStats } from './manifest-quality-lib.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const INPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'node-gate-report.json');
const MIN_CHALLENGES_PER_NODE = 10;

const SUBJECT_TO_LOCATION = {
  reading: 'library',
  writing: 'potions_classroom',
  math: 'arithmancy_classroom',
  science: 'herbology_greenhouse',
  vocabulary: 'great_hall',
  grammar: 'library',
  phonics: 'great_hall',
  critical_thinking: 'library',
};

const SUBJECT_NORMALIZE_MAP = {
  'reading comprehension': 'reading',
  'daily reading': 'reading',
  reading: 'reading',
  writing: 'writing',
  '6-trait writing': 'writing',
  'writing practice': 'writing',
  grammar: 'grammar',
  'sentence structure': 'grammar',
  phonics: 'phonics',
  'letter recognition': 'phonics',
  sounds: 'phonics',
  'critical thinking': 'critical_thinking',
  critical_thinking: 'critical_thinking',
  reasoning: 'critical_thinking',
  logic: 'critical_thinking',
  'problem solving': 'critical_thinking',
  vocabulary: 'vocabulary',
  words: 'vocabulary',
  language: 'writing',
  spelling: 'phonics',
  general: 'vocabulary',
  math: 'math',
  mathematics: 'math',
  arithmetic: 'math',
  science: 'science',
  geography: 'science',
  nature: 'science',
};

function normalizeSubject(subject) {
  const normalized = String(subject || '').toLowerCase().trim();
  for (const [k, v] of Object.entries(SUBJECT_NORMALIZE_MAP)) {
    if (normalized.includes(k)) return v;
  }
  return 'reading';
}

function buildNodes(lessons) {
  const nodes = [];
  let i = 0;
  while (i < lessons.length) {
    const lessonIds = [];
    let challengeCount = 0;

    while (i < lessons.length && challengeCount < MIN_CHALLENGES_PER_NODE) {
      const lesson = lessons[i];
      const usable = Array.isArray(lesson.exercises) ? lesson.exercises.length : 0;
      lessonIds.push(lesson.lessonId);
      challengeCount += usable;
      i++;
    }

    if (challengeCount > 0) {
      nodes.push({ lessonIds, challengeCount });
    }
  }

  if (nodes.length > 1 && nodes[nodes.length - 1].challengeCount < MIN_CHALLENGES_PER_NODE) {
    const last = nodes.pop();
    nodes[nodes.length - 1].lessonIds.push(...last.lessonIds);
    nodes[nodes.length - 1].challengeCount += last.challengeCount;
  }
  return nodes;
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Manifest not found: ${INPUT_PATH}`);
  }
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }

  const raw = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));
  if (!Array.isArray(raw)) throw new Error('Manifest must be an array');

  const { sanitized, stats } = sanitizeLessonsWithStats(raw);
  const byLocation = new Map();

  for (const lesson of sanitized) {
    const subject = normalizeSubject(lesson.subject);
    const location = SUBJECT_TO_LOCATION[subject] || 'library';
    if (!byLocation.has(location)) byLocation.set(location, []);
    byLocation.get(location).push(lesson);
  }

  const failures = [];
  const summary = {};

  for (const [location, lessons] of byLocation.entries()) {
    lessons.sort((a, b) => {
      const ga = Number(a.grade || 0);
      const gb = Number(b.grade || 0);
      if (ga !== gb) return ga - gb;
      return Number(a.unit || 0) - Number(b.unit || 0);
    });

    const nodes = buildNodes(lessons);
    const badNodes = nodes
      .map((n, idx) => ({ node: idx + 1, challengeCount: n.challengeCount, lessonIds: n.lessonIds }))
      .filter(n => n.challengeCount < MIN_CHALLENGES_PER_NODE);

    summary[location] = {
      lessons: lessons.length,
      nodes: nodes.length,
      minChallenges: Math.min(...nodes.map(n => n.challengeCount)),
      maxChallenges: Math.max(...nodes.map(n => n.challengeCount)),
      badNodes: badNodes.length,
    };

    if (badNodes.length > 0 || nodes.length === 0) {
      failures.push({ location, badNodes, nodes: nodes.length });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    inputLessons: raw.length,
    sanitizedLessons: sanitized.length,
    droppedLessons: stats.droppedLessons,
    droppedExercises: stats.droppedExercises,
    minChallengesPerNode: MIN_CHALLENGES_PER_NODE,
    summary,
    failures,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`Node gate report written: ${REPORT_PATH}`);

  if (failures.length > 0) {
    console.error(`NODE GATE FAILED: ${failures.length} location(s) have invalid nodes.`);
    process.exit(1);
  }

  console.log('NODE GATE PASSED');
}

main();

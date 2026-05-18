import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeLessonsWithStats } from './manifest-quality-lib.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const INPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'lesson-blueprint-report.json');

const MIN_CHALLENGES_PER_NODE = 10;
const EXPECTED_LOOP = ['mcq', 'mcq', 'duel', 'mcq', 'fill_blank', 'matching', 'short_answer'];

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
    let totalXP = 0;

    while (i < lessons.length && challengeCount < MIN_CHALLENGES_PER_NODE) {
      const lesson = lessons[i];
      const usable = Array.isArray(lesson.exercises) ? lesson.exercises.length : 0;
      lessonIds.push(lesson.lessonId);
      challengeCount += usable;
      totalXP += Number(lesson.xpTotal || 0);
      i++;
    }

    if (challengeCount > 0) nodes.push({ lessonIds, challengeCount, totalXP });
  }

  if (nodes.length > 1 && nodes[nodes.length - 1].challengeCount < MIN_CHALLENGES_PER_NODE) {
    const last = nodes.pop();
    nodes[nodes.length - 1].lessonIds.push(...last.lessonIds);
    nodes[nodes.length - 1].challengeCount += last.challengeCount;
    nodes[nodes.length - 1].totalXP += last.totalXP;
  }
  return nodes;
}

function modeForIndex(idx) {
  return EXPECTED_LOOP[idx % EXPECTED_LOOP.length];
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) throw new Error(`Missing input manifest: ${INPUT_PATH}`);
  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

  const raw = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));
  if (!Array.isArray(raw)) throw new Error('Manifest must be array');

  const { sanitized } = sanitizeLessonsWithStats(raw);
  const matchingRuleFailures = [];

  for (const lesson of raw) {
    const exercises = Array.isArray(lesson.exercises) ? lesson.exercises : [];
    for (const ex of exercises) {
      if (ex?.type !== 'matching') continue;
      const pairs = Array.isArray(ex.pairs) ? ex.pairs : [];
      const leftSet = new Set();
      const rightSet = new Set();
      const hasValidLength = pairs.length >= 3 && pairs.length <= 6;
      let hasEmpty = false;
      let hasDuplicate = false;

      for (const p of pairs) {
        const left = String(p?.left ?? '').trim();
        const right = String(p?.right ?? '').trim();
        if (!left || !right) hasEmpty = true;
        if (leftSet.has(left) || rightSet.has(right)) hasDuplicate = true;
        leftSet.add(left);
        rightSet.add(right);
      }

      if (!hasValidLength || hasEmpty || hasDuplicate) {
        matchingRuleFailures.push({
          lessonId: lesson.lessonId,
          exerciseId: ex.id,
          pairsLength: pairs.length,
          hasEmpty,
          hasDuplicate,
        });
      }
    }
  }
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
    lessons.sort((a, b) => Number(a.progressionLevel || 0) - Number(b.progressionLevel || 0));
    const nodes = buildNodes(lessons);

    const nodeReports = nodes.map((n, idx) => ({
      node: idx + 1,
      chapter: Math.floor(idx / 5) + 1,
      mode: modeForIndex(idx),
      challengeCount: n.challengeCount,
      totalXP: n.totalXP,
      lessonCount: n.lessonIds.length,
    }));

    const badChallengeNodes = nodeReports.filter(n => n.challengeCount < MIN_CHALLENGES_PER_NODE);
    const badModeSequence = nodeReports.filter((n, idx) => n.mode !== modeForIndex(idx));

    summary[location] = {
      nodes: nodeReports.length,
      chapters: nodeReports.length ? Math.floor((nodeReports.length - 1) / 5) + 1 : 0,
      minChallenges: nodeReports.length ? Math.min(...nodeReports.map(n => n.challengeCount)) : 0,
      maxChallenges: nodeReports.length ? Math.max(...nodeReports.map(n => n.challengeCount)) : 0,
      modeLoop: EXPECTED_LOOP.join(' -> '),
      badChallengeNodes: badChallengeNodes.length,
      badModeSequence: badModeSequence.length,
    };

    if (badChallengeNodes.length || badModeSequence.length || nodeReports.length === 0) {
      failures.push({
        location,
        badChallengeNodes,
        badModeSequence,
        nodes: nodeReports.length,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    inputLessons: raw.length,
    sanitizedLessons: sanitized.length,
    blueprint: {
      minChallengesPerNode: MIN_CHALLENGES_PER_NODE,
      chapterSizeNodes: 5,
      loopModes: EXPECTED_LOOP,
    },
    summary,
    failures,
    matchingRuleFailures,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`Lesson blueprint report written: ${REPORT_PATH}`);
  if (failures.length || matchingRuleFailures.length) {
    console.error(
      `LESSON BLUEPRINT GATE FAILED: ${failures.length} location issue(s), ${matchingRuleFailures.length} matching issue(s).`
    );
    process.exit(1);
  }
  console.log('LESSON BLUEPRINT GATE PASSED');
}

main();

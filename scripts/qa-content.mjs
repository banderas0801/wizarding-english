import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const INPUT_PATH = path.join(ROOT, 'public', 'lessons-manifest.json');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'qa-content.json');

function normalizeAnswer(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, '');
}

function wordsOf(text) {
  return normalizeAnswer(text)
    .split(/\s+/)
    .filter((w) => w.length > 4);
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) throw new Error(`Missing manifest: ${INPUT_PATH}`);
  const raw = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));
  if (!Array.isArray(raw)) throw new Error('Manifest must be an array');

  const fails = [];
  const warns = [];

  for (const lesson of raw) {
    for (const ex of lesson.exercises ?? []) {
      const ctx = `${lesson.lessonId ?? lesson.id ?? 'unknown-lesson'}/${ex.id ?? 'unknown-ex'}`;

      if (ex.type === 'multiple_choice') {
        const options = Array.isArray(ex.options) ? ex.options : [];
        const normOpts = options.map(normalizeAnswer);
        const ans = normalizeAnswer(ex.answer);
        const matches = normOpts.filter((o) => o === ans).length;
        if (matches !== 1) fails.push(`[answer_in_options] ${ctx}`);
        if (new Set(normOpts).size !== normOpts.length) fails.push(`[answer_unique] ${ctx}`);

        const qNorm = normalizeAnswer(ex.question);
        if (ans && qNorm.includes(ans)) warns.push(`[suspicious_answer_overlap] ${ctx}`);

        if (options.length > 0) {
          const lens = options.map((o) => normalizeAnswer(o).length).sort((a, b) => a - b);
          const median = lens[Math.floor(lens.length / 2)] || 1;
          if (normalizeAnswer(ex.answer).length > median * 3) {
            warns.push(`[answer_length_outlier] ${ctx}`);
          }
        }

        const stemTokens = new Set(wordsOf(ex.question));
        const ansTokens = new Set(wordsOf(ex.answer));
        const ansHasStemToken = [...stemTokens].some((t) => ansTokens.has(t) || normalizeAnswer(ex.answer).includes(t));
        const distractorHasStemToken = options
          .filter((o) => normalizeAnswer(o) !== ans)
          .some((o) => [...stemTokens].some((t) => normalizeAnswer(o).includes(t)));
        if (!ansHasStemToken && distractorHasStemToken && stemTokens.size > 0) {
          warns.push(`[semantic_mismatch_heuristic] ${ctx}`);
        }
      }

      if (ex.type === 'fill_blank') {
        const accepted = [ex.answer, ...(ex.acceptableAnswers ?? [])]
          .map((v) => normalizeAnswer(v))
          .filter(Boolean);
        if (accepted.length === 0) fails.push(`[fill_blank_answerable] ${ctx}`);
        const q = String(ex.question ?? '');
        if (!q.includes('___') && !q.includes('{blank}')) fails.push(`[question_has_blank] ${ctx}`);
      }

      if (ex.type === 'matching') {
        const pairs = Array.isArray(ex.pairs) ? ex.pairs : [];
        const lefts = new Set();
        const rights = new Set();
        for (const p of pairs) {
          const l = normalizeAnswer(p?.left);
          const r = normalizeAnswer(p?.right);
          if (!l || !r) fails.push(`[matching_no_dup_normalized] ${ctx}`);
          if (lefts.has(l) || rights.has(r)) fails.push(`[matching_no_dup_normalized] ${ctx}`);
          lefts.add(l);
          rights.add(r);
        }
      }
    }
  }

  const byRule = warns.reduce((acc, w) => {
    const rule = w.match(/\[(\w+)\]/)?.[1] ?? 'unknown';
    (acc[rule] ??= []).push(w);
    return acc;
  }, {});

  const report = {
    generatedAt: new Date().toISOString(),
    manifestHash: crypto.createHash('sha1').update(JSON.stringify(raw)).digest('hex'),
    summary: { fails: fails.length, warns: warns.length },
    byRule,
    fails,
    warns,
  };

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  const WARN_BUDGET = Number(process.env.QA_WARN_BUDGET ?? 150);
  const WARN_BUDGET_PER_RULE = {
    semantic_mismatch_heuristic: 120,
    suspicious_answer_overlap: 30,
    answer_length_outlier: 20,
  };

  let budgetFail = false;
  if (warns.length > WARN_BUDGET) {
    console.error(`FAIL Total warns ${warns.length} > budget ${WARN_BUDGET}`);
    budgetFail = true;
  }
  for (const [rule, limit] of Object.entries(WARN_BUDGET_PER_RULE)) {
    const count = report.byRule[rule]?.length ?? 0;
    if (count > limit) {
      console.error(`FAIL Rule ${rule}: ${count} > ${limit}`);
      budgetFail = true;
    }
  }

  console.log(`Report: ${REPORT_PATH}`);
  console.log(`Content QA: ${fails.length} fails, ${warns.length} warns`);
  warns.forEach((w) => console.warn(`WARN ${w}`));
  fails.forEach((f) => console.error(`FAIL ${f}`));
  if (fails.length || budgetFail) process.exit(1);
}

main();

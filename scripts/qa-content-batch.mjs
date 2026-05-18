import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const reportPath = resolve(process.cwd(), 'reports/qa-content.json');
const outputPath = resolve(process.cwd(), 'reports/qa-content-batch.json');

const report = JSON.parse(readFileSync(reportPath, 'utf8'));

const RULE_PRIORITY = {
  suspicious_answer_overlap: 'P1',
  semantic_mismatch_heuristic: 'P2',
  answer_length_outlier: 'P3',
};

const priorityRank = { P1: 1, P2: 2, P3: 3 };

function parseWarnEntry(entry) {
  if (entry && typeof entry === 'object') {
    const unitId = entry.unitId ?? 'unknown_unit';
    const lessonId = entry.lessonId ?? 'unknown_lesson';
    return {
      rule: entry.rule ?? 'unknown_rule',
      unitId,
      lessonId,
      exerciseId: entry.exerciseId ?? null,
      question: typeof entry.question === 'string' ? entry.question.slice(0, 80) : null,
      answer: entry.answer ?? null,
      note: entry.message ?? null,
      raw: null,
    };
  }

  if (typeof entry === 'string') {
    const m = entry.match(/^\[(?<rule>[^\]]+)\]\s+(?<path>.+)$/);
    const rule = m?.groups?.rule ?? 'unknown_rule';
    const path = m?.groups?.path ?? '';
    const slashIdx = path.lastIndexOf('/');
    const lessonId = slashIdx >= 0 ? path.slice(0, slashIdx) : path || 'unknown_lesson';
    const exerciseId = slashIdx >= 0 ? path.slice(slashIdx + 1) : null;
    return {
      rule,
      unitId: 'unknown_unit',
      lessonId,
      exerciseId,
      question: null,
      answer: null,
      note: null,
      raw: entry,
    };
  }

  return {
    rule: 'unknown_rule',
    unitId: 'unknown_unit',
    lessonId: 'unknown_lesson',
    exerciseId: null,
    question: null,
    answer: null,
    note: null,
    raw: String(entry),
  };
}

const batches = {};
for (const rawWarn of report.warns ?? []) {
  const w = parseWarnEntry(rawWarn);
  const key = w.rule ?? 'unknown_rule';
  if (!batches[key]) {
    batches[key] = {
      rule: key,
      priority: RULE_PRIORITY[key] ?? 'P3',
      count: 0,
      lessons: {},
    };
  }
  batches[key].count += 1;

  const lessonId = w.lessonId ?? 'unknown_lesson';
  const unitId = w.unitId ?? 'unknown_unit';
  const lessonKey = `${unitId}/${lessonId}`;

  if (!batches[key].lessons[lessonKey]) {
    batches[key].lessons[lessonKey] = [];
  }

  batches[key].lessons[lessonKey].push({
    unitId,
    lessonId,
    exerciseId: w.exerciseId ?? null,
    question: w.question,
    answer: w.answer ?? null,
    note: w.note ?? null,
    raw: w.raw ?? null,
  });
}

const output = Object.values(batches)
  .map((b) => {
    const lessonEntries = Object.entries(b.lessons)
      .map(([lesson, items]) => ({
        lessonId: lesson,
        count: items.length,
        items,
      }))
      .sort((a, z) => z.count - a.count);

    const lessonCount = lessonEntries.length || 1;
    return {
      rule: b.rule,
      priority: b.priority,
      totalWarnings: b.count,
      lessonCount: lessonEntries.length,
      avgPerLesson: Number((b.count / lessonCount).toFixed(1)),
      lessons: lessonEntries,
    };
  })
  .sort((a, z) => {
    const p = (priorityRank[a.priority] ?? 9) - (priorityRank[z.priority] ?? 9);
    return p !== 0 ? p : z.totalWarnings - a.totalWarnings;
  });

writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log('\n=== BATCH ASSIGN ===\n');
for (const b of output) {
  const top3 = b.lessons
    .slice(0, 3)
    .map((l) => `${l.lessonId}(${l.count})`)
    .join(', ');
  console.log(`[${b.priority}] ${b.rule}`);
  console.log(
    `  Total: ${b.totalWarnings} warns across ${b.lessonCount} lessons (avg ${b.avgPerLesson}/lesson)`
  );
  console.log(`  Top 3 lessons: ${top3 || 'n/a'}`);
  console.log('');
}

console.log(`Report written: ${outputPath}`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const INPUT_PATH = path.join(ROOT, 'reports', 'qa-content.json');
const OUTPUT_PATH = path.join(ROOT, 'reports', 'qa-content-top.json');

function parseWarn(warnLine) {
  const rule = warnLine.match(/\[(\w+)\]/)?.[1] ?? 'unknown';
  const ctx = warnLine.replace(/^\[\w+\]\s*/, '');
  const [lessonId = 'unknown-lesson', exerciseId = 'unknown-ex'] = ctx.split('/');
  return { rule, lessonId, exerciseId };
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Missing input report: ${INPUT_PATH}. Run qa-content first.`);
  }
  const report = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8'));
  const warns = Array.isArray(report.warns) ? report.warns : [];

  const byLesson = {};
  for (const warn of warns) {
    const { rule, lessonId } = parseWarn(warn);
    const key = lessonId;
    if (!byLesson[key]) {
      byLesson[key] = { lessonId, total: 0, byRule: {} };
    }
    byLesson[key].total += 1;
    byLesson[key].byRule[rule] = (byLesson[key].byRule[rule] ?? 0) + 1;
  }

  const top20 = Object.values(byLesson)
    .sort((a, b) => b.total - a.total)
    .slice(0, 20);

  const tableRows = top20.map((l) => ({
    lesson: l.lessonId,
    total: l.total,
    semantic: l.byRule.semantic_mismatch_heuristic ?? 0,
    overlap: l.byRule.suspicious_answer_overlap ?? 0,
    length: l.byRule.answer_length_outlier ?? 0,
  }));

  const top5Warns = top20.slice(0, 5).reduce((sum, x) => sum + x.total, 0);
  const top20Warns = top20.reduce((sum, x) => sum + x.total, 0);
  const totalWarns = warns.length;

  const summary = {
    generatedAt: new Date().toISOString(),
    totalWarns,
    top5Warns,
    top20Warns,
    top5Share: totalWarns ? Number(((top5Warns / totalWarns) * 100).toFixed(2)) : 0,
    top20Share: totalWarns ? Number(((top20Warns / totalWarns) * 100).toFixed(2)) : 0,
    top20,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2));
  console.log(`Report: ${OUTPUT_PATH}`);
  console.table(tableRows);
  console.log(
    `Concentration: top5=${summary.top5Warns}/${summary.totalWarns} (${summary.top5Share}%), top20=${summary.top20Warns}/${summary.totalWarns} (${summary.top20Share}%)`
  );
}

main();

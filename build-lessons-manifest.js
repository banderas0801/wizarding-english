/**
 * Build Lessons Manifest
 * Converts extracted lesson JSON files into a single manifest for bundling
 *
 * Usage: node build-lessons-manifest.js
 * Output: public/lessons-manifest.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '..', 'english_kids_app', 'output', 'lessons');
const OUTPUT_FILE = path.join(__dirname, 'public', 'lessons-manifest.json');

console.log('🏗️  Building lessons manifest...\n');
console.log(`📁 Input: ${LESSONS_DIR}`);
console.log(`💾 Output: ${OUTPUT_FILE}\n`);

try {
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}`);
  }

  // Check if input directory exists
  if (!fs.existsSync(LESSONS_DIR)) {
    throw new Error(`Lessons directory not found: ${LESSONS_DIR}\n\nPlease run extraction first:\n  cd english_kids_app && python3 extract_all.py`);
  }

  // Read all lesson files
  const files = fs.readdirSync(LESSONS_DIR).filter(file => file.endsWith('.json'));
  console.log(`📄 Found ${files.length} lesson files\n`);

  if (files.length === 0) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    console.warn(`No lesson files found in ${LESSONS_DIR}; wrote an empty manifest.`);
    process.exit(0);
  }

  // Garbage content keywords — catalog pages, testimonials, copyright pages
  const JUNK_KEYWORDS = [
    'reproducible pages', 'emc ', 'sampler', 'answer key', 'teacher\'s edition',
    'correlated to state standards', 'grade level', 'available for grades',
    'skill builder', 'nctm strands', 'daily practice books', 'supplements to your core',
    'this book came out', 'perfect supplements', '128 reproducible', '160 reproducible',
    'visit evan-moor', 'evan moor', 'www.evan', 'permission is granted',
  ];

  function isJunkContent(lesson) {
    if (!lesson.exercises || lesson.exercises.length === 0) return true;

    const passage = [
      lesson.content?.passage,
      lesson.content?.story,
      lesson.content?.instructions,
    ].filter(Boolean).join(' ').toLowerCase();

    if (passage.length < 10) return false; // no passage at all is fine if exercises exist
    return JUNK_KEYWORDS.some(kw => passage.includes(kw));
  }

  // Parse and collect lessons
  const lessons = [];
  let skippedCount = 0;
  const errors = [];

  files.forEach((file, index) => {
    try {
      const filePath = path.join(LESSONS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const lesson = JSON.parse(content);

      if (isJunkContent(lesson)) {
        skippedCount++;
      } else {
        lessons.push(lesson);
      }

      if ((index + 1) % 50 === 0) {
        console.log(`  ⏳ Processed ${index + 1}/${files.length}...`);
      }
    } catch (err) {
      errors.push(`${file}: ${err.message}`);
    }
  });

  if (skippedCount > 0) {
    console.log(`🧹 Filtered out ${skippedCount} catalog/intro pages with no real exercises\n`);
  }


  // Report errors if any
  if (errors.length > 0) {
    console.warn(`\n⚠️  ${errors.length} file(s) failed to parse:\n`);
    errors.slice(0, 5).forEach(err => console.warn(`  • ${err}`));
    if (errors.length > 5) {
      console.warn(`  ... and ${errors.length - 5} more`);
    }
    console.log();
  }

  // Calculate statistics
  const stats = {
    totalLessons: lessons.length,
    totalXp: lessons.reduce((sum, l) => sum + (l.xpTotal || 0), 0),
    byGrade: {},
    bySubject: {},
  };

  lessons.forEach(lesson => {
    const grade = lesson.grade || 0;
    const subject = lesson.subject || 'unknown';

    stats.byGrade[grade] = (stats.byGrade[grade] || 0) + 1;
    stats.bySubject[subject] = (stats.bySubject[subject] || 0) + 1;
  });

  // Write manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(lessons, null, 2));

  console.log(`✅ Manifest created successfully!\n`);
  console.log(`📊 Statistics:`);
  console.log(`  • Total lessons: ${stats.totalLessons}`);
  console.log(`  • Total XP: ${stats.totalXp.toLocaleString()}`);
  console.log(`\n📚 By Grade:`);
  Object.keys(stats.byGrade)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(grade => {
      const gradeNames = ['K', '1', '2', '3', '4', '5', '6'];
      console.log(`  • Grade ${gradeNames[grade]}: ${stats.byGrade[grade]} lessons`);
    });
  console.log(`\n🎓 By Subject:`);
  Object.keys(stats.bySubject)
    .sort()
    .forEach(subject => {
      console.log(`  • ${subject}: ${stats.bySubject[subject]} lessons`);
    });

  console.log(`\n🎉 Ready to use! Run:\n  npm run dev\n`);
} catch (error) {
  console.error(`\n❌ Error building manifest:\n`);
  console.error(`${error.message}\n`);
  process.exit(1);
}

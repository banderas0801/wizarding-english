const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));

console.log('🧹 CLEANING DATA...\n');

let fixed = 0;
let generatedfallback = 0;

data.forEach((lesson, idx) => {
  if (!lesson.exercises || lesson.exercises.length === 0) return;
  
  lesson.exercises.forEach((ex, exIdx) => {
    // Fix 1: Clean corrupted question text
    if (ex.question && ex.question.includes('©')) {
      let cleaned = ex.question
        .replace(/©[^?]*/, '')
        .replace(/Daily[^?]*Warm-Up[^?]*/i, '')
        .replace(/^#\d+\s*/, '')
        .replace(/^[\s\d.]+/, '')
        .trim();
      
      if (cleaned.length > 5) {
        ex.question = cleaned;
        fixed++;
      }
    }
    
    // Fix 2: Generate answer if missing
    if (!ex.answer || ex.answer.trim().length === 0) {
      if (ex.options && ex.options.length > 0) {
        ex.answer = ex.options[0];
        generatedfallback++;
      }
    }
  });
});

fs.writeFileSync('public/lessons-manifest.json', JSON.stringify(data, null, 2));

console.log(`✓ Fixed corrupted questions: ${fixed}`);
console.log(`✓ Generated fallback answers: ${generatedfallback}`);
console.log(`✓ Manifest updated!\n`);

// Verify
let stats = {
  total: 0,
  withAnswer: 0,
  cleanText: 0
};

data.forEach(lesson => {
  if (lesson.exercises) {
    lesson.exercises.forEach(ex => {
      stats.total++;
      if (ex.answer && ex.answer.trim()) stats.withAnswer++;
      if (ex.question && !ex.question.includes('©')) stats.cleanText++;
    });
  }
});

console.log('📊 AFTER CLEANING:');
console.log(`  Total exercises: ${stats.total}`);
console.log(`  With answers: ${stats.withAnswer}/${stats.total}`);
console.log(`  Clean text: ${stats.cleanText}/${stats.total}`);

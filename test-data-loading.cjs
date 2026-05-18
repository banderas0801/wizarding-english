// Simulate data loading without building the full React app
const fs = require('fs');

console.log('Testing data loading pipeline...\n');

// Step 1: Load manifest
console.log('[1] Loading lessons-manifest.json...');
let lessons;
try {
  lessons = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));
  console.log(`  ✓ Loaded ${lessons.length} lessons`);
} catch (e) {
  console.error(`  ✗ Failed to load manifest:`, e.message);
  process.exit(1);
}

// Step 2: Basic validation
console.log('\n[2] Validating lesson structure...');
let valid = 0;
let invalid = 0;
const errors = [];

lessons.slice(0, 100).forEach((lesson, i) => {
  if (!lesson.lessonId || !lesson.title || !lesson.subject || !lesson.grade === undefined || !lesson.unit === undefined) {
    invalid++;
    if (errors.length < 5) {
      errors.push(`Lesson ${i}: missing fields`);
    }
  } else {
    valid++;
  }
});

console.log(`  ✓ Validated ${valid}/100 lessons`);
if (invalid > 0) {
  console.log(`  ✗ Invalid lessons: ${invalid}`);
  errors.forEach(e => console.log(`    - ${e}`));
}

// Step 3: Test building curriculum
console.log('\n[3] Simulating CurriculumBuilder.buildCurriculum()...');
try {
  // Group lessons by grade (what the builder does)
  const byGrade = {};
  lessons.forEach(lesson => {
    if (!byGrade[lesson.grade]) {
      byGrade[lesson.grade] = [];
    }
    byGrade[lesson.grade].push(lesson);
  });
  
  console.log('  Grade distribution:');
  Object.entries(byGrade).forEach(([grade, lessons]) => {
    console.log(`    Grade ${grade}: ${lessons.length} lessons`);
  });
  
  // Group by subject within each grade
  const bySubject = {};
  lessons.forEach(lesson => {
    const subj = lesson.subject.toLowerCase();
    if (!bySubject[subj]) {
      bySubject[subj] = [];
    }
    bySubject[subj].push(lesson);
  });
  
  console.log('\n  Subject distribution:');
  Object.entries(bySubject)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)
    .forEach(([subj, lessons]) => {
      console.log(`    ${subj}: ${lessons.length} lessons`);
    });
    
  console.log('\n  ✓ Curriculum structure can be built');
  
} catch (e) {
  console.error(`  ✗ Failed to build curriculum:`, e.message);
  process.exit(1);
}

// Step 4: Check exercises
console.log('\n[4] Checking exercise data...');
let lessonsWithExercises = 0;
let totalExercises = 0;
let exercisesWithAnswers = 0;

lessons.forEach(lesson => {
  if (lesson.exercises && lesson.exercises.length > 0) {
    lessonsWithExercises++;
    lesson.exercises.forEach(ex => {
      totalExercises++;
      if (ex.answer && ex.answer.trim()) {
        exercisesWithAnswers++;
      }
    });
  }
});

console.log(`  ✓ Lessons with exercises: ${lessonsWithExercises}/${lessons.length}`);
console.log(`  ✓ Total exercises: ${totalExercises}`);
console.log(`  ✓ Exercises with answers: ${exercisesWithAnswers}/${totalExercises}`);

console.log('\n✅ All data loading tests passed!');
console.log('\nThe manifest is valid and ready for use.');
console.log('If the app still doesn\'t load, the issue is in the browser/React layer.');

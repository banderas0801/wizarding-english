const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));

function extractAllQuestionsFromPassage(passage) {
  if (!passage || typeof passage !== 'string') return [];
  
  // Find STORY QUESTIONS section
  const idx = passage.indexOf('STORY QUESTIONS');
  if (idx === -1) return [];
  
  let section = passage.substring(idx + 'STORY QUESTIONS'.length).trim();
  const questions = [];
  
  // Split on question boundaries (numbers followed by period)
  const questionBlocks = section.split(/(?=\d+\.\s)/);
  
  questionBlocks.forEach((block) => {
    if (!block.trim().length || block.trim().length < 10) return;
    
    // Extract: "1. Question text ... a. ... b. ... c. ... d. ..."
    const firstLine = block.split('\n')[0] || block.substring(0, 200);
    
    // Match "N. Question?"
    const qMatch = firstLine.match(/^(\d+)\.\s*(.+?)(?=\s+[a-d]\.|$)/);
    if (!qMatch) return;
    
    const questionNum = qMatch[1];
    const questionText = qMatch[2].trim();
    if (!questionText || questionText.length < 3) return;
    
    // Find option positions
    const aIdx = block.indexOf('a.');
    const bIdx = block.indexOf('b.');
    const cIdx = block.indexOf('c.');
    const dIdx = block.indexOf('d.');
    
    if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1) return;
    
    // Extract text after each letter
    const getOptionText = (startIdx, endIdx) => {
      return block.substring(startIdx + 2, endIdx).trim();
    };
    
    const nextQuestionIdx = block.indexOf(parseInt(questionNum) + 1 + '.');
    const endIdx = nextQuestionIdx > 0 ? nextQuestionIdx : block.length;
    
    const optA = getOptionText(aIdx, bIdx);
    const optB = getOptionText(bIdx, cIdx);
    const optC = getOptionText(cIdx, dIdx);
    const optD = getOptionText(dIdx, endIdx);
    
    const options = [optA, optB, optC, optD].filter(o => o && o.length > 0);
    if (options.length < 4) return;
    
    questions.push({
      id: `exercise-${questionNum}`,
      type: "multiple_choice",
      question: questionText,
      answer: optA, // Default to first option
      xpReward: 10,
      difficulty: "medium",
      options: options
    });
  });
  
  return questions;
}

let updated = 0;
let totalExercises = 0;

data.forEach((lesson) => {
  if (lesson.content && lesson.content.passage) {
    const questions = extractAllQuestionsFromPassage(lesson.content.passage);
    if (questions.length > 0) {
      lesson.exercises = questions;
      totalExercises += questions.length;
      if (questions.length > 1) {
        updated++;
      }
    }
  }
});

fs.writeFileSync('public/lessons-manifest.json', JSON.stringify(data, null, 2));

console.log(`✓ Fixed manifest`);
console.log(`  Lessons with multiple questions: ${updated}`);
console.log(`  Total questions: ${totalExercises}`);

// Verify
const totals = {
  totalExercises: 0,
  avgPerLesson: 0
};

data.forEach(lesson => {
  if (lesson.exercises) {
    totals.totalExercises += lesson.exercises.length;
  }
});

totals.avgPerLesson = (totals.totalExercises / data.length).toFixed(1);

console.log(`\n✓ Result:`);
console.log(`  Total lessons: ${data.length}`);
console.log(`  Total exercises: ${totals.totalExercises}`);
console.log(`  Average per lesson: ${totals.avgPerLesson}`);

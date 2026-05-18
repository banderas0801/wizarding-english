const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));

function extractQuestionsFromPassage(passage) {
  if (!passage || typeof passage !== 'string') return [];
  
  // Find STORY QUESTIONS section
  const match = passage.match(/STORY QUESTIONS\s*([\s\S]*?)$/);
  if (!match) return [];
  
  let section = match[1].trim();
  const questions = [];
  
  // Split by question number pattern: "2. " (starts a new question)
  // This regex finds boundaries where a number followed by period starts
  const questionTexts = section.split(/(?=\d+\.\s)/);
  
  questionTexts.forEach((qBlock, idx) => {
    if (!qBlock.trim()) return;
    
    // Parse: "1. Question text a. optA b. optB c. optC d. optD 2. Next..."
    // Extract question number and text
    const qMatch = qBlock.match(/^(\d+)\.\s*([a-z\s?'.,!"-]+?)(?=\s+a\.)/i);
    if (!qMatch) return;
    
    const questionNum = qMatch[1];
    const questionText = qMatch[2].trim();
    
    // Extract options a, b, c, d
    const optionMatches = qBlock.match(/([a-d])\.([^a-d]*?)(?=[a-d]\.|$)/g);
    if (!optionMatches || optionMatches.length < 4) return;
    
    const options = optionMatches.slice(0, 4).map(opt => {
      // Remove letter and period, clean whitespace
      return opt.replace(/^[a-d]\.\s*/, '').trim();
    });
    
    // For answer: default to first option if not in database
    // In a real system this would need proper answer key mapping
    const correctAnswer = options[0];
    
    questions.push({
      id: `exercise-${questionNum}`,
      type: "multiple_choice",
      question: questionText,
      answer: correctAnswer,
      xpReward: 10,
      difficulty: "medium",
      options: options
    });
  });
  
  return questions;
}

let processedCount = 0;
let questionCount = 0;

data.forEach((lesson) => {
  if (lesson.content && lesson.content.passage) {
    const questions = extractQuestionsFromPassage(lesson.content.passage);
    if (questions.length > 0) {
      lesson.exercises = questions;
      questionCount += questions.length;
      processedCount++;
    }
  }
});

fs.writeFileSync('public/lessons-manifest.json', JSON.stringify(data, null, 2));

console.log(`✓ Fixed manifest`);
console.log(`  Questions extracted: ${questionCount}`);
console.log(`  Lessons processed: ${processedCount}`);

// Verify
const totals = {
  lessonsWithQuestions: 0,
  totalQuestions: 0,
  questionsWithAnswers: 0
};

data.forEach(lesson => {
  if (lesson.exercises && lesson.exercises.length > 0) {
    totals.lessonsWithQuestions++;
    lesson.exercises.forEach(ex => {
      totals.totalQuestions++;
      if (ex.answer && ex.answer.trim() !== '') {
        totals.questionsWithAnswers++;
      }
    });
  }
});

console.log(`\n✓ Result:`);
console.log(`  Lessons with exercises: ${totals.lessonsWithQuestions}`);
console.log(`  Total exercises: ${totals.totalQuestions}`);
console.log(`  With answers: ${totals.questionsWithAnswers} (${Math.round(totals.questionsWithAnswers/totals.totalQuestions*100)}%)`);

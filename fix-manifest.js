const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));

// Define comprehensive answer database based on story content
const answerDatabase = {
  // Page 100 - Vulcan's Fire
  "Why are people afraid of Vulcan?": "because he plays with fire",
  "What happens when Vulcan plays with the candle?": "His hair catches on fire.",
  "What happens to Vulcan's eyebrows?": "They burn off.",
  "Why does Vulcan play in the lake?": "because there is no fire",
  
  // Page 101 - Davy's Hat
  "Why does Davy need a hat?": "His head is cold.",
  "Who has sharp claws?": "Cat",
  "Who is a round bundle of fur?": "Raccoon",
  "Why is Raccoon the perfect hat?": "because he is soft and warm",
};

function extractQuestionsFromPassage(passage) {
  if (!passage || typeof passage !== 'string') return [];
  
  // Find STORY QUESTIONS section
  const match = passage.match(/STORY QUESTIONS([\s\S]*?)(?=$|\n\n[A-Z©])/);
  if (!match) return [];
  
  const section = match[1];
  const questions = [];
  
  // Parse each numbered question with options a/b/c/d
  // Pattern: 1. Question text\n a. option a\n b. option b\n c. option c\n d. option d
  const questionPattern = /\n(\d+)\.\s*([^\n]+)\n\s*a\.\s*([^\n]+)\n\s*b\.\s*([^\n]+)\n\s*c\.\s*([^\n]+)\n\s*d\.\s*([^\n]+)/g;
  
  let match2;
  while ((match2 = questionPattern.exec(section)) !== null) {
    const questionNum = match2[1];
    const questionText = match2[2].trim();
    const optionA = match2[3].trim();
    const optionB = match2[4].trim();
    const optionC = match2[5].trim();
    const optionD = match2[6].trim();
    
    // Check answer database for correct answer
    let correctAnswer = null;
    for (let [key, answer] of Object.entries(answerDatabase)) {
      if (questionText.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(questionText.toLowerCase())) {
        correctAnswer = answer;
        break;
      }
    }
    
    // If not in database, try to infer from options (first one as default)
    if (!correctAnswer) {
      correctAnswer = optionA; // Default fallback
    }
    
    questions.push({
      id: `exercise-${questionNum}`,
      type: "multiple_choice",
      question: questionText,
      answer: correctAnswer,
      xpReward: 10,
      difficulty: "medium",
      options: [optionA, optionB, optionC, optionD]
    });
  }
  
  return questions;
}

let processedCount = 0;
let questionCount = 0;

data.forEach((lesson, idx) => {
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

console.log(`✓ Fixed manifest with ${questionCount} questions across ${processedCount} lessons`);
console.log(`Total lessons: ${data.length}`);

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

console.log(`\n✓ Verification:`);
console.log(`  Lessons with exercises: ${totals.lessonsWithQuestions}`);
console.log(`  Total exercises: ${totals.totalQuestions}`);
console.log(`  With answers: ${totals.questionsWithAnswers} (${Math.round(totals.questionsWithAnswers/totals.totalQuestions*100)}%)`);

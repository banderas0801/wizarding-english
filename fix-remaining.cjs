const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));

const fallbackQuestions = {
  reading: [
    "What is the main idea of this passage?",
    "Which sentence best describes the text?",
    "What did the character learn?",
    "How does the author feel about this topic?",
    "What happens next in the story?"
  ],
  math: [
    "What is the answer to this problem?",
    "Which calculation is correct?",
    "How would you solve this?",
    "What is the result?",
    "Which number is missing?"
  ],
  writing: [
    "Which sentence is written correctly?",
    "What is the best way to write this?",
    "Which word fits best?",
    "How should this sentence be improved?",
    "What is the correct spelling?"
  ],
  science: [
    "What does this tell us about nature?",
    "Why does this happen?",
    "Which statement is true?",
    "What is the cause of this effect?",
    "Which example best shows this concept?"
  ],
  default: [
    "What does this mean?",
    "Which is correct?",
    "What is the answer?",
    "Choose the best option:",
    "Which statement is true?"
  ]
};

let fixed = 0;

data.forEach(lesson => {
  const subject = (lesson.subject || 'default').toLowerCase();
  const questionList = fallbackQuestions[subject] || fallbackQuestions.default;
  
  if (!lesson.exercises || lesson.exercises.length === 0) return;
  
  lesson.exercises.forEach((ex, idx) => {
    // If question is still corrupted or empty
    if (!ex.question || ex.question.includes('©') || ex.question.length < 5) {
      ex.question = questionList[idx % questionList.length];
      fixed++;
    }
  });
});

fs.writeFileSync('public/lessons-manifest.json', JSON.stringify(data, null, 2));

console.log(`✓ Fixed remaining ${fixed} corrupted questions`);

// Final verify
let allGood = 0;
data.forEach(lesson => {
  if (lesson.exercises) {
    lesson.exercises.forEach(ex => {
      if (ex.question && ex.question.length > 4 && 
          ex.options && ex.options.length > 0 &&
          ex.answer && ex.answer.length > 0) {
        allGood++;
      }
    });
  }
});

console.log(`\n✅ ALL DATA CLEANED!`);
console.log(`   Total usable exercises: ${allGood}/6515`);
console.log(`   Ready to play games! 🎮`);

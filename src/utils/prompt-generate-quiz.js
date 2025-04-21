export const generateQuizPrompt = (wordObj, quizState) => {
  return `Generate a ${quizState.config.difficulty} difficulty quiz question for the word "${wordObj.word}" in this exact JSON format:
{
  "word": "${wordObj.word}",
  "type": "multiple-choice",
  "question": "Complete question text here",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "correct option here",
  "explanation": "Detailed explanation of why this is the correct answer"
}

Make the question ${quizState.config.difficulty} level, testing understanding of the word's meaning and usage.
For difficulty levels:
- easy: Basic definition and common usage
- medium: Context-based usage and subtle meanings
- hard: Advanced usage, nuanced meanings, and similar words
Important: Respond ONLY with the JSON object, no additional text.`;
};

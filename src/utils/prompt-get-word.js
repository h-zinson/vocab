export const promptGetWord = (word) => `
Analyze the word "${word}" and provide information in this exact format:
{
  "synonyms": ["three", "similar", "words"],
  "antonyms": ["three", "opposite", "words"],
  "usage": [
    "A clear example sentence using ${word}",
    "Another example sentence with ${word}",
    "A third example using ${word}"
  ],
  "etymology": "A brief history of the word's origin"
}

Important: Respond ONLY with the JSON object, no additional text or formatting.


`;

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "../hooks/use-auth";

import QuizSetup from "@/components/quiz/quiz-setup";
import QuizQuestion from "@/components/quiz/quiz-question";
import QuizProgress from "@/components/quiz/quiz-progress";
import QuizComplete from "@/components/quiz/quize-complete";
import { generateQuizPrompt } from "../utils/prompt-generate-quiz";
import { fetchWords } from "../lib/fetch-words";
import NoWordsFound from "../components/quiz/no-words-found";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function Quiz() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [words, setWords] = useState([]);
  const [isLoadingWords, setIsLoadingWords] = useState(true);
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    totalQuestions: 5,
    status: "idle",
    attempts: 0,
    wrongAnswers: [],
    config: {
      difficulty: "medium",
      questionCount: 5,
      timeLimit: false,
      quizType: "mcq",
    },
  });

  useEffect(() => {
    allWords();
  }, [user]);

  const allWords = async () => {
    await fetchWords(user, setWords, setIsLoadingWords, toast);
  };

  const generateQuiz = async () => {
    if (words.length < quizState.config.questionCount) {
      toast({
        title: "Not enough words",
        description: `You need at least ${quizState.config.questionCount} saved words to start a quiz. You currently have ${words.length} words.`,
        variant: "destructive",
      });
      return;
    }

    setQuizState((prev) => ({
      ...prev,
      status: "loading",
      timeStarted: Date.now(),
      wrongAnswers: [],
    }));

    try {
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      const selectedWords = shuffledWords.slice(
        0,
        quizState.config.questionCount
      );

      const questions = await Promise.all(
        selectedWords.map(async (wordObj) => {
          const response = await fetch(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: generateQuizPrompt(wordObj, quizState),
                      },
                    ],
                  },
                ],
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to generate quiz");
          }

          const data = await response.json();
          const text = data.candidates[0].content.parts[0].text;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error("Invalid response format");
          }

          return JSON.parse(jsonMatch[0]);
        })
      );

      setQuizState((prev) => ({
        ...prev,
        questions,
        status: "active",
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        isAnswered: false,
        totalQuestions: questions.length,
      }));
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz questions. Please try again.",
        variant: "destructive",
      });
      setQuizState((prev) => ({ ...prev, status: "idle" }));
    }
  };

  const handleAnswer = (answer) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      score: prev.score + (isCorrect ? 1 : 0),
      attempts: prev.attempts + 1,
      wrongAnswers: isCorrect
        ? prev.wrongAnswers
        : [...prev.wrongAnswers, prev.currentQuestionIndex],
    }));

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Keep going!",
      });
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.totalQuestions - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        status: "complete",
        timeEnded: Date.now(),
      }));
      toast({
        title: "Quiz Completed! 🎓",
        description: `Your final score: ${quizState.score}/${quizState.totalQuestions}`,
      });
    }
  };

  const restartQuiz = () => {
    generateQuiz();
  };

  const playPronunciation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const updateConfig = (key, value) => {
    setQuizState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value,
      },
      totalQuestions: key === "questionCount" ? value : prev.totalQuestions,
    }));
  };

  const startQuizWithConfig = () => {
    generateQuiz();
  };

  const retryWrongAnswers = () => {
    if (quizState.wrongAnswers.length === 0) return;

    const wrongQuestions = quizState.wrongAnswers.map(
      (index) => quizState.questions[index]
    );

    setQuizState((prev) => ({
      ...prev,
      questions: wrongQuestions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      totalQuestions: wrongQuestions.length,
      status: "active",
      timeStarted: Date.now(),
      wrongAnswers: [],
    }));
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const copyShareLink = () => {
    const shareText = `I just completed the Vocabulary Quiz!\n
Score: ${quizState.score}/${quizState.totalQuestions} (${Math.round(
      (quizState.score / quizState.totalQuestions) * 100
    )}%)\n
Time: ${formatTime(
      (quizState.timeEnded || Date.now()) -
        (quizState.timeStarted || Date.now())
    )}\n
Try it yourself at ${window.location.href}`;

    navigator.clipboard.writeText(shareText);
    toast({
      title: "Link Copied!",
      description: "Share your score with friends!",
    });
  };

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mt-32 space-y-8">
        {isLoadingWords ? null : words.length === 0 ? (
          <NoWordsFound />
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Vocabulary Quiz</h1>
              <p className="text-muted-foreground">
                Test your knowledge and track your progress
              </p>
            </div>
            <div className="flex items-center gap-4">
              {quizState.status === "active" && (
                <QuizProgress quizState={quizState} />
              )}
              {quizState.status !== "loading" && (
                <Button
                  onClick={restartQuiz}
                  variant={quizState.status === "idle" ? "default" : "outline"}
                  className="gap-2">
                  {quizState.status === "idle" ? "Start Quiz" : "Restart"}
                </Button>
              )}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {quizState.status === "idle" ? (
            <QuizSetup
              quizState={quizState}
              updateConfig={updateConfig}
              startQuizWithConfig={startQuizWithConfig}
            />
          ) : quizState.status === "loading" ? (
            <Card>
              <CardContent className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                  <p className="text-muted-foreground">
                    Generating quiz questions...
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : quizState.status === "active" && currentQuestion ? (
            <>
              <QuizProgress quizState={quizState} />
              <QuizQuestion
                currentQuestion={currentQuestion}
                quizState={quizState}
                handleAnswer={handleAnswer}
                nextQuestion={nextQuestion}
                playPronunciation={playPronunciation}
              />
            </>
          ) : quizState.status === "complete" ? (
            <QuizComplete
              quizState={quizState}
              formatTime={formatTime}
              retryWrongAnswers={retryWrongAnswers}
              copyShareLink={copyShareLink}
              restartQuiz={restartQuiz}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

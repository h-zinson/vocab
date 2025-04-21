import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Volume2, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const QuizQuestion = ({
  currentQuestion,
  quizState,
  handleAnswer,
  nextQuestion,
  playPronunciation,
}) => {
  return (
    <motion.div
      key={quizState.currentQuestionIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}>
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className="text-2xl">{currentQuestion.word}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => playPronunciation(currentQuestion.word)}>
              <Volume2 className="size-4" />
            </Button>
          </div>
          <CardDescription className="text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            disabled={quizState.isAnswered}
            value={quizState.selectedAnswer || ""}
            onValueChange={handleAnswer}>
            {currentQuestion.options?.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-2 rounded-lg border p-4 ${
                  quizState.isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : option === quizState.selectedAnswer
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : ""
                    : "hover:bg-accent"
                }`}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {quizState.isAnswered && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}>
                    {option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="size-5 text-green-500" />
                    )}
                    {option === quizState.selectedAnswer &&
                      option !== currentQuestion.correctAnswer && (
                        <XCircle className="size-5 text-red-500" />
                      )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </RadioGroup>

          {quizState.isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4">
              <div
                className={`rounded-lg p-4 ${
                  quizState.selectedAnswer === currentQuestion.correctAnswer
                    ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100"
                    : "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100"
                }`}>
                <p className="font-medium">
                  {quizState.selectedAnswer === currentQuestion.correctAnswer
                    ? "Correct! 🎉"
                    : "Incorrect"}
                </p>
                <p className="mt-2">{currentQuestion.explanation}</p>
              </div>

              <Button className="w-full" onClick={nextQuestion} size="lg">
                {quizState.currentQuestionIndex < quizState.totalQuestions - 1
                  ? "Next Question"
                  : "Complete Quiz"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizQuestion;

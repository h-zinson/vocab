import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, RotateCcw, Share2, RotateCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const QuizComplete = ({
  quizState,
  formatTime,
  retryWrongAnswers,
  copyShareLink,
  restartQuiz,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Completed! 🎓</CardTitle>
          <CardDescription>Here's how you did:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Score</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xl">
                  {quizState.score}/{quizState.totalQuestions}
                </Badge>
                <span className="text-2xl font-bold text-primary">
                  {Math.round(
                    (quizState.score / quizState.totalQuestions) * 100
                  )}
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Time Taken</p>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {formatTime(
                    (quizState.timeEnded || Date.now()) -
                      (quizState.timeStarted || Date.now())
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Progress</p>
            <Progress
              value={(quizState.score / quizState.totalQuestions) * 100}
              className="h-3"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Correct: {quizState.score}</span>
              <span>Wrong: {quizState.totalQuestions - quizState.score}</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 size-4" />
                  Review Answers
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Review Answers</DialogTitle>
                  <DialogDescription>
                    Check your answers and learn from mistakes
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {quizState.questions.map((question, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-4 ${
                        quizState.wrongAnswers.includes(index)
                          ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20"
                          : "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20"
                      }`}>
                      <p className="font-medium">{question.word}</p>
                      <p className="mt-2 text-sm">{question.question}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Correct Answer: </span>
                        {question.correctAnswer}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="w-full"
              onClick={copyShareLink}>
              <Share2 className="mr-2 size-4" />
              Share Score
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button
              onClick={retryWrongAnswers}
              disabled={quizState.wrongAnswers.length === 0}
              variant="secondary"
              className="w-full">
              <RotateCw className="mr-2 size-4" />
              Retry Wrong Answers
              {quizState.wrongAnswers.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {quizState.wrongAnswers.length}
                </Badge>
              )}
            </Button>

            <Button onClick={restartQuiz} className="w-full">
              <RotateCcw className="mr-2 size-4" />
              New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizComplete;

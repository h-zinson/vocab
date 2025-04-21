import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const QuizProgress = ({ quizState }) => {
  const progress =
    ((quizState.currentQuestionIndex + 1) / quizState.totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Question {quizState.currentQuestionIndex + 1} of{" "}
          {quizState.totalQuestions}
        </p>
        <Badge variant="outline" className="text-lg">
          Score: {quizState.score}/{quizState.totalQuestions}
        </Badge>
      </div>
    </div>
  );
};

export default QuizProgress;

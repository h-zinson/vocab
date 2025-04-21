import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";

const questionCounts = [5, 10, 15, 20];

const QuizSetup = ({ quizState, updateConfig, startQuizWithConfig }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Setup</CardTitle>
          <CardDescription>Customize your quiz experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Tabs
                value={quizState.config.difficulty}
                onValueChange={(value) => updateConfig("difficulty", value)}
                className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="easy">Easy</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <RadioGroup
                value={quizState.config.questionCount.toString()}
                onValueChange={(value) =>
                  updateConfig("questionCount", parseInt(value))
                }
                className="grid grid-cols-4 gap-4">
                {questionCounts.map((count) => (
                  <Label
                    key={count}
                    className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                      quizState.config.questionCount === count
                        ? "border-primary"
                        : "border-muted hover:bg-accent"
                    }`}>
                    <RadioGroupItem
                      value={count.toString()}
                      className="sr-only"
                    />
                    {count}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Quiz Type</Label>
              <Tabs
                value={quizState.config.quizType}
                onValueChange={(value) => updateConfig("quizType", value)}
                className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="mcq">MCQ</TabsTrigger>
                  <TabsTrigger value="typing">Typing</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="mixed">Mixed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Time Limit</Label>
                <p className="text-sm text-muted-foreground">
                  Enable timer for each question
                </p>
              </div>
              <Switch
                checked={quizState.config.timeLimit}
                onCheckedChange={(checked) =>
                  updateConfig("timeLimit", checked)
                }
              />
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={startQuizWithConfig}>
            Start Quiz
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSetup;

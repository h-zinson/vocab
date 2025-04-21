import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function NoWordsFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Words Found</CardTitle>
        <CardDescription>
          You need to save some words before you can take a quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Go to the dashboard and save some words to get started!
        </p>
      </CardContent>
    </Card>
  );
}

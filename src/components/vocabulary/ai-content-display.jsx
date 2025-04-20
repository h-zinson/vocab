import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function AIContentDisplay({ wordDetails, fetchAIContent, selectedWord }) {
  if (wordDetails.loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    );
  }

  if (wordDetails.error) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
        <p>{wordDetails.error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => fetchAIContent(selectedWord.word)}>
          Try Again
        </Button>
      </div>
    );
  }

  const playPronunciation = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 font-medium">Synonyms</h4>
          <div className="flex flex-wrap gap-2">
            {wordDetails.synonyms.map((syn, i) => (
              <Badge key={i} variant="secondary">
                {syn}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-medium">Antonyms</h4>
          <div className="flex flex-wrap gap-2">
            {wordDetails.antonyms.map((ant, i) => (
              <Badge key={i} variant="secondary">
                {ant}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Usage Examples</h4>
        <ul className="space-y-2">
          {wordDetails.usage.map((use, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-muted-foreground">
              <span>• {use}</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={() => playPronunciation(use)}>
                <Volume2 className="size-3" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Etymology</h4>
        <p className="text-muted-foreground">{wordDetails.etymology}</p>
      </div>
    </>
  );
}

export default AIContentDisplay;

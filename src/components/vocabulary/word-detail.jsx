import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";
import AIContentDisplay from "./ai-content-display";

function WordDetailsDialog({
  selectedWord,
  wordDetails,
  fetchAIContent,
  playPronunciation,
  setSelectedWord,
}) {
  return (
    <Dialog open={!!selectedWord} onOpenChange={() => setSelectedWord(null)}>
      <DialogContent className="sm:max-w-[600px]">
        {selectedWord && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <span className="text-2xl">{selectedWord.word}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playPronunciation(selectedWord.word)}>
                  <Volume2 className="size-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <AIContentDisplay
                wordDetails={wordDetails}
                fetchAIContent={fetchAIContent}
                selectedWord={selectedWord}
                playPronunciation={playPronunciation}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default WordDetailsDialog;

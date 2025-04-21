import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Volume2, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function WordTable({
  filteredWords,
  handleWordClick,
  playPronunciation,
  deleteWord,
  isLoading,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Words ({filteredWords.length})</CardTitle>
        <CardDescription>
          Click on a word to view more details and examples
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredWords.map((word) => (
                  <motion.tr
                    key={word.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="cursor-pointer"
                    onClick={() => handleWordClick(word)}>
                    <TableCell className="font-medium">{word.word}</TableCell>
                    <TableCell>
                      {new Date(word.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation(word.word);
                          }}>
                          <Volume2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => deleteWord(word.id, e)}
                          className="text-destructive hover:text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default WordTable;

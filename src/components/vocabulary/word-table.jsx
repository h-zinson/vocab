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
import { Volume2 } from "lucide-react";

function WordTable({
  filteredWords,
  handleWordClick,
  playPronunciation,
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
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWords.map((word) => (
                <TableRow
                  key={word.id}
                  className="cursor-pointer"
                  onClick={() => handleWordClick(word)}>
                  <TableCell className="font-medium">{word.word}</TableCell>
                  <TableCell>
                    {new Date(word.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation(word.word);
                      }}>
                      <Volume2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default WordTable;

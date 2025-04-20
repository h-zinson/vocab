import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "../../hooks/use-auth";
import { useToast } from "../ui/use-toast";
import supabase from "../../lib/supabase";
import { Plus } from "lucide-react";

export default function AddCustomWordDialog() {
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [customWord, setCustomWord] = useState({
    word: "",
    definition: "",
    example: "",
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const saveWordToSupabase = async (wordToSave, exampleSentence) => {
    if (!wordToSave || !user) {
      toast({
        title: "Cannot save word",
        description: !user ? "Please log in first" : "No word to save",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    try {
      const { data: existingWord } = await supabase
        .from("words")
        .select("id")
        .eq("word", wordToSave)
        .eq("user_id", user.id)
        .maybeSingle();
      let wordId;
      if (existingWord) {
        wordId = existingWord.id;
        toast({
          title: "Word already exists",
          description: "This word is already in your collection.",
          variant: "destructive",
        });
      } else {
        const { data: newWord, error: wordError } = await supabase
          .from("words")
          .insert({
            word: wordToSave,
            user_id: user.id,
          })
          .select()
          .single();
        if (wordError) throw wordError;
        wordId = newWord.id;
        toast({
          title: "Word saved!",
          description: `"${wordToSave}" has been added to your collection.`,
        });
      }
      if (exampleSentence && wordId) {
        const { error: sentenceError } = await supabase
          .from("sentences")
          .insert({
            user_id: user.id,
            word_id: wordId,
            sentence: exampleSentence,
          });
        if (sentenceError) throw sentenceError;
        toast({
          title: "Sentence saved!",
          description: "Example sentence has been saved to your collection.",
        });
      }
    } catch (error) {
      console.error("Error saving word or sentence:", error);
      toast({
        title: "Failed to save",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsAddingWord(false);
      setCustomWord({ word: "", definition: "", example: "" });
    }
  };

  const handleAddCustomWord = async () => {
    if (!customWord.word.trim()) {
      toast({
        title: "Word required",
        description: "Please enter a word to add.",
        variant: "destructive",
      });
      return;
    }
    await saveWordToSupabase(
      customWord.word.trim(),
      customWord.example.trim() || undefined
    );
  };

  const handleCustomWordChange = (e, field) => {
    setCustomWord((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Dialog open={isAddingWord} onOpenChange={setIsAddingWord}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Word
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Word</DialogTitle>
          <DialogDescription>
            Add your own word to your vocabulary list
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="word">Word</Label>
            <Input
              id="word"
              value={customWord.word}
              onChange={(e) => handleCustomWordChange(e, "word")}
              placeholder="Enter a word"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="definition">Definition (optional)</Label>
            <Textarea
              id="definition"
              value={customWord.definition}
              onChange={(e) => handleCustomWordChange(e, "definition")}
              placeholder="Enter the definition"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="example">Example (optional)</Label>
            <Textarea
              id="example"
              value={customWord.example}
              onChange={(e) => handleCustomWordChange(e, "example")}
              placeholder="Enter an example sentence"
            />
          </div>
          <Button
            className="w-full"
            onClick={handleAddCustomWord}
            disabled={isSaving}>
            {isSaving ? "Saving..." : "Add Word"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

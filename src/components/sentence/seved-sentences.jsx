import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../hooks/use-auth";
import supabase from "../../lib/supabase";
import { AnimatePresence, motion } from "framer-motion";

function SavedSentences() {
  const [savedSentences, setSavedSentences] = useState([]);
  const [isLoadingSentences, setIsLoadingSentences] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSavedSentences();
    }
  }, [user]);

  const fetchSavedSentences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("sentences")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSavedSentences(data || []);
    } catch (error) {
      console.error("Error fetching sentences:", error);
      toast({
        title: "Failed to load sentences",
        description: "Could not fetch your saved sentences.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSentences(false);
    }
  };

  const deleteSentence = async (id) => {
    try {
      const { error } = await supabase.from("sentences").delete().eq("id", id);

      if (error) throw error;

      setSavedSentences((prev) => prev.filter((s) => s.id !== id));

      toast({
        title: "Sentence deleted",
        description: "The sentence has been removed from your collection.",
      });
    } catch (error) {
      console.error("Error deleting sentence:", error);
      toast({
        title: "Failed to delete",
        description: "Could not delete the sentence.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually",
        variant: "destructive",
      });
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Sentences</CardTitle>
        <CardDescription>
          Your collection of generated sentences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!user ? (
          <div className="text-center text-muted-foreground py-8">
            Please login to save and view your sentences
          </div>
        ) : isLoadingSentences ? (
          <div className="flex h-32 items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : savedSentences.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No saved sentences yet
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {savedSentences.map((sentence) => (
                <motion.div
                  key={sentence.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{sentence.word}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSentence(sentence.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sentence.sentence}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {sentence.formality}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(sentence.sentence)}
                      className="gap-2">
                      <Copy className="size-3" />
                      Copy
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SavedSentences;

import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { useAuth } from "../hooks/use-auth";
import supabase from "../lib/supabase";
import SentenceForm from "../components/sentence/sentence-form";
import SavedSentences from "../components/sentence/seved-sentences";

export default function SentenceGenerator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedSentences, setSavedSentences] = useState([]);

  const saveSentenceToDatabase = async (sentenceData) => {
    try {
      const { data: newSentence, error } = await supabase
        .from("sentences")
        .insert({
          user_id: user.id,
          word: sentenceData.word,
          sentence: sentenceData.sentence,
          formality: sentenceData.formality,
        })
        .select()
        .single();

      if (error) throw error;

      setSavedSentences((prev) => [newSentence, ...prev]);
    } catch (error) {
      console.error("Error saving sentence:", error);
      toast({
        title: "Failed to save",
        description: "Could not save the sentence.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mt-32 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Sentence Generator</h1>
          <p className="text-muted-foreground">
            Generate contextual sentences for any word using AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <SentenceForm onSave={saveSentenceToDatabase} />
          <SavedSentences />
        </div>
      </div>
    </div>
  );
}

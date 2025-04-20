import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCw, Volume2, Save } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../../hooks/use-auth";
import supabase from "../../lib/supabase";
import { promptWordDay } from "../../utils/prompt-word-day";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function WordOfTheDay() {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const fetchWordOfTheDay = async () => {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptWordDay,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.9, topK: 40, topP: 0.8 },
        }),
      });
      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      const wordData = JSON.parse(jsonMatch[0]);
      setWordOfTheDay(wordData);
    } catch (error) {
      console.error("Failed to fetch word of the day:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshWord = () => {
    setIsLoading(true);
    fetchWordOfTheDay();
  };

  const speakWord = () => {
    if (!wordOfTheDay || isSpeaking) return;
    const utterance = new window.SpeechSynthesisUtterance(wordOfTheDay.word);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const saveWordToSupabase = async (wordToSave) => {
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
      if (existingWord) {
        toast({
          title: "Word already exists",
          description: "This word is already in your collection.",
          variant: "destructive",
        });
        return;
      } else {
        const { error: wordError } = await supabase
          .from("words")
          .insert({
            word: wordToSave,
            user_id: user.id,
          })
          .select()
          .single();
        if (wordError) throw wordError;
        toast({
          title: "Word saved!",
          description: `"${wordToSave}" has been added to your collection.`,
        });
      }

      if (wordToSave === wordOfTheDay?.word) {
        handleRefreshWord();
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
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Word of the Day
            </CardTitle>
            <CardDescription>Expand your vocabulary daily</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefreshWord}
              disabled={isLoading}>
              <RotateCw
                className={`size-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={speakWord}
              disabled={!wordOfTheDay || isSpeaking}>
              <Volume2
                className={`size-4 ${isSpeaking ? "text-primary" : ""}`}
              />
            </Button>
            {wordOfTheDay && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  saveWordToSupabase(wordOfTheDay.word, wordOfTheDay.example)
                }
                disabled={isSaving || !user}>
                <Save className={`size-4 ${isSaving ? "animate-pulse" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : wordOfTheDay ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-2xl font-bold">{wordOfTheDay.word}</h3>
                <span className="text-sm text-muted-foreground">
                  {wordOfTheDay.pronunciation}
                </span>
                <span className="text-sm italic text-muted-foreground">
                  {wordOfTheDay.partOfSpeech}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">
                {wordOfTheDay.definition}
              </p>
            </div>
            <div>
              <p className="font-medium">Example:</p>
              <p className="text-muted-foreground">{wordOfTheDay.example}</p>
            </div>
            <div>
              <p className="font-medium">Synonyms:</p>
              <div className="text-muted-foreground">
                {wordOfTheDay.synonyms?.join(", ")}
              </div>
            </div>
          </div>
        ) : (
          <div>Failed to load word of the day.</div>
        )}
      </CardContent>
    </Card>
  );
}

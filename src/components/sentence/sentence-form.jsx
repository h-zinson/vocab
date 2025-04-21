import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, RotateCw, Save, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/use-auth";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function SentenceForm({ onSave }) {
  const [word, setWord] = useState("");
  const [formality, setFormality] = useState("casual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedSentence, setGeneratedSentence] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const generateSentence = async () => {
    if (!word.trim()) {
      toast({
        title: "Please enter a word",
        description: "The word field cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedSentence("");

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a ${formality} sentence using the word "${word}". The sentence should be clear, engaging, and demonstrate proper usage of the word. Respond with ONLY the sentence, no additional text or explanation.`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const sentence = data.candidates[0].content.parts[0].text.trim();
      setGeneratedSentence(sentence);
    } catch (err) {
      toast({
        title: "Error generating sentence",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Failed to generate sentence:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveSentence = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save sentences.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const sentenceData = {
        word: word,
        sentence: generatedSentence,
        formality: formality,
      };
      await onSave(sentenceData); // Call the onSave function passed from the parent
      toast({
        title: "Sentence saved",
        description: "The sentence has been added to your collection.",
      });
    } catch (error) {
      console.error("Error saving sentence:", error);
      toast({
        title: "Failed to save",
        description: "Could not save the sentence.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
        <CardTitle>Generate a Sentence</CardTitle>
        <CardDescription>
          Enter a word and choose the formality level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter a word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <Select value={formality} onValueChange={setFormality}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select formality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={generateSentence}
          disabled={isGenerating}
          className="w-full">
          {isGenerating ? (
            <>
              <RotateCw className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 size-4" />
              Generate Sentence
            </>
          )}
        </Button>

        {generatedSentence && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border bg-card p-4 text-card-foreground">
            <p className="mb-4">{generatedSentence}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedSentence)}
                className="gap-2">
                <Copy className="size-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveSentence}
                disabled={!user || isSaving}>
                {isSaving ? (
                  <>
                    <RotateCw className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />
                    Save
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateSentence}
                disabled={isGenerating}>
                <RotateCw className="mr-2 size-4" />
                Try Another
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default SentenceForm;

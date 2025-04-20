import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";
import supabase from "../lib/supabase";
import SearchBar from "../components/vocabulary/word-search";
import WordTable from "../components/vocabulary/word-table";
import WordDetailsDialog from "../components/vocabulary/word-detail";
import { useToast } from "../components/ui/use-toast";
import { promptGetWord } from "../utils/prompt-get-word";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function VocabularyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wordDetails, setWordDetails] = useState({
    synonyms: [],
    antonyms: [],
    usage: [],
    etymology: "",
    aiGenerated: false,
    loading: false,
  });

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchWords();
  }, [user]);

  const fetchWords = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setWords(data || []);
    } catch (error) {
      console.error("Error fetching words:", error);
      toast({
        title: "Error fetching words",
        description: "Failed to load your vocabulary list.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIContent = async (word) => {
    setWordDetails((prev) => ({ ...prev, loading: true, error: undefined }));
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
                  text: promptGetWord(word),
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

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      let content;
      try {
        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON found in response");
        }
        content = JSON.parse(jsonMatch[0]);
      } catch {
        throw new Error("Failed to parse AI response");
      }

      if (
        !Array.isArray(content.synonyms) ||
        content.synonyms.length === 0 ||
        !Array.isArray(content.antonyms) ||
        content.antonyms.length === 0 ||
        !Array.isArray(content.usage) ||
        content.usage.length === 0 ||
        typeof content.etymology !== "string"
      ) {
        throw new Error("Invalid response format from API");
      }

      setWordDetails({
        synonyms: content.synonyms.slice(0, 3),
        antonyms: content.antonyms.slice(0, 3),
        usage: content.usage.slice(0, 3),
        etymology: content.etymology,
        aiGenerated: true,
        loading: false,
      });
    } catch (error) {
      setWordDetails((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch AI content. Please try again.",
        aiGenerated: false,
      }));
    }
  };

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWordClick = (word) => {
    setSelectedWord(word);
    fetchAIContent(word.word);
  };

  const playPronunciation = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mt-32 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vocabulary List</h1>
            <p className="text-muted-foreground">
              Your saved words and their meanings
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <WordTable
          filteredWords={filteredWords}
          handleWordClick={handleWordClick}
          playPronunciation={playPronunciation}
          isLoading={isLoading}
        />

        <WordDetailsDialog
          selectedWord={selectedWord}
          wordDetails={wordDetails}
          fetchAIContent={fetchAIContent}
          playPronunciation={playPronunciation}
          setSelectedWord={setSelectedWord}
        />
      </div>
    </div>
  );
}

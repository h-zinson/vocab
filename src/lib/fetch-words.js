import supabase from "./supabase";

export const fetchWords = async (user, setWords, setIsLoadingWords, toast) => {
  if (!user) return;

  try {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;

    console.log("Fetched words for quiz:", data);
    setWords(data || []);
  } catch (error) {
    console.error("Error fetching words:", error);
    toast({
      title: "Error fetching words",
      description: "Failed to load your vocabulary list for the quiz.",
      variant: "destructive",
    });
  } finally {
    setIsLoadingWords(false);
  }
};

import createUserProfile from "./create-user-profile";
import getDefaultUsername from "./get-default-username";
import supabase from "./supabase";

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code === "PGRST116") {
    console.log("No profile found, attempting to create one for user:", userId);

    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;
    const username = getDefaultUsername(email);

    return await createUserProfile(userId, username);
  }

  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }

  return data;
}

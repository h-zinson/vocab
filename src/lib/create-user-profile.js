import supabase from "./supabase";

async function createUserProfile(userId, username) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: userId,
      username,
      avatar_url: null,
    })
    .select()
    .single();

  if (error) {
    console.error("Profile creation error:", error);
    throw error;
  }

  console.log("Profile created successfully", data);
  return data;
}

export default createUserProfile;

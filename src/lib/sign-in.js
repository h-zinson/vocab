import { getUserProfile } from "./get-user-profile";
import supabase from "./supabase";

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log("User info", data);

  if (error) throw error;

  if (data?.user) {
    try {
      const profile = await getUserProfile(data.user.id);
      console.log("Profile info", profile);
    } catch (profileError) {
      console.error("Error with profile during signin:", profileError);
    }
  }
}

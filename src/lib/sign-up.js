import createUserProfile from "./create-user-profile";
import getDefaultUsername from "./get-default-username";
import supabase from "./supabase";

export async function signUp(email, password, username = "") {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    throw signUpError;
  }

  console.log("Auth signup successful:", data);

  if (data?.user) {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      console.log(
        "No active session yet - profile will be created on first sign in"
      );
      return data;
    }

    const displayName = username || getDefaultUsername(email);
    await createUserProfile(data.user.id, displayName);
  }

  return data;
}

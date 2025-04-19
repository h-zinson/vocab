import supabase from "./supabase";

export function mapSupabaseUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
  };
}

export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(mapSupabaseUser(session?.user || null), event);
  });

  return () => data.subscription.unsubscribe();
}

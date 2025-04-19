import { getUserProfile, onAuthChange, signOut } from "@/lib/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cleanUp = onAuthChange(async (user) => {
      setUser(user);

      if (user) {
        try {
          const userProfile = await getUserProfile(user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return cleanUp;
  }, []);

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    isLoggedIn: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

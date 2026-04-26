import { createContext, useContext } from "react";
import { useProfile } from "../hooks/useProfile";
import { useTheme } from "../hooks/useTheme";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const profileData = useProfile();
  const themeData = useTheme();

  return (
    <ProfileContext.Provider value={{ ...profileData, ...themeData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used inside a ProfileProvider");
  }
  return context;
}

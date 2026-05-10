import { useEffect } from "react";
import { useSelector } from "react-redux";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const hasCompletedOnboarding = useSelector(
    (state) => state.profile.hasCompletedOnboarding,
  );
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (!hasCompletedOnboarding) return <Onboarding />;
  return <Dashboard />;
}

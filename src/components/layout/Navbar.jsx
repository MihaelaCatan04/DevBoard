import { useProfileContext } from "../../context/ProfileContext";

export default function Navbar() {
  const { profile, isDark, toggleTheme } = useProfileContext();

  return (
    <header className="border-b border-gray-800 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            DevBoard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {profile.languages.length} languages · {profile.topics.length}{" "}
            topics
          </span>

          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="text-xl text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

export default function Navbar({ onSettingsOpen }) {
  const languages = useSelector((state) => state.profile.data.languages);
  const topics = useSelector((state) => state.profile.data.topics);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            DevBoard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
            {languages.length} languages · {topics.length} topics
          </span>

          <button
            onClick={() => dispatch(toggleTheme())}
            title="Toggle theme"
            className="text-xl text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button
            onClick={onSettingsOpen}
            title="Settings"
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}

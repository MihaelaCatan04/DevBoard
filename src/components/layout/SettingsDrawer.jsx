import { useState } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { LANGUAGES, TOPICS } from "../../constants/topics";

export default function SettingsDrawer({ isOpen, onClose }) {
  const { profile, toggleLanguage, toggleTopic } = useProfileContext();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  function handleReset() {
    localStorage.clear();
    window.location.reload();
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
              Languages
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Filters your GitHub and npm panels.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = profile.languages.includes(lang.id);
                return (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all
                      ${
                        isSelected
                          ? "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                      }
                    `}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {profile.languages.length === 0 && (
              <p className="text-orange-500 text-xs mt-2">
                Select at least one language for best results.
              </p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
              Topics
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Filters your Hacker News and DEV.to panels.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TOPICS.map((topic) => {
                const isSelected = profile.topics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`
                      px-3 py-2 rounded-lg border text-sm font-medium transition-all
                      ${
                        isSelected
                          ? "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                      }
                    `}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>

            {profile.topics.length === 0 && (
              <p className="text-orange-500 text-xs mt-2">
                Select at least one topic for best results.
              </p>
            )}
          </section>

          <section className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-1">
              Danger Zone
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              This will clear all your data and restart onboarding.
            </p>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-medium transition-colors"
              >
                Reset all data
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Yes, reset everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

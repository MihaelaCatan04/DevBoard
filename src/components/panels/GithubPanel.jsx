import { useProfileContext } from "../../context/ProfileContext";
import { useFeed } from "../../hooks/useFeed";
import { fetchGithubRepos } from "../../services/github";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function GithubPanel() {
  const { profile, toggleBookmark } = useProfileContext();

  const {
    data: repos,
    loading,
    error,
  } = useFeed(
    () => fetchGithubRepos(profile.languages),
    [profile.languages.join(",")],
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!repos?.length)
    return (
      <p className="text-gray-500 text-center py-12">
        No repos found for your languages.
      </p>
    );

  return (
    <div className="grid gap-4">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          isBookmarked={profile.bookmarks.some((b) => b.id === repo.id)}
          onBookmark={() => toggleBookmark({ ...repo, type: "repo" })}
        />
      ))}
    </div>
  );
}

function RepoCard({ repo, isBookmarked, onBookmark }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        {/* Left — repo info */}
        <div className="flex-1 min-w-0">
          <a
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>

          {repo.description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
              {repo.description}
            </p>
          )}

          {/* Tags row */}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            {repo.language && (
              <span className="text-gray-300">{repo.language}</span>
            )}
            <span>⭐ {repo.stars.toLocaleString()}</span>
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="bg-gray-800 px-2 py-0.5 rounded text-gray-400"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Right — bookmark button */}
        <button
          onClick={onBookmark}
          title={isBookmarked ? "Remove bookmark" : "Bookmark this repo"}
          className={`text-lg flex-shrink-0 transition-colors ${
            isBookmarked
              ? "text-yellow-400"
              : "text-gray-600 hover:text-gray-300"
          }`}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}

import { useProfileContext } from "../../context/ProfileContext";
import { useFeed } from "../../hooks/useFeed";
import { fetchDevToArticles } from "../../services/devto";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function DevToPanel() {
  const { profile, toggleBookmark } = useProfileContext();

  const {
    data: articles,
    loading,
    error,
  } = useFeed(
    () => fetchDevToArticles(profile.topics, profile.languages),
    [profile.topics.join(","), profile.languages.join(",")],
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!articles?.length)
    return (
      <p className="text-gray-500 text-center py-12">
        No articles found for your topics.
      </p>
    );

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          isBookmarked={profile.bookmarks.some((b) => b.id === article.id)}
          onBookmark={() => toggleBookmark({ ...article, type: "article" })}
        />
      ))}
    </div>
  );
}

function ArticleCard({ article, isBookmarked, onBookmark }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
      {/* Cover image — only shown if the article has one */}
      {article.cover && (
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-32 object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-blue-300 transition-colors"
            >
              {article.title}
            </a>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span>by {article.author}</span>
              <span>{article.readingTime} min read</span>
              <span className="text-pink-400">♥ {article.reactions}</span>
              <span>{article.comments} comments</span>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {article.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onBookmark}
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
    </div>
  );
}

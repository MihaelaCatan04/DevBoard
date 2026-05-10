import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../../store/profileSlice";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "repo", label: "GitHub Repos" },
  { id: "article", label: "Articles" },
];

export default function BookmarksPanel() {
  const bookmarks = useSelector((state) => state.profile.data.bookmarks);
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = bookmarks.filter((item) =>
    activeFilter === "all" ? true : item.type === activeFilter,
  );

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {filter.label}
            <span className="ml-1.5 text-xs opacity-70">
              {filter.id === "all"
                ? bookmarks.length
                : bookmarks.filter((b) => b.type === filter.id).length}
            </span>
          </button>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">☆</p>
          <p className="text-gray-500 font-medium">No bookmarks yet</p>
          <p className="text-gray-600 text-sm mt-1">
            Star any repo or article to save it here
          </p>
        </div>
      )}

      {bookmarks.length > 0 && filtered.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No {activeFilter === "repo" ? "repos" : "articles"} bookmarked yet.
        </p>
      )}

      <div className="grid gap-3">
        {filtered.map((item) => (
          <BookmarkCard
            key={item.id}
            item={item}
            onRemove={() => dispatch(toggleBookmark(item))}
          />
        ))}
      </div>
    </div>
  );
}

function BookmarkCard({ item, onRemove }) {
  const sourceLabel = item.type === "repo" ? "GitHub" : "Article";
  const sourceBadgeClass =
    item.type === "repo"
      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${sourceBadgeClass}`}
            >
              {sourceLabel}
            </span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            {item.name || item.title}
          </a>
          {item.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {item.type === "repo" && item.stars && (
              <span>⭐ {item.stars.toLocaleString()}</span>
            )}
            {item.type === "repo" && item.language && (
              <span>{item.language}</span>
            )}
            {item.type === "article" && item.author && (
              <span>by {item.author}</span>
            )}
            {item.type === "article" && item.readingTime && (
              <span>{item.readingTime} min read</span>
            )}
          </div>
        </div>
        <button
          onClick={onRemove}
          title="Remove bookmark"
          className="text-yellow-500 hover:text-gray-400 transition-colors text-lg flex-shrink-0"
        >
          ★
        </button>
      </div>
    </div>
  );
}

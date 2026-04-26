import { useProfileContext } from "../../context/ProfileContext";
import { useFeed } from "../../hooks/useFeed";
import { fetchHNStories } from "../../services/hackernews";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function HackerNewsPanel() {
  const { profile, toggleBookmark } = useProfileContext();

  const {
    data: stories,
    loading,
    error,
  } = useFeed(() => fetchHNStories(profile.topics), [profile.topics.join(",")]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!stories?.length)
    return (
      <p className="text-gray-500 text-center py-12">
        No stories found for your topics.
      </p>
    );

  return (
    <div className="grid gap-3">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          isBookmarked={profile.bookmarks.some((b) => b.id === story.id)}
          onBookmark={() => toggleBookmark({ ...story, type: "article" })}
        />
      ))}
    </div>
  );
}

function StoryCard({ story, isBookmarked, onBookmark }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white hover:text-blue-300 transition-colors"
          >
            {story.title}
          </a>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="text-orange-400">▲ {story.score}</span>
            <span>{story.comments} comments</span>
            <span>by {story.by}</span>
            <a
              href={`https://news.ycombinator.com/item?id=${story.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              discuss
            </a>
          </div>
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
  );
}

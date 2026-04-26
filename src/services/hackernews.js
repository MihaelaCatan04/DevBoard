// Docs: https://github.com/HackerNews/API
import { TOPIC_KEYWORDS } from "../constants/topics";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function fetchHNStories(topics = [], limit = 10) {
  const idsResponse = await fetch(`${BASE_URL}/topstories.json`);

  if (!idsResponse.ok) {
    throw new Error("Could not fetch HN stories");
  }

  const allIds = await idsResponse.json();

  const topIds = allIds.slice(0, 50);

  const stories = await Promise.all(
    topIds.map((id) =>
      fetch(`${BASE_URL}/item/${id}.json`).then((r) => r.json()),
    ),
  );

  const validStories = stories.filter(
    (story) => story?.title && story?.type === "story",
  );

  let filtered = validStories;

  if (topics.length > 0) {
    const keywords = topics.flatMap(
      (topic) => TOPIC_KEYWORDS[topic] || [topic],
    );

    filtered = validStories.filter((story) => {
      const titleLower = story.title.toLowerCase();

      return keywords.some((keyword) =>
        titleLower.includes(keyword.toLowerCase()),
      );
    });
  }

  if (filtered.length === 0) {
    filtered = validStories.slice(0, limit);
  }

  return filtered.slice(0, limit).map((story) => ({
    id: story.id,
    title: story.title,
    url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
    score: story.score || 0,
    comments: story.descendants || 0,
    by: story.by || "unknown",
  }));
}

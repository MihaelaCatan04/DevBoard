// DEV.to API — open, no key required for reading
// Docs: https://developers.forem.com/api

const BASE_URL = "https://dev.to/api";

export async function fetchDevToArticles(topics = [], languages = []) {
  const tags = [...topics, ...languages].slice(0, 3);
  // We cap at 3 because DEV.to only allows one tag per request
  const tag = tags[0] ?? "programming";

  const url = `${BASE_URL}/articles?tag=${tag}&top=7&per_page=10`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch DEV.to articles");

  const articles = await response.json();

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    url: article.url,
    tags: article.tag_list,
    reactions: article.positive_reactions_count,
    comments: article.comments_count,
    author: article.user.name,
    cover: article.cover_image,
    readingTime: article.reading_time_minutes,
  }));
}

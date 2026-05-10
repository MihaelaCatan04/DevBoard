// Docs: https://docs.github.com/en/rest/search

const BASE_URL = "https://api.github.com/search/repositories";

export async function fetchGithubRepos(languages = [], page = 1) {
  const validLanguages = languages.filter(Boolean);

  let query;

  if (validLanguages.length > 0) {
    query = validLanguages.map((lang) => `language:${lang}`).join(" ");
  } else {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const since = date.toISOString().split("T")[0];

    query = `stars:>1000 created:>${since}`;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10&page=${page}`;

  const response = await fetch(url);

  if (response.status === 403) {
    throw new Error("GitHub rate limit reached. Try again in a minute.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const json = await response.json();

  return json.items.map((repo) => ({
    id: repo.id,
    name: repo.full_name,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
    topics: repo.topics ?? [],
  }));
}

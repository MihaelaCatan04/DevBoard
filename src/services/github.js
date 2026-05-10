// Docs: https://docs.github.com/en/rest/search

const BASE_URL = "https://api.github.com/search/repositories";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "devboard_gh_";

let prefetchPromise = null;

function getCacheKey(language) {
  return CACHE_PREFIX + language;
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
}

function getHeaders() {
  const headers = {};
  const token = import.meta.env?.VITE_GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function fetchOneLanguage(language) {
  const url = `${BASE_URL}?q=${encodeURIComponent(`language:${language}`)}&sort=stars&order=desc&per_page=10`;
  const res = await fetch(url, { headers: getHeaders() });
  if (res.status === 403)
    throw Object.assign(new Error("rate_limited"), { code: 403 });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const json = await res.json();
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

export function prefetchAllLanguages(allLanguages = []) {
  if (prefetchPromise) return prefetchPromise;

  prefetchPromise = Promise.allSettled(
    allLanguages.map(async (lang) => {
      const key = getCacheKey(lang);
      if (readCache(key)) return;
      const repos = await fetchOneLanguage(lang);
      writeCache(key, repos);
    }),
  );

  return prefetchPromise;
}

export async function fetchGithubRepos(selectedLanguages = []) {
  const valid = selectedLanguages.filter(Boolean);
  if (valid.length === 0) return [];

  if (prefetchPromise) await prefetchPromise;

  const seen = new Set();
  return valid
    .flatMap((lang) => readCache(getCacheKey(lang)) ?? [])
    .filter((repo) => {
      if (seen.has(repo.id)) return false;
      seen.add(repo.id);
      return true;
    })
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 20);
}

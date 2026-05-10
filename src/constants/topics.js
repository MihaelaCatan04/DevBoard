export const LANGUAGES = [
  { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  { id: "typescript", label: "TypeScript", color: "#3178c6" },
  { id: "python", label: "Python", color: "#3572A5" },
  { id: "java", label: "Java", color: "#b07219" },
  { id: "cpp", label: "C++", color: "#f34b7d" },
  { id: "csharp", label: "C#", color: "#178600" },
  { id: "ruby", label: "Ruby", color: "#701516" },
  { id: "swift", label: "Swift", color: "#F05138" },
  { id: "kotlin", label: "Kotlin", color: "#A97BFF" },
  { id: "php", label: "PHP", color: "#4F5D95" },
];

export const TOPICS = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "ml", label: "Machine Learning" },
  { id: "systems", label: "Systems" },
  { id: "mobile", label: "Mobile" },
  { id: "security", label: "Security" },
  { id: "databases", label: "Databases" },
  { id: "cloud", label: "Cloud" },
  { id: "opensource", label: "Open Source" },
];

export const TIMEZONES = [
  { id: "utc", label: "UTC", tz: "UTC" },
  { id: "new_york", label: "New York", tz: "America/New_York" },
  { id: "london", label: "London", tz: "Europe/London" },
  { id: "berlin", label: "Berlin", tz: "Europe/Berlin" },
  { id: "moscow", label: "Moscow", tz: "Europe/Moscow" },
  { id: "dubai", label: "Dubai", tz: "Asia/Dubai" },
  { id: "tokyo", label: "Tokyo", tz: "Asia/Tokyo" },
  { id: "singapore", label: "Singapore", tz: "Asia/Singapore" },
  { id: "sydney", label: "Sydney", tz: "Australia/Sydney" },
  { id: "san_francisco", label: "San Francisco", tz: "America/Los_Angeles" },
];

export const DEFAULT_PROFILE = {
  languages: ["javascript", "typescript"],
  topics: ["frontend", "backend"],
  packages: ["react", "vite", "tailwindcss"],
  clocks: ["utc", "london", "new_york"],
  bookmarks: [],
};
export const TOPIC_KEYWORDS = {
  frontend: ["react", "vue", "angular", "css", "javascript", "typescript"],
  backend: ["node", "api", "server", "database", "backend", "express"],
  devops: ["docker", "kubernetes", "aws", "deployment", "devops"],
  ml: ["ai", "machine learning", "llm", "openai", "neural", "python"],
  systems: ["rust", "c++", "linux", "kernel", "compiler"],
  mobile: ["ios", "android", "swift", "kotlin", "react native"],
  security: ["security", "hack", "encryption", "auth"],
  databases: ["postgres", "mysql", "mongodb", "redis", "database"],
  cloud: ["aws", "gcp", "azure", "cloud"],
  opensource: ["open source", "github", "oss"],
};

export const TABS = [
  { id: "github", label: "GitHub" },
  { id: "hackernews", label: "Hacker News" },
  { id: "npm", label: "npm" },
  { id: "devto", label: "DEV.to" },
  { id: "clocks", label: "Clocks" },
  { id: "bookmarks", label: "Bookmarks" },
];

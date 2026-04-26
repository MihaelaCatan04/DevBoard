export const LANGUAGES = [
  { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  { id: "typescript", label: "TypeScript", color: "#3178c6" },
  { id: "python", label: "Python", color: "#3572A5" },
  { id: "rust", label: "Rust", color: "#dea584" },
  { id: "go", label: "Go", color: "#00ADD8" },
  { id: "java", label: "Java", color: "#b07219" },
  { id: "cpp", label: "C++", color: "#f34b7d" },
  { id: "csharp", label: "C#", color: "#178600" },
  { id: "ruby", label: "Ruby", color: "#701516" },
  { id: "swift", label: "Swift", color: "#F05138" },
  { id: "kotlin", label: "Kotlin", color: "#A97BFF" },
  { id: "php", label: "PHP", color: "#4F5D95" },
]

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
]

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
]

export const DEFAULT_PROFILE = {
  languages: ["javascript", "typescript"],
  topics: ["frontend", "backend"],
  packages: ["react", "vite", "tailwindcss"],
  clocks: ["utc", "london", "new_york"],
  bookmarks: [],
}
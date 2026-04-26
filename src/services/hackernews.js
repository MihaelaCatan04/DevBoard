// Docs: https://github.com/HackerNews/API

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export async function fetchHNStories(topics = [], limit = 10) {
  const idsResponse = await fetch(`${BASE_URL}/topstories.json`)
  if (!idsResponse.ok) throw new Error('Could not fetch HN stories')

  const allIds = await idsResponse.json()

  const topIds = allIds.slice(0, 30)

  const stories = await Promise.all(
    topIds.map(id =>
      fetch(`${BASE_URL}/item/${id}.json`).then(r => r.json())
    )
  )

  const filtered = topics.length > 0
    ? stories.filter(story => {
        if (!story?.title) return false
        const titleLower = story.title.toLowerCase()
        return topics.some(topic => titleLower.includes(topic.toLowerCase()))
      })
    : stories.filter(s => s?.title)

  return filtered.slice(0, limit).map(story => ({
    id: story.id,
    title: story.title,
    url: story.url ?? `https://news.ycombinator.com/item?id=${story.id}`,
    score: story.score,
    comments: story.descendants ?? 0,
    by: story.by,
  }))
}
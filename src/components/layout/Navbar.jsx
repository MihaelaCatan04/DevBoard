import { useProfileContext } from '../../context/ProfileContext'

export default function Navbar() {
  const { profile } = useProfileContext()

  return (
    <header className="border-b border-gray-800 bg-gray-950 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">DevPulse</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {profile.languages.length} languages · {profile.topics.length} topics
          </span>
        </div>

      </div>
    </header>
  )
}
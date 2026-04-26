import { useState } from 'react'
import { LANGUAGES, TOPICS } from '../constants/topics'
import { useProfileContext } from '../context/ProfileContext'

export default function Onboarding() {
  const [step, setStep] = useState(1)

  const [selectedLanguages, setSelectedLanguages] = useState(['javascript', 'typescript'])
  const [selectedTopics, setSelectedTopics] = useState(['frontend'])

  const { completeOnboarding } = useProfileContext()

  function toggleLanguage(id) {
    setSelectedLanguages(prev =>
      prev.includes(id)
        ? prev.filter(l => l !== id)
        : [...prev, id]
    )
  }

  function toggleTopic(id) {
    setSelectedTopics(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  function handleFinish() {
    completeOnboarding({
      languages: selectedLanguages,
      topics: selectedTopics,
      packages: ['react', 'vite', 'tailwindcss'],
      clocks: ['utc', 'london'],
      bookmarks: [],
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">DevBoard</h1>
          <p className="text-gray-400">Your personalised developer feed. Set it once, stored in your browser.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-700'}`} />
          <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`} />
        </div>

        {/* Step 1 — Languages */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">What languages do you work with?</h2>
            <p className="text-gray-400 text-sm mb-6">Pick as many as you want. You can change this later.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {LANGUAGES.map(lang => {
                const isSelected = selectedLanguages.includes(lang.id)
                return (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all
                      ${isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'
                      }
                    `}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.label}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={selectedLanguages.length === 0}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 — Topics */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-1">What topics interest you?</h2>
            <p className="text-gray-400 text-sm mb-6">This filters your articles and news feed.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {TOPICS.map(topic => {
                const isSelected = selectedTopics.includes(topic.id)
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`
                      px-4 py-3 rounded-lg border text-sm font-medium transition-all
                      ${isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'
                      }
                    `}
                  >
                    {topic.label}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-3">
              {/* Back button */}
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg font-semibold transition-colors"
              >
                ← Back
              </button>

              {/* Finish button */}
              <button
                onClick={handleFinish}
                disabled={selectedTopics.length === 0}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
              >
                Let's go →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
import { useState } from 'react'
import Navbar from '../components/layout/Navbar'

// These are the 5 tabs — one per data source
const TABS = [
  { id: 'github', label: 'GitHub' },
  { id: 'hackernews', label: 'Hacker News' },
  { id: 'npm', label: 'npm' },
  { id: 'devto', label: 'DEV.to' },
  { id: 'clocks', label: 'Clocks' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('github')

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <Navbar />

      {/* Tab bar */}
      <div className="border-b border-gray-800 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel content area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-400">
          Active tab: <span className="text-white font-medium">{activeTab}</span>
        </p>
        <p className="text-gray-600 text-sm mt-2">Panels coming next.</p>
      </main>

    </div>
  )
}
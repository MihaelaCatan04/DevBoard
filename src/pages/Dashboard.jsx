import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import GithubPanel from "../components/panels/GithubPanel";
import HackerNewsPanel from "../components/panels/HackerNewsPanel";
import NpmPanel from "../components/panels/NpmPanel";
import DevToPanel from "../components/panels/DevToPanel";
import ClocksPanel from "../components/panels/ClocksPanel";
import BookmarksPanel from "../components/panels/BookmarksPanel";
import { TABS } from "../constants/topics";
import SettingsDrawer from "../components/layout/SettingsDrawer";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("github");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar onSettingsOpen={() => setSettingsOpen(true)} />

      <SettingsDrawer
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "github" && <GithubPanel />}
        {activeTab === "hackernews" && <HackerNewsPanel />}
        {activeTab === "npm" && <NpmPanel />}
        {activeTab === "devto" && <DevToPanel />}
        {activeTab === "clocks" && <ClocksPanel />}
        {activeTab === "bookmarks" && <BookmarksPanel />}
      </main>
    </div>
  );
}

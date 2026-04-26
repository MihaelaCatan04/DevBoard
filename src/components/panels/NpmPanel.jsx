import { useState } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useFeed } from "../../hooks/useFeed";
import { fetchPackages } from "../../services/npm";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function NpmPanel() {
  const { profile, addPackage, removePackage } = useProfileContext();
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(null);

  const {
    data: packages,
    loading,
    error,
  } = useFeed(
    () => fetchPackages(profile.packages),
    [profile.packages.join(",")],
  );

  function handleAdd() {
    const cleaned = input.trim().toLowerCase();

    if (!cleaned) return;
    if (profile.packages.includes(cleaned)) {
      setInputError("You are already tracking this package");
      return;
    }

    addPackage(cleaned);
    setInput("");
    setInputError(null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <div>
      {/* Add package input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Track a package
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setInputError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. lodash, axios, zod"
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
          >
            Add
          </button>
        </div>

        {/* Inline validation error */}
        {inputError && (
          <p className="text-red-400 text-xs mt-1">{inputError}</p>
        )}
      </div>

      {/* Package list */}
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && packages?.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No packages tracked yet.
        </p>
      )}

      {!loading && !error && packages && (
        <div className="grid gap-3">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onRemove={() => removePackage(pkg.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PackageCard({ pkg, onRemove }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={pkg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              {pkg.name}
            </a>
            <span className="text-xs text-gray-500 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5">
              v{pkg.version}
            </span>
          </div>

          {pkg.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {pkg.description}
            </p>
          )}

          <div className="mt-2 text-xs text-gray-500">
            <span className="text-green-400 font-medium">
              {pkg.weeklyDownloads.toLocaleString()}
            </span>{" "}
            downloads last week
          </div>
        </div>

        {/* Remove button */}
        <button
          onClick={onRemove}
          title="Stop tracking"
          className="text-gray-600 hover:text-red-400 transition-colors text-lg flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

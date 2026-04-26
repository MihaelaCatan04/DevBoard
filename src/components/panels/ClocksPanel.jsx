import { useState, useEffect } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { TIMEZONES } from "../../constants/topics";

export default function ClocksPanel() {
  const { profile, addClock, removeClock } = useProfileContext();
  const [now, setNow] = useState(new Date());
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  function handleAdd() {
    if (!selected) return;
    addClock(selected);
    setSelected("");
  }

  const activeClocks = profile.clocks
    .map((id) => TIMEZONES.find((tz) => tz.id === id))
    .filter(Boolean);

  const availableToAdd = TIMEZONES.filter(
    (tz) => !profile.clocks.includes(tz.id),
  );

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
          Add a colleague's timezone
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Select a timezone...</option>
            {availableToAdd.map((tz) => (
              <option key={tz.id} value={tz.id}>
                {tz.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selected}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg text-sm font-medium text-white transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {activeClocks.length === 0 && (
        <p className="text-gray-500 text-center py-12">No clocks added yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeClocks.map((tz) => (
          <ClockCard
            key={tz.id}
            timezone={tz}
            now={now}
            onRemove={() => removeClock(tz.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ClockCard({ timezone, now, onRemove }) {
  const timeString = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone.tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const dateString = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone.tz,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);

  const hour = parseInt(timeString.split(":")[0]);
  const isNight = hour < 7 || hour >= 21;
  const isDawn = hour >= 7 && hour < 12;
  const isEvening = hour >= 18 && hour < 21;

  function getTimeColor() {
    if (isNight) return "text-blue-500 dark:text-blue-400";
    if (isDawn) return "text-orange-500 dark:text-orange-400";
    if (isEvening) return "text-purple-500 dark:text-purple-400";
    return "text-green-500 dark:text-green-400";
  }

  function getTimeLabel() {
    if (isNight) return "🌙 Night";
    if (isDawn) return "🌅 Morning";
    if (isEvening) return "🌆 Evening";
    return "☀️ Day";
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {timezone.label}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{timezone.tz}</p>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          ✕
        </button>
      </div>

      <p className={`text-3xl font-mono font-bold ${getTimeColor()}`}>
        {timeString}
      </p>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">{dateString}</p>
        <span className="text-xs text-gray-500">{getTimeLabel()}</span>
      </div>
    </div>
  );
}

import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_PROFILE = {
  languages: [],
  topics: [],
  packages: [],
  clocks: [],
  bookmarks: [],
};

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    data: DEFAULT_PROFILE,
    hasCompletedOnboarding: false,
  },

  reducers: {
    completeOnboarding(state, action) {
      state.data = action.payload;
      state.hasCompletedOnboarding = true;
    },

    toggleLanguage(state, action) {
      const id = action.payload;
      const index = state.data.languages.indexOf(id);
      if (index >= 0) {
        state.data.languages.splice(index, 1);
      } else {
        state.data.languages.push(id);
      }
    },

    toggleTopic(state, action) {
      const id = action.payload;
      const index = state.data.topics.indexOf(id);
      if (index >= 0) state.data.topics.splice(index, 1);
      else state.data.topics.push(id);
    },

    addPackage(state, action) {
      const pkg = action.payload.trim().toLowerCase();
      if (!pkg || state.data.packages.includes(pkg)) return;
      state.data.packages.push(pkg);
    },

    removePackage(state, action) {
      state.data.packages = state.data.packages.filter(
        (p) => p !== action.payload,
      );
    },

    addClock(state, action) {
      if (!state.data.clocks.includes(action.payload))
        state.data.clocks.push(action.payload);
    },

    removeClock(state, action) {
      state.data.clocks = state.data.clocks.filter((c) => c !== action.payload);
    },

    toggleBookmark(state, action) {
      const item = action.payload;
      const exists = state.data.bookmarks.some((b) => b.id === item.id);
      if (exists) {
        state.data.bookmarks = state.data.bookmarks.filter(
          (b) => b.id !== item.id,
        );
      } else {
        state.data.bookmarks.push(item);
      }
    },
  },
});

export const {
  completeOnboarding,
  toggleLanguage,
  toggleTopic,
  addPackage,
  removePackage,
  addClock,
  removeClock,
  toggleBookmark,
} = profileSlice.actions;

export default profileSlice.reducer;

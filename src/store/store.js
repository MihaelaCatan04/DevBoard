import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import profileReducer from "./profileSlice";
import themeReducer from "./themeSlice";

const profilePersistConfig = { key: "devboard_profile", storage };
const themePersistConfig = { key: "devboard_theme", storage };

export const store = configureStore({
  reducer: {
    profile: persistReducer(profilePersistConfig, profileReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

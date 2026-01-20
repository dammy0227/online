// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Import slices
import moduleReducer from "../features/modules/moduleSlice";
import progressReducer from "../features/progress/progressSlice";
import quizReducer from "../features/quiz/quizSlice";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";
import courseReducer from "../features/courses/courseSlice";

// Combine all reducers
const rootReducer = combineReducers({
  modules: moduleReducer,
  progress: progressReducer,
  quiz: quizReducer,
  auth: authReducer,
  admin: adminReducer,
  courses: courseReducer,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "admin"], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ignore redux-persist warnings
    }),
});


export const persistor = persistStore(store);

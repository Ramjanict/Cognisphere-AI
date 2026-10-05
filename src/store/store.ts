import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./api/AuthState";
import { baseApi } from "./api/baseApi";
import chatReducer from "./api/chatSlice";

// ===== Persist Config =====
const persistConfig = {
  key: "authState",
  storage,
  whitelist: ["token"],
};

// ===== Combine reducers =====
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  chat: chatReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// ===== Store =====
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// ===== Persistor =====
export const persistor = persistStore(store);

// ===== Types =====
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

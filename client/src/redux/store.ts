import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware(),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import { movieReducer } from './slices';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

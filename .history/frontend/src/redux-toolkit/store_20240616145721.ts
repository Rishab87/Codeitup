<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './combineReducers';

export const store =configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
=======
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './combineReducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac

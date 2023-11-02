import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'store/slices/userSlice';
import { trailerReducer } from 'store/slices/trailerSlice';

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    user: userReducer,
    trailer: trailerReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;

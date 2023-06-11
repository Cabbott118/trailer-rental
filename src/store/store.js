import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userReducer';

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    user: userReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const switchTheme = createAsyncThunk(
  'ui/switchTheme',
  async (_, { getState }) => {
    try {
      const { theme } = getState().ui;
      const newTheme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    } catch (error) {
      throw new Error('Failed to toggle theme.');
    }
  }
);

const clearErrors = createAction('ui/clearErrors');

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchTheme.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(switchTheme.fulfilled, (state, action) => {
        return {
          ...state,
          theme: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(switchTheme.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export const { reducer: uiReducer } = uiSlice;
export { switchTheme, clearErrors };

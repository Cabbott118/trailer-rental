// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createTrailer = createAsyncThunk(
  'trailer/createTrailer',
  async ({ title, userId, firstName, lastName, imageURL }) => {
    try {
      const response = await post('/trailers/create-trailer', {
        title,
        userId,
        firstName,
        lastName,
        imageURL,
      });
      return response.trailer;
    } catch (error) {
      throw new Error('Failed to create trailer data.');
    }
  }
);

const fetchTrailer = createAsyncThunk(
  'trailer/fetchTrailer',
  async (trailerId) => {
    try {
      const response = await get('/trailers/get-trailer-details', {
        trailerId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch trailer data.');
    }
  }
);

const fetchTrailers = createAsyncThunk('trailer/fetchTrailers', async () => {
  try {
    const response = await get('/trailers/get-all-trailers');
    return response;
  } catch (error) {
    throw new Error('Failed to fetch trailers data.');
  }
});

const updateTrailer = createAsyncThunk(
  'trailer/updateTrailer',
  async ({ trailerId, updateData }) => {
    try {
      const response = await patch('/trailers/update-trailer', {
        trailerId,
        updateData,
      });
      return response.trailer;
    } catch (error) {
      throw new Error('Failed to update trailer data.');
    }
  }
);

const deleteTrailer = createAsyncThunk(
  'trailer/deleteTrailer',
  async (trailerId) => {
    try {
      const response = await del('/trailers/delete-trailer', { trailerId });
      return response;
    } catch (error) {
      throw new Error('Failed to delete trailer data.');
    }
  }
);

// Action to clear trailer data, typically after logout
const clearTrailerData = createAction('trailer/clearTrailerData');
const clearErrors = createAction('trailer/clearErrors');

const trailerSlice = createSlice({
  name: 'trailer',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTrailerData: (state) => {
      return {
        data: [],
        loading: false,
        error: null,
      };
    },
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrailer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createTrailer.fulfilled, (state, action) => {
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
          error: null,
        };
      })
      .addCase(createTrailer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTrailer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTrailers.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTrailers.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTrailers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateTrailer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateTrailer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateTrailer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(deleteTrailer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteTrailer.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteTrailer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: trailerReducer } = trailerSlice;
export {
  deleteTrailer,
  createTrailer,
  fetchTrailer,
  fetchTrailers,
  updateTrailer,
  clearTrailerData,
  clearErrors,
};

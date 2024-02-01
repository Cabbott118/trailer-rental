import ROUTES from 'resources/routes-constants';

// Lib
import { get } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId) => {
    try {
      const response = await get(ENDPOINTS.GET_PROFILE_DETAILS, {
        userId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch profile data.');
    }
  }
);

const fetchTrailersOwnedBy = createAsyncThunk(
  'profile/fetchTrailersOwnedBy',
  async (userId) => {
    try {
      const response = await get(ENDPOINTS.GET_TRAILERS_OWNED_BY, {
        userId,
      });
      const { trailers, length, message } = response;
      return { trailers, length, message };
    } catch (error) {
      throw new Error('Failed to fetch trailer data.');
    }
  }
);

const fetchReviewsWrittenFor = createAsyncThunk(
  'profile/fetchReviewsWrittenFor',
  async (userId) => {
    try {
      const response = await get(ENDPOINTS.GET_REVIEWS_WRITTEN_FOR, {
        userId,
      });
      const { reviews, length, message } = response;
      return { reviews, length, message };
    } catch (error) {
      throw new Error('Failed to fetch review data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearProfileData = createAction('profile/clearProfileData');
const clearErrors = createAction('profile/clearErrors');

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    trailers: {
      list: [],
      length: 0,
      message: '',
    },
    reviews: {
      list: [],
      length: 0,
      message: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearProfileData: (state) => {
      return {
        profile: null,
        trailers: {
          list: [],
          length: 0,
          message: '',
        },
        reviews: {
          list: [],
          length: 0,
          message: '',
        },
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
      .addCase(fetchProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTrailersOwnedBy.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTrailersOwnedBy.fulfilled, (state, action) => {
        return {
          ...state,
          trailers: {
            list: action.payload.trailers,
            length: action.payload.length,
            message: action.payload.message,
          },
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTrailersOwnedBy.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchReviewsWrittenFor.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchReviewsWrittenFor.fulfilled, (state, action) => {
        return {
          ...state,
          reviews: {
            list: action.payload.reviews,
            length: action.payload.length,
            message: action.payload.message,
          },
          loading: false,
          error: null,
        };
      })
      .addCase(fetchReviewsWrittenFor.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: profileReducer } = profileSlice;
export {
  fetchProfile,
  fetchTrailersOwnedBy,
  fetchReviewsWrittenFor,
  clearProfileData,
  clearErrors,
};

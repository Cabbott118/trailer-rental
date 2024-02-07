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
      rating: null,
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
          rating: null,
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
          profile: action.payload.profile,
          trailers: {
            list: action.payload.trailers.trailers,
            length: action.payload.trailers.length,
            message: action.payload.trailers.message,
          },
          reviews: {
            list: action.payload.reviews.reviews,
            length: action.payload.reviews.length,
            rating: action.payload.reviews.averageRating,
            message: action.payload.reviews.message,
          },
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
      });
  },
});

// Export the async thunk and reducer
export const { reducer: profileReducer } = profileSlice;
export { fetchProfile, clearProfileData, clearErrors };

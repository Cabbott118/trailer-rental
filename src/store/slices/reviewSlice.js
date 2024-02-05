import ROUTES from 'resources/routes-constants';

// Lib
import { get, post } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

const createReview = createAsyncThunk(
  'review/createReview',
  async ({
    writtenById,
    writtenByFirstName,
    writtenByLastName,
    writtenFor,
    reviewBody,
    reviewRating,
  }) => {
    try {
      const response = await post(ENDPOINTS.CREATE_REVIEW, {
        writtenById,
        writtenByFirstName,
        writtenByLastName,
        writtenFor,
        reviewBody,
        reviewRating,
      });
      return response.review;
    } catch (error) {
      throw new Error('Failed to create review data.');
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
      const { reviews, length, averageRating, message } = response;
      return { reviews, length, averageRating, message };
    } catch (error) {
      throw new Error('Failed to fetch review data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearReviewData = createAction('review/clearReviewData');
const clearErrors = createAction('review/clearErrors');

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review: {},
    list: [],
    length: 0,
    rating: null,
    message: '',
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewData: (state) => {
      return {
        review: {},
        list: [],
        length: 0,
        rating: null,
        message: '',
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
      .addCase(createReview.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createReview.fulfilled, (state, action) => {
        return {
          ...state,
          review: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createReview.rejected, (state, action) => {
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
            rating: action.payload.averageRating,
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
export const { reducer: reviewReducer } = reviewSlice;
export { createReview, clearReviewData, fetchReviewsWrittenFor, clearErrors };

import ROUTES from 'resources/routes-constants';

// Lib
import { post } from 'services/axiosServices';

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

// Action to clear user data, typically after logout
const clearReviewData = createAction('review/clearReviewData');
const clearErrors = createAction('review/clearErrors');

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewData: (state) => {
      return {
        review: {},
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
      });
  },
});

// Export the async thunk and reducer
export const { reducer: reviewReducer } = reviewSlice;
export { createReview, clearReviewData, clearErrors };

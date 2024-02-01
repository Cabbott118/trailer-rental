// Lib
import { get } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

const fetchStripeAccount = createAsyncThunk(
  'user/fetchStripeAccount',
  async (stripeAccountId) => {
    try {
      const response = await get(ENDPOINTS.GET_STRIPE_ACCOUNT_DETAILS, {
        stripeAccountId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch Stripe account data.');
    }
  }
);

// Action to clear atristripepe data, typically after logout
const clearStripeData = createAction('stripe/clearStripeData');
const clearErrors = createAction('stripe/clearErrors');

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: {
    stripe: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStripeData: (state) => {
      return {
        stripe: null,
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
      .addCase(fetchStripeAccount.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchStripeAccount.fulfilled, (state, action) => {
        return {
          ...state,
          stripe: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchStripeAccount.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: stripeReducer } = stripeSlice;
export { fetchStripeAccount, clearStripeData, clearErrors };

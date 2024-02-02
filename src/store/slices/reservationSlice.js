// Lib
import { get, post, patch } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

const createReservation = createAsyncThunk(
  'reservation/createReview',
  async ({ trailerId, ownerId, renterId, startDate, endDate }) => {
    try {
      const response = await post(ENDPOINTS.CREATE_RESERVATION, {
        trailerId,
        ownerId,
        renterId,
        startDate,
        endDate,
      });
      return response.reservation;
    } catch (error) {
      throw new Error('Failed to create reservation data.');
    }
  }
);

const fetchReservationsAssignedToTrailer = createAsyncThunk(
  'reservation/fetchReservationsAssignedToTrailer',
  async (trailerId) => {
    try {
      const response = await get(
        ENDPOINTS.GET_RESERVATIONS_ASSIGNED_TO_TRAILER,
        {
          trailerId,
        }
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch reservation data.');
    }
  }
);

const fetchReservationsAssignedToOwner = createAsyncThunk(
  'reservation/fetchReservationsAssignedToOwner',
  async (ownerId) => {
    try {
      const response = await get(ENDPOINTS.GET_RESERVATIONS_ASSIGNED_TO_OWNER, {
        ownerId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch reservation data.');
    }
  }
);

const fetchReservationsAssignedToRenter = createAsyncThunk(
  'reservation/fetchReservationsAssignedToRenter',
  async (renterId) => {
    try {
      const response = await get(
        ENDPOINTS.GET_RESERVATIONS_ASSIGNED_TO_RENTER,
        {
          renterId,
        }
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch reservation data.');
    }
  }
);

const updateReservation = createAsyncThunk(
  'reservation/updateReservation',
  async ({ reservationId, updateData }) => {
    try {
      const response = await patch(ENDPOINTS.UPDATE_RESERVATION, {
        reservationId,
        updateData,
      });
      return response.reservation;
    } catch (error) {
      throw new Error('Failed to update reservation data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearReservationData = createAction('reservation/clearReservationData');
const clearErrors = createAction('reservation/clearErrors');

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    reservation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReservationData: (state) => {
      return {
        reservations: [],
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
      .addCase(createReservation.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        return {
          ...state,
          reservations: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createReservation.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchReservationsAssignedToTrailer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(
        fetchReservationsAssignedToTrailer.fulfilled,
        (state, action) => {
          return {
            ...state,
            reservations: action.payload,
            loading: false,
            error: null,
          };
        }
      )
      .addCase(fetchReservationsAssignedToTrailer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchReservationsAssignedToOwner.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchReservationsAssignedToOwner.fulfilled, (state, action) => {
        return {
          ...state,
          reservations: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchReservationsAssignedToOwner.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchReservationsAssignedToRenter.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchReservationsAssignedToRenter.fulfilled, (state, action) => {
        return {
          ...state,
          reservations: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchReservationsAssignedToRenter.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateReservation.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        return {
          ...state,
          reservations: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateReservation.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: reservationReducer } = reservationSlice;
export {
  createReservation,
  fetchReservationsAssignedToTrailer,
  fetchReservationsAssignedToOwner,
  fetchReservationsAssignedToRenter,
  updateReservation,
  clearReservationData,
  clearErrors,
};

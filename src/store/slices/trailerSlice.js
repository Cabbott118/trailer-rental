// Lib
import { get, post, patch, del } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

// API Requests to Firestore Database

const createTrailer = createAsyncThunk(
  'trailer/createTrailer',
  async ({
    type,
    address,
    city,
    state,
    dailyRate,
    userId,
    firstName,
    lastName,
    imageURL,
  }) => {
    try {
      const response = await post(ENDPOINTS.CREATE_TRAILER, {
        type,
        address,
        city,
        state,
        dailyRate,
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
      const response = await get(ENDPOINTS.GET_TRAILER_DETAILS, {
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
    const response = await get(ENDPOINTS.GET_ALL_TRAILERS);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch trailers data.');
  }
});

const fetchTrailersOwnedBy = createAsyncThunk(
  'trailer/fetchTrailersOwnedBy',
  async (userId) => {
    try {
      const response = await get(ENDPOINTS.GET_TRAILERS_OWNED_BY, {
        userId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch trailer data.');
    }
  }
);

const filterTrailers = createAsyncThunk(
  'trailer/filterTrailers',
  async ({ location, type }, { getState }) => {
    try {
      const { fullTrailerList: completefullTrailerList } = getState().trailer;
      let fullTrailerList;
      if (completefullTrailerList.length > 0) {
        fullTrailerList = completefullTrailerList;
      } else {
        fullTrailerList = await get(ENDPOINTS.GET_ALL_TRAILERS);
      }

      let filteredTrailerList = fullTrailerList.filter((trailer) =>
        trailer.location.city.toLowerCase().includes(location.toLowerCase())
      );

      // Check if type is provided and filter accordingly
      if (type) {
        filteredTrailerList = filteredTrailerList.filter(
          (trailer) => trailer.type.toLowerCase() === type.toLowerCase()
        );
      }

      return { fullTrailerList, filteredTrailerList, location, type };
    } catch (error) {
      throw new Error('Failed to fetch trailers data.');
    }
  }
);

const updateTrailer = createAsyncThunk(
  'trailer/updateTrailer',
  async ({ trailerId, updateData }) => {
    try {
      const response = await patch(ENDPOINTS.UDPATE_TRAILER, {
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
      const response = await del(ENDPOINTS.DELETE_TRAILER, { trailerId });
      return response;
    } catch (error) {
      throw new Error('Failed to delete trailer data.');
    }
  }
);

const fetchReservationsAssignedToTrailer = createAsyncThunk(
  'trailer/fetchReservationsAssignedToTrailer',
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

// Action to clear trailer data, typically after logout
const clearTrailerData = createAction('trailer/clearTrailerData');
const clearErrors = createAction('trailer/clearErrors');

const trailerSlice = createSlice({
  name: 'trailer',
  initialState: {
    fullTrailerList: [],
    filteredTrailerList: [],
    ownedByList: [],
    searchedLocation: null,
    selectedTrailer: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTrailerData: (state) => {
      return {
        fullTrailerList: [],
        filteredTrailerList: [],
        ownedByList: [],
        searchedLocation: null,
        searchedType: null,
        selectedTrailer: null,
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
          fullTrailerList: [...state.fullTrailerList, action.payload],
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
          selectedTrailer: action.payload.trailer,
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
          fullTrailerList: action.payload,
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
          ownedByList: action.payload,
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

      .addCase(filterTrailers.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(filterTrailers.fulfilled, (state, action) => {
        return {
          ...state,
          fullTrailerList: action.payload.fullTrailerList,
          filteredTrailerList: action.payload.filteredTrailerList,
          searchedLocation: action.payload.location,
          searchedType: action.payload.type,
          loading: false,
          error: null,
        };
      })
      .addCase(filterTrailers.rejected, (state, action) => {
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
          fullTrailerList: action.payload,
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
          fullTrailerList: null,
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

    // .addCase(fetchReservationsAssignedToTrailer.pending, (state, action) => {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };
    // })
    // .addCase(
    //   fetchReservationsAssignedToTrailer.fulfilled,
    //   (state, action) => {
    //     return {
    //       ...state,
    //       selectedTrailer: {
    //         ...state.selectedTrailer,
    //         reservations: action.payload,
    //       },
    //       loading: false,
    //       error: null,
    //     };
    //   }
    // )
    // .addCase(fetchReservationsAssignedToTrailer.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    // });
  },
});

// Export the async thunk and reducer
export const { reducer: trailerReducer } = trailerSlice;
export {
  createTrailer,
  fetchTrailer,
  fetchTrailers,
  fetchTrailersOwnedBy,
  filterTrailers,
  updateTrailer,
  deleteTrailer,
  fetchReservationsAssignedToTrailer,
  clearTrailerData,
  clearErrors,
};

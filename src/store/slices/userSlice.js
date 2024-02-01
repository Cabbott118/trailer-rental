// Lib
import { get, post, patch, del } from 'services/axiosServices';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Resources
import ENDPOINTS from 'resources/api-constants';

// Services (Firebase Services)
import {
  login,
  signup,
  logout,
  changeEmail,
  deleteCredentials,
} from 'services/firebaseServices';

// Async thunk to log in a user
const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the signInWithEmailAndPassword function from the authentication service
      const user = await login(email, password);
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to sign up a user
const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the createUserWithEmailAndPassword function from the authentication service
      const user = await signup(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to log out a user
const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Call the signOut function from the authentication service
      await logout();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a user's credentials & records in Firestore
const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ userId, stripeAccountId }) => {
    try {
      await deleteCredentials();
      const response = await del(ENDPOINTS.DELETE_USER, {
        userId,
        stripeAccountId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to delete user data.');
    }
  }
);

// API Requests to Firestore Database

const createUser = createAsyncThunk(
  'user/createUser',
  async ({
    email,
    userId,
    firstName,
    lastName,
    phoneNumber,
    day,
    month,
    year,
    userType,
  }) => {
    try {
      const response = await post(ENDPOINTS.CREATE_USER, {
        email,
        userId,
        firstName,
        lastName,
        phoneNumber,
        day,
        month,
        year,
        userType,
      });
      return response.user;
    } catch (error) {
      throw new Error('Failed to create user data.');
    }
  }
);

const createFirebaseUser = createAsyncThunk(
  'user/createFirebaseUser',
  async ({ email, firstName, lastName, userType }) => {
    try {
      const response = await post(ENDPOINTS.CREATE_FIREBASE_USER, {
        email,
        password: process.env.REACT_APP_STANDARD_USER_CREATION,
        firstName,
        lastName,
        userType,
      });
      return response.user;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create firebase user.');
    }
  }
);

const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  try {
    const response = await get(ENDPOINTS.GET_USER_DETAILS, { userId });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch user data.');
  }
});

const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId) => {
    try {
      const response = await get(ENDPOINTS.GET_USER_PROFILE_DETAILS, {
        userId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user data.');
    }
  }
);

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

const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updateData }) => {
    try {
      changeEmail(updateData.email);
      const response = await patch(ENDPOINTS.UPDATE_USER, {
        userId,
        updateData,
      });
      return response.user;
    } catch (error) {
      throw new Error('Failed to update user data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearUserData = createAction('user/clearUserData');
const clearErrors = createAction('user/clearErrors');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    profile: null,
    stripe: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      return {
        data: null,
        profile: null,
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
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(signUpUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(signUpUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(deleteUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteUser.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          stripe: null,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(createUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(createFirebaseUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createFirebaseUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
        };
      })
      .addCase(createFirebaseUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchUserProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

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
      })

      .addCase(updateUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: userReducer } = userSlice;
export {
  loginUser,
  signUpUser,
  logoutUser,
  deleteUser,
  createUser,
  createFirebaseUser,
  fetchUser,
  fetchUserProfile,
  fetchStripeAccount,
  updateUser,
  clearUserData,
  clearErrors,
};

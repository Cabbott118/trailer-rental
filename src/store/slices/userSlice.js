// Lib
import { get, post, patch } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Services
import { login, signup, logout } from 'services/userServices';

// Async thunk to log in a user
const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the signInWithEmailAndPassword function from your authentication service
      const user = await login(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to sign up a user
const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the createUserWithEmailAndPassword function from your authentication service
      const user = await signup(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to log out a user
const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Call the signOut function from your authentication service
      await logout();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create user data
// const email: 'caleb@caleb.com'
// const uid: '123'
// dispatch(createUser({ email, uid }));
const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, uid, legalName }) => {
    try {
      const response = await post('/createUser', { email, uid, legalName });
      return response.user;
    } catch (error) {
      throw new Error('Failed to create user data.');
    }
  }
);

// Async thunk to fetch user data
// const uid = '123'
// dispatch(fetchUser(uid));
const fetchUser = createAsyncThunk('user/fetchUser', async (uid) => {
  try {
    const response = await get('/getUserDetails', { uid });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch user data.');
  }
});

// Async thunk to create user data
// const uid = '123'
// const updateData = {
//   name: {
//     firstName: 'Caleb',
//     lastName: 'Abbott',
//   },
// };

// dispatch(updateUser({ uid, updateData }));
const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/updateUser', { uid, updateData });
      return response.user;
    } catch (error) {
      throw new Error('Failed to update user data.');
    }
  }
);

const clearData = createAction('user/clearData');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isAuthenticated: false,
    loading: false,
    error: false,
  },
  reducers: {
    clearData: (state) => {
      return {
        data: null,
        isAuthenticated: false,
        loading: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          loading: false,
          data: action.payload,
          isAuthenticated: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })
      // Sign up user
      .addCase(signUpUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        return {
          loading: false,
          data: action.payload,
          isAuthenticated: true,
        };
      })
      .addCase(signUpUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return {
          loading: false,
          data: null,
          isAuthenticated: false,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })

      .addCase(createUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return {
          loading: false,
          data: action.payload,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          loading: false,
          data: action.payload,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          loading: false,
          data: action.payload,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
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
  createUser,
  fetchUser,
  updateUser,
  clearData,
};

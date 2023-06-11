import { createSlice, createAction } from '@reduxjs/toolkit';

const authenticateUser = createAction('user/authenticateUser');
const authenticateUserSuccess = createAction('user/authenticateUserSuccess');
const authenticateUserFailure = createAction('user/authenticateUserFailure');
const setData = createAction('user/setData');
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
    authenticateUser: (state) => {
      return {
        loading: true,
      };
    },
    authenticateUserSuccess: (state, action) => {
      return {
        data: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    authenticateUserFailure: (state, action) => {
      return {
        loading: false,
        error: true,
      };
    },
    setData: (state, action) => {
      return {
        data: action.payload,
      };
    },
    clearData: (state) => {
      return {
        data: null,
        loading: false,
        error: false,
      };
    },
  },
});

// Export the async thunk and reducer
export const { reducer: userReducer } = userSlice;
export {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserFailure,
  setData,
  clearData,
};

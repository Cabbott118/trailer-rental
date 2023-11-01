// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createItem = createAsyncThunk(
  'item/createItem',
  async ({ title, userId, firstName, lastName, imageURL }) => {
    try {
      const response = await post('/items/create-item', {
        title,
        userId,
        firstName,
        lastName,
        imageURL,
      });
      return response.item;
    } catch (error) {
      throw new Error('Failed to create item data.');
    }
  }
);

const fetchItem = createAsyncThunk('item/fetchItem', async (itemId) => {
  try {
    const response = await get('/items/get-item-details', { itemId });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch item data.');
  }
});

const fetchItems = createAsyncThunk('item/fetchItems', async () => {
  try {
    const response = await get('/items/get-all-items');
    return response;
  } catch (error) {
    throw new Error('Failed to fetch items data.');
  }
});

const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ itemId, updateData }) => {
    try {
      const response = await patch('/items/update-item', {
        itemId,
        updateData,
      });
      return response.item;
    } catch (error) {
      throw new Error('Failed to update item data.');
    }
  }
);

const deleteItem = createAsyncThunk('item/deleteItem', async (itemId) => {
  try {
    const response = await del('/items/delete-item', { itemId });
    return response;
  } catch (error) {
    throw new Error('Failed to delete item data.');
  }
});

// Action to clear item data, typically after logout
const clearItemData = createAction('item/clearItemData');
const clearErrors = createAction('item/clearErrors');

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearItemData: (state) => {
      return {
        data: [],
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
      .addCase(createItem.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createItem.fulfilled, (state, action) => {
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
          error: null,
        };
      })
      .addCase(createItem.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchItem.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchItem.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchItems.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchItems.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateItem.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateItem.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(deleteItem.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteItem.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteItem.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: itemReducer } = itemSlice;
export {
  deleteItem,
  createItem,
  fetchItem,
  fetchItems,
  updateItem,
  clearItemData,
  clearErrors,
};

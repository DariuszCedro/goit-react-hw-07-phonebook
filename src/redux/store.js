import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

//Slices--------------------------------------------------------
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contactsList = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contactsList = [...state.contactsList, action.payload];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contactsList = [
          ...state.filter(contact => contact.id !== action.payload),
        ];
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return [action.payload];
    },
  },
});
//-------------------------------------------------

//Functions--------------------------------
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://65d48d493f1ab8c634356d82.mockapi.io/phonebook/contacts'
      );

      return response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactName, thunkAPI) => {
    try {
      const response = await fetch(
        'https://65d48d493f1ab8c634356d82.mockapi.io/phonebook/contacts',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contactName }),
        }
      );

      return response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://65d48d493f1ab8c634356d82.mockapi.io/phonebook/contacts/${contactId}`,
        {
          method: 'DELETE',
        }
      );

      return response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

//----------------------------------------------------

export const { setFilter } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;
export const { fetchingError, fetchingInProgress, fetchingSuccess } =
  contactsSlice.actions;

//Store----------------------------------------------------
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
//-----------------------------------------------------------

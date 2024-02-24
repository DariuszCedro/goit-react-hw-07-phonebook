import {createSlice} from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

export const handlePending = (state, action) => {
    state.isLoading = true;
}

export const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
      contactsList: [],
      isLoading: false,
      error: null,
    },

    extraReducers: builder => {
      builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.contactsList = action.payload;
        })
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.contactsList = [...state.contactsList, action.payload];
        })
        .addCase(addContact.rejected, handleRejected)
        .addCase(deleteContact.pending, handlePending)
        .addCase(deleteContact.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          const index = state.contactsList.findIndex(
            contact => contact.id === action.payload.id
          );
          state.contactsList.splice(index, 1);
        })
        .addCase(deleteContact.rejected, handleRejected);
    },
  });
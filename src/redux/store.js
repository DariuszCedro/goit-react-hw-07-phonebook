import { configureStore} from '@reduxjs/toolkit';
import {contactsSlice} from '../redux/contactsSlice';
import {filterSlice} from '../redux/filterSlice';


export const { setFilter } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;
export const { fetchingError, fetchingInProgress, fetchingSuccess } =
  contactsSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});


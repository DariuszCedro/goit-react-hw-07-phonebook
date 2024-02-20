import { configureStore, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsInitialState = JSON.parse(localStorage.getItem('contacts')) || [
  { contactName: 'Tadzio Przykład', id: '1', number: '070-072-772' },
];

const filterInitialState = '';

//Slices
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        return [...state, action.payload];
      },
      prepare(contactName, number) {
        return {
          payload: {
            id: nanoid(),
            contactName: contactName,
            number: number,
          },
        };
      },
    },
    deleteContact(state, action) {
      return [...state.filter(contact => contact.id !== action.payload)];
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilter(state, action) {
      return [action.payload];
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;

//Store
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

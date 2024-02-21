import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contactsList;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (contacts)
      return contacts.filter(contact =>
        contact.contactName.toLowerCase().includes(filter)
      );
    return [];
  }
);

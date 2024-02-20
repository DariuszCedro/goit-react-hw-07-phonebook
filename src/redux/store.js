import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';


const contactsInitialState = 
  JSON.parse(localStorage.getItem('contacts')) || [
    { name: 'Tadzio Przykład', id: '1', number: '070-072-772'},
  ]

;

const filterInitialState = "";
  



//Actions
export const addContact = createAction('contacts/addContact', (name, number) => {
  return {
    type: 'contacts/addContact',
    payload: {
      id: nanoid(),
      name: name,
      number: number,
    },
  };
});
export const deleteContact = createAction('contacts/deleteContact', contactId => {
  return {
    type: 'contacts/deleteContact',
    payload: contactId,
  };
});
export const setFilter = createAction('filter/setFilter', value => {
  return {
    type: 'filter/setFilter',
    payload: value,
  };
});

//Reducers

const contactsReducer = createReducer(contactsInitialState, (builder)=>
{
  builder.addCase(addContact, (state, action) => {return [
    ...state,
    action.payload]}).addCase(deleteContact, (state, action)=> {
      return [
        
        ...state.filter(
          contact => contact.id !== action.payload
        ),
        ]
    })
})

const filterReducer = createReducer(filterInitialState, (builder)=>{
  builder.addCase(setFilter, (state, action)=>{
    return [action.payload]
  })
})

//Store
export const store = configureStore({ 
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer
  }  });

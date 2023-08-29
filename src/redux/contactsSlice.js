import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState: initialState,
  reducers: {
    addContacts(state, action) {
      // state.contacts = [...state.contacts, action.payload];
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      // state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      //  const deletedContactIndex = state.contacts.findIndex(contact => contact.id === action.payload);
      //  state.contacts.splice(deletedContactIndex, 1);
    },
  },
});

const contactsReducer = contactsSlice.reducer;

export const { setContacts, addContacts, deleteContacts } =
  contactsSlice.actions;

export const selectContacts = state => state.contacts.contacts;


const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

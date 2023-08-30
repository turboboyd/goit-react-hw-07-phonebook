import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(
        `https://64ee31fb1f87218271426a47.mockapi.io/contacts`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

const initialState = {
  contacts: [],
  status: null,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
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

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.pending = 'loading';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {});
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

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);

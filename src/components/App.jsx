import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from '../redux/filterSlice';
import {
  selectContacts,
  addContacts,
  deleteContacts,
} from '../redux/contactsSlice.js';

export function App() {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispath = useDispatch();
  const loginInputId = nanoid();


  const createUser = dataUser => {
    const { name, number } = dataUser;
    const newContact = { id: loginInputId, name, number };
    const normalizedNewContact = newContact.name.toLowerCase();
    const contactExaminationthis = contacts.find(
      contact => contact.name.toLowerCase() === normalizedNewContact
    );
    if (contactExaminationthis) {
      return alert(`${dataUser.name} is already in contacts`);
    }
    dispath(addContacts(newContact));
  };

  const changeFilter = e => {
    dispath(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
     dispath(deleteContacts(id));
  };


  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm createUser={createUser} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

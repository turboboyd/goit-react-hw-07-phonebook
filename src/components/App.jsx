import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from '../redux/filterSlice';
import {
  selectContacts,
  deleteContact,
  fetchContacts,
  selectStatus,
  selectError,
} from '../redux/contactsSlice.js';

export function App() {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!Array.isArray(contacts)) {
      return [];
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <section className={css.section}>
      <div className={css.container_backgroun}>
        <div className={css.container}>
          <div className={css.wrapper}>
            <h1 className={css.title}>Phonebook</h1>
            <ContactForm />
          </div>

          <div className={css.wrapper}>
            {status === 'loading' && <h2>loading...</h2>}
            {error && <h2>Phonebook</h2>}
            {status === 'resolved' && (
              <>
                <h2 className={css.title}>Contacts</h2>
                {contacts.length > 0 ? (
                  <>
                    <Filter value={filter} onChange={changeFilter} />
                    <ContactList
                      contacts={getVisibleContacts()}
                      onDeleteContact={removeContact}
                    />
                  </>
                ) : (
                  <p>No contacts found</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

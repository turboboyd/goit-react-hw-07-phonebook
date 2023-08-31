import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { pushContact, selectContacts } from '../../redux/contactsSlice';
import SubmitButton from '../SubmitButton/SubmitButton'

export function ContactForm(props) {
  const loginInputId = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); 
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handeleChangeEmail = e => {
    setName(e.currentTarget.value);
  };
  const handeleChangePhone = e => {
    setPhone(e.currentTarget.value);
  };

  const hendleSubmit = e => {
    e.preventDefault();
    const newContact = { name, phone };
   const normalizedNewContact = newContact.name.toLowerCase();
    const contactExaminationthis = contacts.find(
      contact => contact.name.toLowerCase() === normalizedNewContact
    );
    if (contactExaminationthis) {
      return alert(`${newContact.name} is already in contacts`);
    }
    dispatch(pushContact(newContact));
    resetState();
  };

  const resetState = () => {
    setName('');
    setPhone('');
  };
  return (
    <form className={css.form} onSubmit={hendleSubmit}>
      <label className={css.label} htmlFor={loginInputId}>
        Name:
        <input
          className={css.input}
          id={loginInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handeleChangeEmail}
        />
      </label>
      <label className={css.label} htmlFor={loginInputId}>
        Phone:
        <input
          className={css.input}
          id={loginInputId}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handeleChangePhone}
        />
      </label>
      <SubmitButton type="submit" />
    </form>
  );
}



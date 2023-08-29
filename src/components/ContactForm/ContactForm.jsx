import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export function ContactForm(props) {
  const loginInputId = nanoid();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handeleChangeEmail = e => {
    setName(e.currentTarget.value);
  };
  const handeleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const hendleSubmit = e => {
    e.preventDefault();
    props.createUser({
      name: name,
      number: number,
    });
    resetState();
  };

  const resetState = () => {
    setName('');
    setNumber('');
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
        Number:
        <input
          className={css.input}
          id={loginInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handeleChangeNumber}
        />
      </label>
      <button className={css.submit} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};
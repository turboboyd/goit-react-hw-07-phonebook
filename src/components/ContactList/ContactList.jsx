import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, phone }) => (
        <li className={css.item} key={id}>
          <h3 className={css.title}>{name} :</h3>
          <p>{phone}</p>
          <button className={css.button} onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

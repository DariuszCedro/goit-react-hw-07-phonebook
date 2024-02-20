import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import css from './List.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/store';

export const List = () => {
  const dispatch = useDispatch();

  //Selectors--
  const contacts = useSelector(state => state.contacts.contactsList);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const filter = useSelector(state => state.filter);
  //-----

  const showFilteredContacts = () => {
    console.log(contacts);
    if (contacts)
      return contacts.filter(contact =>
        contact.contactName.toLowerCase().includes(filter)
      );
    return [];
  };
  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}

      <ul>
        {showFilteredContacts().map(contact => (
          <li key={contact.id}>
            {contact.contactName} : {contact.number}
            <button
              type="button"
              className={css.buttonRemove}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

List.propTypes = {
  showFiltered: PropTypes.array,
  removeContact: PropTypes.func,
};

import { addContact } from '../../redux/store';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactsList);
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = document.querySelector('form');
    const nameToAdd = form.elements.name.value;
    const phoneNumber = form.elements.number.value;
    const contactExist = contacts.some(
      contact => contact.contactName.toLowerCase() === nameToAdd.toLowerCase()
    );
    if (nameToAdd === '' && phoneNumber === '') {
      return;
    }
    if (contactExist) {
      alert('This contact is already on Your list');
    } else {
      dispatch(
        addContact(form.elements.name.value, form.elements.number.value)
      );
    }
    form.reset();
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          className={css.inputAdd}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <h3>Number</h3>
        <input
          type="tel"
          name="number"
          className={css.inputAdd}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button
          type="submit"
          name="addContact"
          className={css.buttonAdd}
          onClick={handleSubmit}
        >
          Add contact
        </button>
      </form>
    </>
  );
};

Form.propTypes = {
  addContact: PropTypes.func,
};

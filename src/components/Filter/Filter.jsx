import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/store';

export const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = evt => {
    evt.preventDefault();
    dispatch(setFilter(evt.target.value.toLowerCase()));
  };
  return (
    <>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        className={css.inputFilter}
        name="filter"
        onChange={handleFilterChange}
      />
    </>
  );
};

Filter.proptyTypes = {
  contactFilter: PropTypes.func,
};

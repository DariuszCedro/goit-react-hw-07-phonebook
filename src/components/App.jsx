import React from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { List } from './List/List';

export const App = () => {
  return (
    <div>
      <Form></Form>
      <h2>Contacts</h2>
      <Filter></Filter>
      <List></List>
      -----------------------------------------------------------
    </div>
  );
};

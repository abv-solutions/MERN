// Generate ShoppingList with delete option

import React, { useContext, useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Context } from '../contexts/context';
import { getItems, deleteItem } from '../actions/itemActions';
import { clearErrors } from '../actions/errorActions';

const ShoppingList = () => {
  // Get item state from context
  const { state, dispatch } = useContext(Context);
  const { item, auth, error } = state;

  const [msg, setState] = useState(null);
  // Call action for getting items - lifecycle method
  useEffect(() => {
    getItems(dispatch);
    // eslint-disable-next-line
  }, []);

  // Copy error from state
  useEffect(() => {
    if (error.status) {
      // Check for login error
      if (error.id === 'TOKEN_ERROR_DEL') {
        setState(error.msg.msg);
      }
    } else {
      setState(null);
    }
    // eslint-disable-next-line
  }, [error]);

  // Call action for deleting item
  const onDeleteClick = id => {
    deleteItem(id, auth.token, dispatch);
  };

  return (
    <Container>
      {msg ? <Alert color='danger'>{msg}</Alert> : null}
      <ListGroup className='mb-5 pb-5'>
        <TransitionGroup className='shopping-list'>
          {item.items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                {auth.isAuthenticated ? (
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => onDeleteClick(_id)}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

// Export rendered component to the front-end
export default ShoppingList;

import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from './spinner/Spinner';
import { getItems, updateItem, deleteItem } from '../actions/itemActions';
import { Context } from '../contexts/context';

const ShoppingList = () => {
  const { state, dispatch } = useContext(Context);
  const { item, auth, error } = state;
  const [msg, setState] = useState(null);

  // Get items
  useEffect(() => {
    if (auth.token) {
      getItems(auth.token, dispatch);
    }
    // eslint-disable-next-line
  }, [auth.token]);

  // Copy error from state
  useEffect(() => {
    if (error.status) {
      // Check for errors
      if (error.id === 'TOKEN_ERROR_DEL' || error.id === 'TOKEN_ERROR_UPD') {
        setState(error.msg.msg);
      }
    } else {
      setState(null);
    }
    // eslint-disable-next-line
  }, [error]);

  // Call function for deleting item
  const onDeleteClick = id => {
    deleteItem(id, auth.token, dispatch);
  };

  // Call function to select entire input
  const onFocus = e => {
    e.target.select();
  };

  // Call function for item edit
  const onEdit = e => {
    const { id, value } = e.target;
    const editedItem = {
      id: id,
      quantity: value
    };
    // Check input and request stage
    if (!item.isEditing && value !== '' && value > 0 && value <= 20) {
      updateItem(editedItem, auth.token, dispatch);
    }
  };

  return (
    <Container>
      {msg ? <Alert color='danger'>{msg}</Alert> : null}
      <ListGroup className='mb-5 pb-5'>
        <TransitionGroup className='shopping-list'>
          {item.isLoading ? (
            // Render spinner
            <CSSTransition classNames='spin' timeout={0}>
              <Spinner />
            </CSSTransition>
          ) : (
            // If authenticated
            auth.isAuthenticated &&
            // Then render items
            item.items.map(({ _id, name, quantity }) => (
              <CSSTransition key={_id} timeout={1000} classNames='fade'>
                <ListGroupItem>
                  <>
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={() => onDeleteClick(_id)}
                    >
                      &times;
                    </Button>
                    {name}
                    <Input
                      type='number'
                      name='quantity'
                      className='quantity'
                      value={quantity}
                      id={_id}
                      onChange={onEdit}
                      onFocus={onFocus}
                    ></Input>
                  </>
                </ListGroupItem>
              </CSSTransition>
            ))
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;

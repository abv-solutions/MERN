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
    getItems(dispatch);
    // eslint-disable-next-line
  }, []);

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

  // Call action for deleting item
  const onDeleteClick = id => {
    deleteItem(id, auth.token, dispatch);
  };

  // Call function for item edit
  const onEdit = e => {
    const { id, value } = e.target;
    const editedItem = {
      id: id,
      quantity: value
    };
    // API request only if it's not pending
    if (!item.isEditing) {
      updateItem(editedItem, auth.token, dispatch);
    }
  };

  return (
    <Container>
      {msg ? <Alert color='danger'>{msg}</Alert> : null}
      <ListGroup className='mb-5 pb-5'>
        <TransitionGroup className='shopping-list'>
          {!item.isLoading ? (
            // Render items
            item.items.map(({ _id, name, quantity }) => (
              <CSSTransition key={_id} timeout={1000} classNames='fade'>
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
                  {auth.isAuthenticated ? (
                    <Input
                      type='number'
                      name='quantity'
                      className='quantity'
                      value={quantity}
                      id={_id}
                      onChange={onEdit}
                    ></Input>
                  ) : null}
                </ListGroupItem>
              </CSSTransition>
            ))
          ) : (
            // Render spinner
            <CSSTransition classNames='spin' timeout={0}>
              <Spinner />
            </CSSTransition>
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;

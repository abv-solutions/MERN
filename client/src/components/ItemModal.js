// Generate Modal with add option

import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import { Context } from '../contexts/context';
import { addItem } from '../actions/itemActions';
import { clearErrors } from '../actions/errorActions';

const ItemModal = () => {
  const { state, dispatch } = useContext(Context);
  const { error, auth, item } = state;
  const [localState, setState] = useState({
    name: '',
    msg: null,
    modal: false
  });

  // Copy error from state
  useEffect(() => {
    if (error.status) {
      // Check for login error
      if (error.id === 'TOKEN_ERROR_ADD' || error.id === 'EMPTY_FIELDS') {
        setState({
          ...localState,
          msg: error.msg.msg
        });
      }
    }
    // eslint-disable-next-line
  }, [error]);

  // Close modal after item add
  useEffect(() => {
    if (localState.modal) {
      toggle();
    }
    // eslint-disable-next-line
  }, [item]);

  //
  useEffect(() => {
    if (error.status) {
      clearErrors(dispatch);
    }
    // eslint-disable-next-line
  }, [localState.modal]);

  const toggle = () => {
    setState({
      ...localState,
      name: '',
      msg: null,
      modal: !localState.modal
    });
  };

  // Call function for input typing
  const onChange = e => {
    setState({
      ...localState,
      [e.target.name]: e.target.value
    });
  };

  // Call function for adding item
  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: localState.name
    };
    // Add item via addItem action
    addItem(newItem, auth.token, dispatch);
  };

  // Create Modal with add option
  return (
    <div>
      {auth.isAuthenticated ? (
        <Button
          color='dark'
          style={{ marginBottom: '1rem', marginLeft: '1rem' }}
          onClick={toggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className='mb-4  ml-4'>Please log in to manage items</h4>
      )}
      <Modal isOpen={localState.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          {localState.msg ? (
            <Alert color='danger'>{localState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add shopping item'
                onChange={onChange}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// Export rendered component to the front-end
export default ItemModal;

// Generate Modal for user login
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
  NavLink,
  Alert
} from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { Context } from '../../contexts/context';
const RegisterModal = () => {
  const { state, dispatch } = useContext(Context);
  const { error } = state;
  const [localState, setState] = useState({
    name: '',
    email: '',
    password: '',
    msg: null,
    modal: false
  });

  useEffect(() => {
    if (error.status) {
      // Check for login error
      if (error.id === 'REGISTER_FAIL') {
        setState({
          ...localState,
          msg: error.msg.msg
        });
      }
    }
    // eslint-disable-next-line
  }, [error]);

  const toggle = () => {
    setState({
      ...localState,
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
  // Call function for login attempt
  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = localState;
    // Create user object
    const newUser = {
      name,
      email,
      password
    };
    // Attempt login via login action
    clearErrors(dispatch);
    register(newUser, dispatch);
  };

  // Create Modal for user login
  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Register
      </NavLink>
      <Modal isOpen={localState.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {localState.msg ? (
            <Alert color='danger'>{localState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                className='mb-3'
                onChange={onChange}
              />
              <Label for='email'>Email</Label>
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                autoComplete='username'
                className='mb-3'
                onChange={onChange}
              />
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                autoComplete='current-password'
                className='mb-3'
                onChange={onChange}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// Export rendered component to the front-end
export default RegisterModal;

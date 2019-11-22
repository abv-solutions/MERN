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

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Context } from '../../contexts/context';

const LoginModal = () => {
  const { state, dispatch } = useContext(Context);
  const { error } = state;
  const [localState, setState] = useState({
    email: '',
    password: '',
    msg: null,
    modal: false
  });

  useEffect(() => {
    if (error.status) {
      // Check for login error
      if (error.id === 'LOGIN_FAIL') {
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
    const { email, password } = localState;
    // Create user object
    const user = {
      email,
      password
    };
    // Attempt login via login action
    clearErrors(dispatch);
    login(user, dispatch);
  };

  // Create Modal for user login
  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>
      <Modal isOpen={localState.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {localState.msg ? (
            <Alert color='danger'>{localState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// Export rendered component to the front-end
export default LoginModal;

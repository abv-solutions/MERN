// Generate Navbar

import React, { useContext, useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { Context } from '../contexts/context';
import { loadUser } from '../actions/authActions';

const AppNavbar = () => {
  const { state, dispatch } = useContext(Context);
  const [isOpen, setState] = useState(false);

  useEffect(() => {
    loadUser(state.auth.token, dispatch);
    // eslint-disable-next-line
  }, []);

  const toggle = () => {
    setState(!isOpen);
  };
  const { isAuthenticated, user } = state.auth;

  const authLinks = (
    <>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

// Export rendered component to the front-end
export default AppNavbar;

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
import { loadUser } from '../actions/authActions';
import { Context } from '../contexts/context';

const AppNavbar = () => {
  const { state, dispatch } = useContext(Context);
  const { user, token, isAuthenticated, isLoading } = state.auth;
  const [isOpen, setState] = useState(false);

  // Load user
  useEffect(() => {
    loadUser(token, dispatch);
    // eslint-disable-next-line
  }, []);

  const toggle = () => {
    setState(!isOpen);
  };

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
              {!isLoading ? (isAuthenticated ? authLinks : guestLinks) : null}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

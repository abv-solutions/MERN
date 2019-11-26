import React, { useContext } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Context } from '../../contexts/context';

const Logout = () => {
  const { dispatch } = useContext(Context);
  const onClick = () => {
    logout(dispatch);
    clearErrors(dispatch);
  };

  return (
    <>
      <NavLink onClick={onClick} href='#'>
        Logout
      </NavLink>
    </>
  );
};

export default Logout;

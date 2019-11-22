import React from 'react';
import { Navbar, Container } from 'reactstrap';

//Create footer
const Footer = () => {
  return (
    <Navbar className='fixed-bottom' color='dark' dark>
      <span className='navbar-brand mx-auto'>Above Solutions &copy; 2019</span>
    </Navbar>
  );
};

export default Footer;

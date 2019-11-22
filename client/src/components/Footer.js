import React, { Component } from 'react';
import { Navbar, Container } from 'reactstrap';

//Create footer
class Footer extends Component {
  render() {
    return (
      <div className='fixed-bottom'>
        <Navbar color='dark' dark>
          <Container className='text-center'>
            <span className='navbar-brand mx-auto'>
              Above Solutions &copy; 2019
            </span>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Footer;

import React from 'react';
import { Container } from 'reactstrap';

import ContextProvider from './contexts/context';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <ContextProvider>
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
      <Footer />
    </ContextProvider>
  );
};

export default App;

import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ContextProvider from './contexts/context';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import Footer from './components/Footer';

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

import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const intialState = {
    item: {
      items: [],
      isLoading: false
    },
    auth: {
      token: localStorage.getItem('token'),
      user: null,
      isAuthenticated: null,
      isLoading: false
    },
    error: {
      msg: {},
      status: null,
      id: null
    }
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;

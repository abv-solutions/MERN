// Root reducer imported in store.js

import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

// Reducers collection
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});

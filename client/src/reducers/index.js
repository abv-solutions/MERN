// Root reducer imported in store.js

import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
// Reducers collection
export default combineReducers({
  item: itemReducer
});

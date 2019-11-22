// Import action types
import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types';

// Set initial error state
const initialState = {
  msg: {},
  status: null,
  id: null
};

// Return function for each action type
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };

    default:
      return state;
  }
};

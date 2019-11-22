// Import action types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

// Set initial auth state
const initialState = {
  // Property used for data storage
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  isLoading: false
};

// Return function for each action type
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        // Only user comes from back-end
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    // Set token in local storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // User and token from back-end
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
};

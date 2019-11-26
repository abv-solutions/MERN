import axios from 'axios';
import { returnErrors } from './errorActions';

// Check token & load user
export const loadUser = (token, dispatch) => {
  // User loading
  dispatch(userLoading());
  axios
    .get('/users/user', headers(token))
    .then(res =>
      dispatch({
        type: 'USER_LOADED',
        // Only user comes from back-end
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: 'AUTH_ERROR'
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
// Register user
export const register = ({ name, email, password }, dispatch) => {
  // Request body
  const body = JSON.stringify({ name, email, password });
  axios
    .post('/users/register', body, headers())
    .then(res =>
      dispatch({
        type: 'REGISTER_SUCCESS',
        // User and token from back-end
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: 'REGISTER_FAIL'
      });
    });
};
// Login user
export const login = ({ email, password }, dispatch) => {
  // Request body
  const body = JSON.stringify({ email, password });
  axios
    .post('/users', body, headers())
    .then(res =>
      dispatch({
        type: 'LOGIN_SUCCESS',
        // User and token from back-end
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: 'LOGIN_FAIL'
      });
    });
};
// Logout user
export const logout = dispatch => {
  dispatch({
    type: 'LOGOUT_SUCCESS'
  });
};
// Create headers
export const headers = (token = null) => {
  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  // If token exists, add to headers
  if (token) {
    config.headers['auth-token'] = token;
  }
  return config;
};

// Set loading flag - used locally
export const userLoading = () => {
  return {
    type: 'USER_LOADING'
  };
};

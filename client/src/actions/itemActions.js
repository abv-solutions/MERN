import axios from 'axios';
import { headers } from './authActions';
import { returnErrors } from './errorActions';

// Get items
export const getItems = (token, dispatch) => {
  dispatch(itemsLoading());
  // Simulate server delay
  setTimeout(() => {
    axios
      .get('/items', headers(token))
      .then(res => {
        dispatch({ type: 'GET_ITEMS', payload: res.data });
      })
      .catch(err => {
        dispatch(clearFlags());
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }, 1500);
};
// Add items
export const addItem = (item, token, dispatch) => {
  const { name } = item;
  const body = JSON.stringify({ name });
  axios
    .post('/items', body, headers(token))
    .then(res =>
      dispatch({
        type: 'ADD_ITEM',
        payload: res.data
      })
    )
    .catch(err => {
      let id;
      if (err.response.status === 400) {
        id = 'EMPTY_FIELDS_ADD';
      } else {
        id = 'TOKEN_ERROR_ADD';
      }
      dispatch(returnErrors(err.response.data, err.response.status, id));
    });
};
// Update items
export const updateItem = (item, token, dispatch) => {
  const { id, quantity } = item;
  const body = JSON.stringify({ quantity });
  // Set items editing
  dispatch(itemsEditing());
  axios
    .put(`/items/${id}`, body, headers(token))
    .then(res =>
      dispatch({
        type: 'UPDATE_ITEM',
        payload: item
      })
    )
    .catch(err => {
      dispatch(clearFlags());
      let id;
      if (err.response.status === 400) {
        id = 'EMPTY_FIELDS_UPD';
      } else {
        id = 'TOKEN_ERROR_UPD';
      }
      dispatch(returnErrors(err.response.data, err.response.status, id));
    });
};
// Delete items
export const deleteItem = (id, token, dispatch) => {
  axios
    .delete(`/items/${id}`, headers(token))
    .then(res =>
      dispatch({
        type: 'DELETE_ITEM',
        payload: id
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, 'TOKEN_ERROR_DEL')
      )
    );
};
// Set loading flag - used locally
export const itemsLoading = () => {
  return {
    type: 'ITEMS_LOADING'
  };
};

// Set editing flag - used locally
export const itemsEditing = () => {
  return {
    type: 'ITEMS_EDITING'
  };
};

// Clear flags - used locally
export const clearFlags = () => {
  return {
    type: 'CLEAR_FLAGS'
  };
};

// Clear items - used from components
export const clearItems = dispatch => {
  dispatch({
    type: 'CLEAR_ITEMS'
  });
};

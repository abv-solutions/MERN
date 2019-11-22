import { headers } from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';

// Get items
export const getItems = dispatch => {
  // Items loading
  dispatch(itemsLoading());
  axios
    .get('/items')
    .then(res => {
      dispatch({ type: 'GET_ITEMS', payload: res.data });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
        id = 'EMPTY_FIELDS';
      } else {
        id = 'TOKEN_ERROR_ADD';
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

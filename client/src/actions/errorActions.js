// Return errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status, id }
  };
};

// Clear errors
export const clearErrors = dispatch => {
  dispatch({
    type: 'CLEAR_ERRORS'
  });
};

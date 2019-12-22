// Return errors - used from actions
export const returnErrors = (msg, status, id = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status, id }
  };
};

// Clear errors - used from components
export const clearErrors = dispatch => {
  dispatch({
    type: 'CLEAR_ERRORS'
  });
};

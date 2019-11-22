// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    // Item reducer

    case 'GET_ITEMS':
      return {
        ...state,
        item: {
          items: action.payload,
          isLoading: false
        }
      };

    case 'ADD_ITEM':
      return {
        ...state,
        item: {
          items: [action.payload, ...state.item.items],
          isLoading: state.item.isLoading
        }
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        item: {
          items: state.item.items.filter(item => item._id !== action.payload),
          isLoading: state.item.isLoading
        }
      };

    case 'ITEMS_LOADING':
      // Can be used to set a spinner while fetching data
      return {
        ...state,
        item: {
          items: [...state.item.items],
          isLoading: true
        }
      };

    // Auth reducer

    case 'USER_LOADED':
      return {
        ...state,
        auth: {
          // Only user comes from back-end
          user: action.payload,
          token: state.auth.token,
          isAuthenticated: true,
          isLoading: false
        }
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      // Set token in local storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        auth: {
          // User and token from back-end
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        }
      };

    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        auth: {
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        }
      };

    case 'USER_LOADING':
      // Can be used to set a spinner while fetching data
      return {
        ...state,
        auth: {
          token: state.auth.token,
          user: state.auth.user,
          isAuthenticated: state.auth.isAuthenticated,
          isLoading: true
        }
      };

    // Error reducer

    case 'GET_ERRORS':
      return {
        ...state,
        error: {
          msg: action.payload.msg,
          status: action.payload.status,
          id: action.payload.id
        }
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: {
          msg: {},
          status: null,
          id: null
        }
      };

    default:
      return state;
  }
};

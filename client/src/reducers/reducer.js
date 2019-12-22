// Return function for each action type
export const reducer = (state, action) => {
  switch (action.type) {
    // Item reducer

    case 'GET_ITEMS':
      return {
        ...state,
        item: {
          items: action.payload,
          isLoading: false,
          isEditing: state.item.isEditing
        }
      };

    case 'ADD_ITEM':
      return {
        ...state,
        item: {
          items: [action.payload, ...state.item.items],
          isLoading: state.item.isLoading,
          isEditing: state.item.isEditing
        }
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        item: {
          items: state.item.items.map(item =>
            item._id === action.payload.id
              ? {
                  // Update the item quantity
                  ...item,
                  quantity: action.payload.quantity
                }
              : item
          ),
          isLoading: state.item.isLoading,
          isEditing: false
        }
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        item: {
          items: state.item.items.filter(item => item._id !== action.payload),
          isLoading: state.item.isLoading,
          isEditing: state.item.isEditing
        }
      };

    case 'ITEMS_LOADING':
      // Used to set a spinner while fetching data
      return {
        ...state,
        item: {
          items: [...state.item.items],
          isLoading: true,
          isEditing: state.item.isEditing
        }
      };

    case 'ITEMS_EDITING':
      // Used to prevent api calls overflow
      return {
        ...state,
        item: {
          items: [...state.item.items],
          isLoading: state.item.isLoading,
          isEditing: true
        }
      };

    case 'CLEAR_FLAGS':
      return {
        ...state,
        item: {
          items: [...state.item.items],
          isLoading: false,
          isEditing: false
        }
      };

    case 'CLEAR_ITEMS':
      return {
        ...state,
        item: {
          items: [],
          isLoading: false,
          isEditing: false
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
      // Used to control components display while fetching data
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

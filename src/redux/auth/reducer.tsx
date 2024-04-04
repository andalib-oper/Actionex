import {GET_USERDETAILS, IS_LOGGED_IN, LOGOUT} from './actionTypes';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  error: string;
  userDetails: any; // Add userDetails property
}

interface AuthAction {
  data: any;
  type: string;
  access_token?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userDetails: {},
  error: '',
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
      case IS_LOGGED_IN: {
        console.log("action", action)
      return {
        ...state,
        isLoggedIn: true,
        token: action.access_token ?? null,
      };
    }

    case GET_USERDETAILS: {
      return {
        ...state,
        userDetails: action.data,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;

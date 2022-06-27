import { ELogin, ILoginDispatchTypes } from "../ActionTypes/LoginActionTypes";

export interface defaultState {
  loading: boolean;
  message?: string;
  user?: any;
  error?: Error;
}

const initialState: defaultState = {
  loading: false,
};

const LoginReducer = (
  state: defaultState = initialState,
  action: ILoginDispatchTypes
): defaultState => {
  switch (action.type) {
    case ELogin.SUCCESS:
      return {
        loading: false,
        user: action.user,
      };

    case ELogin.LOADING:
      return {
        loading: true,
      };

    case ELogin.FAIL:
      return {
        loading: false,
        message: action.message,
      };

    case ELogin.ERROR:
      return {
        loading: false,
        error: action.error,
      };

    case ELogin.LOGOUT:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export default LoginReducer;

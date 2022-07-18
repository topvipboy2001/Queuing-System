import { ELogin, LoginDispatchTypes } from "../ActionTypes/LoginActionTypes";

export interface defaultState {
  loading: boolean;
  message?: string;
  current: any;
  error?: Error;
}

const initialState: defaultState = {
  loading: false,
  current: {
    id: "unknown",
    name: "unknown",
    username: "unknown",
    phoneNumber: "unknown",
    email: "unknown",
    password: "unknown",
    role: {
      id: "unknown",
      name: "unknown",
    },
    isActive: false,
  },
};

const LoginReducer = (
  state: defaultState = initialState,
  action: LoginDispatchTypes
): defaultState => {
  switch (action.type) {
    case ELogin.SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case ELogin.LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ELogin.FAIL:
      return {
        loading: false,
        message: action.message,
        current: state.current,
      };

    case ELogin.ERROR:
      return {
        loading: false,
        error: action.error,
        current: state.current,
      };

    case ELogin.LOGOUT:
      return {
        loading: false,
        current: state.current,
      };

    case ELogin.LOGIN_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ELogin.LOGIN_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case ELogin.LOGIN_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    default:
      return {
        loading: false,
        current: state.current,
      };
  }
};

export default LoginReducer;

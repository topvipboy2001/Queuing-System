import {
  EUser,
  UserDispatchType,
  UserType,
} from "../ActionTypes/UserActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: UserType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const UserReducer = (
  state: defaultState = initialState,
  action: UserDispatchType
) => {
  switch (action.type) {
    case EUser.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EUser.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EUser.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EUser.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EUser.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
      };

    case EUser.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EUser.ADD_FAIL:
      return {
        loading: false,
        current: state.current,
        message: action.message,
      };

    default:
      return {
        loading: false,
        current: state.current,
      };
  }
};

export default UserReducer;

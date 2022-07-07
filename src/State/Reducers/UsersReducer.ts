import {
  EUser,
  UserDispatchType,
  UserType,
} from "../ActionTypes/UsersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: UserType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const UsersReducer = (
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

    case EUser.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EUser.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: state.current.filter((value) =>
          value.id !== action.payload.id ? value : action.payload
        ),
      };

    case EUser.UPDATE_BY_ID_ERROR:
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

export default UsersReducer;

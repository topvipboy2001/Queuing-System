import {
  EUser,
  UserDispatchType,
  UserType,
} from "../ActionTypes/UsersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: UserType;
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

const UserReducer = (
  state: defaultState = initialState,
  action: UserDispatchType
) => {
  switch (action.type) {
    case EUser.GET_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EUser.GET_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EUser.GET_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EUser.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EUser.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
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

export default UserReducer;

import {
  EUser,
  UserDispatchType,
  UserType,
} from "../ActionTypes/UsersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: UserType[];
  rootData: UserType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  rootData: [],
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
        rootData: state.rootData,
      };

    case EUser.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: action.payload,
      };

    case EUser.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EUser.GET_BY_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EUser.GET_BY_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: state.rootData,
      };

    case EUser.GET_BY_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EUser.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EUser.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        rootData: [...state.rootData, action.payload],
      };

    case EUser.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EUser.ADD_FAIL:
      return {
        loading: false,
        current: state.current,
        message: action.message,
        rootData: state.rootData,
      };

    case EUser.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EUser.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: state.current.filter((value) =>
          value.id !== action.payload.id ? value : action.payload
        ),
        rootData: state.rootData.filter((value) =>
          value.id !== action.payload.id ? value : action.payload
        ),
      };

    case EUser.UPDATE_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    default:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
      };
  }
};

export default UsersReducer;

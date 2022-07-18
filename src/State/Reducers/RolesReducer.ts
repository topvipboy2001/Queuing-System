import {
  ERole,
  RoleDispatchType,
  RoleType,
} from "../ActionTypes/RolesActionType";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: RoleType[];
  rootData: RoleType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  rootData: [],
};

const RolesReducer = (
  state: defaultState = initialState,
  action: RoleDispatchType
) => {
  switch (action.type) {
    case ERole.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.current,
      };

    case ERole.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        rootData: [...state.current, action.payload],
      };

    case ERole.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.current,
        error: action.error,
      };

    case ERole.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.current,
      };

    case ERole.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: action.payload,
      };

    case ERole.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.current,
        error: action.error,
      };

    case ERole.GET_BY_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.current,
      };

    case ERole.GET_BY_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: state.current,
      };

    case ERole.GET_BY_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.current,
        error: action.error,
      };

    default:
      return {
        loading: false,
        current: state.current,
        rootData: state.current,
      };
  }
};

export default RolesReducer;

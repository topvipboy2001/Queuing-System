import {
  ERole,
  RoleDispatchType,
  RoleType,
} from "../ActionTypes/RoleActionType";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: RoleType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const RoleReducer = (
  state: defaultState = initialState,
  action: RoleDispatchType
) => {
  switch (action.type) {
    case ERole.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ERole.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
      };

    case ERole.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case ERole.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ERole.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case ERole.GET_ERROR:
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

export default RoleReducer;

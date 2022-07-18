import {
  ERole,
  RoleDispatchType,
  RoleType,
} from "../ActionTypes/RolesActionType";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: RoleType;
}

const initialState: defaultState = {
  loading: false,
  current: {
    id: "unknown",
    name: "unknown",
    description: "unknown",
    authority: [],
    amountOfUser: 0,
  },
};

const RoleReducer = (
  state: defaultState = initialState,
  action: RoleDispatchType
) => {
  switch (action.type) {
    case ERole.GET_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ERole.GET_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case ERole.GET_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case ERole.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case ERole.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case ERole.UPDATE_BY_ID_ERROR:
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

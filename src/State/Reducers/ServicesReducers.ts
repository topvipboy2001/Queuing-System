import {
  EServices,
  ServiceDispatchType,
  ServiceType,
} from "../ActionTypes/ServicesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ServiceType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const ServicesReducer = (
  state: defaultState = initialState,
  action: ServiceDispatchType
) => {
  switch (action.type) {
    case EServices.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EServices.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
      };

    case EServices.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EServices.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EServices.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EServices.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EServices.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EServices.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: state.current.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };

    case EServices.UPDATE_BY_ID_ERROR:
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

export default ServicesReducer;

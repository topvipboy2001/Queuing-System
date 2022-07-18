import {
  EServices,
  ServiceDispatchType,
  ServiceType,
} from "../ActionTypes/ServicesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ServiceType[];
  rootData: ServiceType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  rootData: [],
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
        rootData: state.rootData,
      };

    case EServices.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        rootData: [...state.rootData, action.payload],
      };

    case EServices.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EServices.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EServices.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: action.payload,
      };

    case EServices.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EServices.GET_BY_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EServices.GET_BY_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: state.rootData,
      };

    case EServices.GET_BY_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
        error: action.error,
      };

    case EServices.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EServices.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        rootData: state.rootData.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
        current: state.current.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };

    case EServices.UPDATE_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
        error: action.error,
      };

    default:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
      };
  }
};

export default ServicesReducer;

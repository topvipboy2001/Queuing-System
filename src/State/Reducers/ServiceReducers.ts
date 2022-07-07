import {
  EServices,
  ServiceDispatchType,
  ServiceType,
} from "../ActionTypes/ServicesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ServiceType;
}

const initialState: defaultState = {
  loading: false,
  current: {
    id: "1",
    name: "unknown",
    description: "unknown",
    isReset: false,
    surfix: 1,
    prefix: 2,
    increase: {
      from: 1,
      to: 10,
    },
    isActive: false,
  },
};

const ServiceReducer = (
  state: defaultState = initialState,
  action: ServiceDispatchType
) => {
  switch (action.type) {
    case EServices.GET_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EServices.GET_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EServices.GET_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EServices.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    default:
      return {
        loading: false,
        current: state.current,
      };
  }
};

export default ServiceReducer;

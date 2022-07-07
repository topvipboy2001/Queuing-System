import {
  EProviders,
  ProvidersDispatchType,
  ProviderType,
} from "../ActionTypes/ProvidersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ProviderType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const ProvidersReducers = (
  state: defaultState = initialState,
  action: ProvidersDispatchType
) => {
  switch (action.type) {
    case EProviders.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EProviders.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
      };

    case EProviders.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EProviders.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EProviders.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EProviders.GET_ERROR:
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

export default ProvidersReducers;

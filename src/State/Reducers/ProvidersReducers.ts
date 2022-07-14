import {
  EProviders,
  ProvidersDispatchType,
  ProviderType,
} from "../ActionTypes/ProvidersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ProviderType[];
  subCurrent: ProviderType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  subCurrent: [],
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
        subCurrent: state.subCurrent,
      };

    case EProviders.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        subCurrent: state.subCurrent,
      };

    case EProviders.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        subCurrent: state.subCurrent,
      };

    case EProviders.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
      };

    case EProviders.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        subCurrent: state.subCurrent,
      };

    case EProviders.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        subCurrent: state.subCurrent,
      };

    case EProviders.GET_BY_SERVICE_ID_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
      };

    case EProviders.GET_BY_SERVICE_ID_SUCCESS:
      return {
        loading: false,
        current: state.current,
        subCurrent: action.subPayload,
      };

    case EProviders.GET_BY_SERVICE_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        error: action.error,
      };

    default:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
      };
  }
};

export default ProvidersReducers;

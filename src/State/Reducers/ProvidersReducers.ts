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
  notificationCurrent: ProviderType[];
  rootData: ProviderType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  subCurrent: [],
  notificationCurrent: [],
  rootData: [],
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
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: [...state.rootData, action.payload],
      };

    case EProviders.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: action.payload,
      };

    case EProviders.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_SERVICE_ID_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_SERVICE_ID_SUCCESS:
      return {
        loading: false,
        current: state.current,
        subCurrent: action.subPayload,
        notificationCurrent: state.notificationCurrent,
        rootData: action.subPayload,
      };

    case EProviders.GET_BY_SERVICE_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        error: action.error,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_NOTIFICATION_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: action.notificationPayload,
        rootData: state.rootData,
      };

    case EProviders.GET_NOTIFICATION_ERROR:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        error: action.error,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_SERVICE_ID_WITH_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_SERVICE_ID_WITH_FILTER_SUCCESS:
      return {
        loading: false,
        current: state.current,
        subCurrent: action.subPayload,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    case EProviders.GET_BY_SERVICE_ID_WITH_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        error: action.error,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };

    default:
      return {
        loading: false,
        current: state.current,
        subCurrent: state.subCurrent,
        notificationCurrent: state.notificationCurrent,
        rootData: state.rootData,
      };
  }
};

export default ProvidersReducers;

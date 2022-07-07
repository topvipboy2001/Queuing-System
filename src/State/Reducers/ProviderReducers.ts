import { Timestamp } from "firebase/firestore";
import {
  EProviders,
  ProvidersDispatchType,
  ProviderType,
} from "../ActionTypes/ProvidersActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: ProviderType;
}

const initialState: defaultState = {
  loading: false,
  current: {
    id: "unknown",
    customerName: "unknown",
    dateValid: new Timestamp(0, 0),
    dateProvider: new Timestamp(1000, 1000),
    email: "unknown",
    ordinalNumber: 202000,
    phoneNumber: "unknown",
    services: { id: "unknown", name: "unknown" },
    sourceProvider: { id: "unknown", name: "unknown" },
    status: 0,
  },
};

const ProviderReducers = (
  state: defaultState = initialState,
  action: ProvidersDispatchType
) => {
  switch (action.type) {
    case EProviders.GET_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EProviders.GET_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EProviders.GET_BY_ID_ERROR:
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

export default ProviderReducers;

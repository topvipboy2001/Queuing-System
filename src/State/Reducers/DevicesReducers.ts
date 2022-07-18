import {
  DevicesDispatchType,
  DeviceType,
  EDevices,
} from "../ActionTypes/DevicesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: DeviceType[];
  rootData: DeviceType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
  rootData: [],
};

const DevicesReducer = (
  state: defaultState = initialState,
  action: DevicesDispatchType
) => {
  switch (action.type) {
    case EDevices.ADD_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EDevices.ADD_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EDevices.ADD_SUCCESS:
      return {
        loading: false,
        current: [...state.current, action.payload],
        rootData: [...state.rootData, action.payload],
      };

    case EDevices.GET_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EDevices.GET_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EDevices.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: action.payload,
      };

    case EDevices.GET_BY_FILTER_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EDevices.GET_BY_FILTER_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    case EDevices.GET_BY_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
        rootData: state.rootData,
      };

    case EDevices.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
        rootData: state.rootData,
      };

    case EDevices.UPDATE_BY_ID_SUCCESS:
      return {
        loading: false,
        current: state.current.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
        rootData: state.rootData.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };

    case EDevices.UPDATE_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
        rootData: state.rootData,
      };

    default:
      return {
        loading: false,
        current: state.current,
        rootData: state.rootData,
      };
  }
};

export default DevicesReducer;

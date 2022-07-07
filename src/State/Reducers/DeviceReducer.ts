import {
  DevicesDispatchType,
  DeviceType,
  EDevices,
} from "../ActionTypes/DevicesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: DeviceType;
}

const initialState: defaultState = {
  loading: false,
  current: {
    name: "unknown",
    IPAddress: "unknown",
    isActive: false,
    isConnect: false,
    username: "unknown",
    password: "unknown",
    id: "unknown",
    deviceType: { name: "unknown" },
    services: [
      {
        prefix: 1,
        name: "unknown",
        surfix: null,
        description: "unknown",
        isReset: false,
        increase: { to: null, from: null },
      },
    ],
  },
};

const DeviceReducer = (
  state: defaultState = initialState,
  action: DevicesDispatchType
) => {
  switch (action.type) {
    case EDevices.GET_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EDevices.GET_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EDevices.GET_BY_ID_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EDevices.UPDATE_BY_ID_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EDevices.UPDATE_BY_ID_ERROR:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case EDevices.UPDATE_BY_ID_SUCCESS:
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

export default DeviceReducer;

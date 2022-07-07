import {
  DeviceTypeDispatchType,
  DeviceTypeType,
  EDeviceType,
} from "../ActionTypes/DeviceTypesActionTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: DeviceTypeType[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const DeviceTypeReducer = (
  state: defaultState = initialState,
  action: DeviceTypeDispatchType
) => {
  switch (action.type) {
    case EDeviceType.GET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case EDeviceType.GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case EDeviceType.GET_ERROR:
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

export default DeviceTypeReducer;

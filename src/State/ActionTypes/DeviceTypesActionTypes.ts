export enum EDeviceType {
  GET_LOADING = "DEVICE_TYPE_GET_LOADING",
  GET_SUCCESS = "DEVICE_TYPE_GET_SUCCESS",
  GET_ERROR = "DEVICE_TYPE_GET_ERROR",
}

export type DeviceTypeType = {
  id: string;
  name: string;
};

export interface IDeviceTypeGetLoading {
  type: typeof EDeviceType.GET_LOADING;
}

export interface IDeviceTypeGetError {
  type: typeof EDeviceType.GET_ERROR;
  error: Error;
}

export interface IDeviceTypeGetSuccess {
  type: typeof EDeviceType.GET_SUCCESS;
  payload: DeviceTypeType[];
}

export type DeviceTypeDispatchType =
  | IDeviceTypeGetLoading
  | IDeviceTypeGetError
  | IDeviceTypeGetSuccess;

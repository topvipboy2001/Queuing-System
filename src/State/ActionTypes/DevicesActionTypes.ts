export enum EDevices {
  GET_LOADING = "DEVICES_GET_LOADING",
  GET_SUCCESS = "DEVICES_GET_SUCCESS",
  GET_ERROR = "DEVICES_GET_ERROR",

  GET_BY_ID_LOADING = "DEVICES_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "DEVICES_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "DEVICES_GET_BY_ID_ERROR",

  GET_BY_FILTER_LOADING = "DEVICES_GET_BY_FILTER_LOADING",
  GET_BY_FILTER_SUCCESS = "DEVICES_GET_BY_FILTER_SUCCESS",
  GET_BY_FILTER_ERROR = "DEVICES_GET_BY_FILTER_ERROR",

  UPDATE_BY_ID_LOADING = "DEVICES_UPDATE_BY_ID_LOADING",
  UPDATE_BY_ID_SUCCESS = "DEVICES_UPDATE_BY_ID_SUCCESS",
  UPDATE_BY_ID_ERROR = "DEVICES_UPDATE_BY_ID_ERROR",

  ADD_LOADING = "DEVICES_ADD_LOADING",
  ADD_SUCCESS = "DEVICES_ADD_SUCCESS",
  ADD_ERROR = "DEVICES_ADD_ERROR",
  ADD_FAIL = "DEVICES_ADD_FAIL",
}

export type DeviceType = {
  id: string;
  name: string;
  deviceType: any;
  username: string;
  IPAddress: string;
  password: string;
  services: any[];
  isActive: boolean;
  isConnect: boolean;
};

export type DeviceFilterType = {
  isActive: boolean | null;
  isConnect: boolean | null;
  search: string;
};

export type DeviceAddType = {
  id: string;
  name: string;
  deviceType: string;
  username: string;
  IPAddress: string;
  password: string;
  services: string[];
};

export type DeviceUpdateType = {
  id: string;
  name: string;
  deviceType: string;
  username: string;
  IPAddress: string;
  password: string;
  services: string[];
};

export interface IDevicesGetLoading {
  type: typeof EDevices.GET_LOADING;
}

export interface IDevicesGetError {
  type: typeof EDevices.GET_ERROR;
  error: Error;
}

export interface IDevicesGetSuccess {
  type: typeof EDevices.GET_SUCCESS;
  payload: DeviceType[];
}

export interface IDeviceGetByIdLoading {
  type: typeof EDevices.GET_BY_ID_LOADING;
}

export interface IDeviceGetByIdError {
  type: typeof EDevices.GET_BY_ID_ERROR;
  error: Error;
}

export interface IDeviceGetByIdSuccess {
  type: typeof EDevices.GET_BY_ID_SUCCESS;
  payload: DeviceType;
}

export interface IDeviceGetByFilterLoading {
  type: typeof EDevices.GET_BY_FILTER_LOADING;
}

export interface IDeviceGetByFilterError {
  type: typeof EDevices.GET_BY_FILTER_ERROR;
  error: Error;
}

export interface IDeviceGetByFilterSuccess {
  type: typeof EDevices.GET_BY_FILTER_SUCCESS;
  payload: DeviceType[];
}

export interface IDeviceUpdateByIdLoading {
  type: typeof EDevices.UPDATE_BY_ID_LOADING;
}

export interface IDeviceUpdateByIdError {
  type: typeof EDevices.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface IDeviceUpdateByIdSuccess {
  type: typeof EDevices.UPDATE_BY_ID_SUCCESS;
  payload: DeviceType;
}

export interface IDeviceAddLoading {
  type: typeof EDevices.ADD_LOADING;
}

export interface IDeviceAddError {
  type: typeof EDevices.ADD_ERROR;
  error: Error;
}

export interface IDeviceAddSuccess {
  type: typeof EDevices.ADD_SUCCESS;
  payload: DeviceType;
}

export type DevicesDispatchType =
  | IDevicesGetLoading
  | IDevicesGetError
  | IDevicesGetSuccess
  | IDeviceGetByIdLoading
  | IDeviceGetByIdError
  | IDeviceGetByIdSuccess
  | IDeviceUpdateByIdLoading
  | IDeviceUpdateByIdError
  | IDeviceUpdateByIdSuccess
  | IDeviceAddLoading
  | IDeviceAddError
  | IDeviceAddSuccess
  | IDeviceGetByFilterLoading
  | IDeviceGetByFilterError
  | IDeviceGetByFilterSuccess;

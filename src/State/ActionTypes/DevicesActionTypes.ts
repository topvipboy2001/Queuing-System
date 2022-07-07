export enum EDevices {
  GET_LOADING = "DEVICES_GET_LOADING",
  GET_SUCCESS = "DEVICES_GET_SUCCESS",
  GET_ERROR = "DEVICES_GET_ERROR",

  GET_BY_ID_LOADING = "DEVICES_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "DEVICES_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "DEVICES_GET_BY_ID_ERROR",

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

export interface DevicesGetLoading {
  type: typeof EDevices.GET_LOADING;
}

export interface DevicesGetError {
  type: typeof EDevices.GET_ERROR;
  error: Error;
}

export interface DevicesGetSuccess {
  type: typeof EDevices.GET_SUCCESS;
  payload: DeviceType[];
}

export interface DeviceGetByIdLoading {
  type: typeof EDevices.GET_BY_ID_LOADING;
}

export interface DeviceGetByIdError {
  type: typeof EDevices.GET_BY_ID_ERROR;
  error: Error;
}

export interface DeviceGetByIdSuccess {
  type: typeof EDevices.GET_BY_ID_SUCCESS;
  payload: DeviceType;
}

export interface DeviceUpdateByIdLoading {
  type: typeof EDevices.UPDATE_BY_ID_LOADING;
}

export interface DeviceUpdateByIdError {
  type: typeof EDevices.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface DeviceUpdateByIdSuccess {
  type: typeof EDevices.UPDATE_BY_ID_SUCCESS;
  payload: DeviceType;
}

export interface DeviceAddLoading {
  type: typeof EDevices.ADD_LOADING;
}

export interface DeviceAddError {
  type: typeof EDevices.ADD_ERROR;
  error: Error;
}

export interface DeviceAddSuccess {
  type: typeof EDevices.ADD_SUCCESS;
  payload: DeviceType;
}

export type DevicesDispatchType =
  | DevicesGetLoading
  | DevicesGetError
  | DevicesGetSuccess
  | DeviceGetByIdLoading
  | DeviceGetByIdError
  | DeviceGetByIdSuccess
  | DeviceUpdateByIdLoading
  | DeviceUpdateByIdError
  | DeviceUpdateByIdSuccess
  | DeviceAddLoading
  | DeviceAddError
  | DeviceAddSuccess;

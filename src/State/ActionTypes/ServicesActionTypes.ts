export enum EServices {
  GET_LOADING = "SERVICES_GET_LOADING",
  GET_SUCCESS = "SERVICES_GET_SUCCESS",
  GET_ERROR = "SERVICES_GET_ERROR",

  GET_BY_ID_LOADING = "SERVICES_GET_BY_ID_LOADING",
  GET_BY_ID_SUCCESS = "SERVICES_GET_BY_ID_SUCCESS",
  GET_BY_ID_ERROR = "SERVICES_GET_BY_ID_ERROR",

  UPDATE_BY_ID_LOADING = "SERVICES_UPDATE_BY_ID_LOADING",
  UPDATE_BY_ID_SUCCESS = "SERVICES_UPDATE_BY_ID_SUCCESS",
  UPDATE_BY_ID_ERROR = "SERVICES_UPDATE_BY_ID_ERROR",

  ADD_LOADING = "SERVICES_ADD_LOADING",
  ADD_SUCCESS = "SERVICES_ADD_SUCCESS",
  ADD_ERROR = "SERVICES_ADD_ERROR",
  ADD_FAIL = "SERVICES_ADD_FAIL",
}

export type ServiceType = {
  id: string;
  name: string;
  description: string;
  isReset: boolean;
  surfix: number;
  prefix: number;
  increase: { from: number; to: number };
  isActive: boolean;
};

export type ServiceAddType = {
  id: string;
  name: string;
  description: string;
  isReset: boolean;
  surfix: number;
  prefix: number;
  increase: { from: number; to: number };
};

export type ServiceUpdateType = {
  id: string;
  name: string;
  description?: string;
  isReset?: boolean;
  surfix?: number;
  prefix?: number;
  increase?: { from?: number; to?: number };
};

export interface ServicesGetLoading {
  type: typeof EServices.GET_LOADING;
}

export interface ServicesGetError {
  type: typeof EServices.GET_ERROR;
  error: Error;
}

export interface ServicesGetSuccess {
  type: typeof EServices.GET_SUCCESS;
  payload: ServiceType[];
}

export interface ServiceGetByIdLoading {
  type: typeof EServices.GET_BY_ID_LOADING;
}

export interface ServiceGetByIdError {
  type: typeof EServices.GET_BY_ID_ERROR;
  error: Error;
}

export interface ServiceGetByIdSuccess {
  type: typeof EServices.GET_BY_ID_SUCCESS;
  payload: ServiceType;
}

export interface ServiceUpdateByIdLoading {
  type: typeof EServices.UPDATE_BY_ID_LOADING;
}

export interface ServiceUpdateByIdError {
  type: typeof EServices.UPDATE_BY_ID_ERROR;
  error: Error;
}

export interface ServiceUpdateByIdSuccess {
  type: typeof EServices.UPDATE_BY_ID_SUCCESS;
  payload: ServiceType;
}

export interface ServiceAddLoading {
  type: typeof EServices.ADD_LOADING;
}

export interface ServiceAddError {
  type: typeof EServices.ADD_ERROR;
  error: Error;
}

export interface ServiceAddSuccess {
  type: typeof EServices.ADD_SUCCESS;
  payload: ServiceType;
}

export type ServiceDispatchType =
  | ServicesGetLoading
  | ServicesGetError
  | ServicesGetSuccess
  | ServiceAddLoading
  | ServiceAddError
  | ServiceAddSuccess
  | ServiceGetByIdLoading
  | ServiceGetByIdError
  | ServiceGetByIdSuccess
  | ServiceUpdateByIdLoading
  | ServiceUpdateByIdError
  | ServiceUpdateByIdSuccess;
